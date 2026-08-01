'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { ArchitectureDiagram as Diagram, ArchitectureNode } from '@/types/content';
import { cn } from '@/lib/utils';

/**
 * =============================================================================
 * INTERACTIVE ARCHITECTURE DIAGRAM
 * =============================================================================
 * Renders a node/edge graph from the content model as SVG.
 *
 * WHY SVG RATHER THAN AN IMAGE
 * An exported PNG would be simpler, and worse in four measurable ways: it does
 * not respond to the theme, it blurs on high-DPI displays, it cannot be read by
 * a screen reader, and it goes stale the moment the data changes. Rendering
 * from data means the diagram and the description can never disagree.
 *
 * WHY NOT A GRAPH LIBRARY
 * d3 or react-flow would add 50–100KB to do automatic layout we do not need —
 * positions are authored explicitly as `col`/`row` in the data, because a
 * hand-placed architecture diagram is always clearer than a force-directed one.
 *
 * ACCESSIBILITY
 * The SVG is `aria-hidden`; the same graph is emitted as a real nested list for
 * assistive technology, describing each node and what it connects to. Stepping
 * through the narration updates an `aria-live` region rather than relying on
 * colour alone to convey which part is highlighted.
 */

const KIND_STYLES: Record<
  ArchitectureNode['kind'],
  { fill: string; stroke: string; text: string; label: string }
> = {
  client: {
    fill: 'var(--accent-muted)',
    stroke: 'var(--accent)',
    text: 'var(--foreground)',
    label: 'Client',
  },
  edge: {
    fill: 'color-mix(in oklch, var(--accent-secondary) 12%, transparent)',
    stroke: 'var(--accent-secondary)',
    text: 'var(--foreground)',
    label: 'Edge',
  },
  service: {
    fill: 'var(--surface-raised)',
    stroke: 'var(--border-strong)',
    text: 'var(--foreground)',
    label: 'Service',
  },
  data: {
    fill: 'color-mix(in oklch, var(--accent-tertiary) 12%, transparent)',
    stroke: 'var(--accent-tertiary)',
    text: 'var(--foreground)',
    label: 'Data store',
  },
  external: {
    fill: 'transparent',
    stroke: 'var(--border-strong)',
    text: 'var(--foreground-muted)',
    label: 'External',
  },
  job: {
    fill: 'color-mix(in oklch, var(--warning) 10%, transparent)',
    stroke: 'var(--warning)',
    text: 'var(--foreground)',
    label: 'Job / pipeline',
  },
};

// Layout constants. A fixed grid keeps every diagram visually consistent.
const NODE_W = 156;
const NODE_H = 68;
const GAP_X = 72;
const GAP_Y = 34;
const PAD = 16;

export function ArchitectureDiagramView({ diagram }: { diagram: Diagram }) {
  const [step, setStep] = useState<number | null>(null);

  const { positioned, width, height } = useMemo(() => {
    const cols = Math.max(...diagram.nodes.map((node) => node.col));
    const rows = Math.max(...diagram.nodes.map((node) => node.row));

    const positioned = diagram.nodes.map((node) => ({
      ...node,
      x: PAD + (node.col - 1) * (NODE_W + GAP_X),
      y: PAD + (node.row - 1) * (NODE_H + GAP_Y),
    }));

    return {
      positioned,
      width: PAD * 2 + cols * NODE_W + (cols - 1) * GAP_X,
      height: PAD * 2 + rows * NODE_H + (rows - 1) * GAP_Y,
    };
  }, [diagram.nodes]);

  const nodeById = useMemo(
    () => new Map(positioned.map((node) => [node.id, node])),
    [positioned],
  );

  const activeStep = step !== null ? diagram.steps?.[step] : undefined;
  const highlighted = useMemo(
    () => new Set(activeStep?.highlight ?? []),
    [activeStep],
  );
  const dimming = highlighted.size > 0;

  /** True when an edge connects two highlighted nodes. */
  const isEdgeActive = (from: string, to: string) =>
    highlighted.has(from) && highlighted.has(to);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h4 className="text-body font-semibold text-foreground">{diagram.title}</h4>
        <p className="mt-1.5 max-w-2xl text-small leading-relaxed text-foreground-muted">
          {diagram.description}
        </p>
      </div>

      {/* The diagram scrolls itself rather than the page — the #1 source of
          horizontal overflow on mobile is a wide diagram in a normal container. */}
      <div className="-mx-2 overflow-x-auto px-2 pb-2">
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          className="max-w-none"
          style={{ minWidth: width }}
        >
          <defs>
            <marker
              id={`${diagram.id}-arrow`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-strong)" />
            </marker>
            <marker
              id={`${diagram.id}-arrow-active`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Edges first so nodes paint on top of them. */}
          <g>
            {diagram.edges.map((edge) => {
              const from = nodeById.get(edge.from);
              const to = nodeById.get(edge.to);
              if (!from || !to) return null;

              const active = isEdgeActive(edge.from, edge.to);

              // Route from the nearest face of each node so lines never cross
              // through the boxes they connect.
              const sameRow = from.row === to.row;
              const goingRight = to.x > from.x;

              const x1 = sameRow
                ? goingRight
                  ? from.x + NODE_W
                  : from.x
                : from.x + NODE_W / 2;
              const y1 = sameRow ? from.y + NODE_H / 2 : from.y + (to.y > from.y ? NODE_H : 0);
              const x2 = sameRow ? (goingRight ? to.x : to.x + NODE_W) : to.x + NODE_W / 2;
              const y2 = sameRow ? to.y + NODE_H / 2 : to.y + (to.y > from.y ? 0 : NODE_H);

              // Orthogonal-ish curve: a single control point at the midpoint
              // reads as a deliberate route rather than a straight diagonal.
              const midX = (x1 + x2) / 2;
              const path = sameRow
                ? `M ${x1} ${y1} L ${x2} ${y2}`
                : `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;

              return (
                <g
                  key={`${edge.from}-${edge.to}`}
                  opacity={dimming && !active ? 0.18 : 1}
                  className="transition-opacity duration-300"
                >
                  <path
                    d={path}
                    fill="none"
                    stroke={active ? 'var(--accent)' : 'var(--border-strong)'}
                    strokeWidth={active ? 2 : 1.25}
                    strokeDasharray={edge.async ? '5 4' : undefined}
                    markerEnd={`url(#${diagram.id}-arrow${active ? '-active' : ''})`}
                    className="transition-[stroke,stroke-width] duration-300"
                  />
                  {edge.label && (
                    <text
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2 - 6}
                      textAnchor="middle"
                      className="font-mono"
                      fontSize="9.5"
                      fill="var(--foreground-subtle)"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {positioned.map((node) => {
              const style = KIND_STYLES[node.kind];
              const active = highlighted.has(node.id);

              return (
                <g
                  key={node.id}
                  opacity={dimming && !active ? 0.28 : 1}
                  className="transition-opacity duration-300"
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width={NODE_W}
                    height={NODE_H}
                    rx="10"
                    fill={style.fill}
                    stroke={active ? 'var(--accent)' : style.stroke}
                    strokeWidth={active ? 2 : 1}
                    className="transition-[stroke,stroke-width] duration-300"
                  />
                  <text
                    x={node.x + NODE_W / 2}
                    y={node.y + (node.detail ? 28 : NODE_H / 2 + 4)}
                    textAnchor="middle"
                    fontSize="12.5"
                    fontWeight="600"
                    fill={style.text}
                  >
                    {node.label}
                  </text>
                  {node.detail && (
                    <text
                      x={node.x + NODE_W / 2}
                      y={node.y + 46}
                      textAnchor="middle"
                      fontSize="9.5"
                      fill="var(--foreground-subtle)"
                    >
                      {node.detail}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {Array.from(new Set(diagram.nodes.map((node) => node.kind))).map((kind) => (
          <li key={kind} className="flex items-center gap-2 text-micro text-foreground-subtle">
            <span
              aria-hidden="true"
              className="size-2.5 rounded-[3px] border"
              style={{
                backgroundColor: KIND_STYLES[kind].fill,
                borderColor: KIND_STYLES[kind].stroke,
              }}
            />
            {KIND_STYLES[kind].label}
          </li>
        ))}
        <li className="flex items-center gap-2 text-micro text-foreground-subtle">
          <span aria-hidden="true" className="h-px w-5 border-t border-dashed border-border-strong" />
          Async / background
        </li>
      </ul>

      {/* Stepped narration */}
      {diagram.steps && diagram.steps.length > 0 && (
        <div className="flex flex-col gap-3 rounded-(--radius-card) border border-border bg-surface/40 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-micro tracking-[0.14em] text-foreground-subtle uppercase">
              Walk through
            </span>
            {diagram.steps.map((stepItem, index) => (
              <button
                key={stepItem.title}
                type="button"
                aria-pressed={step === index}
                onClick={() => setStep(step === index ? null : index)}
                className={cn(
                  'flex size-7 items-center justify-center rounded-full border text-micro font-medium transition-colors',
                  step === index
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border text-foreground-muted hover:border-border-strong hover:text-foreground',
                )}
              >
                <span className="sr-only">Step {index + 1}: </span>
                {index + 1}
              </button>
            ))}
            {step !== null && (
              <Button variant="ghost" size="sm" onClick={() => setStep(null)} className="ml-auto">
                Reset
              </Button>
            )}
          </div>

          {/* Announced to screen readers when the step changes. */}
          <div aria-live="polite" className="min-h-[3.5rem]">
            {activeStep ? (
              <div className="flex flex-col gap-1">
                <p className="text-small font-semibold text-foreground">{activeStep.title}</p>
                <p className="text-small leading-relaxed text-foreground-muted">
                  {activeStep.detail}
                </p>
              </div>
            ) : (
              <p className="text-small text-foreground-subtle">
                Select a step to highlight that part of the flow.
              </p>
            )}
          </div>
        </div>
      )}

      {/* The accessible equivalent of the SVG. Not `sr-only` by accident —
          this is the canonical description, and the SVG is the decoration. */}
      <div className="sr-only">
        <h5>{diagram.title} — described</h5>
        <ul>
          {diagram.nodes.map((node) => {
            const outgoing = diagram.edges.filter((edge) => edge.from === node.id);
            return (
              <li key={node.id}>
                {node.label} ({KIND_STYLES[node.kind].label}
                {node.detail ? `, ${node.detail}` : ''})
                {outgoing.length > 0 && (
                  <ul>
                    {outgoing.map((edge) => (
                      <li key={`${edge.from}-${edge.to}`}>
                        connects to {nodeById.get(edge.to)?.label ?? edge.to}
                        {edge.label ? ` — ${edge.label}` : ''}
                        {edge.async ? ' (asynchronous)' : ''}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

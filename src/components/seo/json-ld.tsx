/**
 * Renders a JSON-LD script tag.
 *
 * `application/ld+json` in a script tag is the only delivery mechanism search
 * engines officially support, which forces `dangerouslySetInnerHTML`. That is
 * safe here because every value originates from our own typed content model —
 * there is no user input anywhere in this path.
 *
 * This is a Server Component, so the JSON is in the initial HTML where
 * crawlers will actually see it without executing JavaScript.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

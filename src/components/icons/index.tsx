import { Mail } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import type { SocialId } from '@/config/site';
import {
  GithubIcon,
  LeetcodeIcon,
  LinkedinIcon,
  MediumIcon,
  XIcon,
} from './brand-icons';

export * from './brand-icons';

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Maps a social id to its mark. Defined once so the footer, contact page and
 * mobile nav cannot disagree about which icon represents which network.
 */
export const SOCIAL_ICONS: Record<SocialId, IconComponent> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  leetcode: LeetcodeIcon,
  medium: MediumIcon,
  email: Mail as IconComponent,
};

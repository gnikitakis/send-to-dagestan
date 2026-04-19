export type ToughnessBadge =
  | 'MOUNTAIN LEGEND'
  | 'FUTURE WARRIOR'
  | 'NEEDS WORK'
  | 'SERIOUS EMERGENCY'
  | 'LIFETIME RESIDENT';

export interface ToughnessResult {
  years: number;
  badge: ToughnessBadge;
  verdict_title: string;
  verdict_sub: string;
}

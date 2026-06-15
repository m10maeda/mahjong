import type { RoundSession } from '../../round-session';

export interface IFourWindsOutInFirstAroundAbortiveDrawSpecification {
  isSatisfiedBy(session: RoundSession): boolean;
}

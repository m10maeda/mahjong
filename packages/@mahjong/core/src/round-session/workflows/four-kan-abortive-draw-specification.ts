import type { RoundSession } from '../round-session';

export interface IFourKanAbortiveDrawSpecification {
  isSatisfiedBy(session: RoundSession): boolean;
}

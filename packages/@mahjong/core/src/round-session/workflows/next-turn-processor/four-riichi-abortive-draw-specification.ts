import type { RoundSession } from '../../round-session';

export interface IFourRiichiAbortiveDrawSpecification {
  isSatisfiedBy(session: RoundSession): boolean;
}

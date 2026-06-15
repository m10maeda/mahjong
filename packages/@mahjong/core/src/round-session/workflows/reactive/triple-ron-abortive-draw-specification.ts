import type { RonCallResolutionResult } from '../../call-resolution';

export interface ITripleRonAbortiveDrawSpecification {
  isSatisfiedBy(result: RonCallResolutionResult): boolean;
}

import type { RoundSessionEvent } from '../events';
import type { RoundSession } from '../round-session';

export class RoundSessionTransition {
  public readonly events: readonly RoundSessionEvent[];

  public readonly nextSession?: RoundSession;

  public constructor(
    events: readonly RoundSessionEvent[],
    nextSession?: RoundSession,
  ) {
    this.events = events;
    this.nextSession = nextSession;
  }
}

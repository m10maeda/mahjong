import type { RoundSessionEvent } from './round-session-event';

export interface IRoundSessionEventSubscriber {
  handle(event: RoundSessionEvent): Promise<void>;
}

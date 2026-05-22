import type { RoundSessionEvent } from './round-session-event';

export interface IRoundSessionEventPublisher {
  publish(event: RoundSessionEvent): Promise<void>;
}

import type { RoundEvent } from './round-event';

export interface IRoundEventPublisher {
  publish(event: RoundEvent): Promise<void>;
}

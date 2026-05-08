import type { RoundEvent } from './round-event';

export interface IRoundEventSubscriber {
  handle(event: RoundEvent): Promise<void>;
}

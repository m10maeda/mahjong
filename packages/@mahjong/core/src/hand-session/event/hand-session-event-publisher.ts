import type { HandSessionEvent } from './hand-session-event';

export interface IHandSessionEventPublisher {
  publish(event: HandSessionEvent): Promise<void>;
}

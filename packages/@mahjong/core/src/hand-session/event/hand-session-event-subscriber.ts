import type { HandSessionEvent } from './hand-session-event';

export interface IHandSessionEventSubscriber {
  handle(event: HandSessionEvent): Promise<void>;
}

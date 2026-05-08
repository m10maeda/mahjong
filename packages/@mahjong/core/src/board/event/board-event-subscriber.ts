import type { BoardEvent } from './board-event';

export interface IBoardEventSubscriber {
  handle(event: BoardEvent): Promise<void>;
}

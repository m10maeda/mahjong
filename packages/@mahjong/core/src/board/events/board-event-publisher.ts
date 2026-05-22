import type { BoardEvent } from './board-event';

export interface IBoardEventPublisher {
  publish(event: BoardEvent): Promise<void>;
}

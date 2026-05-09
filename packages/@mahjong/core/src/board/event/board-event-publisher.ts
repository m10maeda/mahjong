import type { BoardEvent } from './board-event';
import type { IMahjongEventPublisher } from '../../event';

export interface IBoardEventPublisher extends IMahjongEventPublisher<BoardEvent> {}

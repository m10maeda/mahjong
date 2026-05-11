import type { BoardEvent } from './board-event';
import type { IMahjongEventSubscriber } from '../../event';

export interface IBoardEventSubscriber extends IMahjongEventSubscriber<BoardEvent> {}

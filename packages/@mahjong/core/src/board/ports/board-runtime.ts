import type { IBoardCommandHandler } from '../commands';
import type { IBoardSetupper } from './board-setupper';

export interface IBoardRuntime extends IBoardCommandHandler, IBoardSetupper {}

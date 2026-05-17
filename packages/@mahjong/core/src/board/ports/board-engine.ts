import type { IBoardCommandHandler } from '../commands';
import type { IBoardPreparer } from './board-preparer';

export interface IBoardEngine extends IBoardCommandHandler, IBoardPreparer {}

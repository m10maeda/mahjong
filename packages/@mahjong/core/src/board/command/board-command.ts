import { BoardCommand as BaseBoardCommand } from '../board-command-applier';

import type { Board } from '../board';

export abstract class BoardCommand extends BaseBoardCommand<Board> {}

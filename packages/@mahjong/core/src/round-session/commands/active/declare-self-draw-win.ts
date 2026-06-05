import { RoundSessionCommand } from '../round-session-command';
import { ActiveRoundSessionCommand } from './active-round-session-command';

import type { SeatPosition } from '../../../concepts';
import type { TileDrawnSource } from '../../events';

export class DeclareSelfDrawWin extends ActiveRoundSessionCommand {
  public readonly declarer: SeatPosition;

  public readonly source: TileDrawnSource;

  public constructor(declarer: SeatPosition, source: TileDrawnSource) {
    super();

    this.declarer = declarer;
    this.source = source;
  }

  public static isDeclareSelfDrawWin(
    command: RoundSessionCommand,
  ): command is DeclareSelfDrawWin {
    return command instanceof DeclareSelfDrawWin;
  }
}

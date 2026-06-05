import { ReactiveRoundSessionCommand } from './reactive-round-session-command';

import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';
import type { RoundSessionCommand } from '../round-session-command';

export class OpenKanCall extends ReactiveRoundSessionCommand {
  public readonly claimOn: SeatPosition;

  public readonly claimTile: Tile;

  public readonly consumeTiles: readonly [Tile, Tile, Tile];

  public constructor(
    reactor: SeatPosition,
    claimTile: Tile,
    claimOn: SeatPosition,
    consumeTiles: readonly [Tile, Tile, Tile],
  ) {
    super(reactor);

    this.claimTile = claimTile;
    this.claimOn = claimOn;
    this.consumeTiles = consumeTiles;
  }

  public static isOpenKanCall(
    command: RoundSessionCommand,
  ): command is OpenKanCall {
    return command instanceof OpenKanCall;
  }
}

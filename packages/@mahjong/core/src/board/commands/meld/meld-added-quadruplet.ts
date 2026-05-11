import { Tile } from '../../../tile';
import { OpenTriplet } from '../../events';
import { BoardCommand } from '../board-command';

import type { SeatPosition } from '../../../seat-position';
import type { Turn } from '../../turn';

export class MeldAddedQuadruplet extends BoardCommand {
  // FIXME: コマンド用DOTへ変換する
  // むしろ、Hand.melds をやめて、Board.melds で管理させた方が良さそう
  public readonly base: OpenTriplet;

  public readonly consumedTile: Tile;

  public readonly currentTurn: Turn;

  public readonly seat: SeatPosition;

  public constructor(
    seat: SeatPosition,
    consumedTile: Tile,
    base: OpenTriplet,
    currentTurn: Turn,
  ) {
    super();

    this.seat = seat;
    this.consumedTile = consumedTile;
    this.base = base;
    this.currentTurn = currentTurn;
  }
}

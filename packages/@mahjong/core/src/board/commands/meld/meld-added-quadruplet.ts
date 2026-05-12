import { Tile } from '../../../tile';
import { BoardCommand } from '../board-command';

import type { SeatPosition } from '../../../seat-position';
import type { MeldReference } from '../../events/melded';

export class MeldAddedQuadruplet extends BoardCommand {
  // FIXME: コマンド用DOTへ変換する
  // むしろ、Hand.melds をやめて、Board.melds で管理させた方が良さそう
  public readonly base: MeldReference;

  public readonly consumedTile: Tile;

  public readonly seat: SeatPosition;

  public constructor(
    seat: SeatPosition,
    consumedTile: Tile,
    base: MeldReference,
  ) {
    super();

    this.seat = seat;
    this.consumedTile = consumedTile;
    this.base = base;
  }
}

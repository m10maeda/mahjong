import { BoardCommand } from '../board';
import { TileDiscarded, type BoardEvent } from '../event';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';
import type { Board } from '../board';
import type { Turn } from '../turn';

export class DiscardTile extends BoardCommand<Board> {
  private readonly currentTurn: Turn;

  private readonly discarder: SeatPosition;

  private readonly fromConcealed: boolean;

  private readonly tile: Tile;

  public execute(prevBoard: Board): [Board, BoardEvent] {
    const newBoard = prevBoard.discard(this.tile, this.discarder);

    const event = new TileDiscarded(
      this.tile,
      this.fromConcealed,
      this.discarder,
      this.currentTurn,
    );

    return [newBoard, event];
  }

  public constructor(
    discarder: SeatPosition,
    tile: Tile,
    fromConcealed: boolean,
    currentTurn: Turn,
  ) {
    super();

    this.discarder = discarder;
    this.tile = tile;
    this.fromConcealed = fromConcealed;
    this.currentTurn = currentTurn;
  }
}

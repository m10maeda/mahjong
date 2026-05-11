import {
  ClosedQuadruplet,
  ClosedQuadrupletMelded,
  type BoardEvent,
} from '../../event';
import { BoardCommand } from '../../models/board';
import { MeldOperation, MeldTileGroup } from '../../models/hand';

import type { SeatPosition } from '../../../seat-position';
import type { Tile } from '../../../tile';
import type { Board } from '../../models/board';
import type { Turn } from '../../turn';

export class MeldClosedQuadruplet extends BoardCommand<Board> {
  private readonly actor: SeatPosition;

  private readonly consumed: readonly [Tile, ...Tile[]];

  private readonly currentTurn: Turn;

  public execute(prevBoard: Board): [Board, BoardEvent] {
    const operation = new MeldOperation(
      new MeldTileGroup(...this.consumed),
      this.consumed,
    );
    const newBoard = prevBoard.meld(this.actor, operation);

    const event = new ClosedQuadrupletMelded(
      new ClosedQuadruplet(this.consumed),
      this.actor,
      this.currentTurn,
    );

    return [newBoard, event];
  }

  public constructor(
    discarder: SeatPosition,
    consumed: readonly [Tile, ...Tile[]],
    currentTurn: Turn,
  ) {
    super();

    this.actor = discarder;
    this.consumed = consumed;
    this.currentTurn = currentTurn;
  }
}

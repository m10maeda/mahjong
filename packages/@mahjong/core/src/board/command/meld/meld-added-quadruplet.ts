import { Tile } from '../../../tile';
import { BoardCommand } from '../../board';
import {
  AddedQuadruplet,
  AddedQuadrupletMelded,
  OpenTriplet,
  type BoardEvent,
} from '../../event';
import { MeldOperation, MeldTileGroup } from '../../hand';

import type { SeatPosition } from '../../../seat-position';
import type { Board } from '../../board';
import type { Turn } from '../../turn';

export class MeldAddedQuadruplet extends BoardCommand<Board> {
  private readonly actor: SeatPosition;

  private readonly base: OpenTriplet;

  private readonly consumed: Tile;

  private readonly currentTurn: Turn;

  public execute(prevBoard: Board): [Board, BoardEvent] {
    const operation = new MeldOperation(
      new MeldTileGroup(...this.base, this.consumed),
      [this.consumed],
    );
    const newBoard = prevBoard.meld(this.actor, operation);

    const event = new AddedQuadrupletMelded(
      new AddedQuadruplet(this.base, this.consumed),
      this.base,
      this.actor,
      this.currentTurn,
    );

    return [newBoard, event];
  }

  public constructor(
    discarder: SeatPosition,
    base: OpenTriplet,
    consumed: Tile,
    currentTurn: Turn,
  ) {
    super();

    this.actor = discarder;
    this.base = base;
    this.consumed = consumed;
    this.currentTurn = currentTurn;
  }
}

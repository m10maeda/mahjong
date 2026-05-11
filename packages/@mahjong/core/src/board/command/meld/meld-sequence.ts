import { OpenSequence, SequenceMelded, type BoardEvent } from '../../event';
import { BoardCommand } from '../../models/board';
import { MeldOperation, MeldTileGroup } from '../../models/hand';

import type { SeatPosition } from '../../../seat-position';
import type { Tile } from '../../../tile';
import type { Board } from '../../models/board';
import type { Turn } from '../../turn';

export class MeldSequence extends BoardCommand<Board> {
  private readonly actor: SeatPosition;

  private readonly claimed: Tile;

  private readonly consumed: readonly [Tile, ...Tile[]];

  private readonly currentTurn: Turn;

  private readonly from: SeatPosition;

  public execute(prevBoard: Board): [Board, BoardEvent] {
    const operation = new MeldOperation(
      new MeldTileGroup(...this.consumed, this.claimed),
      this.consumed,
      this.claimed,
    );
    const newBoard = prevBoard.meld(this.actor, operation);

    const event = new SequenceMelded(
      new OpenSequence(this.consumed, this.claimed),
      this.actor,
      this.from,
      this.currentTurn,
    );

    return [newBoard, event];
  }

  public constructor(
    discarder: SeatPosition,
    claimed: Tile,
    consumed: readonly [Tile, ...Tile[]],
    from: SeatPosition,
    currentTurn: Turn,
  ) {
    super();

    this.actor = discarder;
    this.claimed = claimed;
    this.consumed = consumed;
    this.from = from;
    this.currentTurn = currentTurn;
  }
}

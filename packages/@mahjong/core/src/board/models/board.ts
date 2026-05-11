import { InvalidHolderNotFoundError } from './invalid-holder-not-found-error';
import { InvalidMismatchClaimedTileError } from './invalid-mismatch-claimed-tile-error';

import type { DiscardPile } from './discard-pile';
import type { Hands } from './hands';
import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';
import type { IBoardCommandApplier } from '../board-command-applier';
import type { BoardCommand } from '../command';
import type { DeadWall } from './dead-wall';
import type { BoardEvent } from '../event';
import type { MeldOperation, MeldTileGroup } from './hand';
import type { Wall } from './wall';

export class Board implements IBoardCommandApplier {
  private readonly deadWall: DeadWall;

  private readonly discardPile: DiscardPile;

  private readonly hands: Hands;

  private readonly wall: Wall;

  public apply(command: BoardCommand): readonly [Board, BoardEvent] {
    return command.execute(this);
  }

  public discard(tile: Tile, actor: SeatPosition): Board {
    if (!this.hands.exists(actor)) throw new InvalidHolderNotFoundError();

    const newHands = this.hands.update(actor, (hand) => hand.discard(tile));
    const newDiscardPile = this.discardPile.add(tile);

    return new Board(this.wall, this.deadWall, newHands, newDiscardPile);
  }

  public draw(actor: SeatPosition): readonly [Tile, Board] {
    if (!this.hands.exists(actor)) throw new InvalidHolderNotFoundError();

    const [takenTile, newWall] = this.wall.takeTile();

    const newHands = this.hands.update(actor, (hand) => hand.add(takenTile));

    return [
      takenTile,
      new Board(newWall, this.deadWall, newHands, this.discardPile),
    ];
  }

  public drawFromDeadWall(actor: SeatPosition): readonly [Tile, Board] {
    if (!this.hands.exists(actor)) throw new InvalidHolderNotFoundError();

    const [takenTile, tempDeadWall] = this.deadWall.take();
    const [suppliedTile, newWall] = this.wall.takeLastTile();
    const newDeadWall = tempDeadWall.supply(suppliedTile);

    const newHands = this.hands.update(actor, (hand) => hand.add(takenTile));

    return [
      takenTile,
      new Board(newWall, newDeadWall, newHands, this.discardPile),
    ];
  }

  public extend(
    actor: SeatPosition,
    base: MeldTileGroup,
    operation: MeldOperation,
  ): Board {
    if (!this.hands.exists(actor)) throw new InvalidHolderNotFoundError();

    const newHands = this.hands.update(actor, (hand) =>
      hand.extend(base, operation),
    );

    return new Board(this.wall, this.deadWall, newHands, this.discardPile);
  }

  public meld(actor: SeatPosition, operation: MeldOperation): Board {
    if (!this.hands.exists(actor)) throw new InvalidHolderNotFoundError();

    const { claimed } = operation;

    if (claimed === undefined) {
      const newHands = this.hands.update(actor, (hand) => hand.meld(operation));

      return new Board(this.wall, this.deadWall, newHands, this.discardPile);
    }

    const [latestTile, newDiscardPile] = this.discardPile.take();

    if (!claimed.equals(latestTile))
      throw new InvalidMismatchClaimedTileError();

    const newHands = this.hands.update(actor, (hand) => hand.meld(operation));

    return new Board(this.wall, this.deadWall, newHands, newDiscardPile);
  }

  public constructor(
    wall: Wall,
    deadWall: DeadWall,
    hands: Hands,
    discardedPile: DiscardPile,
  ) {
    this.wall = wall;
    this.deadWall = deadWall;
    this.hands = hands;
    this.discardPile = discardedPile;
  }
}

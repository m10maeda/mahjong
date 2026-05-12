import { InvalidHolderNotFoundError } from './invalid-holder-not-found-error';
import { InvalidMeldNotFoundError } from './invalid-meld-not-found-error';
import { InvalidMismatchClaimedTileError } from './invalid-mismatch-claimed-tile-error';
import { ClosedMeld, ExtendedMeld, OpenMeld } from './meld';

import type { DeadWall } from './dead-wall';
import type { DiscardPile } from './discard-pile';
import type { Hands } from './hands';
import type { Melds } from './melds';
import type { Wall } from './wall';
import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';
import type { MeldReference } from '../events/melded';

export class Board {
  private readonly deadWall: DeadWall;

  private readonly discardPile: DiscardPile;

  private readonly hands: Hands;

  private readonly melds: Melds;

  private readonly wall: Wall;

  public discard(tile: Tile, actor: SeatPosition): Board {
    if (!this.hands.exists(actor)) throw new InvalidHolderNotFoundError();

    const newHands = this.hands.update(actor, (hand) => hand.discard(tile));
    const newDiscardPile = this.discardPile.add(tile);

    return new Board(
      this.wall,
      this.deadWall,
      newHands,
      newDiscardPile,
      this.melds,
    );
  }

  public draw(actor: SeatPosition): readonly [Tile, Board] {
    if (!this.hands.exists(actor)) throw new InvalidHolderNotFoundError();

    const [takenTile, newWall] = this.wall.takeTile();

    const newHands = this.hands.update(actor, (hand) => hand.add(takenTile));

    return [
      takenTile,
      new Board(newWall, this.deadWall, newHands, this.discardPile, this.melds),
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
      new Board(newWall, newDeadWall, newHands, this.discardPile, this.melds),
    ];
  }

  public extendMeld(
    actor: SeatPosition,
    reference: MeldReference,
    consumedTiles: readonly Tile[],
  ): Board {
    const baseMeld = this.melds.get(reference);

    if (baseMeld === undefined) throw new InvalidMeldNotFoundError();

    const extendedMeld = new ExtendedMeld(actor, baseMeld, consumedTiles);
    const newMelds = this.melds.replace(baseMeld, extendedMeld);

    const newHands = this.hands.update(actor, (hand) =>
      hand.consume(...consumedTiles),
    );

    return new Board(
      this.wall,
      this.deadWall,
      newHands,
      this.discardPile,
      newMelds,
    );
  }

  public meldFromSelf(
    actor: SeatPosition,
    consumedTile: readonly Tile[],
  ): Board {
    const newHands = this.hands.update(actor, (hand) =>
      hand.consume(...consumedTile),
    );

    const meld = new ClosedMeld(actor, consumedTile);
    const newMelds = this.melds.add(meld);

    return new Board(
      this.wall,
      this.deadWall,
      newHands,
      this.discardPile,
      newMelds,
    );
  }

  public meldWithClaimed(
    actor: SeatPosition,
    claimedTile: Tile,
    claimedOn: SeatPosition,
    consumedTile: readonly Tile[],
  ): Board {
    const [latestDiscardedTile, newDiscardPile] = this.discardPile.take();

    if (!claimedTile.equals(latestDiscardedTile))
      throw new InvalidMismatchClaimedTileError();

    const newHands = this.hands.update(actor, (hand) =>
      hand.consume(...consumedTile),
    );
    const meld = new OpenMeld(actor, consumedTile, claimedTile, claimedOn);
    const newMelds = this.melds.add(meld);

    return new Board(
      this.wall,
      this.deadWall,
      newHands,
      newDiscardPile,
      newMelds,
    );
  }

  public constructor(
    wall: Wall,
    deadWall: DeadWall,
    hands: Hands,
    discardedPile: DiscardPile,
    melds: Melds,
  ) {
    this.wall = wall;
    this.deadWall = deadWall;
    this.hands = hands;
    this.discardPile = discardedPile;
    this.melds = melds;
  }
}

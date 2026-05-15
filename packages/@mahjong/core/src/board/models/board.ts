import { DeadWall } from './dead-wall';
import { DiscardPile } from './discard-pile';
import { Hand } from './hand';
import { Hands } from './hands';
import { InvalidHolderNotFoundError } from './invalid-holder-not-found-error';
import { InvalidMeldNotFoundError } from './invalid-meld-not-found-error';
import { InvalidMismatchClaimedTileError } from './invalid-mismatch-claimed-tile-error';
import { ClosedMeld, ExtendedMeld, OpenMeld } from './meld';
import { Melds } from './melds';
import { Wall } from './wall';
import { MeldReference } from '../concepts';
import {
  MeldExtended,
  MeldedWithClaimed,
  MeldedFromSelf,
  TileDiscarded,
  TileDrawn,
  TileDrawnSource,
  TilesDistributed,
} from '../events';

import type { SeatPosition, Tile } from '../../concepts';

export class Board {
  private readonly deadWall: DeadWall;

  private readonly discardPile: DiscardPile;

  private readonly hands: Hands;

  private readonly melds: Melds;

  private readonly wall: Wall;

  public discard(
    tile: Tile,
    seat: SeatPosition,
    fromDrawnTile: boolean,
  ): readonly [TileDiscarded, Board] {
    if (!this.hands.exists(seat)) throw new InvalidHolderNotFoundError();

    const newHands = this.hands.update(seat, (hand) => hand.discard(tile));
    const newDiscardPile = this.discardPile.add(tile);

    const event = new TileDiscarded(tile, seat, fromDrawnTile);

    return [
      event,
      new Board(this.wall, this.deadWall, newHands, newDiscardPile, this.melds),
    ];
  }

  public draw(seat: SeatPosition): readonly [TileDrawn, Board] {
    if (!this.hands.exists(seat)) throw new InvalidHolderNotFoundError();

    const [takenTile, newWall] = this.wall.takeTile();

    const newHands = this.hands.update(seat, (hand) => hand.add(takenTile));

    const event = new TileDrawn(takenTile, seat, TileDrawnSource.Wall);

    return [
      event,
      new Board(newWall, this.deadWall, newHands, this.discardPile, this.melds),
    ];
  }

  public drawFromDeadWall(seat: SeatPosition): readonly [TileDrawn, Board] {
    if (!this.hands.exists(seat)) throw new InvalidHolderNotFoundError();

    const [takenTile, tempDeadWall] = this.deadWall.take();
    const [suppliedTile, newWall] = this.wall.takeLastTile();
    const newDeadWall = tempDeadWall.supply(suppliedTile);

    const newHands = this.hands.update(seat, (hand) => hand.add(takenTile));

    const event = new TileDrawn(takenTile, seat, TileDrawnSource.DeadWall);

    return [
      event,
      new Board(newWall, newDeadWall, newHands, this.discardPile, this.melds),
    ];
  }

  public extendMeld(
    seat: SeatPosition,
    reference: MeldReference,
    consumedTiles: readonly Tile[],
  ): readonly [MeldExtended, Board] {
    const baseMeld = this.melds.get(reference);

    if (baseMeld === undefined) throw new InvalidMeldNotFoundError();

    const extendedMeld = new ExtendedMeld(seat, baseMeld, consumedTiles);
    const newMelds = this.melds.replace(baseMeld, extendedMeld);

    const newHands = this.hands.update(seat, (hand) =>
      hand.consume(...consumedTiles),
    );

    return [
      new MeldExtended(reference, seat, consumedTiles),
      new Board(this.wall, this.deadWall, newHands, this.discardPile, newMelds),
    ];
  }

  public meldFromSelf(
    seat: SeatPosition,
    consumedTile: readonly Tile[],
  ): readonly [MeldedFromSelf, Board] {
    const newHands = this.hands.update(seat, (hand) =>
      hand.consume(...consumedTile),
    );

    const meld = new ClosedMeld(seat, consumedTile);
    const [reference, newMelds] = this.melds.add(meld);

    const event = new MeldedFromSelf(reference, seat, consumedTile);

    return [
      event,
      new Board(this.wall, this.deadWall, newHands, this.discardPile, newMelds),
    ];
  }

  public meldWithClaimed(
    seat: SeatPosition,
    claimedTile: Tile,
    claimedOn: SeatPosition,
    consumedTile: readonly Tile[],
  ): readonly [MeldedWithClaimed, Board] {
    const [latestDiscardedTile, newDiscardPile] = this.discardPile.take();

    if (!claimedTile.equals(latestDiscardedTile))
      throw new InvalidMismatchClaimedTileError();

    const newHands = this.hands.update(seat, (hand) =>
      hand.consume(...consumedTile),
    );

    const meld = new OpenMeld(seat, consumedTile, claimedTile, claimedOn);
    const [reference, newMelds] = this.melds.add(meld);

    const event = new MeldedWithClaimed(
      reference,
      seat,
      consumedTile,
      claimedOn,
      claimedTile,
    );

    return [
      event,
      new Board(this.wall, this.deadWall, newHands, newDiscardPile, newMelds),
    ];
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

  public static new(
    wall: readonly Tile[],
    deadWall: readonly Tile[],
    hands: readonly [SeatPosition, readonly Tile[]][],
  ): readonly [TilesDistributed, Board] {
    const event = new TilesDistributed(wall, deadWall, new Map(hands));
    const board = new Board(
      new Wall(...wall),
      new DeadWall(...deadWall),
      new Hands(
        ...hands.map<[SeatPosition, Hand]>(([seat, tiles]) => [
          seat,
          new Hand(...tiles),
        ]),
      ),
      DiscardPile.new(),
      Melds.new(),
    );

    return [event, board];
  }
}

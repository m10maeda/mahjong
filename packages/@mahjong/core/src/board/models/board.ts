import { DiscardRecord, type DiscardHistory } from './discard-history';
import { Hands } from './hands';
import { Tile, type SeatPosition } from '../../concepts';
import { type IBoard, type MeldReference } from '../../round-session';

import type { Hand } from './hand';
import type { Wall } from './wall';

export class Board implements IBoard {
  private readonly discardHistory: DiscardHistory;

  private readonly hands: Hands;

  private readonly wall: Wall;

  public get blindDoraIndicators(): readonly Tile[] {
    return this.wall.blindDoraIndicators;
  }

  public get doraIndicators(): readonly Tile[] {
    return this.wall.doraIndicators;
  }

  public get lastDiscardTile(): Tile | undefined {
    return this.discardHistory.latest?.tile;
  }

  public addDoraIndicator(): Board {
    return new Board(this.wall.addDora(), this.hands, this.discardHistory);
  }

  public canDrawAgainNextAround(): boolean {
    return this.wall.reamingTileCount > this.hands.size;
  }

  public declareRiichi(seat: SeatPosition, isFirstAround: boolean): Board {
    const hand = this.hands.get(seat);
    const nextHand = hand.declareRiichi(isFirstAround);
    const nextHands = this.hands.replace(nextHand);

    return new Board(this.wall, nextHands, this.discardHistory);
  }

  public discardDrawnTile(seat: SeatPosition): readonly [Tile, Board] {
    const hand = this.hands.get(seat);

    const [discardedTile, nextHand] = hand.discardDrawnTile();

    const nextHands = this.hands.replace(nextHand);

    const nextDiscardHistory = this.discardHistory.append(
      new DiscardRecord(discardedTile, seat),
    );

    return [discardedTile, new Board(this.wall, nextHands, nextDiscardHistory)];
  }

  public discardFromConcealed(tile: Tile, seat: SeatPosition): Board {
    const hand = this.hands.get(seat);

    const nextHand = hand.discardFromConcealed(tile);

    const nextHands = this.hands.replace(nextHand);

    const nextDiscardHistory = this.discardHistory.append(
      new DiscardRecord(tile, seat),
    );

    return new Board(this.wall, nextHands, nextDiscardHistory);
  }

  public drawFromDeadWall(seat: SeatPosition): readonly [Tile, Board] {
    const hand = this.hands.get(seat);

    const [takenTile, nextWall] = this.wall.takeFromDeadWall();
    const nextHand = hand.draw(takenTile);

    const nextHands = this.hands.replace(nextHand);

    return [takenTile, new Board(nextWall, nextHands, this.discardHistory)];
  }

  public drawFromLiveWall(seat: SeatPosition): readonly [Tile, Board] {
    const hand = this.hands.get(seat);

    const [takenTile, nextWall] = this.wall.takeFromLiveWall();
    const nextHand = hand.draw(takenTile);

    const nextHands = this.hands.replace(nextHand);

    return [takenTile, new Board(nextWall, nextHands, this.discardHistory)];
  }

  public establishPendingRiichi(): readonly [SeatPosition | undefined, Board] {
    const hand = this.hands.find((hand) => hand.isPendingRiichi());

    if (hand === undefined) return [undefined, this];

    const nextHand = hand.establishRiichi();
    const nextHands = this.hands.replace(nextHand);

    return [
      nextHand.seat,
      new Board(this.wall, nextHands, this.discardHistory),
    ];
  }

  public getAllDiscardedTilesOf(seat: SeatPosition): readonly Tile[] {
    return this.discardHistory.allDiscardedTiles(seat);
  }

  public getAllHands(): readonly Hand[] {
    return [...this.hands];
  }

  public getHandOf(seat: SeatPosition): Hand {
    return this.hands.get(seat);
  }

  public hasLiveWallTile(): boolean {
    throw new Error('Method not implemented.');
  }

  public hasPendingDoraIndicatorAddition(): boolean {
    throw new Error('Method not implemented.');
  }

  public hasTakableDeadWallTile(): boolean {
    throw new Error('Method not implemented.');
  }

  public isRiichiOf(seat: SeatPosition): boolean {
    const hand = this.hands.get(seat);

    return hand.isRiichi();
  }

  public meldAddedQuadruplet(
    reference: MeldReference,
    addTile: Tile,
    seat: SeatPosition,
  ): Board {
    const hand = this.hands.get(seat);

    const nextHand = hand.meldAddedQuadruplet(reference, addTile);
    const nextHands = this.hands.replace(nextHand);

    return new Board(this.wall, nextHands, this.discardHistory);
  }

  public meldClosedQuadruplet(
    consumedTiles: readonly [Tile, Tile, Tile, Tile],
    seat: SeatPosition,
  ): readonly [MeldReference, Board] {
    const hand = this.hands.get(seat);

    const [reference, nextHand] = hand.meldClosedQuadruplet(consumedTiles);
    const nextHands = this.hands.replace(nextHand);

    return [reference, new Board(this.wall, nextHands, this.discardHistory)];
  }

  public meldOpenQuadruplet(
    claimedTile: Tile,
    claimedOn: SeatPosition,
    consumedTiles: readonly [Tile, Tile, Tile],
    seat: SeatPosition,
  ): readonly [MeldReference, Board] {
    if (seat.equals(claimedOn)) throw new TypeError();

    const hand = this.hands.get(seat);

    const [reference, nextHand] = hand.meldOpenQuadruplet(
      claimedTile,
      consumedTiles,
    );
    const nextHands = this.hands.replace(nextHand);

    return [reference, new Board(this.wall, nextHands, this.discardHistory)];
  }

  public meldOpenSequence(
    claimedTile: Tile,
    claimedOn: SeatPosition,
    consumedTiles: readonly [Tile, Tile],
    seat: SeatPosition,
  ): readonly [MeldReference, Board] {
    if (seat.equals(claimedOn)) throw new TypeError();

    const hand = this.hands.get(seat);

    const [reference, nextHand] = hand.meldOpenSequence(
      claimedTile,
      consumedTiles,
    );
    const nextHands = this.hands.replace(nextHand);

    return [reference, new Board(this.wall, nextHands, this.discardHistory)];
  }

  public meldOpenTriplet(
    claimedTile: Tile,
    claimedOn: SeatPosition,
    consumedTiles: readonly [Tile, Tile],
    seat: SeatPosition,
  ): readonly [MeldReference, Board] {
    if (seat.equals(claimedOn)) throw new TypeError();

    const hand = this.hands.get(seat);

    const [reference, nextHand] = hand.meldOpenTriplet(
      claimedTile,
      consumedTiles,
    );
    const nextHands = this.hands.replace(nextHand);

    return [reference, new Board(this.wall, nextHands, this.discardHistory)];
  }

  public constructor(wall: Wall, hands: Hands, discardHistory: DiscardHistory) {
    this.wall = wall;
    this.hands = hands;
    this.discardHistory = discardHistory;
  }
}

import { Melds } from './melds';
import { RawHand } from './raw-hand';

import type { IConcealedHand } from './concealed-hand';
import type { IHand, Meld, MeldReference } from '../../round-session';
import type { SeatPosition } from '../../table';
import type { Tile } from '../../tile';
import type { Pair, SerialPair } from '../../winning-hand-shape';

export class Hand implements IHand {
  public readonly seat: SeatPosition;

  private readonly raw: RawHand;

  public get concealed(): readonly Tile[] {
    return [...this.raw.concealed];
  }

  public get drawnTile(): Tile | undefined {
    return this.raw.drawnTile;
  }

  public get melds(): readonly Meld[] {
    return this.raw.melds;
  }

  public discardDrawnTile(): readonly [Tile, Hand] {
    const [discardTile, nextRawHand] = this.raw.discardDrawnTile();

    return [discardTile, new Hand(this.seat, nextRawHand)];
  }

  public discardFromConcealed(tile: Tile): Hand {
    const nextRawHand = this.raw.discardFromConcealed(tile);

    return new Hand(this.seat, nextRawHand);
  }

  public draw(tile: Tile): Hand {
    const nextRawHand = this.raw.draw(tile);

    return new Hand(this.seat, nextRawHand);
  }

  public equals(other: Hand): boolean {
    return this.seat.equals(other.seat);
  }

  public findAllPairCandidatesWith(tile: Tile): readonly Pair[] {
    return this.raw.findAllPairCandidatesWith(tile);
  }

  public findAllSerialPairCandidatesWith(tile: Tile): readonly SerialPair[] {
    return this.raw.findAllSerialPairCandidatesWith(tile);
  }

  public meldAddedQuadruplet(reference: MeldReference, addTile: Tile): Hand {
    const nextRawHand = this.raw.meldAddedQuadruplet(reference, addTile);

    return new Hand(this.seat, nextRawHand);
  }

  public meldClosedQuadruplet(
    consumeTiles: readonly [Tile, Tile, Tile, Tile],
  ): readonly [MeldReference, Hand] {
    const [reference, nextRawHand] =
      this.raw.meldClosedQuadruplet(consumeTiles);

    return [reference, new Hand(this.seat, nextRawHand)];
  }

  public meldOpenQuadruplet(
    claimTile: Tile,
    consumeTiles: readonly [Tile, Tile, Tile],
  ): readonly [MeldReference, Hand] {
    const [reference, nextRawHand] = this.raw.meldOpenQuadruplet(
      claimTile,
      consumeTiles,
    );

    return [reference, new Hand(this.seat, nextRawHand)];
  }

  public meldOpenSequence(
    claimTile: Tile,
    consumeTiles: readonly [Tile, Tile],
  ): readonly [MeldReference, Hand] {
    const [reference, nextRawHand] = this.raw.meldOpenSequence(
      claimTile,
      consumeTiles,
    );

    return [reference, new Hand(this.seat, nextRawHand)];
  }

  public meldOpenTriplet(
    claimTile: Tile,
    consumeTiles: readonly [Tile, Tile],
  ): readonly [MeldReference, Hand] {
    const [reference, nextRawHand] = this.raw.meldOpenTriplet(
      claimTile,
      consumeTiles,
    );

    return [reference, new Hand(this.seat, nextRawHand)];
  }

  public owns(seat: SeatPosition): boolean {
    return this.seat.equals(seat);
  }

  public constructor(seat: SeatPosition, raw: RawHand) {
    this.seat = seat;
    this.raw = raw;
  }

  public static new(seat: SeatPosition, concealed: IConcealedHand): Hand {
    const melds = new Melds();

    return new Hand(seat, new RawHand(concealed, melds));
  }
}

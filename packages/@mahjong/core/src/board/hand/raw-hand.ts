import {
  ClosedQuadrupletMeld,
  OpenQuadrupletMeld,
  SequenceMeld,
  TripletMeld,
} from '../../round-session';
import { InvalidMeldNotFoundError } from '../invalid-meld-not-found-error';

import type { IConcealedHand } from './concealed-hand';
import type { Melds } from './melds';
import type { Meld, MeldReference } from '../../round-session';
import type { Tile } from '../../tile';
import type { Pair, SerialPair } from '../../winning-hand-shape';

export class RawHand {
  public readonly concealed: IConcealedHand;

  private readonly _melds: Melds;

  public get drawnTile(): Tile | undefined {
    return this.concealed.drawnTile;
  }

  public get melds(): readonly Meld[] {
    return [...this._melds];
  }

  public discardDrawnTile(): readonly [Tile, RawHand] {
    const [discardTile, nextConcealed] = this.concealed.discardDrawnTile();

    return [discardTile, new RawHand(nextConcealed, this._melds)];
  }

  public discardFromConcealed(tile: Tile): RawHand {
    return new RawHand(this.concealed.discard(tile), this._melds);
  }

  public draw(tile: Tile): RawHand {
    return new RawHand(this.concealed.draw(tile), this._melds);
  }

  public findAllPairCandidatesWith(tile: Tile): readonly Pair[] {
    return this.concealed.findAllPairCandidatesWith(tile);
  }

  public findAllSerialPairCandidatesWith(tile: Tile): readonly SerialPair[] {
    return this.concealed.findAllSerialPairCandidatesWith(tile);
  }

  public meldAddedQuadruplet(reference: MeldReference, addTile: Tile): RawHand {
    const meld = this._melds.get(reference);

    if (meld === undefined) throw new InvalidMeldNotFoundError();
    if (!TripletMeld.isTripletMeld(meld)) throw new TypeError();

    const extendedMeld = TripletMeld.extend(meld, addTile);

    const nextMelds = this._melds.replace(reference, extendedMeld);

    return new RawHand(this.concealed.consume(addTile), nextMelds);
  }

  public meldClosedQuadruplet(
    consumeTiles: readonly [Tile, Tile, Tile, Tile],
  ): readonly [MeldReference, RawHand] {
    const meld = new ClosedQuadrupletMeld(consumeTiles);
    const [reference, nextMelds] = this._melds.add(meld);

    return [
      reference,
      new RawHand(this.concealed.consume(...consumeTiles), nextMelds),
    ];
  }

  public meldOpenQuadruplet(
    claimTile: Tile,
    consumeTiles: readonly [Tile, Tile, Tile],
  ): readonly [MeldReference, RawHand] {
    const meld = new OpenQuadrupletMeld(consumeTiles, claimTile);
    const [reference, nextMelds] = this._melds.add(meld);

    return [
      reference,
      new RawHand(this.concealed.consume(...consumeTiles), nextMelds),
    ];
  }

  public meldOpenSequence(
    claimTile: Tile,
    consumeTiles: readonly [Tile, Tile],
  ): readonly [MeldReference, RawHand] {
    const meld = new SequenceMeld(consumeTiles, claimTile);
    const [reference, nextMelds] = this._melds.add(meld);

    return [
      reference,
      new RawHand(this.concealed.consume(...consumeTiles), nextMelds),
    ];
  }

  public meldOpenTriplet(
    claimTile: Tile,
    consumeTiles: readonly [Tile, Tile],
  ): readonly [MeldReference, RawHand] {
    const meld = new TripletMeld(consumeTiles, claimTile);
    const [reference, nextMelds] = this._melds.add(meld);

    return [
      reference,
      new RawHand(this.concealed.consume(...consumeTiles), nextMelds),
    ];
  }

  public constructor(concealed: IConcealedHand, melds: Melds) {
    this.concealed = concealed;
    this._melds = melds;
  }
}

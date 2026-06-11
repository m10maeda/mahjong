import { type ConcealedHand } from './concealed-hand';
import {
  ClosedQuadrupletMeld,
  OpenQuadrupletMeld,
  SequenceMeld,
  TripletMeld,
} from '../../round-session';
import { SerialPair, type Pair } from '../../winning-hand-shape';
import { InvalidMeldNotFoundError } from '../invalid-meld-not-found-error';

import type { Melds } from './melds';
import type { Meld, MeldReference } from '../../round-session';
import type { Tile } from '../../tile';

export class RawHand {
  public readonly concealed: ConcealedHand;

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

  public meldAddedQuadruplet(reference: MeldReference, addTile: Tile): RawHand {
    const meld = this._melds.get(reference);

    if (meld === undefined) throw new InvalidMeldNotFoundError();
    if (!TripletMeld.isTripletMeld(meld)) throw new TypeError();

    const nextConcealed = this.concealed.removeAll(addTile);

    const extendedMeld = TripletMeld.extend(meld, addTile);
    const nextMelds = this._melds.replace(reference, extendedMeld);

    return new RawHand(nextConcealed, nextMelds);
  }

  public meldClosedQuadruplet(
    consumeTiles: readonly [Tile, Tile, Tile, Tile],
  ): readonly [MeldReference, RawHand] {
    const nextConcealed = this.concealed.removeAll(...consumeTiles);

    const meld = new ClosedQuadrupletMeld(consumeTiles);
    const [reference, nextMelds] = this._melds.add(meld);

    return [reference, new RawHand(nextConcealed, nextMelds)];
  }

  public meldOpenQuadruplet(
    claimTile: Tile,
    consumeTiles: readonly [Tile, Tile, Tile],
  ): readonly [MeldReference, RawHand] {
    const nextConcealed = this.concealed.removeAll(...consumeTiles);

    const meld = new OpenQuadrupletMeld(consumeTiles, claimTile);
    const [reference, nextMelds] = this._melds.add(meld);

    return [reference, new RawHand(nextConcealed, nextMelds)];
  }

  public meldOpenSequence(
    claimTile: Tile,
    serialPair: SerialPair,
  ): readonly [MeldReference, RawHand] {
    const nextConcealed = this.concealed.removeAll(...serialPair);

    const meld = new SequenceMeld(serialPair, claimTile);
    const [reference, nextMelds] = this._melds.add(meld);

    return [reference, new RawHand(nextConcealed, nextMelds)];
  }

  public meldOpenTriplet(
    claimTile: Tile,
    pair: Pair,
  ): readonly [MeldReference, RawHand] {
    const nextConcealed = this.concealed.removeAll(...pair);

    const meld = new TripletMeld(pair, claimTile);
    const [reference, nextMelds] = this._melds.add(meld);

    return [reference, new RawHand(nextConcealed, nextMelds)];
  }

  public constructor(concealed: ConcealedHand, melds: Melds) {
    this.concealed = concealed;
    this._melds = melds;
  }
}

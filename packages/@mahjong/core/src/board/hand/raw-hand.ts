import { ConcealedHand } from './concealed-hand';
import {
  ClosedQuadrupletMeld,
  OpenQuadrupletMeld,
  SequenceMeld,
  TripletMeld,
} from '../../round-session';
import { SerialPair, type Pair } from '../../winning-hand-shape';
import { InvalidMeldNotFoundError } from '../invalid-meld-not-found-error';
import { InvalidNoTilesError } from '../invalid-no-tiles-error';

import type { Melds } from './melds';
import type { Meld, MeldReference } from '../../round-session';
import type { Tile } from '../../tile';

export class RawHand {
  public readonly drawnTile?: Tile;

  private readonly _concealed: ConcealedHand;

  private readonly _melds: Melds;

  public get concealed(): readonly Tile[] {
    return [...this._concealed];
  }

  public get melds(): readonly Meld[] {
    return [...this._melds];
  }

  public discardDrawnTile(): readonly [Tile, RawHand] {
    if (this.drawnTile === undefined) throw new InvalidNoTilesError();

    return [this.drawnTile, new RawHand(this._concealed, this._melds)];
  }

  public discardFromConcealed(tile: Tile): RawHand {
    const nextConcealed =
      this.drawnTile === undefined
        ? this._concealed.remove(tile)
        : this._concealed.remove(tile).add(this.drawnTile);

    return new RawHand(nextConcealed, this._melds);
  }

  public draw(tile: Tile): RawHand {
    return new RawHand(this._concealed, this._melds, tile);
  }

  public meldAddedQuadruplet(reference: MeldReference, addTile: Tile): RawHand {
    const meld = this._melds.get(reference);

    if (meld === undefined) throw new InvalidMeldNotFoundError();
    if (!TripletMeld.isTripletMeld(meld)) throw new TypeError();

    const nextConcealed =
      this.drawnTile === undefined
        ? this._concealed.remove(addTile)
        : this._concealed.add(this.drawnTile).remove(addTile);

    const extendedMeld = TripletMeld.extend(meld, addTile);
    const nextMelds = this._melds.replace(reference, extendedMeld);

    return new RawHand(nextConcealed, nextMelds);
  }

  public meldClosedQuadruplet(
    consumeTiles: readonly [Tile, Tile, Tile, Tile],
  ): readonly [MeldReference, RawHand] {
    const nextConcealed =
      this.drawnTile === undefined
        ? this._concealed.removeAll(...consumeTiles)
        : this._concealed.add(this.drawnTile).removeAll(...consumeTiles);

    const meld = new ClosedQuadrupletMeld(consumeTiles);
    const [reference, nextMelds] = this._melds.add(meld);

    return [reference, new RawHand(nextConcealed, nextMelds)];
  }

  public meldOpenQuadruplet(
    claimTile: Tile,
    consumeTiles: readonly [Tile, Tile, Tile],
  ): readonly [MeldReference, RawHand] {
    const nextConcealed =
      this.drawnTile === undefined
        ? this._concealed.removeAll(...consumeTiles)
        : this._concealed.add(this.drawnTile).removeAll(...consumeTiles);

    const meld = new OpenQuadrupletMeld(consumeTiles, claimTile);
    const [reference, nextMelds] = this._melds.add(meld);

    return [reference, new RawHand(nextConcealed, nextMelds)];
  }

  public meldOpenSequence(
    claimTile: Tile,
    serialPair: SerialPair,
  ): readonly [MeldReference, RawHand] {
    const nextConcealed =
      this.drawnTile === undefined
        ? this._concealed.removeAll(...serialPair)
        : this._concealed.add(this.drawnTile).removeAll(...serialPair);

    const meld = new SequenceMeld(serialPair, claimTile);
    const [reference, nextMelds] = this._melds.add(meld);

    return [reference, new RawHand(nextConcealed, nextMelds)];
  }

  public meldOpenTriplet(
    claimTile: Tile,
    pair: Pair,
  ): readonly [MeldReference, RawHand] {
    const nextConcealed =
      this.drawnTile === undefined
        ? this._concealed.removeAll(...pair)
        : this._concealed.add(this.drawnTile).removeAll(...pair);

    const meld = new TripletMeld(pair, claimTile);
    const [reference, nextMelds] = this._melds.add(meld);

    return [reference, new RawHand(nextConcealed, nextMelds)];
  }

  public constructor(concealed: ConcealedHand, melds: Melds, drawnTile?: Tile) {
    this._concealed = concealed;
    this._melds = melds;
    this.drawnTile = drawnTile;
  }
}

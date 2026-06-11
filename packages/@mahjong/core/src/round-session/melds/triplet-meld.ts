import { AddedQuadrupletMeld } from './added-quadruplet-meld';
import { ClaimedMeld } from './claimed-meld';
import { Meld, MeldType } from './meld';
import { Triplet, type Pair } from '../../winning-hand-shape';

import type { Tile, TileType } from '../../tile';

export class TripletMeld extends ClaimedMeld {
  private readonly claimedTile: Tile;

  private readonly pair: Pair;

  public get prohibitedDiscardTiles(): readonly TileType[] {
    return [this.tiles[0].type];
  }

  protected get tiles(): readonly [Tile, Tile, Tile] {
    return [...this.pair.tiles, this.claimedTile];
  }

  public toCompleteTileGroup(): Triplet {
    return Triplet.openOf(...this.tiles);
  }

  public constructor(pair: Pair, claimedTile: Tile) {
    super(MeldType.Triplet);

    this.pair = pair;
    this.claimedTile = claimedTile;
  }

  public static extend(
    meld: TripletMeld,
    addedTile: Tile,
  ): AddedQuadrupletMeld {
    return new AddedQuadrupletMeld(
      meld.pair.tiles,
      meld.claimedTile,
      addedTile,
    );
  }

  public static isTripletMeld(meld: Meld): meld is TripletMeld {
    return meld instanceof TripletMeld;
  }
}

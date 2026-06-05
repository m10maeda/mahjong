import { AddedQuadrupletMeld } from './added-quadruplet-meld';
import { ClaimedMeld } from './claimed-meld';
import { Meld, MeldType } from './meld';

import type { Tile } from '../../concepts';

export class TripletMeld extends ClaimedMeld {
  private readonly claimedTile: Tile;

  private readonly consumedTile: readonly [Tile, Tile];

  public get prohibitedDiscardTiles(): readonly Tile[] {
    return this.tiles;
  }

  protected get tiles(): readonly [Tile, Tile, Tile] {
    return [...this.consumedTile, this.claimedTile];
  }

  public constructor(consumedTile: readonly [Tile, Tile], claimedTile: Tile) {
    super(MeldType.Triplet);

    this.consumedTile = consumedTile;
    this.claimedTile = claimedTile;
  }

  public static extend(
    meld: TripletMeld,
    addedTile: Tile,
  ): AddedQuadrupletMeld {
    return new AddedQuadrupletMeld(
      meld.consumedTile,
      meld.claimedTile,
      addedTile,
    );
  }

  public static isTripletMeld(meld: Meld): meld is TripletMeld {
    return meld instanceof TripletMeld;
  }
}

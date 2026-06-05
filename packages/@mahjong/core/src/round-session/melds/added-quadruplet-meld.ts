import { Meld, MeldType } from './meld';

import type { Tile } from '../../tile';

export class AddedQuadrupletMeld extends Meld {
  private readonly addedTile: Tile;

  private readonly claimedTile: Tile;

  private readonly consumedTile: readonly [Tile, Tile];

  protected get tiles(): readonly Tile[] {
    return [...this.consumedTile, this.claimedTile, this.addedTile];
  }

  public constructor(
    consumedTile: readonly [Tile, Tile],
    claimedTile: Tile,
    addedTile: Tile,
  ) {
    super(MeldType.AddedQuadruplet);

    this.consumedTile = consumedTile;
    this.claimedTile = claimedTile;
    this.addedTile = addedTile;
  }
}

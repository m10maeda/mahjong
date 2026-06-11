import { ClaimedMeld } from './claimed-meld';
import { MeldType } from './meld';

import type { Tile, TileType } from '../../tile';

export class OpenQuadrupletMeld extends ClaimedMeld {
  private readonly claimedTile: Tile;

  private readonly consumedTiles: readonly [Tile, Tile, Tile];

  public get prohibitedDiscardTiles(): readonly TileType[] {
    return [this.tiles[0].type];
  }

  protected get tiles(): readonly [Tile, Tile, Tile, Tile] {
    return [...this.consumedTiles, this.claimedTile];
  }

  public constructor(
    consumedTiles: readonly [Tile, Tile, Tile],
    claimedTile: Tile,
  ) {
    super(MeldType.OpenQuadruplet);

    this.consumedTiles = consumedTiles;
    this.claimedTile = claimedTile;
  }
}

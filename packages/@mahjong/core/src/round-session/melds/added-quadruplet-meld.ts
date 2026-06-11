import { Meld, MeldType } from './meld';
import { Quadruplet } from '../../winning-hand-shape';

import type { Tile } from '../../tile';

export class AddedQuadrupletMeld extends Meld {
  private readonly addedTile: Tile;

  private readonly claimedTile: Tile;

  private readonly consumedTile: readonly [Tile, Tile];

  protected get tiles(): readonly [Tile, Tile, Tile, Tile] {
    return [...this.consumedTile, this.claimedTile, this.addedTile];
  }

  public toCompleteTileGroup(): Quadruplet {
    return Quadruplet.openOf(...this.tiles);
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

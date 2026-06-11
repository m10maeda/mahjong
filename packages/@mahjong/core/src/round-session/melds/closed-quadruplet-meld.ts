import { Meld, MeldType } from './meld';
import { Quadruplet } from '../../winning-hand-shape';

import type { Tile } from '../../tile';

export class ClosedQuadrupletMeld extends Meld {
  private readonly consumedTile: readonly [Tile, Tile, Tile, Tile];

  protected get tiles(): readonly [Tile, Tile, Tile, Tile] {
    return this.consumedTile;
  }

  public toCompleteTileGroup(): Quadruplet {
    return Quadruplet.closedOf(...this.tiles);
  }

  public constructor(consumedTile: readonly [Tile, Tile, Tile, Tile]) {
    super(MeldType.ClosedQuadruplet);

    this.consumedTile = consumedTile;
  }
}

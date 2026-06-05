import { Meld, MeldType } from './meld';

import type { Tile } from '../../concepts';

export class ClosedQuadrupletMeld extends Meld {
  private readonly consumedTile: readonly [Tile, Tile, Tile, Tile];

  protected get tiles(): readonly [Tile, Tile, Tile, Tile] {
    return this.consumedTile;
  }

  public constructor(consumedTile: readonly [Tile, Tile, Tile, Tile]) {
    super(MeldType.ClosedQuadruplet);

    this.consumedTile = consumedTile;
  }
}

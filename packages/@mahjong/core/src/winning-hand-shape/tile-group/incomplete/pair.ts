import { IncompleteTileGroup } from './incomplete-tile-group';
import { TileType, type Tile } from '../../../concepts';
import { Triplet } from '../complete';

import type { TileGroup } from '../tile-group';

export class Pair extends IncompleteTileGroup {
  public readonly tiles: readonly [Tile, Tile];

  public get composeTile(): TileType {
    return this.tiles[0].type;
  }

  public compose(tile: TileType): boolean {
    return this.composeTile.equals(tile);
  }

  public extend(tile: Tile): Triplet {
    if (!this.compose(tile.type)) throw new TypeError();

    return Triplet.openOf(...this.tiles, tile);
  }

  public isSameTileGroupAs(other: TileGroup): boolean {
    if (!(other instanceof Pair)) return false;

    return this.composeTile.equals(other.composeTile);
  }

  public constructor(...tiles: readonly [Tile, Tile]) {
    if (!tiles[0].hasSameTypeAs(tiles[1])) throw new TypeError();

    super();

    this.tiles = tiles;
  }
}

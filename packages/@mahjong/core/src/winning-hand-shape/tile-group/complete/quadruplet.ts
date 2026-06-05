import {
  CompleteTileGroup,
  TileGroupExposure,
  TileGroupType,
} from './complete-tile-group';

import type { Tile, TileType } from '../../../tile';
import type { TileGroup } from '../tile-group';

export class Quadruplet extends CompleteTileGroup {
  public readonly tiles: readonly [Tile, Tile, Tile, Tile];

  public get composeTile(): TileType {
    return this.tiles[0].type;
  }

  public compose(tile: TileType): boolean {
    return this.composeTile.equals(tile);
  }

  public isSameTileGroupAs(other: TileGroup): boolean {
    if (!(other instanceof Quadruplet)) return false;

    return this.composeTile.equals(other.composeTile);
  }

  public constructor(
    tiles: readonly [Tile, Tile, Tile, Tile],
    exposure: TileGroupExposure,
  ) {
    super(TileGroupType.Quadruplet, exposure);

    this.tiles = tiles;
  }

  public static closedOf(...tiles: readonly [Tile, Tile, Tile, Tile]) {
    return new Quadruplet(tiles, TileGroupExposure.Concealed);
  }

  public static openOf(...tiles: readonly [Tile, Tile, Tile, Tile]) {
    return new Quadruplet(tiles, TileGroupExposure.Open);
  }
}

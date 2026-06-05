import {
  CompleteTileGroup,
  TileGroupExposure,
  TileGroupType,
} from './complete-tile-group';
import { Tile, TileType } from '../../../tile';

import type { TileGroup } from '../tile-group';

export class Triplet extends CompleteTileGroup {
  public readonly tiles: readonly [Tile, Tile, Tile];

  public get composeTile(): TileType {
    return this.tiles[0].type;
  }

  public compose(tile: TileType): boolean {
    return this.composeTile.equals(tile);
  }

  public isSameTileGroupAs(other: TileGroup): boolean {
    if (!(other instanceof Triplet)) return false;

    return this.composeTile.equals(other.composeTile);
  }

  public constructor(
    tiles: readonly [Tile, Tile, Tile],
    exposure: TileGroupExposure,
  ) {
    super(TileGroupType.Triplet, exposure);

    this.tiles = tiles;
  }

  public static closedOf(...tiles: readonly [Tile, Tile, Tile]) {
    return new Triplet(tiles, TileGroupExposure.Concealed);
  }

  public static openOf(...tiles: readonly [Tile, Tile, Tile]) {
    return new Triplet(tiles, TileGroupExposure.Open);
  }
}

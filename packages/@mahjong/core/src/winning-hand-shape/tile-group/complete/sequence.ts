import {
  CompleteTileGroup,
  TileGroupExposure,
  TileGroupType,
} from './complete-tile-group';

import type { Tile } from '../../../tile';
import type { TileGroup } from '../tile-group';

export class Sequence extends CompleteTileGroup {
  public readonly tiles: readonly [Tile, Tile, Tile];

  public isSameTileGroupAs(other: TileGroup): boolean {
    if (!(other instanceof Sequence)) return false;

    return (
      this.tiles[0].hasSameTypeAs(other.tiles[0]) &&
      this.tiles[1].hasSameTypeAs(other.tiles[1]) &&
      this.tiles[2].hasSameTypeAs(other.tiles[2])
    );
  }

  public constructor(
    tiles: readonly [Tile, Tile, Tile],
    exposure: TileGroupExposure,
  ) {
    super(TileGroupType.Sequence, exposure);

    this.tiles = tiles;
  }

  public static closedOf(...tiles: readonly [Tile, Tile, Tile]) {
    return new Sequence(tiles, TileGroupExposure.Concealed);
  }

  public static openOf(...tiles: readonly [Tile, Tile, Tile]) {
    return new Sequence(tiles, TileGroupExposure.Open);
  }
}

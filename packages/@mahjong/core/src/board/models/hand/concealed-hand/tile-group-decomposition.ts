import type { Tile } from '../../../../concepts';
import type { CompleteTileGroup, Pair } from '../../../../winning-hand-shape';

export class TileGroupDecomposition {
  public readonly groups: readonly CompleteTileGroup[];
  public readonly pairs: readonly Pair[];
  public readonly restTiles: readonly Tile[];

  public constructor(
    groups: readonly CompleteTileGroup[],
    pairs: readonly Pair[],
    restTiles: readonly Tile[],
  ) {
    this.groups = groups;
    this.pairs = pairs;
    this.restTiles = restTiles;
  }
}

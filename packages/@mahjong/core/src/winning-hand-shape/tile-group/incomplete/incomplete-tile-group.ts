import { TileGroup } from '../tile-group';

import type { Tile } from '../../../concepts';
import type { CompleteTileGroup } from '../complete';

export abstract class IncompleteTileGroup extends TileGroup {
  protected abstract get tiles(): readonly [Tile, Tile];

  public abstract extend(tile: Tile): CompleteTileGroup;

  public isSameTileGroupAs(other: TileGroup): boolean {
    if (!(other instanceof IncompleteTileGroup)) return false;

    return (
      this.tiles[0].hasSameTypeAs(other.tiles[0]) &&
      this.tiles[1].hasSameTypeAs(other.tiles[1])
    );
  }
}

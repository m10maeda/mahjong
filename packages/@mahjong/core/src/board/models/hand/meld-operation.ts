import type { MeldTileGroup } from './meld-tile-group';
import type { Tile } from '../../../tile';

export class MeldOperation {
  public readonly claimed?: Tile;

  public readonly consumed: readonly [Tile, ...Tile[]];

  public readonly tileGroup: MeldTileGroup;

  public constructor(
    tileGroup: MeldTileGroup,
    consumed: readonly [Tile, ...Tile[]],
    claimed?: Tile,
  ) {
    this.tileGroup = tileGroup;
    this.consumed = consumed;
    this.claimed = claimed;
  }
}

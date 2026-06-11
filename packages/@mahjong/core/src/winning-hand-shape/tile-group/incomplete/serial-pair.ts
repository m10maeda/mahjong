import { Sequence } from '../complete';
import { IncompleteTileGroup } from './incomplete-tile-group';

import type { Tile, TileType } from '../../../tile';

export enum SerialPairType {
  /** 両面 */
  BothSide,
  /** 嵌張 */
  Middle,
  /** 辺張 */
  Edge,
}

export class SerialPair extends IncompleteTileGroup {
  public readonly receivableTiles: readonly TileType[];

  public readonly tiles: readonly [Tile, Tile];

  public readonly type: SerialPairType;

  public get composeTiles(): readonly [TileType, TileType] {
    return [this.tiles[0].type, this.tiles[1].type];
  }

  public composes(...tiles: readonly [TileType, TileType]): boolean {
    return (
      (this.composeTiles[0].equals(tiles[0]) &&
        this.composeTiles[1].equals(tiles[1])) ||
      (this.composeTiles[0].equals(tiles[1]) &&
        this.composeTiles[1].equals(tiles[0]))
    );
  }

  public extend(tile: Tile): Sequence {
    if (!this.receivableTiles.some((_tile) => _tile.equals(tile.type)))
      throw new TypeError();

    return Sequence.openOf(...this.tiles, tile);
  }

  public constructor(
    type: SerialPairType,
    tiles: readonly [Tile, Tile],
    receivableTiles: readonly TileType[],
  ) {
    super();

    this.type = type;
    this.tiles = tiles;
    this.receivableTiles = receivableTiles;
  }
}

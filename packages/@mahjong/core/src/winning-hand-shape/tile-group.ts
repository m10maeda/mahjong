import type { Tile } from '../concepts';

export enum TileGroupType {
  Sequence,
  Triplet,
  Quadruplet,
}

export enum TileGroupExposure {
  Concealed,
  Open,
}

export class TileGroup implements Iterable<Tile> {
  public readonly exposure: TileGroupExposure;

  public readonly type: TileGroupType;

  private readonly tiles:
    | readonly [Tile, Tile, Tile]
    | readonly [Tile, Tile, Tile, Tile];

  public isOpen(): boolean {
    return this.exposure === TileGroupExposure.Open;
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public constructor(
    tiles: readonly [Tile, Tile, Tile] | readonly [Tile, Tile, Tile, Tile],
    type: TileGroupType,
    exposure: TileGroupExposure,
  ) {
    this.tiles = tiles;
    this.type = type;
    this.exposure = exposure;
  }
}

import { InvalidNoTilesError } from '../invalid-no-tiles-error';

import type { Tile } from '../../concepts';

export class DeadWall implements Iterable<Tile> {
  private static readonly DORA_START_POSITION = 4;

  private readonly doraCount: number;

  private readonly enableTileCount: number;

  private readonly tiles: readonly Tile[];

  public get blindDoraIndicators(): readonly Tile[] {
    const indicators: Tile[] = [];

    for (let index = 0; index < this.doraCount; index++) {
      const position = DeadWall.DORA_START_POSITION + 1 + index * 2;
      const indicator = this.tiles[position];

      if (indicator) {
        indicators.push(indicator);
      }
    }

    return indicators;
  }

  public get doraIndicators(): readonly Tile[] {
    const indicators: Tile[] = [];

    for (let index = 0; index < this.doraCount; index++) {
      const position = DeadWall.DORA_START_POSITION + index * 2;
      const indicator = this.tiles[position];

      if (indicator) {
        indicators.push(indicator);
      }
    }

    return indicators;
  }

  public addDora(): DeadWall {
    return new DeadWall(this.tiles, this.enableTileCount, this.doraCount + 1);
  }

  public drawRinshanTile(supplyTile: Tile): readonly [Tile, DeadWall] {
    const rinshanTile = this.getRinshanTile();

    if (rinshanTile === undefined) throw new InvalidNoTilesError();

    return [
      rinshanTile,
      new DeadWall(
        [supplyTile, ...this.tiles.slice(0, -1)],
        this.enableTileCount - 1,
        this.doraCount,
      ),
    ];
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  private getRinshanTile(): Tile | undefined {
    if (this.enableTileCount > 0) return this.tiles[this.tiles.length - 1];

    return undefined;
  }

  private constructor(
    tiles: readonly Tile[],
    enableTileCount: number,
    doraCount: number,
  ) {
    this.tiles = tiles;
    this.enableTileCount = enableTileCount;
    this.doraCount = doraCount;
  }

  public static new(...tiles: readonly Tile[]): DeadWall {
    return new DeadWall(tiles, 4, 1);
  }
}

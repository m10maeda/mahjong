import { InvalidNoTilesError } from '../invalid-no-tiles-error';

import type { Tile } from '../../concepts';

export class LiveWall implements Iterable<Tile> {
  private readonly tiles: readonly Tile[];

  public get reamingTileCount(): number {
    return this.tiles.length;
  }

  public isEmpty(): boolean {
    return this.tiles.length === 0;
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public takeLastTile(): readonly [Tile, LiveWall] {
    if (this.isEmpty()) throw new InvalidNoTilesError();

    const takenTile = this.tiles[this.tiles.length - 1];

    if (takenTile === undefined) throw new InvalidNoTilesError();

    return [takenTile, new LiveWall(...this.tiles.slice(0, -1))];
  }

  public takeTile(): readonly [Tile, LiveWall] {
    if (this.isEmpty()) throw new InvalidNoTilesError();

    const takenTile = this.tiles[0];

    if (takenTile === undefined) throw new InvalidNoTilesError();

    return [takenTile, new LiveWall(...this.tiles.slice(1))];
  }

  public constructor(...tiles: readonly Tile[]) {
    this.tiles = tiles;
  }
}

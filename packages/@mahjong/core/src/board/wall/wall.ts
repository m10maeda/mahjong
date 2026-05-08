import { InvalidNoTilesError } from '../invalid-no-tiles-error';

import type { Tile } from '../../tile';

export class Wall {
  private readonly tiles: readonly Tile[];

  public isEmpty(): boolean {
    return this.tiles.length === 0;
  }

  public takeLastTile(): [Tile, Wall] {
    if (this.isEmpty()) throw new InvalidNoTilesError();

    const takenTile = this.tiles[this.tiles.length - 1];

    if (takenTile === undefined) throw new InvalidNoTilesError();

    return [takenTile, new Wall(...this.tiles.slice(0, -1))];
  }

  public takeTile(): [Tile, Wall] {
    if (this.isEmpty()) throw new InvalidNoTilesError();

    const takenTile = this.tiles[0];

    if (takenTile === undefined) throw new InvalidNoTilesError();

    return [takenTile, new Wall(...this.tiles.slice(1))];
  }

  public constructor(...tiles: readonly Tile[]) {
    this.tiles = tiles;
  }
}

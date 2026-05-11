import { InvalidNoTilesError } from '../invalid-no-tiles-error';

import type { Tile } from '../../../tile';

export class DeadWall implements Iterable<Tile> {
  private readonly tiles: readonly Tile[];

  private get latest(): Tile | undefined {
    return this.tiles[this.tiles.length - 1];
  }

  public supply(tile: Tile): DeadWall {
    return new DeadWall(tile, ...this.tiles);
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public take(): readonly [Tile, DeadWall] {
    if (this.latest === undefined) throw new InvalidNoTilesError();

    return [this.latest, new DeadWall(...[...this].slice(0, -1))];
  }

  public constructor(...tiles: readonly Tile[]) {
    this.tiles = tiles;
  }
}

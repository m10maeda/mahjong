import { InvalidNoTilesError } from '../invalid-no-tiles-error';

import type { Tile } from '../../../tile';

export class DiscardPile implements Iterable<Tile> {
  private readonly tiles: readonly Tile[];

  public get latest(): Tile | undefined {
    return this.tiles[this.tiles.length - 1];
  }

  public add(tile: Tile): DiscardPile {
    return new DiscardPile(...this, tile);
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public take(): readonly [Tile, DiscardPile] {
    if (this.latest === undefined) throw new InvalidNoTilesError();

    return [this.latest, new DiscardPile(...[...this].slice(0, -1))];
  }

  public constructor(...tiles: Tile[]) {
    this.tiles = tiles;
  }
}

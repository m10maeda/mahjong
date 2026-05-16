import { type Tile } from '../concepts';

export class Pair implements Iterable<Tile> {
  private readonly tiles: readonly [Tile, Tile];

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public constructor(a: Tile, b: Tile) {
    this.tiles = [a, b];
  }
}

import { type Tile } from '../concepts';

export class Pair implements Iterable<Tile> {
  public readonly tiles: readonly [Tile, Tile];

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public constructor(...tiles: readonly [Tile, Tile]) {
    this.tiles = tiles;
  }
}

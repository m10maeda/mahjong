import type { Tile } from '../../concepts';

export interface ITileSet extends Iterable<Tile> {}

export abstract class AbstractTileSet implements ITileSet {
  protected readonly tiles: readonly Tile[];

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public constructor(...tiles: readonly Tile[]) {
    this.tiles = tiles;
  }
}

import type { Tile } from '../../../tile';

export class MeldTileGroup implements Iterable<Tile> {
  public readonly tiles: readonly Tile[];

  public equals(other: MeldTileGroup): boolean {
    return this.tiles.every((tile, index) => {
      if (other.tiles[index] === undefined) return false;

      return tile.equals(other.tiles[index]);
    });
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public constructor(...tiles: readonly Tile[]) {
    this.tiles = tiles;
  }
}

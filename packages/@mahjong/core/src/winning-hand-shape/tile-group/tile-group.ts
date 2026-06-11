import type { Tile } from '../../tile';

export abstract class TileGroup implements Iterable<Tile> {
  protected abstract get tiles(): readonly Tile[];

  public abstract isSameTileGroupAs(other: TileGroup): boolean;

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public toString(): string {
    return this.tiles.map((tile) => tile.toString()).join('');
  }
}

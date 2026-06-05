import type { Tile, TileType } from '../tile';

export abstract class WinningHandShape implements Iterable<Tile> {
  public abstract get waitTiles(): readonly TileType[];

  public abstract get winningTile(): Tile;

  public abstract [Symbol.iterator](): Iterator<Tile>;
}

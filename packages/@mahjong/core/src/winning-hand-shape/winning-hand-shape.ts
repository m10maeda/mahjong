import type { Tile } from '../concepts';

export abstract class WinningHandShape implements Iterable<Tile> {
  public readonly winningTile: Tile;

  public abstract [Symbol.iterator](): Iterator<Tile>;

  public constructor(winningTile: Tile) {
    this.winningTile = winningTile;
  }
}

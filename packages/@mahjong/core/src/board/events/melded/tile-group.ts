import type { Tile } from '../../../tile';

export abstract class Meld implements Iterable<Tile> {
  public abstract [Symbol.iterator](): Iterator<Tile>;
}

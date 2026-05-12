import type { SeatPosition } from '../../../seat-position';
import type { Tile } from '../../../tile';

export abstract class Meld implements Iterable<Tile> {
  public readonly owner: SeatPosition;

  protected abstract get tiles(): readonly Tile[];

  public abstract equals(other: Meld): boolean;

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public constructor(owner: SeatPosition) {
    this.owner = owner;
  }
}

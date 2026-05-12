import { Meld } from './meld';

import type { SeatPosition } from '../../../seat-position';
import type { Tile } from '../../../tile';

export class ClosedMeld extends Meld {
  private readonly consumedTiles: readonly Tile[];

  protected get tiles(): readonly Tile[] {
    return [...this.consumedTiles];
  }

  public equals(other: Meld): boolean {
    if (!(other instanceof ClosedMeld)) return false;
    if (!this.owner.equals(other.owner)) return false;

    return this.consumedTiles.every((tile, index) => {
      const target = [...other][index];

      if (target === undefined) return false;

      return tile.equals(target);
    });
  }

  public constructor(owner: SeatPosition, consumedTiles: readonly Tile[]) {
    super(owner);

    this.consumedTiles = consumedTiles;
  }
}

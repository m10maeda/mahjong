import { Meld } from './meld';

import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';

export class ExtendedMeld extends Meld {
  private readonly base: Meld;

  private readonly consumedTiles: readonly Tile[];

  protected get tiles(): readonly Tile[] {
    return [...this.base, ...this.consumedTiles];
  }

  public equals(other: Meld): boolean {
    if (!(other instanceof ExtendedMeld)) return false;
    if (!this.owner.equals(other.owner)) return false;

    return this.base.equals(other.base);
  }

  public constructor(
    owner: SeatPosition,
    base: Meld,
    consumedTiles: readonly Tile[],
  ) {
    super(owner);

    this.base = base;
    this.consumedTiles = consumedTiles;
  }
}

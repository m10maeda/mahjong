import { Meld } from './meld';

import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';

export class OpenMeld extends Meld {
  private readonly claimedOn: SeatPosition;

  private readonly claimedTile: Tile;

  private readonly consumedTiles: readonly Tile[];

  protected get tiles(): readonly Tile[] {
    return [...this.consumedTiles, this.claimedTile];
  }

  public equals(other: Meld): boolean {
    if (!(other instanceof OpenMeld)) return false;
    if (!this.owner.equals(other.owner)) return false;
    if (!this.claimedOn.equals(other.claimedOn)) return false;
    if (!this.claimedTile.equals(other.claimedTile)) return false;

    return this.consumedTiles.every((tile, index) => {
      const target = [...other][index];

      if (target === undefined) return false;

      return tile.equals(target);
    });
  }

  public constructor(
    owner: SeatPosition,
    consumedTiles: readonly Tile[],
    claimedTile: Tile,
    claimedOn: SeatPosition,
  ) {
    super(owner);

    this.consumedTiles = consumedTiles;
    this.claimedTile = claimedTile;
    this.claimedOn = claimedOn;
  }
}

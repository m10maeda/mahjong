import { ClaimedMeld } from './claimed-meld';
import { MeldType } from './meld';

import type { Tile, TileType } from '../../tile';
import type { SerialPair } from '../../winning-hand-shape';

export class SequenceMeld extends ClaimedMeld {
  private readonly claimedTile: Tile;

  private readonly serialPair: SerialPair;

  public get prohibitedDiscardTiles(): readonly TileType[] {
    return this.serialPair.receivableTiles;
  }

  protected get tiles(): readonly [Tile, Tile, Tile] {
    return [...this.serialPair.tiles, this.claimedTile];
  }

  public constructor(serialPair: SerialPair, claimedTile: Tile) {
    super(MeldType.Sequence);

    this.serialPair = serialPair;
    this.claimedTile = claimedTile;
  }
}

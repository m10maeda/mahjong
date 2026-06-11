import { ClaimedMeld } from './claimed-meld';
import { MeldType } from './meld';
import { Sequence, type SerialPair } from '../../winning-hand-shape';

import type { Tile, TileType } from '../../tile';

export class SequenceMeld extends ClaimedMeld {
  private readonly claimedTile: Tile;

  private readonly serialPair: SerialPair;

  public get prohibitedDiscardTiles(): readonly TileType[] {
    return this.serialPair.receivableTiles;
  }

  protected get tiles(): readonly [Tile, Tile, Tile] {
    return [...this.serialPair.tiles, this.claimedTile];
  }

  public toCompleteTileGroup(): Sequence {
    return Sequence.openOf(...this.tiles);
  }

  public constructor(serialPair: SerialPair, claimedTile: Tile) {
    super(MeldType.Sequence);

    this.serialPair = serialPair;
    this.claimedTile = claimedTile;
  }
}

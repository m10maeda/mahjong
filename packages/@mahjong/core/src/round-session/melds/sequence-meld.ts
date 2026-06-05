import { ClaimedMeld } from './claimed-meld';
import { MeldType } from './meld';

import type { Tile } from '../../tile';

export class SequenceMeld extends ClaimedMeld {
  private readonly claimedTile: Tile;

  private readonly consumedTile: readonly [Tile, Tile];

  public get prohibitedDiscardTiles(): readonly Tile[] {
    // FIXME: スジの食い変え禁止のための処理を追加
    return [this.claimedTile];
  }

  protected get tiles(): readonly [Tile, Tile, Tile] {
    return [...this.consumedTile, this.claimedTile];
  }

  public constructor(consumedTile: readonly [Tile, Tile], claimedTile: Tile) {
    super(MeldType.Sequence);

    this.consumedTile = consumedTile;
    this.claimedTile = claimedTile;
  }
}

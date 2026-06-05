import { Meld } from './meld';

import type { TileType } from '../../tile';

export abstract class ClaimedMeld extends Meld {
  public abstract get prohibitedDiscardTiles(): readonly TileType[];
}

import { Meld } from './meld';

import type { Tile } from '../../concepts';

export abstract class ClaimedMeld extends Meld {
  public abstract get prohibitedDiscardTiles(): readonly Tile[];
}

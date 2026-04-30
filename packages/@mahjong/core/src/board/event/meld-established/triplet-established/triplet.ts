import { Meld } from '../meld';

import type { Tile } from '../../../../tile';

export class Triplet extends Meld {
  public readonly claimed: Tile;

  public constructor(consumed: readonly Tile[], claimed: Tile) {
    super(consumed);

    this.claimed = claimed;
  }
}

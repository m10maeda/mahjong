import { Meld } from '../meld';

import type { Tile } from '../../../../tile';

export class AddedQuadruplet extends Meld {
  public readonly added: Tile;

  public readonly claimed: Tile;

  public constructor(consumed: readonly Tile[], claimed: Tile, added: Tile) {
    super(consumed);

    this.claimed = claimed;
    this.added = added;
  }
}

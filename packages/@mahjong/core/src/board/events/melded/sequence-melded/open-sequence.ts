import { Meld } from '../tile-group';

import type { Tile } from '../../../../tile';

export class OpenSequence extends Meld {
  public readonly claimed: Tile;

  public readonly consumed: readonly Tile[];

  public [Symbol.iterator](): Iterator<Tile> {
    return [...this.consumed, this.claimed][Symbol.iterator]();
  }

  public constructor(consumed: readonly Tile[], claimed: Tile) {
    super();

    this.consumed = consumed;
    this.claimed = claimed;
  }
}

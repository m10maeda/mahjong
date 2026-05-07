import { Meld } from '../tile-group';

import type { Tile } from '../../../../tile';

export class ClosedQuadruplet extends Meld {
  public readonly consumed: readonly Tile[];

  public [Symbol.iterator](): Iterator<Tile> {
    return this.consumed[Symbol.iterator]();
  }

  public constructor(consumed: readonly Tile[]) {
    super();

    this.consumed = consumed;
  }
}

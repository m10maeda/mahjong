import { Meld } from '../tile-group';

import type { Tile } from '../../../../tile';
import type { OpenTriplet } from '../triplet-melded';

export class AddedQuadruplet extends Meld {
  public readonly added: Tile;

  public readonly base: OpenTriplet;

  public [Symbol.iterator](): Iterator<Tile> {
    return [...this.base, this.added][Symbol.iterator]();
  }

  public constructor(base: OpenTriplet, added: Tile) {
    super();

    this.base = base;
    this.added = added;
  }
}

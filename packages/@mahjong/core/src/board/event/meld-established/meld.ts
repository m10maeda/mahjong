import type { Tile } from '../../../tile';

export abstract class Meld {
  public readonly consumed: readonly Tile[];

  public constructor(consumed: readonly Tile[]) {
    this.consumed = consumed;
  }
}

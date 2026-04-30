import { WinningHandShape } from './winning-hand-shape';

import type { Tile } from '../tile';
import type { Pair } from './pair';

export class SevenPairsWinningHandShape extends WinningHandShape {
  public readonly pairs: readonly Pair[];

  public [Symbol.iterator](): Iterator<Tile> {
    return [...this.pairs.flatMap((pair) => [...pair])][Symbol.iterator]();
  }

  public constructor(pairs: readonly Pair[], winningTile: Tile) {
    super(winningTile);

    this.pairs = pairs;
  }
}

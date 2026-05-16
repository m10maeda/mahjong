import { WinningHandShape } from '../winning-hand-shape';

import type { StandardWaitShape } from './standard-wait-shape';
import type { Tile } from '../../concepts';
import type { Pair } from '../pair';
import type { TileGroup } from '../tile-group';

export class StandardWinningHandShape extends WinningHandShape {
  public readonly groups: readonly TileGroup[];

  public readonly pair: Pair;

  public readonly wait: StandardWaitShape;

  public isConcealed(): boolean {
    return this.groups.every((group) => !group.isOpen());
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return [...this.groups.flatMap((group) => [...group]), ...this.pair][
      Symbol.iterator
    ]();
  }

  public constructor(
    groups: readonly TileGroup[],
    pair: Pair,
    winningTile: Tile,
    wait: StandardWaitShape,
  ) {
    super(winningTile);

    this.groups = groups;
    this.pair = pair;
    this.wait = wait;
  }
}

import { WinningHandShape } from '../winning-hand-shape';

import type { StandardWaitShape } from './standard-wait-shape';
import type { Tile } from '../../tile';
import type { Pair, CompleteTileGroup } from '../tile-group';

export abstract class StandardWinningHandShape extends WinningHandShape {
  public abstract get groups(): readonly [
    CompleteTileGroup,
    CompleteTileGroup,
    CompleteTileGroup,
    CompleteTileGroup,
  ];

  public abstract get pair(): Pair;

  public abstract get wait(): StandardWaitShape;

  public isClosed(): boolean {
    return this.groups.every((group) => !group.isOpen());
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return [...this.groups.flatMap((group) => [...group]), ...this.pair][
      Symbol.iterator
    ]();
  }
}

import { WinningHandShape } from '../winning-hand-shape';

import type { ThirteenOrphansWaitShape } from './thirteen-orphans-wait-shape';
import type { Tile } from '../../tile';

export class ThirteenOrphansWinningHandShape extends WinningHandShape {
  public readonly wait: ThirteenOrphansWaitShape;

  private readonly tiles: readonly Tile[];

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public constructor(
    tiles: readonly Tile[],
    winningTile: Tile,
    wait: ThirteenOrphansWaitShape,
  ) {
    super(winningTile);

    this.tiles = tiles;
    this.wait = wait;
  }
}

import {
  ThirteenOrphansWaitShape,
  ThirteenOrphansWinningHandShape,
} from '../../winning-hand-shape';
import { TileCode } from '../tile-code';
import { TileCounter } from '../tile-counter';

import type { IWinningHandShapeResolver } from './winning-hand-shape-resolver';
import type { Meld } from '../../round-session';
import type { Tile } from '../../tile';

export class ThirteenOrphansWinningHandShapeResolver implements IWinningHandShapeResolver {
  public resolve(
    concealed: readonly Tile[],
    melds: readonly Meld[],
    winningTile: Tile,
  ): readonly ThirteenOrphansWinningHandShape[] {
    if (!this.isSatisfiedBy(concealed, melds, winningTile)) return [];

    const tiles = [...concealed] as [
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
    ];
    if (this.isSatisfiedThirteenWayBy(concealed))
      return [
        new ThirteenOrphansWinningHandShape(
          tiles,
          winningTile,
          ThirteenOrphansWaitShape.ThirteenWay,
        ),
      ];

    return [
      new ThirteenOrphansWinningHandShape(
        tiles,
        winningTile,
        ThirteenOrphansWaitShape.Missing,
      ),
    ];
  }

  private isSatisfiedBy(
    concealed: readonly Tile[],
    melds: readonly Meld[],
    winningTile: Tile,
  ): boolean {
    if (melds.length > 0) return false;

    const counter = TileCounter.from(...concealed, winningTile);

    return (
      counter.count(TileCode.m1) >= 1 &&
      counter.count(TileCode.m9) >= 1 &&
      counter.count(TileCode.p1) >= 1 &&
      counter.count(TileCode.p9) >= 1 &&
      counter.count(TileCode.s1) >= 1 &&
      counter.count(TileCode.s9) >= 1 &&
      counter.count(TileCode.z1) >= 1 &&
      counter.count(TileCode.z2) >= 1 &&
      counter.count(TileCode.z3) >= 1 &&
      counter.count(TileCode.z4) >= 1 &&
      counter.count(TileCode.z5) >= 1 &&
      counter.count(TileCode.z6) >= 1 &&
      counter.count(TileCode.z7) >= 1
    );
  }

  private isSatisfiedThirteenWayBy(concealed: readonly Tile[]): boolean {
    const counter = TileCounter.from(...concealed);

    return (
      counter.count(TileCode.m1) === 1 &&
      counter.count(TileCode.m9) === 1 &&
      counter.count(TileCode.p1) === 1 &&
      counter.count(TileCode.p9) === 1 &&
      counter.count(TileCode.s1) === 1 &&
      counter.count(TileCode.s9) === 1 &&
      counter.count(TileCode.z1) === 1 &&
      counter.count(TileCode.z2) === 1 &&
      counter.count(TileCode.z3) === 1 &&
      counter.count(TileCode.z4) === 1 &&
      counter.count(TileCode.z5) === 1 &&
      counter.count(TileCode.z6) === 1 &&
      counter.count(TileCode.z7) === 1
    );
  }
}

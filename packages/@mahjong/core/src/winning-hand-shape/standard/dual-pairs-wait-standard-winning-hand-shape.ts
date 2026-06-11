import { StandardWaitShape } from './standard-wait-shape';
import { StandardWinningHandShape } from './standard-winning-hand-shape';

import type { Tile, TileType } from '../../tile';
import type { CompleteTileGroup, Pair } from '../tile-group';

export class DualPairsWaitStandardWinningHandShape extends StandardWinningHandShape {
  public readonly pair: Pair;

  public readonly winningTile: Tile;

  private readonly _groups: readonly [
    CompleteTileGroup,
    CompleteTileGroup,
    CompleteTileGroup,
  ];

  private readonly waitPair: Pair;

  public get groups(): readonly [
    CompleteTileGroup,
    CompleteTileGroup,
    CompleteTileGroup,
    CompleteTileGroup,
  ] {
    return [...this._groups, this.waitPair.extend(this.winningTile)];
  }

  public get wait(): StandardWaitShape {
    return StandardWaitShape.Shanpon;
  }

  public get waitTiles(): readonly [TileType, TileType] {
    return [this.pair.composeTile, this.waitPair.composeTile];
  }

  public constructor(
    groups: readonly [CompleteTileGroup, CompleteTileGroup, CompleteTileGroup],
    pair: Pair,
    waitPair: Pair,
    winningTile: Tile,
  ) {
    super();

    if (pair.isSameTileGroupAs(waitPair)) throw new TypeError();
    if (!waitPair.composes(winningTile.type)) throw new TypeError();

    this._groups = groups;
    this.pair = pair;
    this.waitPair = waitPair;
    this.winningTile = winningTile;
  }
}

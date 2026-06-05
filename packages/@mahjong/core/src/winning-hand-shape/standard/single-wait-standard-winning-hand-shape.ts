import { Pair, type CompleteTileGroup } from '../tile-group';
import { StandardWaitShape } from './standard-wait-shape';
import { StandardWinningHandShape } from './standard-winning-hand-shape';

import type { Tile, TileType } from '../../concepts';

export class SingleWaitStandardWinningHandShape extends StandardWinningHandShape {
  public readonly groups: readonly [
    CompleteTileGroup,
    CompleteTileGroup,
    CompleteTileGroup,
    CompleteTileGroup,
  ];

  public readonly isolatedTile: Tile;

  public readonly winningTile: Tile;

  public get pair(): Pair {
    return new Pair(this.isolatedTile, this.winningTile);
  }

  public get wait(): StandardWaitShape {
    return StandardWaitShape.Single;
  }

  public get waitTiles(): readonly [TileType] {
    return [this.isolatedTile.type];
  }

  public constructor(
    groups: readonly [
      CompleteTileGroup,
      CompleteTileGroup,
      CompleteTileGroup,
      CompleteTileGroup,
    ],
    isolatedTile: Tile,
    winningTile: Tile,
  ) {
    super();

    if (!isolatedTile.equals(winningTile)) throw new TypeError();

    this.groups = groups;
    this.isolatedTile = isolatedTile;
    this.winningTile = winningTile;
  }
}

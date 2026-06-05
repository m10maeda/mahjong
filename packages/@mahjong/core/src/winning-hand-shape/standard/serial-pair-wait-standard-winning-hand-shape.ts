import { StandardWaitShape } from './standard-wait-shape';
import { StandardWinningHandShape } from './standard-winning-hand-shape';
import { SerialPairType } from '../tile-group/incomplete/serial-pair';

import type { Tile, TileType } from '../../concepts';
import type { CompleteTileGroup, Pair, SerialPair } from '../tile-group';

export class SerialPairWaitStandardWinningHandShape extends StandardWinningHandShape {
  public readonly pair: Pair;

  public readonly winningTile: Tile;

  private readonly _groups: readonly [
    CompleteTileGroup,
    CompleteTileGroup,
    CompleteTileGroup,
  ];

  private readonly serialPair: SerialPair;

  public get groups(): readonly [
    CompleteTileGroup,
    CompleteTileGroup,
    CompleteTileGroup,
    CompleteTileGroup,
  ] {
    return [...this._groups, this.serialPair.extend(this.winningTile)];
  }

  public get wait(): StandardWaitShape {
    switch (this.serialPair.type) {
      case SerialPairType.BothSide:
        return StandardWaitShape.Ryanmen;

      case SerialPairType.Middle:
        return StandardWaitShape.Kanchan;

      case SerialPairType.Edge:
        return StandardWaitShape.Penchan;

      default:
        throw new RangeError();
    }
  }

  public get waitTiles(): readonly TileType[] {
    return this.serialPair.receivableTiles;
  }

  public constructor(
    groups: readonly [CompleteTileGroup, CompleteTileGroup, CompleteTileGroup],
    pair: Pair,
    serialPair: SerialPair,
    winningTile: Tile,
  ) {
    super();

    this._groups = groups;
    this.pair = pair;
    this.serialPair = serialPair;
    this.winningTile = winningTile;
  }
}

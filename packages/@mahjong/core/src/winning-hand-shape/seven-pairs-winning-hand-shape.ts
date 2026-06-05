import { WinningHandShape } from './winning-hand-shape';

import type { Tile, TileType } from '../concepts';
import type { Pair } from './tile-group';

export class SevenPairsWinningHandShape extends WinningHandShape {
  public readonly winningTile: Tile;

  private readonly _pairs: readonly [Pair, Pair, Pair, Pair, Pair, Pair];

  private readonly isolatedTile: Tile;

  public get waitTiles(): readonly [TileType] {
    return [this.isolatedTile.type];
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return [
      ...this._pairs.flatMap((pair) => [...pair]),
      this.isolatedTile,
      this.winningTile,
    ][Symbol.iterator]();
  }

  public constructor(
    pairs: readonly [Pair, Pair, Pair, Pair, Pair, Pair],
    isolatedTile: Tile,
    winningTile: Tile,
  ) {
    if (!isolatedTile.hasSameTypeAs(winningTile)) throw new TypeError();

    const hasDuplicatePairType = pairs.some((pair, index) =>
      pairs.slice(index + 1).some((other) => pair.isSameTileGroupAs(other)),
    );
    if (hasDuplicatePairType) throw new TypeError();

    super();

    this.winningTile = winningTile;
    this._pairs = pairs;
    this.isolatedTile = isolatedTile;
  }
}

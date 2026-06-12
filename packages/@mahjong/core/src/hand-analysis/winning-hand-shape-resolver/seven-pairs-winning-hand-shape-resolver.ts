import { Pair, SevenPairsWinningHandShape } from '../../winning-hand-shape';
import { TileCounter } from '../tile-counter';

import type { IWinningHandShapeResolver } from './winning-hand-shape-resolver';
import type { Meld } from '../../round-session';
import type { Tile } from '../../tile';

export class SevenPairsWinningHandShapeResolver implements IWinningHandShapeResolver {
  public resolve(
    concealed: readonly Tile[],
    melds: readonly Meld[],
    winningTile: Tile,
  ): readonly SevenPairsWinningHandShape[] {
    if (!this.isSatisfiedBy(concealed, melds, winningTile)) return [];

    const counter = TileCounter.from(...concealed);
    const pairSources = counter.findAll(
      (tiles) => tiles.length === 2,
    ) as readonly (readonly [Tile, Tile])[];
    const isolatedSource = counter.find((tiles) => tiles.length === 1) as
      | readonly [Tile]
      | undefined;

    if (isolatedSource === undefined) return [];

    const pairs = pairSources.map((source) => new Pair(...source)) as [
      Pair,
      Pair,
      Pair,
      Pair,
      Pair,
      Pair,
    ];
    const [isolated] = isolatedSource;

    return [new SevenPairsWinningHandShape(pairs, isolated, winningTile)];
  }

  private isSatisfiedBy(
    concealed: readonly Tile[],
    melds: readonly Meld[],
    winningTile: Tile,
  ): boolean {
    if (melds.length > 0) return false;

    const counter = TileCounter.from(...concealed, winningTile);

    const pairSources = counter.findAll((tiles) => tiles.length === 2);

    return pairSources.length === 7;
  }
}

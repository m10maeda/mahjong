import {
  DualPairsWaitStandardWinningHandShape,
  SingleWaitStandardWinningHandShape,
  SerialPairWaitStandardWinningHandShape,
} from '../../winning-hand-shape/standard';

import type { IWinningHandShapeResolver } from './winning-hand-shape-resolver';
import type { Meld } from '../../round-session';
import type { Tile } from '../../tile';
import type {
  CompleteTileGroup,
  Pair,
  SerialPair,
  StandardWinningHandShape,
} from '../../winning-hand-shape';
import type {
  IConcealedHandDecomposer,
  TileGroupDecomposition,
} from '../concealed-hand-decomposer';

export class StandardWinningHandShapeResolver implements IWinningHandShapeResolver {
  private readonly decomposer: IConcealedHandDecomposer;

  public resolve(
    concealed: readonly Tile[],
    melds: readonly Meld[],
    winningTile: Tile,
  ): readonly StandardWinningHandShape[] {
    const decompositions = this.decompose(concealed, melds);

    // TODO: 先にフィルタリングする？

    return [
      ...this.composeDualPairsWaitStandardWinningHandShapes(
        decompositions,
        winningTile,
      ),
      ...this.composeSingleWaitStandardWinningHandShapes(
        decompositions,
        winningTile,
      ),
      ...this.composeSerialPairWaitStandardWinningHandShapes(
        decompositions,
        winningTile,
      ),
    ];
  }

  private composeDualPairsWaitStandardWinningHandShapes(
    decompositions: readonly TileGroupDecomposition[],
    winningTile: Tile,
  ): DualPairsWaitStandardWinningHandShape[] {
    const candidates = decompositions.filter((decomposition) => {
      if (decomposition.reamingTilesCount > 1) return false;
      if (!(decomposition.groupsCount === 3 && decomposition.parisCount === 2))
        return false;
      if (!decomposition.pairs.some((pair) => pair.composes(winningTile.type)))
        return false;

      return true;
    });

    return candidates.map((candidate) => {
      const groups = candidate.groups as [
        CompleteTileGroup,
        CompleteTileGroup,
        CompleteTileGroup,
      ];
      const [pair1, pair2] = candidate.pairs as [Pair, Pair];
      const [pair, waitPair] = pair1.composes(winningTile.type)
        ? [pair2, pair1]
        : [pair1, pair2];

      return new DualPairsWaitStandardWinningHandShape(
        groups,
        pair,
        waitPair,
        winningTile,
      );
    });
  }

  private composeSerialPairWaitStandardWinningHandShapes(
    decompositions: readonly TileGroupDecomposition[],
    winningTile: Tile,
  ): readonly SerialPairWaitStandardWinningHandShape[] {
    const candidates = decompositions.filter((decomposition) => {
      if (decomposition.reamingTilesCount > 1) return false;
      if (
        !(
          decomposition.groupsCount === 3 &&
          decomposition.parisCount === 1 &&
          decomposition.serialPairsCount === 1
        )
      )
        return false;
      if (
        !decomposition.serialPairs.some((serialPair) =>
          serialPair.receives(winningTile),
        )
      )
        return false;

      return true;
    });

    return candidates.map((candidate) => {
      const groups = candidate.groups as [
        CompleteTileGroup,
        CompleteTileGroup,
        CompleteTileGroup,
      ];
      const [pair] = candidate.pairs as [Pair];
      const [serialPair] = candidate.serialPairs as [SerialPair];

      return new SerialPairWaitStandardWinningHandShape(
        groups,
        pair,
        serialPair,
        winningTile,
      );
    });
  }

  private composeSingleWaitStandardWinningHandShapes(
    decompositions: readonly TileGroupDecomposition[],
    winningTile: Tile,
  ): readonly SingleWaitStandardWinningHandShape[] {
    const candidates = decompositions.filter((decomposition) => {
      if (decomposition.reamingTilesCount !== 1) return false;
      if (!(decomposition.groupsCount === 4)) return false;
      if (!decomposition.reamingTiles[0]?.hasSameTypeAs(winningTile))
        return false;

      return true;
    });

    return candidates.map((candidate) => {
      const groups = candidate.groups as [
        CompleteTileGroup,
        CompleteTileGroup,
        CompleteTileGroup,
        CompleteTileGroup,
      ];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const isolated = candidate.reamingTiles[0]!;

      return new SingleWaitStandardWinningHandShape(
        groups,
        isolated,
        winningTile,
      );
    });
  }

  private decompose(
    concealed: readonly Tile[],
    melds: readonly Meld[],
  ): readonly TileGroupDecomposition[] {
    const concealedDecompositions = this.decomposer.decompose(...concealed);

    return concealedDecompositions.map((decomposition) =>
      melds.reduce<TileGroupDecomposition>(
        (_decomposition, meld) =>
          _decomposition.add(meld.toCompleteTileGroup()),
        decomposition,
      ),
    );
  }

  public constructor(decomposer: IConcealedHandDecomposer) {
    this.decomposer = decomposer;
  }
}

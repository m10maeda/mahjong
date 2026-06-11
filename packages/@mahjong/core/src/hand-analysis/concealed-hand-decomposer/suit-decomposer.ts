import { Tile } from '../../tile';
import {
  Pair,
  Sequence,
  SerialPair,
  SerialPairType,
  Triplet,
  type TileGroup,
} from '../../winning-hand-shape';
import { TileCodeTranslator } from '../tile-code-translator';
import { TileCounter } from '../tile-counter';
import { TileGroupDecomposition } from './tile-group-decomposition';

import type { IConcealedHandDecomposer } from './concealed-hand-decomposer';

export class SuitDecomposer implements IConcealedHandDecomposer {
  public decompose(...tiles: readonly Tile[]): TileGroupDecomposition[] {
    const counter = TileCounter.from(...tiles);

    if (counter.isEmpty()) return [TileGroupDecomposition.empty()];

    const results: TileGroupDecomposition[] = [];

    this.search(counter, TileGroupDecomposition.empty(), results);

    return results;
  }

  private findCandidates(
    counter: TileCounter,
    tile: Tile,
  ): readonly TileGroup[] {
    const candidates: TileGroup[] = [];
    const code = TileCodeTranslator.encode(tile.type);

    // 刻子
    if (counter.count(code) >= 3) {
      const tiles = counter.get(code);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      candidates.push(Triplet.closedOf(tiles[0]!, tiles[1]!, tiles[2]!));
    }

    // 順子
    if (counter.has(code + 1) && counter.has(code + 2)) {
      candidates.push(
        Sequence.closedOf(
          /* eslint-disable @typescript-eslint/no-non-null-assertion */
          counter.get(code)[0]!,
          counter.get(code + 1)[0]!,
          counter.get(code + 2)[0]!,
          /* eslint-enable @typescript-eslint/no-non-null-assertion */
        ),
      );
    }

    // 対子
    if (counter.count(code) >= 2) {
      const tiles = counter.get(code);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      candidates.push(new Pair(tiles[0]!, tiles[1]!));
    }

    // 辺張・両面塔子
    if (counter.has(code + 1)) {
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      const leftTile = counter.get(code)[0]!;
      const rightTile = counter.get(code + 1)[0]!;
      /* eslint-enable @typescript-eslint/no-non-null-assertion */

      // 辺張塔子(12)
      if (leftTile.isTerminal()) {
        candidates.push(
          new SerialPair(
            SerialPairType.Edge,
            [leftTile, rightTile],
            [TileCodeTranslator.decode(code + 2)],
          ),
        );
      }
      // 辺張塔子(89)
      else if (rightTile.isTerminal()) {
        candidates.push(
          new SerialPair(
            SerialPairType.Edge,
            [leftTile, rightTile],
            [TileCodeTranslator.decode(code - 1)],
          ),
        );
      }
      // 両面塔子
      else {
        candidates.push(
          new SerialPair(
            SerialPairType.BothSide,
            [leftTile, rightTile],
            [
              TileCodeTranslator.decode(code - 1),
              TileCodeTranslator.decode(code + 2),
            ],
          ),
        );
      }
    }

    // 嵌張塔子
    if (counter.has(code + 2)) {
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      const leftTile = counter.get(code)[0]!;
      const rightTile = counter.get(code + 2)[0]!;
      /* eslint-enable @typescript-eslint/no-non-null-assertion */

      if (leftTile.type.equals(rightTile.type)) {
        candidates.push(
          new SerialPair(
            SerialPairType.BothSide,
            [leftTile, rightTile],
            [TileCodeTranslator.decode(code + 1)],
          ),
        );
      }
    }

    return candidates;
  }

  private search(
    counter: TileCounter,
    decomposition: TileGroupDecomposition,
    results: TileGroupDecomposition[],
  ): void {
    const minimumTile = counter.minimumTile;

    if (minimumTile === undefined) {
      results.push(decomposition);

      return;
    }

    for (const candidate of this.findCandidates(counter, minimumTile)) {
      this.search(
        counter.remove(...candidate),
        decomposition.add(candidate),
        results,
      );
    }

    this.search(
      counter.remove(minimumTile),
      decomposition.add(minimumTile),
      results,
    );
  }
}

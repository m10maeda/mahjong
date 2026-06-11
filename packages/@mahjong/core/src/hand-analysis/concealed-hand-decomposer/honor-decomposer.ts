import { Tile } from '../../tile';
import { Pair, Triplet, type TileGroup } from '../../winning-hand-shape';
import { TileCodeTranslator } from '../tile-code-translator';
import { TileCounter } from '../tile-counter';
import { TileGroupDecomposition } from './tile-group-decomposition';

import type { IConcealedHandDecomposer } from './concealed-hand-decomposer';

export class HonorDecomposer implements IConcealedHandDecomposer {
  public decompose(...tiles: readonly Tile[]): TileGroupDecomposition[] {
    const counter = TileCounter.from(...tiles);

    if (counter.isEmpty()) return [TileGroupDecomposition.empty()];

    const results: TileGroupDecomposition[] = [];

    this.search(counter, TileGroupDecomposition.empty(), results);

    if (results.length > 0) return results;

    return [TileGroupDecomposition.empty()];
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

    // 対子
    if (counter.count(code) >= 2) {
      const tiles = counter.get(code);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      candidates.push(new Pair(tiles[0]!, tiles[1]!));
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

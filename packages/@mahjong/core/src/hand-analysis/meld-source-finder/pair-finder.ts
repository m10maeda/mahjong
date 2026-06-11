import { Pair } from '../../winning-hand-shape';
import { TileCounter } from '../tile-counter';

import type { Tile } from '../../tile';

export class PairFinder {
  public findAll(...tiles: Tile[]): readonly Pair[] {
    const counter = TileCounter.from(...tiles);
    const candidateTilesGroup = counter.findAll((tiles) => tiles.length >= 2);

    const pairs: Pair[] = [];

    for (const tiles of candidateTilesGroup) {
      const [normalTile1, normalTile2] = tiles.filter((tile) => !tile.isRed());
      const [redTile1, redTile2] = tiles.filter((tile) => tile.isRed());

      if (normalTile1 && normalTile2) {
        pairs.push(new Pair(normalTile1, normalTile2));
      }

      if (redTile1 && redTile2) {
        pairs.push(new Pair(redTile1, redTile2));
      }

      if (normalTile1 && redTile1) {
        pairs.push(new Pair(normalTile1, redTile1));
      }
    }

    return pairs;
  }
}

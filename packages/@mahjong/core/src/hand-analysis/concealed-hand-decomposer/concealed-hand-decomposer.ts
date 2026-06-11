import { TileGroupDecomposition } from './tile-group-decomposition';

import type { Tile } from '../../tile';

export interface IConcealedHandDecomposer {
  decompose(...tiles: readonly Tile[]): readonly TileGroupDecomposition[];
}

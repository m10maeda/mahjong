import type { TilesDistributed } from '../events';
import type { Seed } from '../ports/seed';

export interface ITilesDistributor<TBoard> {
  distribute(seed: Seed): readonly [TilesDistributed, TBoard];
}

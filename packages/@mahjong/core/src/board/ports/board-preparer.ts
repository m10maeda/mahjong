import type { Seed } from './seed';

export interface IBoardPreparer {
  prepare(seed: Seed): Promise<void>;
}

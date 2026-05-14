import type { Seed } from './seed';

export interface IBoardSetupper {
  setup(seed: Seed): Promise<void>;
}

import { RandomGenerator } from './random-generator';

import type { Seed } from '../ports';
import type {
  IRandomGenerator,
  IRandomGeneratorFactory,
} from './tiles-shuffler';

export class RandomGeneratorFactory implements IRandomGeneratorFactory {
  public create(seed: Seed): IRandomGenerator {
    return new RandomGenerator(seed.valueOf());
  }
}

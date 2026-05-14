import type { ITilesShuffler } from './tiles-distributor';
import type { Tile } from '../../tile';
import type { Seed } from '../ports';

export interface IRandomGenerator {
  next(): number;
}

export interface IRandomGeneratorFactory {
  create(seed: Seed): IRandomGenerator;
}

export class TilesShuffler implements ITilesShuffler {
  private readonly randomGeneratorFactory: IRandomGeneratorFactory;

  public shuffle(seed: Seed, ...tiles: readonly Tile[]): readonly Tile[] {
    const randomGenerator = this.randomGeneratorFactory.create(seed);
    const shuffled = [...tiles];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(randomGenerator.next() * (i + 1));

      const current = shuffled[i];
      const target = shuffled[j];
      if (current === undefined || target === undefined)
        throw new RangeError('Shuffle index out of');

      shuffled[i] = target;
      shuffled[j] = current;
    }

    return shuffled;
  }

  public constructor(randomGeneratorFactory: IRandomGeneratorFactory) {
    this.randomGeneratorFactory = randomGeneratorFactory;
  }
}

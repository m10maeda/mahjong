import type { IRandomGenerator } from './tiles-shuffler';

export class RandomGenerator implements IRandomGenerator {
  private state: number;

  public next(): number {
    let t = (this.state += 0x6d2b79f5);

    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    const result = (t ^ (t >>> 14)) >>> 0;

    return result / 4294967296;
  }

  public constructor(state: number) {
    this.state = state;
  }
}

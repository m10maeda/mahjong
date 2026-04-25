import type { RoundIndex } from './round-index';
import type { RoundWind } from './round-wind';

export class RoundProgress {
  public readonly index: RoundIndex;

  public readonly wind: RoundWind;

  public compareTo(other: RoundProgress): number {
    if (!this.wind.equals(other.wind)) return this.wind.compareTo(other.wind);

    return this.index.compareTo(other.index);
  }

  public equals(other: RoundProgress): boolean {
    return this.wind.equals(other.wind) && this.index.equals(other.index);
  }

  public constructor(wind: RoundWind, index: RoundIndex) {
    this.wind = wind;
    this.index = index;
  }
}

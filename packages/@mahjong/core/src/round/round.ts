import type { Honba } from './honba';
import type { RoundIndex } from './round-index';
import type { RoundProgress } from './round-progress';
import type { RoundWind } from './round-wind';

export class Round {
  public readonly honba: Honba;

  private readonly progress: RoundProgress;

  public get index(): RoundIndex {
    return this.progress.index;
  }

  public get wind(): RoundWind {
    return this.progress.wind;
  }

  public advance(): Round {
    return new Round(this.progress.advance(), this.honba.reset());
  }

  public carryover(): Round {
    return new Round(this.progress.advance(), this.honba.advance());
  }

  public compareTo(other: Round): number {
    if (!this.progress.equals(other.progress))
      return this.progress.compareTo(other.progress);

    return this.honba.compareTo(other.honba);
  }

  public equals(other: Round): boolean {
    return (
      this.progress.equals(other.progress) && this.honba.equals(other.honba)
    );
  }

  public repeat(): Round {
    return new Round(this.progress, this.honba.advance());
  }

  public constructor(progress: RoundProgress, honba: Honba) {
    this.progress = progress;
    this.honba = honba;
  }
}

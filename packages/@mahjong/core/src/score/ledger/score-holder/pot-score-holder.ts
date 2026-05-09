import { ScoreHolder } from './score-holder';

export class PotScoreHolder extends ScoreHolder {
  protected readonly id = 'Pot';

  public equals(other: ScoreHolder): boolean {
    return other instanceof PotScoreHolder;
  }

  public [Symbol.toPrimitive](
    hint: 'number' | 'string' | 'default' = 'default',
  ): number | string | null {
    if (hint !== 'string') return null;

    return this.toString();
  }

  public toString(): string {
    return 'Pot';
  }

  public static new(): PotScoreHolder {
    return new PotScoreHolder();
  }
}

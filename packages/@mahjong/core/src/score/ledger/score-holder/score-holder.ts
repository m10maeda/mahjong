export abstract class ScoreHolder {
  protected abstract get id(): string;

  public equals(other: ScoreHolder): boolean {
    return this.id === other.id;
  }
}

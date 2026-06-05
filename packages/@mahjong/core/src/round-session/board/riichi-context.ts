export class RiichiContext {
  public static NoRiichi = new RiichiContext(false, false, false);
  public static WithFirstAroundRiichi = new RiichiContext(true, false, true);
  public static WithFirstAroundRiichiAndOneShot = new RiichiContext(
    true,
    true,
    true,
  );
  public static WithRiichi = new RiichiContext(true, false, false);
  public static WithRiichiAndOneShot = new RiichiContext(true, true, false);

  public readonly isFirstAroundRiichi: boolean;
  public readonly withOneShot: boolean;
  public readonly withRiichi: boolean;

  private constructor(
    withRiichi: boolean,
    withOneShot: boolean,
    isFirstAroundRiichi: boolean,
  ) {
    this.withRiichi = withRiichi;
    this.withOneShot = withOneShot;
    this.isFirstAroundRiichi = isFirstAroundRiichi;
  }
}

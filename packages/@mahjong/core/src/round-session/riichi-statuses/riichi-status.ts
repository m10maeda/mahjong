import { RiichiContext } from '../board';

enum RiichiState {
  None,
  Declared,
  Established,
}

export class RiichiStatus {
  private readonly firstAroundRiichi: boolean;

  private readonly oneShotEligible: boolean;

  private readonly state: RiichiState;

  public createContext(): RiichiContext {
    if (!this.isEstablished()) return RiichiContext.NoRiichi;
    if (this.isFirstAroundRiichi()) {
      if (this.isOneShotEligible())
        return RiichiContext.WithFirstAroundRiichiAndOneShot;

      return RiichiContext.WithFirstAroundRiichi;
    }

    if (this.isOneShotEligible()) return RiichiContext.WithRiichiAndOneShot;

    return RiichiContext.WithRiichi;
  }

  public declare(isFirstAround: boolean): RiichiStatus {
    if (this.state !== RiichiState.None) throw new TypeError();

    return new RiichiStatus(RiichiState.Declared, isFirstAround, true);
  }

  public disableOneShotEligible(): RiichiStatus {
    if (this.state !== RiichiState.Established) return this;

    return new RiichiStatus(this.state, this.firstAroundRiichi, false);
  }

  public establish(): RiichiStatus {
    if (this.state !== RiichiState.Declared) throw new TypeError();

    return new RiichiStatus(
      RiichiState.Established,
      this.firstAroundRiichi,
      true,
    );
  }

  public isEstablished(): boolean {
    return this.state === RiichiState.Established;
  }

  public isFirstAroundRiichi(): boolean {
    return this.firstAroundRiichi;
  }

  public isOneShotEligible(): boolean {
    return this.oneShotEligible;
  }

  public isPending(): boolean {
    return this.state === RiichiState.Declared;
  }

  private constructor(
    state: RiichiState,
    firstAroundRiichi: boolean,
    oneShotEligible: boolean,
  ) {
    this.state = state;
    this.firstAroundRiichi = firstAroundRiichi;
    this.oneShotEligible = oneShotEligible;
  }

  public static new(): RiichiStatus {
    return new RiichiStatus(RiichiState.None, false, false);
  }
}

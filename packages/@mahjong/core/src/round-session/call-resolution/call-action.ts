import {
  ChiiCall,
  OpenKanCall,
  PassCall,
  PonCall,
  RonCall,
  type ReactiveRoundSessionCommand,
} from '../commands';

export enum CallActionCandidate {
  Ron,
  Kan,
  Pon,
  Chii,
  Pass,
}

export enum CallActionState {
  Ron,
  Kan,
  Pon,
  Chii,
  Pass,
  Pending,
}

export class CallAction {
  public readonly acceptedCommand?: ReactiveRoundSessionCommand;

  public readonly candidates: readonly CallActionCandidate[];

  public accept(command: ReactiveRoundSessionCommand): CallAction {
    if (!this.accepts(command)) throw new TypeError();

    return new CallAction(this.candidates, command);
  }

  public accepts(command: ReactiveRoundSessionCommand): boolean {
    if (this.isCalled()) return false;

    if (command instanceof ChiiCall)
      return this.candidates.some(
        (candidate) => candidate === CallActionCandidate.Chii,
      );
    if (command instanceof PonCall)
      return this.candidates.some(
        (candidate) => candidate === CallActionCandidate.Pon,
      );
    if (command instanceof OpenKanCall)
      return this.candidates.some(
        (candidate) => candidate === CallActionCandidate.Kan,
      );
    if (command instanceof RonCall)
      return this.candidates.some(
        (candidate) => candidate === CallActionCandidate.Ron,
      );
    if (command instanceof PassCall)
      return this.candidates.some(
        (candidate) => candidate === CallActionCandidate.Pass,
      );

    throw new RangeError();
  }

  public hasChii(): boolean {
    return this.candidates.some(
      (candidate) => candidate === CallActionCandidate.Chii,
    );
  }

  public hasKan(): boolean {
    return this.candidates.some(
      (candidate) => candidate === CallActionCandidate.Kan,
    );
  }

  public hasPon(): boolean {
    return this.candidates.some(
      (candidate) => candidate === CallActionCandidate.Pon,
    );
  }

  public hasRon(): boolean {
    return this.candidates.some(
      (candidate) => candidate === CallActionCandidate.Ron,
    );
  }

  public isCalled(): boolean {
    return this.acceptedCommand !== undefined;
  }

  public isEmpty(): boolean {
    return this.candidates.length === 0;
  }

  public isPassed(): boolean {
    return this.acceptedCommand instanceof PassCall;
  }

  public constructor(
    candidates: readonly CallActionCandidate[],
    acceptedCommand?: ReactiveRoundSessionCommand,
  ) {
    this.candidates = candidates;
    this.acceptedCommand = acceptedCommand;
  }
}

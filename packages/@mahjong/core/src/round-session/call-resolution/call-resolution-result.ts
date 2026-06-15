import type { SeatPosition } from '../../table';
import type { ReactiveRoundSessionCommand } from '../commands';
import type { RonType } from '../events/won/won-with-ron';

export abstract class CallResolutionResult {
  public abstract isResolved(): boolean;
}

export class PendingCallResolutionResult extends CallResolutionResult {
  public isResolved(): boolean {
    return false;
  }
}

abstract class ResolvedResolutionResult extends CallResolutionResult {
  public isResolved(): boolean {
    return true;
  }
}

export class RonCallResolutionResult extends ResolvedResolutionResult {
  public readonly type: RonType;

  public readonly winners: readonly [SeatPosition, ...SeatPosition[]];

  public constructor(
    type: RonType,
    winners: readonly [SeatPosition, ...SeatPosition[]],
  ) {
    super();

    this.type = type;
    this.winners = winners;
  }
}

export class ClaimCallResolutionResult extends ResolvedResolutionResult {
  public readonly claimer: SeatPosition;

  public readonly resolvedCommand: ReactiveRoundSessionCommand;

  public constructor(
    claimer: SeatPosition,
    resolvedCommand: ReactiveRoundSessionCommand,
  ) {
    super();

    this.claimer = claimer;
    this.resolvedCommand = resolvedCommand;
  }
}

export class AllPassCallResolutionResult extends ResolvedResolutionResult {}

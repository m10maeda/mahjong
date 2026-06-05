import type { SeatPosition } from '../../concepts';
import type { ChiiCall, OpenKanCall, PonCall } from '../commands';
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

export abstract class ClaimCallResolutionResult extends ResolvedResolutionResult {
  public readonly claimer: SeatPosition;

  public constructor(claimer: SeatPosition) {
    super();

    this.claimer = claimer;
  }
}

export class KanCallResolutionResult extends ClaimCallResolutionResult {
  public readonly resolvedCommand: OpenKanCall;

  public constructor(claimer: SeatPosition, resolvedCommand: OpenKanCall) {
    super(claimer);

    this.resolvedCommand = resolvedCommand;
  }
}

export class PonCallResolutionResult extends ClaimCallResolutionResult {
  public readonly resolvedCommand: PonCall;

  public constructor(claimer: SeatPosition, resolvedCommand: PonCall) {
    super(claimer);

    this.resolvedCommand = resolvedCommand;
  }
}

export class ChiiCallResolutionResult extends ClaimCallResolutionResult {
  public readonly resolvedCommand: ChiiCall;

  public constructor(claimer: SeatPosition, resolvedCommand: ChiiCall) {
    super(claimer);

    this.resolvedCommand = resolvedCommand;
  }
}

export class AllPassCallResolutionResult extends ResolvedResolutionResult {}

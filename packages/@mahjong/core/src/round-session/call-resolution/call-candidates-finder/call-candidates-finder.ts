import { CallActionCandidate, CallAction } from '../call-action';
import { CallActions } from '../call-actions';

import type { IWinningHandShapeResolver } from '../../../hand-analysis';
import type { SeatPosition } from '../../../table';
import type { IHand } from '../../hand';
import type { CallResolutionContext } from '../call-resolution-context';

export abstract class CallCandidatesFinder {
  private readonly thirteenOrphansWinningHandShapeResolver: IWinningHandShapeResolver;

  protected abstract canChii(
    hand: IHand,
    context: CallResolutionContext,
  ): boolean;
  protected abstract canKan(
    hand: IHand,
    context: CallResolutionContext,
  ): boolean;
  protected abstract canPon(
    hand: IHand,
    context: CallResolutionContext,
  ): boolean;
  protected abstract canRon(
    hand: IHand,
    context: CallResolutionContext,
  ): boolean;

  public findAllWithAddedKan(context: CallResolutionContext): CallActions {
    const actions = new Map<SeatPosition, CallAction>(
      context.reactionHandCandidates
        .map<[SeatPosition, CallAction]>((hand) => {
          const candidates: CallActionCandidate[] = [CallActionCandidate.Pass];

          if (this.canRon(hand, context)) {
            candidates.push(CallActionCandidate.Ron);
          }

          return [hand.seat, new CallAction(candidates)];
        })
        .filter(([, action]) => action.candidates.length === 1),
    );

    return new CallActions(actions);
  }

  public findAllWithClosedKan(context: CallResolutionContext): CallActions {
    const actions = new Map<SeatPosition, CallAction>(
      context.reactionHandCandidates
        .map<[SeatPosition, CallAction]>((hand) => {
          const candidates: CallActionCandidate[] = [CallActionCandidate.Pass];

          if (this.canRonWithThirteenOrphans(hand, context)) {
            candidates.push(CallActionCandidate.Ron);
          }

          return [hand.seat, new CallAction(candidates)];
        })
        .filter(([, action]) => action.candidates.length === 1),
    );

    return new CallActions(actions);
  }

  public findAllWithDiscard(context: CallResolutionContext): CallActions {
    const actions = new Map<SeatPosition, CallAction>(
      context.reactionHandCandidates
        .map<[SeatPosition, CallAction]>((hand) => {
          const candidates: CallActionCandidate[] = [CallActionCandidate.Pass];

          if (this.canChii(hand, context)) {
            candidates.push(CallActionCandidate.Chii);
          }

          if (this.canPon(hand, context)) {
            candidates.push(CallActionCandidate.Pon);
          }

          if (this.canKan(hand, context)) {
            candidates.push(CallActionCandidate.Kan);
          }

          if (this.canRon(hand, context)) {
            candidates.push(CallActionCandidate.Ron);
          }

          return [hand.seat, new CallAction(candidates)];
        })
        .filter(([, action]) => action.candidates.length === 1),
    );

    return new CallActions(actions);
  }

  private canRonWithThirteenOrphans(
    hand: IHand,
    context: CallResolutionContext,
  ): boolean {
    const shapes = this.thirteenOrphansWinningHandShapeResolver.resolve(
      hand.concealed,
      hand.melds,
      context.target,
    );

    return shapes.length > 0;
  }

  public constructor(
    thirteenOrphansWinningHandShapeResolver: IWinningHandShapeResolver,
  ) {
    this.thirteenOrphansWinningHandShapeResolver =
      thirteenOrphansWinningHandShapeResolver;
  }
}

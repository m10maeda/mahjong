import { CallActions } from './call-actions';
import {
  CallResolutionType,
  type CallResolutionContext,
} from './call-resolution-context';
import {
  AllPassCallResolutionResult,
  ClaimCallResolutionResult,
  PendingCallResolutionResult,
  RonCallResolutionResult,
  type CallResolutionResult,
} from './call-resolution-result';
import { SeatPosition } from '../../table';
import { type ReactiveRoundSessionCommand } from '../commands';
import { RonType } from '../events/won/won-with-ron';

import type { CallCandidatesFinder } from './call-candidates-finder/call-candidates-finder';
import type { ICallResolution } from './call-resolution';

export class CallResolutionWithDoubleRon implements ICallResolution {
  private readonly actions: CallActions;

  private readonly callActionsFinder: CallCandidatesFinder;

  private readonly discardFrom?: SeatPosition;

  private readonly type: CallResolutionType;

  public canReceive(command: ReactiveRoundSessionCommand): boolean {
    const candidates = this.actions.get(command.reactor);

    return candidates.accepts(command);
  }

  public hasPendingActions(): boolean {
    if (this.actions.isEmpty()) return false;

    if (this.actions.every((action) => action.isCalled())) return false;

    if (
      [...this.actions].some(
        ([, action]) => action.hasRon() && !action.isCalled(),
      )
    )
      return true;

    if (
      [...this.actions].some(
        ([, action]) =>
          (action.hasKan() || action.hasPon()) && !action.isCalled(),
      )
    )
      return true;

    return [...this.actions].some(
      ([, action]) => action.hasChii() && !action.isCalled(),
    );
  }

  public receive(
    command: ReactiveRoundSessionCommand,
  ): readonly [CallResolutionResult, CallResolutionWithDoubleRon] {
    const nextActions = this.actions.map(([seat, candidates]) => {
      if (!seat.equals(command.reactor)) return [seat, candidates];

      return [seat, candidates.accept(command)];
    });
    const nextResolution = new CallResolutionWithDoubleRon(
      this.callActionsFinder,
      nextActions,
      this.type,
      this.discardFrom,
    );

    // 全座席がパスした場合、パス結果を返す
    if (nextActions.every((action) => action.isPassed())) {
      return [new AllPassCallResolutionResult(), nextResolution];
    }

    const canRonActions = nextActions.findAll((action) => action.hasRon());

    // ロン可能座席が複数
    if (canRonActions.length > 1) {
      // すべてのロン可能座席がロン済みの場合、ロン成立結果を返す
      if (canRonActions.every((action) => action[1].isCalled())) {
        const winners = canRonActions.map(([seat]) => seat) as [
          SeatPosition,
          ...SeatPosition[],
        ];

        return [
          new RonCallResolutionResult(
            this.type !== CallResolutionType.Discard
              ? RonType.Chankan
              : RonType.Normal,
            winners,
          ),
          nextResolution,
        ];
      }

      // 一部のロン可能座席が未リアクションの場合、未解決結果を返す
      return [new PendingCallResolutionResult(), nextResolution];
    }

    const [canKanSeat, canKanAction] = nextActions.find((action) =>
      action.hasKan(),
    ) ?? [undefined, undefined];

    // カン可能座席あり
    if (canKanAction) {
      // カン可能座席が未リアクションの場合、未解決結果を返す
      if (canKanAction.acceptedCommand === undefined)
        return [new PendingCallResolutionResult(), nextResolution];

      // カン済みの場合、カン成立結果を返す
      return [
        new ClaimCallResolutionResult(canKanSeat, canKanAction.acceptedCommand),
        nextResolution,
      ];
    }

    const [canPonSeat, canPonAction] = nextActions.find((action) =>
      action.hasPon(),
    ) ?? [undefined, undefined];

    // ポン可能座席あり
    if (canPonAction) {
      // ポン可能座席が未リアクションの場合、未解決結果を返す
      if (canPonAction.acceptedCommand === undefined)
        return [new PendingCallResolutionResult(), nextResolution];

      // ポン済みの場合、カン成立結果を返す
      return [
        new ClaimCallResolutionResult(canPonSeat, canPonAction.acceptedCommand),
        nextResolution,
      ];
    }

    const [canChiiSeat, canChiiAction] = nextActions.find((action) =>
      action.hasChii(),
    ) ?? [undefined, undefined];

    // チー可能座席あり
    if (canChiiAction?.isCalled()) {
      // チー可能座席が未リアクションの場合、未解決結果を返す
      if (canChiiAction.acceptedCommand === undefined)
        return [new PendingCallResolutionResult(), nextResolution];

      // チー済みの場合、チー成立結果を返す
      return [
        new ClaimCallResolutionResult(
          canChiiSeat,
          canChiiAction.acceptedCommand,
        ),
        nextResolution,
      ];
    }

    // 上記以外の場合、未解決結果を返す
    return [new PendingCallResolutionResult(), nextResolution];
  }

  public start(context: CallResolutionContext): CallResolutionWithDoubleRon {
    if (context.type === CallResolutionType.ClosedKan)
      return this.startWithClosedKan(context);

    if (context.type === CallResolutionType.AddedKan)
      return this.startWithAddedKan(context);

    return this.startWithDiscard(context);
  }

  private startWithAddedKan(
    context: CallResolutionContext,
  ): CallResolutionWithDoubleRon {
    const actions = this.callActionsFinder.findAllWithAddedKan(context);

    return new CallResolutionWithDoubleRon(
      this.callActionsFinder,
      actions,
      context.type,
      context.from,
    );
  }

  private startWithClosedKan(
    context: CallResolutionContext,
  ): CallResolutionWithDoubleRon {
    const actions = this.callActionsFinder.findAllWithClosedKan(context);

    return new CallResolutionWithDoubleRon(
      this.callActionsFinder,
      actions,
      context.type,
      context.from,
    );
  }

  private startWithDiscard(
    context: CallResolutionContext,
  ): CallResolutionWithDoubleRon {
    const actions = this.callActionsFinder.findAllWithDiscard(context);

    return new CallResolutionWithDoubleRon(
      this.callActionsFinder,
      actions,
      context.type,
      context.from,
    );
  }

  public constructor(
    callCandidatesFinder: CallCandidatesFinder,
    actions: CallActions,
    type: CallResolutionType,
    discardFrom?: SeatPosition,
  ) {
    this.callActionsFinder = callCandidatesFinder;
    this.actions = actions;
    this.type = type;
    this.discardFrom = discardFrom;
  }
}

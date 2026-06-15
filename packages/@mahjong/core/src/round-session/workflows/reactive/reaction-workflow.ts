import {
  AllPassCallResolutionResult,
  ClaimCallResolutionResult,
  RonCallResolutionResult,
} from '../../call-resolution';
import { RoundSessionTransition } from '../round-session-transition';
import { AcceptedChiiCallWorkflow } from './accepted-chii-call-workflow';
import { AcceptedKanCallWorkflow } from './accepted-kan-call-workflow';
import { AcceptedPonCallWorkflow } from './accepted-pon-call-workflow';
import {
  ChiiCall,
  OpenKanCall,
  PonCall,
  type ReactiveRoundSessionCommand,
} from '../../commands';
import { AbortiveDrawn, AbortiveDrawReason, WonWithRon } from '../../events';
import { NextTurnProcessor } from '../next-turn-processor/next-turn-processor';

import type { IRonSpecification } from './ron-specification';
import type { ITripleRonAbortiveDrawSpecification } from './triple-ron-abortive-draw-specification';
import type { RoundSession } from '../../round-session';
import type { IRoundSessionWorkflow } from '../round-session-workflow';

export class ReactionWorkflow implements IRoundSessionWorkflow<ReactiveRoundSessionCommand> {
  private readonly acceptedChiiCallWorkflow: AcceptedChiiCallWorkflow;

  private readonly acceptedKanCallWorkflow: AcceptedKanCallWorkflow;

  private readonly acceptedPonCallWorkflow: AcceptedPonCallWorkflow;

  private readonly nextTurnProcessor: NextTurnProcessor;

  private readonly ronSpec: IRonSpecification;

  private readonly tripleRonAbortiveDrawSpec: ITripleRonAbortiveDrawSpecification;

  public execute(
    command: ReactiveRoundSessionCommand,
    session: RoundSession,
  ): RoundSessionTransition {
    if (!session.canAcceptCall(command)) throw new TypeError();

    const [result, receivedSession] = session.acceptCall(command);

    if (!result.isResolved())
      return new RoundSessionTransition([], receivedSession);

    // ロン宣言が優先された場合
    if (result instanceof RonCallResolutionResult) {
      if (
        !result.winners.every((winner) =>
          this.ronSpec.isSatisfiedBy(session, winner),
        )
      )
        throw new TypeError();

      // 三家和成立の場合
      if (this.tripleRonAbortiveDrawSpec.isSatisfiedBy(result))
        new RoundSessionTransition([
          new AbortiveDrawn(AbortiveDrawReason.TripleRon, session.round),
        ]);

      return new RoundSessionTransition([
        new WonWithRon(receivedSession.round, result.winners, result.type),
      ]);
    }

    // カン宣言が優先された場合
    if (
      result instanceof ClaimCallResolutionResult &&
      result.resolvedCommand instanceof OpenKanCall
    )
      return this.acceptedKanCallWorkflow.execute(
        result.resolvedCommand,
        receivedSession,
      );

    // ポン宣言が優先された場合
    if (
      result instanceof ClaimCallResolutionResult &&
      result.resolvedCommand instanceof PonCall
    )
      return this.acceptedPonCallWorkflow.execute(
        result.resolvedCommand,
        receivedSession,
      );

    // チー宣言が優先された場合
    if (
      result instanceof ClaimCallResolutionResult &&
      result.resolvedCommand instanceof ChiiCall
    )
      return this.acceptedChiiCallWorkflow.execute(
        result.resolvedCommand,
        receivedSession,
      );

    if (result instanceof AllPassCallResolutionResult)
      return this.nextTurnProcessor.execute(session);

    throw new RangeError();
  }

  public constructor(
    acceptedKanCallWorkflow: AcceptedKanCallWorkflow,
    acceptedPonCallWorkflow: AcceptedPonCallWorkflow,
    acceptedChiiCallWorkflow: AcceptedChiiCallWorkflow,
    nextTurnProcessor: NextTurnProcessor,
    ronSpec: IRonSpecification,
    tripleRonAbortiveDrawSpec: ITripleRonAbortiveDrawSpecification,
  ) {
    this.acceptedKanCallWorkflow = acceptedKanCallWorkflow;
    this.acceptedPonCallWorkflow = acceptedPonCallWorkflow;
    this.acceptedChiiCallWorkflow = acceptedChiiCallWorkflow;
    this.nextTurnProcessor = nextTurnProcessor;
    this.ronSpec = ronSpec;
    this.tripleRonAbortiveDrawSpec = tripleRonAbortiveDrawSpec;
  }
}

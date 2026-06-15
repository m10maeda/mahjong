import {
  OpenTripletMelded,
  PonCallAccepted,
  RiichiEstablished,
  type RoundSessionEvent,
} from '../../events';
import { RoundSessionTransition } from '../round-session-transition';

import type { PonCall } from '../../commands';
import type { RoundSession } from '../../round-session';
import type { IRoundSessionWorkflow } from '../round-session-workflow';

export class AcceptedPonCallWorkflow implements IRoundSessionWorkflow<PonCall> {
  public execute(
    command: PonCall,
    session: RoundSession,
  ): RoundSessionTransition {
    const nextSession = session.skipTurnTo(command.reactor);

    // 保留している立直宣言があれば、立直成立へ
    const [declarer, establishedPendingRiichiSession] =
      nextSession.establishPendingRiichi();

    const events: RoundSessionEvent[] =
      declarer !== undefined
        ? [
            new RiichiEstablished(
              declarer,
              establishedPendingRiichiSession.round,
            ),
          ]
        : [];

    if (command.candidates.length === 1) {
      const [pair] = command.candidates;
      const [reference, meldedSession] =
        establishedPendingRiichiSession.meldOpenTriplet(
          command.claimTile,
          command.claimOn,
          pair,
          command.reactor,
        );

      events.push(
        new OpenTripletMelded(
          reference,
          command.reactor,
          [...pair],
          command.claimOn,
          command.claimTile,
          meldedSession.round,
        ),
      );

      return new RoundSessionTransition(events, meldedSession);
    }

    events.push(
      new PonCallAccepted(
        command.reactor,
        command.candidates,
        establishedPendingRiichiSession.round,
      ),
    );

    return new RoundSessionTransition(events, establishedPendingRiichiSession);
  }
}

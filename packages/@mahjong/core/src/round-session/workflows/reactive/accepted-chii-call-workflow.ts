import {
  ChiiCallAccepted,
  OpenSequenceMelded,
  RiichiEstablished,
  RoundSessionEvent,
} from '../../events';
import { RoundSessionTransition } from '../round-session-transition';

import type { ChiiCall } from '../../commands';
import type { RoundSession } from '../../round-session';
import type { IRoundSessionWorkflow } from '../round-session-workflow';

export class AcceptedChiiCallWorkflow implements IRoundSessionWorkflow<ChiiCall> {
  public execute(
    command: ChiiCall,
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
      const [serialPair] = command.candidates;
      const [reference, meldedSession] =
        establishedPendingRiichiSession.meldOpenSequence(
          command.claimTile,
          command.claimOn,
          serialPair,
          command.reactor,
        );

      events.push(
        new OpenSequenceMelded(
          reference,
          [...serialPair],
          command.claimOn,
          command.claimTile,
          command.reactor,
          meldedSession.round,
        ),
      );

      return new RoundSessionTransition(events, meldedSession);
    }

    events.push(
      new ChiiCallAccepted(
        command.reactor,
        command.candidates,
        establishedPendingRiichiSession.round,
      ),
    );

    return new RoundSessionTransition(events, nextSession);
  }
}

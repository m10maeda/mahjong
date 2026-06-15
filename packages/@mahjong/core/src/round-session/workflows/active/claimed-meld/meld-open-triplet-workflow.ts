import { OpenTripletMelded } from '../../../events';
import { RoundSessionTransition } from '../../round-session-transition';

import type { MeldOpenTriplet } from '../../../commands';
import type { RoundSession } from '../../../round-session';
import type { IRoundSessionWorkflow } from '../../round-session-workflow';

export class MeldOpenTripletWorkflow implements IRoundSessionWorkflow<MeldOpenTriplet> {
  public execute(
    command: MeldOpenTriplet,
    session: RoundSession,
  ): RoundSessionTransition {
    if (!session.isTurnOf(command.seat))
      throw new TypeError('Melder must be active seat.');

    const [reference, meldedSession] = session.meldOpenTriplet(
      command.claimedTile,
      command.claimedOn,
      command.pair,
      command.seat,
    );

    const events = [
      new OpenTripletMelded(
        reference,
        command.seat,
        [...command.pair],
        command.claimedOn,
        command.claimedTile,
        meldedSession.round,
      ),
    ];

    return new RoundSessionTransition(events, meldedSession);
  }
}

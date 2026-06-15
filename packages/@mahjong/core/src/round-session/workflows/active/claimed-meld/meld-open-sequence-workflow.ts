import { OpenSequenceMelded } from '../../../events';
import { RoundSessionTransition } from '../../round-session-transition';

import type { MeldOpenSequence } from '../../../commands';
import type { RoundSession } from '../../../round-session';
import type { IRoundSessionWorkflow } from '../../round-session-workflow';

export class MeldOpenSequenceWorkflow implements IRoundSessionWorkflow<MeldOpenSequence> {
  public execute(
    command: MeldOpenSequence,
    session: RoundSession,
  ): RoundSessionTransition {
    if (!session.isTurnOf(command.seat))
      throw new TypeError('Melder must be active seat.');

    const [reference, meldedSession] = session.meldOpenSequence(
      command.claimedTile,
      command.claimedOn,
      command.serialPair,
      command.seat,
    );

    const events = [
      new OpenSequenceMelded(
        reference,
        [...command.serialPair],
        command.claimedOn,
        command.claimedTile,
        command.seat,
        meldedSession.round,
      ),
    ];

    return new RoundSessionTransition(events, meldedSession);
  }
}

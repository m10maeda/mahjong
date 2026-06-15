import {
  TileDiscardedWithoutRiichi,
  type RoundSessionEvent,
} from '../../../events';
import { NextTurnProcessor } from '../../next-turn-processor/next-turn-processor';
import { RoundSessionTransition } from '../../round-session-transition';

import type { DiscardTileWithoutRiichiAfterClaimed } from '../../../commands';
import type { RoundSession } from '../../../round-session';
import type { IRoundSessionWorkflow } from '../../round-session-workflow';

export class DiscardTileWithoutRiichiAfterClaimedWorkflow implements IRoundSessionWorkflow<DiscardTileWithoutRiichiAfterClaimed> {
  private readonly nextTurnProcessor: NextTurnProcessor;

  public execute(
    command: DiscardTileWithoutRiichiAfterClaimed,
    session: RoundSession,
  ): RoundSessionTransition {
    if (!session.isTurnOf(command.seat))
      throw new TypeError('Tile discarded seat must be active seat.');

    const [discardedTile, discardedSession] = session.discardFromConcealed(
      command.tile,
    );
    const events: RoundSessionEvent[] = [
      new TileDiscardedWithoutRiichi(
        discardedTile,
        command.seat,
        false,
        discardedSession.round,
      ),
    ];

    // ロン、カン、ポン、チー可能な場合
    if (discardedSession.hasPendingActions())
      return new RoundSessionTransition(events, discardedSession);

    return this.nextTurnProcessor.execute(discardedSession, events);
  }

  public constructor(nextTurnProcessor: NextTurnProcessor) {
    this.nextTurnProcessor = nextTurnProcessor;
  }
}

import {
  TileDiscardedWithoutRiichi,
  type RoundSessionEvent,
} from '../../../events';
import { NextTurnProcessor } from '../../next-turn-processor';
import { RoundSessionTransition } from '../../round-session-transition';

import type { DiscardTileWithoutRiichiAfterDrawn } from '../../../commands';
import type { RoundSession } from '../../../round-session';
import type { IRoundSessionWorkflow } from '../../round-session-workflow';

export class DiscardTileWithoutRiichiAfterDrawnWorkflow implements IRoundSessionWorkflow<DiscardTileWithoutRiichiAfterDrawn> {
  private readonly nextTurnProcessor: NextTurnProcessor;

  public execute(
    command: DiscardTileWithoutRiichiAfterDrawn,
    session: RoundSession,
  ): RoundSessionTransition {
    if (!session.isTurnOf(command.seat))
      throw new TypeError('Tile discarded seat must be active seat.');

    // 立直済みの場合、ツモ切り以外禁止
    if (session.isRiichiOf(command.seat)) {
      if (!command.fromDrawnTile)
        throw new TypeError(
          'After riichi declaration con not draw from concealed.',
        );
    }

    const [discardTile, discardedSession] = command.fromDrawnTile
      ? session.discardFromDrawnTile()
      : session.discardFromConcealed(command.tile);

    const events: RoundSessionEvent[] = [
      new TileDiscardedWithoutRiichi(
        discardTile,
        command.seat,
        command.fromDrawnTile,
        session.round,
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

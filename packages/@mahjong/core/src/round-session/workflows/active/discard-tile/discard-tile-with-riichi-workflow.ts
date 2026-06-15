import { RoundSessionEvent, TileDiscardedWithRiichi } from '../../../events';
import { NextTurnProcessor } from '../../next-turn-processor/next-turn-processor';
import { RoundSessionTransition } from '../../round-session-transition';

import type { DiscardTileWithRiichi } from '../../../commands';
import type { RoundSession } from '../../../round-session';
import type { IRoundSessionWorkflow } from '../../round-session-workflow';

export class DiscardTileWithRiichiWorkflow implements IRoundSessionWorkflow<DiscardTileWithRiichi> {
  private readonly nextTurnProcessor: NextTurnProcessor;

  public execute(
    command: DiscardTileWithRiichi,
    session: RoundSession,
  ): RoundSessionTransition {
    if (!session.isTurnOf(command.seat))
      throw new TypeError('Tile discarded seat must be active seat.');
    if (session.isRiichiOf(command.seat))
      throw new TypeError('Active seat already declared riichi.');
    if (!session.canDrawAgainNextAround())
      throw new TypeError('Can not riichi declaration no draw turn.');

    const [discardTile, discardedSession] = command.fromDrawnTile
      ? session.discardFromDrawnTile()
      : session.discardFromConcealed(command.tile);

    const declaredRiichiSession = discardedSession.declareRiichi(command.seat);

    const events: RoundSessionEvent[] = [
      new TileDiscardedWithRiichi(
        discardTile,
        command.seat,
        command.fromDrawnTile,
        declaredRiichiSession.round,
      ),
    ];

    // ロン、カン、ポン、チー可能な場合
    if (declaredRiichiSession.hasPendingActions())
      return new RoundSessionTransition(events, declaredRiichiSession);

    return this.nextTurnProcessor.execute(declaredRiichiSession, events);
  }

  public constructor(nextTurnProcessor: NextTurnProcessor) {
    this.nextTurnProcessor = nextTurnProcessor;
  }
}

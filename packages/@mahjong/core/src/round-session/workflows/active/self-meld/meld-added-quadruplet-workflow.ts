import {
  AbortiveDrawn,
  AbortiveDrawReason,
  AddedQuadrupletMelded,
  TileDrawnFromDeadWall,
  type RoundSessionEvent,
} from '../../../events';
import { RoundSessionTransition } from '../../round-session-transition';

import type { MeldAddedQuadruplet } from '../../../commands';
import type { RoundSession } from '../../../round-session';
import type { IFourKanAbortiveDrawSpecification } from '../../four-kan-abortive-draw-specification';
import type { IRoundSessionWorkflow } from '../../round-session-workflow';

export class MeldAddedQuadrupletWorkflow implements IRoundSessionWorkflow<MeldAddedQuadruplet> {
  private readonly fourKanSpec: IFourKanAbortiveDrawSpecification;

  public execute(
    command: MeldAddedQuadruplet,
    session: RoundSession,
  ): RoundSessionTransition {
    if (!session.isTurnOf(command.seat))
      throw new TypeError('Melder must be active seat.');
    if (!session.hasTakableDeadWallTile())
      throw new TypeError('No takable dead wall tales.');

    const meldedSession = session.meldAddedQuadruplet(
      command.baseMeld,
      command.consumedTile,
      command.seat,
    );

    const events: RoundSessionEvent[] = [
      new AddedQuadrupletMelded(
        command.baseMeld,
        command.consumedTile,
        command.seat,
        session.round,
      ),
    ];

    // チャンカン可能な場合
    if (meldedSession.hasPendingActions())
      return new RoundSessionTransition(events, meldedSession);

    // チャンカン不可能な場合
    // かつ、四開槓条件の場合
    if (this.fourKanSpec.isSatisfiedBy(meldedSession))
      return new RoundSessionTransition([
        ...events,
        new AbortiveDrawn(AbortiveDrawReason.FourKans, meldedSession.round),
      ]);

    // チャンカン不可能な場合
    // かつ、四開槓条件ではない場合
    const [drawnTile, drawnTileFromDeadWallSession] = meldedSession
      .skipTurnTo(command.seat)
      .drawTileFromDeadWall();

    events.push(
      new TileDrawnFromDeadWall(
        drawnTile,
        command.seat,
        drawnTileFromDeadWallSession.round,
      ),
    );

    return new RoundSessionTransition(events, drawnTileFromDeadWallSession);
  }

  public constructor(fourKanSpec: IFourKanAbortiveDrawSpecification) {
    this.fourKanSpec = fourKanSpec;
  }
}

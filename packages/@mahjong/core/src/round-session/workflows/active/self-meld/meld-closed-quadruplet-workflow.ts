import {
  AbortiveDrawn,
  AbortiveDrawReason,
  ClosedQuadrupletMelded,
  DoraIncremented,
  RoundSessionEvent,
  TileDrawnFromDeadWall,
} from '../../../events';
import { RoundSessionTransition } from '../../round-session-transition';

import type { MeldClosedQuadruplet } from '../../../commands';
import type { RoundSession } from '../../../round-session';
import type { IFourKanAbortiveDrawSpecification } from '../../four-kan-abortive-draw-specification';
import type { IRoundSessionWorkflow } from '../../round-session-workflow';

export class MeldClosedQuadrupletWorkflow implements IRoundSessionWorkflow<MeldClosedQuadruplet> {
  private readonly fourKanSpec: IFourKanAbortiveDrawSpecification;

  public execute(
    command: MeldClosedQuadruplet,
    session: RoundSession,
  ): RoundSessionTransition {
    if (!session.isTurnOf(command.seat))
      throw new TypeError('Melder must be active seat.');
    if (!session.hasTakableDeadWallTile())
      throw new TypeError('No takable dead wall tales.');

    // FIXME: 待ちの変わるカンを禁止

    const [reference, meldedSession] = session.meldClosedQuadruplet(
      command.consumedTiles,
      command.seat,
    );

    const events: RoundSessionEvent[] = [
      new ClosedQuadrupletMelded(
        reference,
        command.consumedTiles,
        command.seat,
        meldedSession.round,
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
      new DoraIncremented(drawnTileFromDeadWallSession.round),
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

import {
  AbortiveDrawn,
  AbortiveDrawReason,
  OpenQuadrupletMelded,
  RiichiEstablished,
  TileDrawnFromDeadWall,
} from '../../events';
import { RoundSessionTransition } from '../round-session-transition';

import type { OpenKanCall } from '../../commands';
import type { RoundSession } from '../../round-session';
import type { IFourKanAbortiveDrawSpecification } from '../four-kan-abortive-draw-specification';
import type { IRoundSessionWorkflow } from '../round-session-workflow';

export class AcceptedKanCallWorkflow implements IRoundSessionWorkflow<OpenKanCall> {
  private readonly fourKanSpec: IFourKanAbortiveDrawSpecification;

  public execute(
    command: OpenKanCall,
    session: RoundSession,
  ): RoundSessionTransition {
    if (!session.hasTakableDeadWallTile())
      throw new TypeError('No takable dead wall tales.');

    const [reference, meldedSession] = session.meldOpenQuadruplet(
      command.claimTile,
      command.claimOn,
      command.consumeTiles,
      command.reactor,
    );

    const meldedEvent = new OpenQuadrupletMelded(
      reference,
      command.consumeTiles,
      command.claimOn,
      command.claimTile,
      command.reactor,
      meldedSession.round,
    );

    // 四開槓成立の場合
    if (this.fourKanSpec.isSatisfiedBy(meldedSession))
      return new RoundSessionTransition([
        meldedEvent,
        new AbortiveDrawn(AbortiveDrawReason.FourKans, meldedSession.round),
      ]);

    // 四開槓非成立の場合
    const [drawnTile, drawnSession] = meldedSession
      .skipTurnTo(command.reactor)
      .drawTileFromDeadWall();

    // 保留している立直宣言があれば、立直成立へ
    const [declarer, establishedPendingRiichiSession] =
      drawnSession.establishPendingRiichi();

    if (declarer !== undefined)
      return new RoundSessionTransition(
        [
          meldedEvent,
          new RiichiEstablished(
            declarer,
            establishedPendingRiichiSession.round,
          ),
          new TileDrawnFromDeadWall(
            drawnTile,
            drawnSession.activeSeat,
            drawnSession.round,
          ),
        ],
        establishedPendingRiichiSession,
      );

    return new RoundSessionTransition(
      [
        meldedEvent,
        new TileDrawnFromDeadWall(
          drawnTile,
          drawnSession.activeSeat,
          drawnSession.round,
        ),
      ],
      drawnSession,
    );
  }

  public constructor(fourKanSpec: IFourKanAbortiveDrawSpecification) {
    this.fourKanSpec = fourKanSpec;
  }
}

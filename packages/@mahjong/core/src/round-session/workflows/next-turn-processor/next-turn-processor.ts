import {
  AbortiveDrawn,
  AbortiveDrawReason,
  DoraIncremented,
  ExhaustiveDrawn,
  NagashiManganOccurred,
  RiichiEstablished,
  TileDrawnFromLiveWall,
  type RoundSessionEvent,
} from '../../events';
import { RoundSessionTransition } from '../round-session-transition';

import type { RoundSession } from '../../round-session';
import type { INagashiManganEvaluator } from '../nagashi-mangan-evaluator';
import type { IFourRiichiAbortiveDrawSpecification } from './four-riichi-abortive-draw-specification';
import type { IFourWindsOutInFirstAroundAbortiveDrawSpecification } from './four-winds-out-in-first-around-abortive-draw-specification';

export class NextTurnProcessor {
  private readonly fourRiichiAbortiveDrawSpec: IFourRiichiAbortiveDrawSpecification;

  private readonly fourWindAbortiveDrawSpec: IFourWindsOutInFirstAroundAbortiveDrawSpecification;

  private readonly nagashiManganEvaluator: INagashiManganEvaluator;

  public execute(
    session: RoundSession,
    events: RoundSessionEvent[] = [],
  ): RoundSessionTransition {
    // 四風子連打成立の場合
    if (this.fourWindAbortiveDrawSpec.isSatisfiedBy(session))
      return new RoundSessionTransition([
        ...events,
        new AbortiveDrawn(
          AbortiveDrawReason.FourWindsOutInFirstAround,
          session.round,
        ),
      ]);

    // 保留している立直宣言があれば、立直成立へ
    const [declarer, establishedPendingRiichiSession] =
      session.establishPendingRiichi();

    if (declarer !== undefined) {
      events.push(
        new RiichiEstablished(declarer, establishedPendingRiichiSession.round),
      );
    }

    // 四軒立直成立の場合
    if (
      this.fourRiichiAbortiveDrawSpec.isSatisfiedBy(
        establishedPendingRiichiSession,
      )
    )
      return new RoundSessionTransition([
        ...events,
        new AbortiveDrawn(
          AbortiveDrawReason.FourRiichi,
          establishedPendingRiichiSession.round,
        ),
      ]);

    // 山牌が尽きた場合
    if (!establishedPendingRiichiSession.hasLiveWallTile()) {
      // 流し満貫
      const nagashiManganWinners =
        this.nagashiManganEvaluator.findQualifiedSeats(
          establishedPendingRiichiSession,
        );
      if (nagashiManganWinners !== undefined) {
        return new RoundSessionTransition([
          ...events,
          new NagashiManganOccurred(
            nagashiManganWinners,
            establishedPendingRiichiSession.round,
          ),
        ]);
      }

      return new RoundSessionTransition([
        ...events,
        new ExhaustiveDrawn(establishedPendingRiichiSession.round),
      ]);
    }

    // ツモ番を移動
    const [drawnTile, drawTileSession] = establishedPendingRiichiSession
      .moveToNextTurn()
      .drawTileFromLiveWall();

    events.push(
      new TileDrawnFromLiveWall(
        drawnTile,
        drawTileSession.activeSeat,
        drawTileSession.round,
      ),
    );

    // 明カン、または加カン後で打牌のドラを増やす必要がある場合
    if (drawTileSession.hasPendingDoraIndicatorAddition())
      return new RoundSessionTransition(
        [...events, new DoraIncremented(drawTileSession.round)],
        drawTileSession.addDoraIndicator(),
      );

    return new RoundSessionTransition([...events], drawTileSession);
  }

  public constructor(
    fourRiichiAbortiveDrawSpec: IFourRiichiAbortiveDrawSpecification,
    fourWindAbortiveDrawSpec: IFourWindsOutInFirstAroundAbortiveDrawSpecification,
    nagashiManganEvaluator: INagashiManganEvaluator,
  ) {
    this.fourRiichiAbortiveDrawSpec = fourRiichiAbortiveDrawSpec;
    this.fourWindAbortiveDrawSpec = fourWindAbortiveDrawSpec;
    this.nagashiManganEvaluator = nagashiManganEvaluator;
  }
}

import { CallResolutionContext, CallResolutionType } from './call-resolution';
import { ReactiveRoundSessionCommand } from './commands';

import type { IBoard } from './board/board';
import type { CallResolutionResult, ICallResolution } from './call-resolution';
import type { IHand } from './hand';
import type { MeldReference } from './meld-reference';
import type { Around, Turn } from './turn';
import type { Round } from '../round/round';
import type { SeatPosition } from '../table';
import type { Tile } from '../tile';
import type { RiichiStatuses } from './riichi-statuses';

export class RoundSession {
  public readonly round: Round;

  private readonly board: IBoard;

  private readonly callResolution: ICallResolution;

  private readonly riichiStatuses: RiichiStatuses;

  private readonly turn: Turn;

  public get activeSeat(): SeatPosition {
    return this.turn.activeSeat;
  }

  public get around(): Around {
    return this.turn.around;
  }

  public acceptCall(
    command: ReactiveRoundSessionCommand,
  ): readonly [CallResolutionResult, RoundSession] {
    const [result, nextCallResolution] = this.callResolution.receive(command);

    return [
      result,
      new RoundSession(
        this.board,
        this.turn,
        nextCallResolution,
        this.riichiStatuses,
        this.round,
      ),
    ];
  }

  public addDoraIndicator(): RoundSession {
    return new RoundSession(
      this.board.addDoraIndicator(),
      this.turn,
      this.callResolution,
      this.riichiStatuses,
      this.round,
    );
  }

  public canAcceptCall(command: ReactiveRoundSessionCommand): boolean {
    return this.callResolution.canReceive(command);
  }

  public canDrawAgainNextAround(): boolean {
    return this.board.canDrawAgainNextAround();
  }

  public declareRiichi(seat: SeatPosition): RoundSession {
    return new RoundSession(
      this.board,
      this.turn,
      this.callResolution,
      this.riichiStatuses.declare(seat, this.isFirstAround()),
      this.round,
    );
  }

  public discardFromConcealed(tile: Tile): readonly [Tile, RoundSession] {
    const nextBoard = this.board.discardFromConcealed(tile, this.activeSeat);
    const nextCallResolution = this.callResolution.start(
      this.createCallResolutionContext(CallResolutionType.Discard, tile),
    );

    return [
      tile,
      new RoundSession(
        nextBoard,
        this.turn,
        nextCallResolution,
        this.riichiStatuses,
        this.round,
      ),
    ];
  }

  public discardFromDrawnTile(): readonly [Tile, RoundSession] {
    const [discardTile, nextBoard] = this.board.discardDrawnTile(
      this.activeSeat,
    );
    const nextCallResolution = this.callResolution.start(
      this.createCallResolutionContext(CallResolutionType.Discard, discardTile),
    );

    return [
      discardTile,
      new RoundSession(
        nextBoard,
        this.turn,
        nextCallResolution,
        this.riichiStatuses,
        this.round,
      ),
    ];
  }

  public drawTileFromDeadWall(): readonly [Tile, RoundSession] {
    const [drawnTile, nextBoard] = this.board.drawFromDeadWall(this.activeSeat);

    return [
      drawnTile,
      new RoundSession(
        nextBoard,
        this.turn,
        this.callResolution,
        this.riichiStatuses,
        this.round,
      ),
    ];
  }

  public drawTileFromLiveWall(): readonly [Tile, RoundSession] {
    const [drawnTile, nextBoard] = this.board.drawFromLiveWall(this.activeSeat);

    return [
      drawnTile,
      new RoundSession(
        nextBoard,
        this.turn,
        this.callResolution,
        this.riichiStatuses,
        this.round,
      ),
    ];
  }

  public establishPendingRiichi(): readonly [
    SeatPosition | undefined,
    RoundSession,
  ] {
    const [declarer, nextRiichiStatuses] = this.riichiStatuses.establish();

    return [
      declarer,
      new RoundSession(
        this.board,
        this.turn,
        this.callResolution,
        nextRiichiStatuses,
        this.round,
      ),
    ];
  }

  public establishRiichi(declarer: SeatPosition): RoundSession {
    const [, nextRiichiStatuses] = this.riichiStatuses
      .declare(declarer, this.isFirstAround())
      .establish();

    return new RoundSession(
      this.board,
      this.turn,
      this.callResolution,
      nextRiichiStatuses,
      this.round,
    );
  }

  public getAllDiscardedTilesOf(seat: SeatPosition): readonly Tile[] {
    return this.board.getAllDiscardedTilesOf(seat);
  }

  public getHandOf(seat: SeatPosition): IHand {
    return this.board.getHandOf(seat);
  }

  public hasLiveWallTile(): boolean {
    return this.board.hasLiveWallTile();
  }

  public hasPendingActions(): boolean {
    return this.callResolution.hasPendingActions();
  }

  public hasPendingDoraIndicatorAddition(): boolean {
    return this.board.hasPendingDoraIndicatorAddition();
  }

  public hasTakableDeadWallTile(): boolean {
    return this.board.hasTakableDeadWallTile();
  }

  public isFirstAround(): boolean {
    return this.turn.isFirstAround();
  }

  public isRiichiOf(seat: SeatPosition): boolean {
    return this.riichiStatuses.establishOf(seat);
  }

  public isTurnOf(seat: SeatPosition): boolean {
    return this.turn.of(seat);
  }

  public meldAddedQuadruplet(
    reference: MeldReference,
    consumeTile: Tile,
    seat: SeatPosition,
  ): RoundSession {
    const nextCallResolution = this.callResolution.start(
      this.createCallResolutionContext(
        CallResolutionType.AddedKan,
        consumeTile,
      ),
    );

    return new RoundSession(
      this.board.meldAddedQuadruplet(reference, consumeTile, seat),
      this.turn,
      nextCallResolution,
      this.riichiStatuses,
      this.round,
    );
  }

  public meldClosedQuadruplet(
    consumeTiles: readonly [Tile, Tile, Tile, Tile],
    seat: SeatPosition,
  ): readonly [MeldReference, RoundSession] {
    const [reference, nextBoard] = this.board.meldClosedQuadruplet(
      consumeTiles,
      seat,
    );

    const nextCallResolution = this.callResolution.start(
      this.createCallResolutionContext(
        CallResolutionType.ClosedKan,
        consumeTiles[0],
      ),
    );

    return [
      reference,
      new RoundSession(
        nextBoard,
        this.turn,
        nextCallResolution,
        this.riichiStatuses,
        this.round,
      ),
    ];
  }

  public meldOpenQuadruplet(
    claimTile: Tile,
    claimOn: SeatPosition,
    consumeTiles: readonly [Tile, Tile, Tile],
    seat: SeatPosition,
  ): readonly [MeldReference, RoundSession] {
    const [reference, nextBoard] = this.board.meldOpenQuadruplet(
      claimTile,
      claimOn,
      consumeTiles,
      seat,
    );

    return [
      reference,
      new RoundSession(
        nextBoard,
        this.turn,
        this.callResolution,
        this.riichiStatuses,
        this.round,
      ),
    ];
  }

  public meldOpenSequence(
    claimTile: Tile,
    claimOn: SeatPosition,
    consumeTiles: readonly [Tile, Tile],
    seat: SeatPosition,
  ): readonly [MeldReference, RoundSession] {
    const [reference, nextBoard] = this.board.meldOpenSequence(
      claimTile,
      claimOn,
      consumeTiles,
      seat,
    );

    return [
      reference,
      new RoundSession(
        nextBoard,
        this.turn,
        this.callResolution,
        this.riichiStatuses,
        this.round,
      ),
    ];
  }

  public meldOpenTriplet(
    claimTile: Tile,
    claimOn: SeatPosition,
    consumeTiles: readonly [Tile, Tile],
    seat: SeatPosition,
  ): readonly [MeldReference, RoundSession] {
    const [reference, nextBoard] = this.board.meldOpenTriplet(
      claimTile,
      claimOn,
      consumeTiles,
      seat,
    );

    return [
      reference,
      new RoundSession(
        nextBoard,
        this.turn,
        this.callResolution,
        this.riichiStatuses,
        this.round,
      ),
    ];
  }

  public moveToNextTurn(): RoundSession {
    return new RoundSession(
      this.board,
      this.turn.next(),
      this.callResolution,
      this.riichiStatuses,
      this.round,
    );
  }

  public skipTurnTo(seat: SeatPosition): RoundSession {
    return new RoundSession(
      this.board,
      this.turn.skipTo(seat),
      this.callResolution,
      this.riichiStatuses,
      this.round,
    );
  }

  private createCallResolutionContext(
    type: CallResolutionType,
    target: Tile,
  ): CallResolutionContext {
    return new CallResolutionContext(
      type,
      target,
      this.activeSeat,
      this.board.getAllHands(),
    );
  }

  public constructor(
    board: IBoard,
    turn: Turn,
    callResolution: ICallResolution,
    riichiStatuses: RiichiStatuses,
    round: Round,
  ) {
    this.board = board;
    this.turn = turn;
    this.callResolution = callResolution;
    this.riichiStatuses = riichiStatuses;
    this.round = round;
  }
}

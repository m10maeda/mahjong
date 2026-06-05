import type { SeatPosition, Tile } from '../../concepts';
import type { IHand } from '../hand';
import type { MeldReference } from '../meld-reference';

export interface IBoard {
  get lastDiscardTile(): Tile | undefined;
  get blindDoraIndicators(): readonly Tile[];
  get doraIndicators(): readonly Tile[];
  addDoraIndicator(): IBoard;
  canDrawAgainNextAround(): boolean;
  declareRiichi(seat: SeatPosition, isFirstAround: boolean): IBoard;
  discardDrawnTile(seat: SeatPosition): readonly [Tile, IBoard];
  discardFromConcealed(tile: Tile, seat: SeatPosition): IBoard;
  drawFromDeadWall(seat: SeatPosition): readonly [Tile, IBoard];
  drawFromLiveWall(seat: SeatPosition): readonly [Tile, IBoard];
  establishPendingRiichi(): readonly [SeatPosition | undefined, IBoard];
  getAllDiscardedTilesOf(seat: SeatPosition): readonly Tile[];
  getAllHands(): readonly IHand[];
  getHandOf(seat: SeatPosition): IHand;
  hasLiveWallTile(): boolean;
  hasPendingDoraIndicatorAddition(): boolean;
  hasTakableDeadWallTile(): boolean;
  isRiichiOf(seat: SeatPosition): boolean;
  meldAddedQuadruplet(
    reference: MeldReference,
    addTile: Tile,
    seat: SeatPosition,
  ): IBoard;
  meldClosedQuadruplet(
    consumeTiles: readonly [Tile, Tile, Tile, Tile],
    seat: SeatPosition,
  ): readonly [MeldReference, IBoard];
  meldOpenQuadruplet(
    claimTile: Tile,
    claimOn: SeatPosition,
    consumeTiles: readonly [Tile, Tile, Tile],
    seat: SeatPosition,
  ): readonly [MeldReference, IBoard];
  meldOpenSequence(
    claimTile: Tile,
    claimOn: SeatPosition,
    consumeTiles: readonly [Tile, Tile],
    seat: SeatPosition,
  ): readonly [MeldReference, IBoard];
  meldOpenTriplet(
    claimTile: Tile,
    claimOn: SeatPosition,
    consumeTiles: readonly [Tile, Tile],
    seat: SeatPosition,
  ): readonly [MeldReference, IBoard];
}

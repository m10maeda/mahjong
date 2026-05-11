export { Turn } from './turn';

export {
  BoardEvent,
  BoardInitialized,
  TurnBasedEvent,
  TileDrawn,
  TileDrawnSource,
  TileDiscarded,
  Melded,
  Meld,
  SequenceMelded,
  OpenSequence,
  TripletMelded,
  OpenTriplet,
  OpenQuadrupletMelded,
  OpenQuadruplet,
  ClosedQuadrupletMelded,
  ClosedQuadruplet,
  AddedQuadrupletMelded,
  AddedQuadruplet,
  type IBoardEventPublisher,
  type IBoardEventSubscriber,
} from './event';

export type { IBoardCommandHandler } from './board-command-handler';

export {
  type IBoardCommandApplier,
  BoardCommand,
} from './board-command-applier';

export { Board } from './board';
export { Wall } from './wall';
export { DeadWall } from './dead-wall';
export {
  Hand,
  MeldOperation,
  MeldTileGroup,
  InvalidTileNotHeldError,
} from './hand';
export { DiscardPile } from './discard-pile';

export { Hands } from './hands';

export {
  DrawTileFromWall,
  DrawTileFromDeadWall,
  DiscardTile,
  MeldAddedQuadruplet,
  MeldClosedQuadruplet,
  MeldOpenQuadruplet,
  MeldSequence,
  MeldTriplet,
} from './command';

export {
  type IWallReader,
  WallProjection,
  type IHandReader,
  HandProjection,
  type IDiscardPileReader,
  DiscardPileProjection,
  DiscardedRecord,
} from './reader';

export { InvalidNoTilesError } from './invalid-no-tiles-error';
export { InvalidHolderNotFoundError } from './invalid-holder-not-found-error';
export { InvalidMismatchClaimedTileError } from './invalid-mismatch-claimed-tile-error';
export { InvalidDuplicatedSeatsError } from './invalid-duplicated-seats-error';

export { TileSet, TileSetType } from './tile-set';

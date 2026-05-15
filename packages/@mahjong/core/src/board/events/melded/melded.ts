import { BoardEvent } from '../board-event';

import type { Tile, SeatPosition } from '../../../concepts';
import type { MeldReference } from '../../concepts';

export abstract class Melded extends BoardEvent {
  public readonly consumedTiles: readonly Tile[];

  public readonly reference: MeldReference;

  public readonly seat: SeatPosition;

  public constructor(
    reference: MeldReference,
    seat: SeatPosition,
    consumedTiles: readonly Tile[],
  ) {
    super();

    this.reference = reference;
    this.seat = seat;
    this.consumedTiles = consumedTiles;
  }
}

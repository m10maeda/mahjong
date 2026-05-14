import { BoardEvent } from '../board-event';

import type { MeldReference } from './meld-reference';
import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';

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

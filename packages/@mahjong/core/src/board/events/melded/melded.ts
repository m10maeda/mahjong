import { BoardEvent } from '../board-event';

import type { MeldReference } from './meld-reference';
import type { SeatPosition } from '../../../seat-position';
import type { Tile } from '../../../tile';

export abstract class Melded extends BoardEvent {
  public readonly consumedTiles: readonly Tile[];

  public readonly melder: SeatPosition;

  public readonly reference: MeldReference;

  public constructor(
    reference: MeldReference,
    consumedTiles: readonly Tile[],
    melder: SeatPosition,
  ) {
    super();

    this.reference = reference;
    this.consumedTiles = consumedTiles;
    this.melder = melder;
  }
}

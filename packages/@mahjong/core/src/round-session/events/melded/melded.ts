import { RoundSessionEvent } from '../round-session-event';

import type { Tile, SeatPosition, Round } from '../../../concepts';
import type { MeldReference } from '../../meld-reference';

export abstract class Melded extends RoundSessionEvent {
  public readonly consumedTiles: readonly Tile[];

  public readonly reference: MeldReference;

  public readonly seat: SeatPosition;

  public constructor(
    reference: MeldReference,
    consumedTiles: readonly Tile[],
    seat: SeatPosition,
    round: Round,
  ) {
    super(round);

    this.reference = reference;
    this.seat = seat;
    this.consumedTiles = consumedTiles;
  }
}

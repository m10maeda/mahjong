import {
  BoardInitialized,
  TileDiscarded,
  TileDrawn,
  type BoardEvent,
} from '../../event';
import { InvalidHolderNotFoundError } from '../../invalid-holder-not-found-error';

import type { SeatPosition } from '../../../seat-position';
import type { Tile } from '../../../tile';

export class HandProjection {
  public readonly concealed: readonly Tile[];

  public readonly drawn?: Tile;

  public readonly seat: SeatPosition;

  public apply(event: BoardEvent): HandProjection {
    if (event instanceof BoardInitialized) {
      const dealtTiles = event.hands.get(this.seat);

      if (dealtTiles === undefined) throw new InvalidHolderNotFoundError();

      return new HandProjection(this.seat, dealtTiles);
    }

    if (event instanceof TileDrawn) {
      if (!event.drawer.equals(this.seat)) return this;

      return new HandProjection(this.seat, this.concealed, event.tile);
    }

    if (event instanceof TileDiscarded) {
      if (!event.discarder.equals(this.seat)) return this;
      if (!event.fromConcealed)
        return new HandProjection(this.seat, this.concealed);

      const newConcealed = this.concealed.filter((tile) =>
        tile.equals(event.tile),
      );
      return new HandProjection(
        this.seat,
        this.drawn ? [...newConcealed, this.drawn] : [...newConcealed],
      );
    }

    return this;
  }

  public constructor(
    seat: SeatPosition,
    concealed: readonly Tile[],
    drawn?: Tile,
  ) {
    this.seat = seat;
    this.concealed = concealed;
    this.drawn = drawn;
  }

  public static of(seat: SeatPosition): HandProjection {
    return new HandProjection(seat, []);
  }

  public static replay(
    seat: SeatPosition,
    events: readonly BoardEvent[],
  ): HandProjection {
    let projection = this.of(seat);

    for (const event of events) {
      projection = projection.apply(event);
    }

    return projection;
  }
}

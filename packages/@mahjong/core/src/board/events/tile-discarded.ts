import { BoardEvent } from './board-event';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';

export class TileDiscarded extends BoardEvent {
  public readonly discarder: SeatPosition;

  public readonly fromConcealed: boolean;

  public readonly tile: Tile;

  public constructor(
    tile: Tile,
    fromConcealed: boolean,
    discarder: SeatPosition,
  ) {
    super();

    this.tile = tile;
    this.fromConcealed = fromConcealed;
    this.discarder = discarder;
  }
}

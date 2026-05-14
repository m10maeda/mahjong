import { BoardCommand } from './board-command';

import type { SeatPosition } from '../../table';

export enum DrawTileSource {
  Wall,
  DeadWall,
}

export class DrawTile extends BoardCommand {
  public readonly seat: SeatPosition;

  public readonly source: DrawTileSource;

  public constructor(seat: SeatPosition, source: DrawTileSource) {
    super();

    this.seat = seat;
    this.source = source;
  }
}

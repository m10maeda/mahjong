import type { SeatPosition, Tile } from '../../concepts';

export class DiscardRecord {
  public readonly from: SeatPosition;

  public readonly tile: Tile;

  public constructor(tile: Tile, from: SeatPosition) {
    this.tile = tile;
    this.from = from;
  }
}

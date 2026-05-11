import type { SeatPosition } from '../../../seat-position';
import type { Tile } from '../../../tile';
import type { Turn } from '../../turn';

export class DiscardedRecord {
  public readonly seat: SeatPosition;

  public readonly tile: Tile;

  public readonly turn: Turn;

  public constructor(tile: Tile, seat: SeatPosition, turn: Turn) {
    this.tile = tile;
    this.seat = seat;
    this.turn = turn;
  }
}

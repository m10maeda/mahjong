import type { SeatPosition } from '../../../table';

export class MeldReference {
  public readonly seat: SeatPosition;

  public readonly sequence: number;

  public constructor(seat: SeatPosition, sequence: number) {
    this.seat = seat;
    this.sequence = sequence;
  }
}

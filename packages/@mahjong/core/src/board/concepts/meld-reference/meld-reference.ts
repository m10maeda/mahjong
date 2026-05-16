import type { MeldSequence } from './meld-sequence';
import type { SeatPosition } from '../../../concepts';

export class MeldReference {
  public readonly seat: SeatPosition;

  public readonly sequence: MeldSequence;

  public equals(other: MeldReference): boolean {
    return this.seat.equals(other.seat) && this.sequence.equals(other.sequence);
  }

  public constructor(seat: SeatPosition, sequence: MeldSequence) {
    this.seat = seat;
    this.sequence = sequence;
  }
}

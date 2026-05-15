import type { MeldSequence } from './meld-sequence';
import type { SeatPosition } from '../../../concepts';

export class MeldReference {
  public readonly seat: SeatPosition;

  public readonly sequence: MeldSequence;

  public constructor(seat: SeatPosition, sequence: MeldSequence) {
    this.seat = seat;
    this.sequence = sequence;
  }
}

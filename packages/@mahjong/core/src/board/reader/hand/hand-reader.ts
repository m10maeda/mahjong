import type { HandProjection } from './hand-projection';
import type { SeatPosition } from '../../../seat-position';

export interface IHandReader {
  getAllHands(): readonly HandProjection[];
  getHandBy(seat: SeatPosition): HandProjection | undefined;
}

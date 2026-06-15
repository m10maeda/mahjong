import type { SeatPosition } from '../../../table';
import type { RoundSession } from '../../round-session';

export interface IRonSpecification {
  isSatisfiedBy(session: RoundSession, declarer: SeatPosition): boolean;
}

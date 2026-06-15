import type { SeatPosition } from '../../../../table';
import type { RoundSession } from '../../../round-session';

export interface IDeclareSelfDrawWinSpecification {
  isSatisfiedBy(session: RoundSession, declarer: SeatPosition): boolean;
}

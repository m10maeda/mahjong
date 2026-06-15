import type { SeatPosition } from '../../table';
import type { RoundSession } from '../round-session';

export interface INagashiManganEvaluator {
  findQualifiedSeats(
    session: RoundSession,
  ): readonly [SeatPosition, ...SeatPosition[]] | undefined;
}

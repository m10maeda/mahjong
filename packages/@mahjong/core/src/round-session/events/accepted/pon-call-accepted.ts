import { RoundSessionEvent } from '../round-session-event';

import type { Round, SeatPosition } from '../../../concepts';
import type { Pair } from '../../../winning-hand-shape';

export class PonCallAccepted extends RoundSessionEvent {
  public readonly caller: SeatPosition;

  public readonly candidates: readonly [Pair, ...Pair[]];

  public constructor(
    caller: SeatPosition,
    candidates: readonly [Pair, ...Pair[]],
    round: Round,
  ) {
    super(round);

    this.candidates = candidates;
    this.caller = caller;
  }
}

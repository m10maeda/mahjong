import { RoundSessionEvent } from '../round-session-event';

import type { Round } from '../../../round';
import type { SeatPosition } from '../../../table';
import type { SerialPair } from '../../../winning-hand-shape';

export class ChiiCallAccepted extends RoundSessionEvent {
  public readonly caller: SeatPosition;

  public readonly candidates: readonly [SerialPair, ...SerialPair[]];

  public constructor(
    caller: SeatPosition,
    candidates: readonly [SerialPair, ...SerialPair[]],
    round: Round,
  ) {
    super(round);

    this.candidates = candidates;
    this.caller = caller;
  }
}

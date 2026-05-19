import { RoundSessionEvent } from './round-session-event';

import type { Round, SeatPosition } from '../../concepts';

type PlayersSize = 2 | 3 | 4;

export class RoundSessionStarted extends RoundSessionEvent {
  public readonly dealer: SeatPosition;

  public readonly playersSize: PlayersSize;

  public readonly seed: number;

  public constructor(
    round: Round,
    playersSize: PlayersSize,
    dealer: SeatPosition,
    seed: number,
  ) {
    super(round);

    this.playersSize = playersSize;
    this.dealer = dealer;
    this.seed = seed;
  }
}

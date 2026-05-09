import { HandSessionEvent } from './hand-session-event';

import type { Round } from '../../round';
import type { SeatPosition } from '../../seat-position';

type PlayersSize = 2 | 3 | 4;

export class HandSessionStarted extends HandSessionEvent {
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

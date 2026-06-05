import { RoundSessionCommand } from './round-session-command';

import type { Round } from '../../round';
import type { SeatPosition } from '../../table';

export class StartRoundSession extends RoundSessionCommand {
  public readonly dealer: SeatPosition;

  public readonly round: Round;

  public constructor(round: Round, dealer: SeatPosition) {
    super();

    this.round = round;
    this.dealer = dealer;
  }
}

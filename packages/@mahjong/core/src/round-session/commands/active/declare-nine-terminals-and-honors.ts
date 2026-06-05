import { RoundSessionCommand } from '../round-session-command';
import { ActiveRoundSessionCommand } from './active-round-session-command';

import type { SeatPosition } from '../../../table';

export class DeclareNineTerminalsAndHonors extends ActiveRoundSessionCommand {
  public readonly declarer: SeatPosition;

  public constructor(declarer: SeatPosition) {
    super();

    this.declarer = declarer;
  }

  public static isDeclareNineTerminalsAndHonors(
    command: RoundSessionCommand,
  ): command is DeclareNineTerminalsAndHonors {
    return command instanceof DeclareNineTerminalsAndHonors;
  }
}

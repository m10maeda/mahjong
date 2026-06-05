import { RoundSessionCommand } from '../round-session-command';

import type { SeatPosition } from '../../../concepts';

export abstract class ReactiveRoundSessionCommand extends RoundSessionCommand {
  public readonly reactor: SeatPosition;

  public constructor(reactor: SeatPosition) {
    super();

    this.reactor = reactor;
  }

  public static isReactiveRoundSessionCommand(
    command: RoundSessionCommand,
  ): command is ReactiveRoundSessionCommand {
    return command instanceof ReactiveRoundSessionCommand;
  }
}

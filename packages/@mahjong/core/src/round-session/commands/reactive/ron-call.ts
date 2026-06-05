import { ReactiveRoundSessionCommand } from './reactive-round-session-command';

import type { RoundSessionCommand } from '../round-session-command';

export class RonCall extends ReactiveRoundSessionCommand {
  public static isRonCall(command: RoundSessionCommand): command is RonCall {
    return command instanceof RonCall;
  }
}

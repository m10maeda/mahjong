import { RoundSessionCommand } from '../round-session-command';
import { ReactiveRoundSessionCommand } from './reactive-round-session-command';

export class PassCall extends ReactiveRoundSessionCommand {
  public static isPassCall(command: RoundSessionCommand): command is PassCall {
    return command instanceof PassCall;
  }
}

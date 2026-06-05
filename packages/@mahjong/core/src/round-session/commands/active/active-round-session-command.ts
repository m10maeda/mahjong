import { RoundSessionCommand } from '../round-session-command';

export abstract class ActiveRoundSessionCommand extends RoundSessionCommand {
  public static isActiveRoundSessionCommand(
    command: RoundSessionCommand,
  ): command is ActiveRoundSessionCommand {
    return command instanceof ActiveRoundSessionCommand;
  }
}

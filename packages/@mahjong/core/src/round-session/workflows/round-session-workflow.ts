import type { RoundSessionCommand } from '../commands';
import type { RoundSession } from '../round-session';
import type { RoundSessionTransition } from './round-session-transition';

export interface IRoundSessionWorkflow<TCommand extends RoundSessionCommand> {
  execute(command: TCommand, session: RoundSession): RoundSessionTransition;
}

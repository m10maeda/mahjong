import { WonWithSelfDraw } from '../../../events';
import { RoundSessionTransition } from '../../round-session-transition';

import type { IDeclareSelfDrawWinSpecification } from './declare-self-draw-win-specification';
import type { DeclareSelfDrawWin } from '../../../commands';
import type { RoundSession } from '../../../round-session';
import type { IRoundSessionWorkflow } from '../../round-session-workflow';

export class DeclareSelfDrawWinWorkflow implements IRoundSessionWorkflow<DeclareSelfDrawWin> {
  private readonly spec: IDeclareSelfDrawWinSpecification;

  public execute(
    command: DeclareSelfDrawWin,
    session: RoundSession,
  ): RoundSessionTransition {
    if (!session.isTurnOf(command.declarer)) throw new TypeError();
    if (!this.spec.isSatisfiedBy(session, command.declarer))
      throw new TypeError();

    const events = [
      new WonWithSelfDraw(session.round, command.declarer, command.source),
    ];

    return new RoundSessionTransition(events);
  }

  public constructor(spec: IDeclareSelfDrawWinSpecification) {
    this.spec = spec;
  }
}

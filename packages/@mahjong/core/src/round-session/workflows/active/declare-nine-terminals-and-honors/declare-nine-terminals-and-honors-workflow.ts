import { AbortiveDrawn, AbortiveDrawReason } from '../../../events';
import { RoundSessionTransition } from '../../round-session-transition';

import type { IDeclareNineTerminalsAndHonorsSpecification } from './declare-nine-terminals-and-honors-specification';
import type { DeclareNineTerminalsAndHonors } from '../../../commands';
import type { RoundSession } from '../../../round-session';
import type { IRoundSessionWorkflow } from '../../round-session-workflow';

export class DeclareNineTerminalsAndHonorsWorkflow implements IRoundSessionWorkflow<DeclareNineTerminalsAndHonors> {
  private readonly spec: IDeclareNineTerminalsAndHonorsSpecification;

  public execute(
    command: DeclareNineTerminalsAndHonors,
    session: RoundSession,
  ): RoundSessionTransition {
    if (!session.isTurnOf(command.declarer)) throw new TypeError();
    if (!session.isFirstAround()) throw new TypeError();

    const hand = session.getHandOf(command.declarer);

    if (!this.spec.isSatisfiedBy(hand)) throw new TypeError();

    const events = [
      new AbortiveDrawn(
        AbortiveDrawReason.NineTerminalsAndHonors,
        session.round,
      ),
    ];

    return new RoundSessionTransition(events);
  }

  public constructor(spec: IDeclareNineTerminalsAndHonorsSpecification) {
    this.spec = spec;
  }
}

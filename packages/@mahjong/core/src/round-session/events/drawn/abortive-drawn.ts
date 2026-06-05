import { RoundSessionEnded } from '../round-session-ended';

import type { Round } from '../../../round';

export enum AbortiveDrawReason {
  /** 九種九牌 */
  NineTerminalsAndHonors,

  /** 四開槓 */
  FourKans,

  /** 四家立直 */
  FourRiichi,

  /** 四風子連打 */
  FourWindsOutInFirstAround,

  /** 三家和 */
  TripleRon,
}

export class AbortiveDrawn extends RoundSessionEnded {
  public readonly reason: AbortiveDrawReason;

  public constructor(reason: AbortiveDrawReason, round: Round) {
    super(round);

    this.reason = reason;
  }
}

import { HandSessionEnded } from '../hand-session-ended';

import type { Round } from '../../../concepts';

export enum AbortiveReason {
  /** 九種九牌 */
  NineTerminalsAndHonors,

  /** 四開槓 */
  FourKans,

  /** 四家立直 */
  FourRiichi,

  /** 四風子連打 */
  FourWindsOutInFirstTurn,

  /** 三家和 */
  TripleRon,
}

export class AbortiveDrawn extends HandSessionEnded {
  public readonly reason: AbortiveReason;

  public constructor(round: Round, reason: AbortiveReason) {
    super(round);

    this.reason = reason;
  }
}

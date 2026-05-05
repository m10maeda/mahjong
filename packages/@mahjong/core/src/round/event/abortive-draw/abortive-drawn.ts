import { RoundEvent } from '../round-event';

import type { Round } from '../../round';

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

export abstract class AbortiveDrawn extends RoundEvent {
  public readonly reason: AbortiveReason;

  public constructor(round: Round, reason: AbortiveReason) {
    super(round);

    this.reason = reason;
  }
}

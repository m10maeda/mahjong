import { RoundEvent } from './round-event';

import type { Round } from '../round';

export enum RoundEndedReason {
  Win,
  ExhaustiveDraw,
  AbortiveDraw,
}

export class RoundEnded extends RoundEvent {
  public readonly reason: RoundEndedReason;

  public constructor(round: Round, reason: RoundEndedReason) {
    super(round);

    this.reason = reason;
  }
}

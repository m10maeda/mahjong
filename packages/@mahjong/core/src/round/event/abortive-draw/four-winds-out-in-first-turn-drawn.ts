import { AbortiveDrawn, AbortiveReason } from './abortive-drawn';

import type { Round } from '../../round';

export class FourWindsOutInFirstTurnDrawn extends AbortiveDrawn {
  public constructor(round: Round) {
    super(round, AbortiveReason.FourWindsOutInFirstTurn);
  }
}

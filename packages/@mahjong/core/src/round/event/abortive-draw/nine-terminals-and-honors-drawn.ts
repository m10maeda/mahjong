import { AbortiveDrawn, AbortiveReason } from './abortive-drawn';

import type { SeatPosition } from '../../../seat-position';
import type { Round } from '../../round';

export class NineTerminalsAndHonorsDrawn extends AbortiveDrawn {
  public readonly declared: SeatPosition;

  public constructor(round: Round, declared: SeatPosition) {
    super(round, AbortiveReason.NineTerminalsAndHonors);

    this.declared = declared;
  }
}

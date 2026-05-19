import { MahjongEvent } from '../../event';

import type { Round } from '../../concepts';

export abstract class RoundSessionEvent extends MahjongEvent {
  public readonly round: Round;

  public constructor(round: Round) {
    super();

    this.round = round;
  }
}

import { MahjongEvent } from '../../event';

import type { Round } from '../../round';

export abstract class HandSessionEvent extends MahjongEvent {
  public readonly round: Round;

  public constructor(round: Round) {
    super();

    this.round = round;
  }
}

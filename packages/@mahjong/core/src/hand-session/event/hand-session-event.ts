import type { Round } from '../../round';

export abstract class HandSessionEvent {
  public readonly round: Round;

  public constructor(round: Round) {
    this.round = round;
  }
}

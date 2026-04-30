import type { Round } from '../../round';

export abstract class BoardEvent {
  public readonly round: Round;

  public constructor(round: Round) {
    this.round = round;
  }
}

import type { Round } from '../../concepts';

export abstract class RoundSessionEvent {
  public readonly round: Round;

  public constructor(round: Round) {
    this.round = round;
  }
}

import { BoardEvent } from './board-event';

import type { Turn } from '../turn';

export abstract class TurnBasedEvent extends BoardEvent {
  public readonly turn: Turn;

  public constructor(turn: Turn) {
    super();

    this.turn = turn;
  }
}

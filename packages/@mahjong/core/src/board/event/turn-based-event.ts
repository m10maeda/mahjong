import { BoardEvent } from './board-event';

import type { Round } from '../../round';
import type { Turn } from '../turn';

export abstract class TurnBasedEvent extends BoardEvent {
  public readonly turn: Turn;

  public constructor(turn: Turn, round: Round) {
    super(round);

    this.turn = turn;
  }
}

import { RoundSessionEvent } from './round-session-event';

import type { Round, SeatPosition, Tile } from '../../concepts';
import type { Seed } from '../seed';

export class RoundSessionStarted extends RoundSessionEvent {
  public readonly deadWall: readonly Tile[];

  public readonly dealer: SeatPosition;

  public readonly hands: Map<SeatPosition, readonly Tile[]>;

  public readonly seed: Seed;

  public readonly wall: readonly Tile[];

  public constructor(
    wall: readonly Tile[],
    deadWall: readonly Tile[],
    hands: readonly (readonly [SeatPosition, readonly Tile[]])[],
    round: Round,
    dealer: SeatPosition,
    seed: Seed,
  ) {
    super(round);

    this.wall = wall;
    this.deadWall = deadWall;
    this.hands = new Map(hands);
    this.dealer = dealer;
    this.seed = seed;
  }
}

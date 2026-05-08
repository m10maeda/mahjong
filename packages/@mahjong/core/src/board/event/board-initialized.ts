import { BoardEvent } from './board-event';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';

export class BoardInitialized extends BoardEvent {
  public readonly deadWall: readonly Tile[];

  public readonly hands: Map<SeatPosition, readonly Tile[]>;

  public readonly wall: readonly Tile[];

  public constructor(
    wall: readonly Tile[],
    deadWall: readonly Tile[],
    hands: Map<SeatPosition, readonly Tile[]>,
  ) {
    super();

    this.wall = wall;
    this.deadWall = deadWall;
    this.hands = hands;
  }
}

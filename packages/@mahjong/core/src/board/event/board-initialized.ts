import { BoardEvent } from './board-event';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';

type WallIndex = number;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type DealtTile = {
  allocation: WallIndex;
  tile: Tile;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Wall = {
  deadWallStartIndex: WallIndex;
  tiles: readonly Tile[];
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type InitialHand = {
  seat: SeatPosition;
  tiles: readonly DealtTile[];
};

export class BoardInitialized extends BoardEvent {
  public readonly initialHands: readonly InitialHand[];

  public readonly wall: Wall;

  public constructor(wall: Wall, initialHands: readonly InitialHand[]) {
    super();

    this.wall = wall;
    this.initialHands = initialHands;
  }
}

import { Won } from './won';

import type { Round, SeatPosition } from '../../../concepts';

export enum TileDrawnSource {
  LiveWall,
  DeadWall,
}

export class WonWithSelfDraw extends Won {
  public readonly source: TileDrawnSource;

  public readonly winner: SeatPosition;

  public constructor(
    round: Round,
    winner: SeatPosition,
    source: TileDrawnSource,
  ) {
    super(round);

    this.winner = winner;
    this.source = source;
  }
}

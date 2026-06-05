import { Won } from './won';

import type { Round } from '../../../round';
import type { SeatPosition } from '../../../table';

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

import { BoardCommand } from './board-command';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';
import type { MeldReference } from '../events/melded';

export class ExtendMeld extends BoardCommand {
  public readonly baseMeld: MeldReference;

  public readonly consumedTiles: readonly Tile[];

  public readonly seat: SeatPosition;

  public constructor(
    seat: SeatPosition,
    consumedTiles: readonly Tile[],
    baseMeld: MeldReference,
  ) {
    super();

    this.seat = seat;
    this.consumedTiles = consumedTiles;
    this.baseMeld = baseMeld;
  }
}

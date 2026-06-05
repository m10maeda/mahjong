import { RoundSessionCommand } from '../round-session-command';
import { ActiveRoundSessionCommand } from './active-round-session-command';

import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';
import type { MeldReference } from '../../meld-reference';

export class MeldAddedQuadruplet extends ActiveRoundSessionCommand {
  public readonly baseMeld: MeldReference;

  public readonly consumedTile: Tile;

  public readonly seat: SeatPosition;

  public constructor(
    seat: SeatPosition,
    consumedTile: Tile,
    baseMeld: MeldReference,
  ) {
    super();

    this.seat = seat;
    this.consumedTile = consumedTile;
    this.baseMeld = baseMeld;
  }

  public static isExtendMeld(
    command: RoundSessionCommand,
  ): command is MeldAddedQuadruplet {
    return command instanceof MeldAddedQuadruplet;
  }
}

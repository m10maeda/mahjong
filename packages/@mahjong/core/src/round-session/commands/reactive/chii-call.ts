import { ReactiveRoundSessionCommand } from './reactive-round-session-command';

import type { SeatPosition, Tile } from '../../../concepts';
import type { SerialPair } from '../../../winning-hand-shape';
import type { RoundSessionCommand } from '../round-session-command';

export class ChiiCall extends ReactiveRoundSessionCommand {
  public readonly candidates: readonly [SerialPair, ...SerialPair[]];

  public readonly claimOn: SeatPosition;

  public readonly claimTile: Tile;

  public constructor(
    reactor: SeatPosition,
    claimTile: Tile,
    claimOn: SeatPosition,
    candidates: readonly [SerialPair, ...SerialPair[]],
  ) {
    super(reactor);

    this.claimTile = claimTile;
    this.claimOn = claimOn;
    this.candidates = candidates;
  }

  public static isChiiCall(command: RoundSessionCommand): command is ChiiCall {
    return command instanceof ChiiCall;
  }
}

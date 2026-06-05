import { ReactiveRoundSessionCommand } from './reactive-round-session-command';

import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';
import type { Pair } from '../../../winning-hand-shape';
import type { RoundSessionCommand } from '../round-session-command';

export class PonCall extends ReactiveRoundSessionCommand {
  public readonly candidates: readonly [Pair, ...Pair[]];

  public readonly claimOn: SeatPosition;

  public readonly claimTile: Tile;

  public constructor(
    reactor: SeatPosition,
    claimTile: Tile,
    claimOn: SeatPosition,
    candidates: readonly [Pair, ...Pair[]],
  ) {
    super(reactor);

    this.claimTile = claimTile;
    this.claimOn = claimOn;
    this.candidates = candidates;
  }

  public static isPonCall(command: RoundSessionCommand): command is PonCall {
    return command instanceof PonCall;
  }
}

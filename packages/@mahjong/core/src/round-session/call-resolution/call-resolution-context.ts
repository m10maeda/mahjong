import type { SeatPosition } from '../../table';
import type { Tile } from '../../tile';
import type { IHand } from '../hand';

export enum CallResolutionType {
  Discard,
  AddedKan,
  ClosedKan,
}

export class CallResolutionContext {
  public readonly discards: ReadonlyMap<SeatPosition, readonly Tile[]>;

  public readonly from: SeatPosition;

  public readonly reactionHandCandidates: readonly IHand[];

  public readonly target: Tile;

  public readonly type: CallResolutionType;

  public constructor(
    type: CallResolutionType,
    target: Tile,
    from: SeatPosition,
    reactionHandCandidates: readonly IHand[],
    discards: ReadonlyMap<SeatPosition, readonly Tile[]>,
  ) {
    this.type = type;
    this.target = target;
    this.from = from;
    this.reactionHandCandidates = reactionHandCandidates;
    this.discards = discards;
  }
}

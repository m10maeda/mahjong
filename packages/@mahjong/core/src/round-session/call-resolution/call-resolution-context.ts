import type { SeatPosition } from '../../table';
import type { Tile } from '../../tile';
import type { IHand } from '../hand';

export enum CallResolutionType {
  Discard,
  AddedKan,
  ClosedKan,
}

export class CallResolutionContext {
  public readonly from: SeatPosition;

  public readonly hands: readonly IHand[];

  public readonly target: Tile;

  public readonly type: CallResolutionType;

  public constructor(
    type: CallResolutionType,
    target: Tile,
    from: SeatPosition,
    hands: readonly IHand[],
  ) {
    this.type = type;
    this.target = target;
    this.from = from;
    this.hands = hands;
  }
}

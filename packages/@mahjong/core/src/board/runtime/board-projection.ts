import type { SeatPosition } from '../../seat-position';
import type { BoardEvent } from '../event';
import type {
  DiscardPileProjection,
  HandProjection,
  WallProjection,
} from '../reader';

export class BoardProjection {
  private _discardPile: DiscardPileProjection;

  private _hands: readonly HandProjection[];

  private _wall: WallProjection;

  public get discardPile(): DiscardPileProjection {
    return this._discardPile;
  }

  public get hands(): readonly HandProjection[] {
    return this._hands;
  }

  public get wall(): WallProjection {
    return this._wall;
  }

  public apply(event: BoardEvent): BoardProjection {
    return new BoardProjection(
      this._wall.apply(event),
      this._hands.map((hand) => hand.apply(event)),
      this.discardPile.apply(event),
    );
  }

  public getHandBy(seat: SeatPosition): HandProjection | undefined {
    return this._hands.find((hand) => hand.seat.equals(seat));
  }

  public constructor(
    wall: WallProjection,
    hands: readonly HandProjection[],
    discardPile: DiscardPileProjection,
  ) {
    this._wall = wall;
    this._hands = hands;
    this._discardPile = discardPile;
  }
}

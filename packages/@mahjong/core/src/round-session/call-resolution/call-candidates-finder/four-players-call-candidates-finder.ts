import { CallCandidatesFinder } from './call-candidates-finder';
import { SeatPosition } from '../../../table';

import type {
  IPairFinder,
  ISerialPairFinder,
  IWinningHandShapeResolver,
} from '../../../hand-analysis';
import type { IThreeTilesFinder } from '../../../hand-analysis/meld-source-finder/meld-source-finder';
import type { IHand } from '../../hand';
import type { CallResolutionContext } from '../call-resolution-context';

export class FourPlayersCallCandidatesFinder extends CallCandidatesFinder {
  private readonly pairFinder: IPairFinder;

  private readonly serialPairFinder: ISerialPairFinder;

  private readonly threeTilesFinder: IThreeTilesFinder;

  private readonly winningHandShapeResolver: IWinningHandShapeResolver;

  protected canChii(hand: IHand, context: CallResolutionContext): boolean {
    if (!hand.seat.equals(this.getNextSeatOf(context.from))) return false;

    return this.serialPairFinder.has(context.target, hand.concealed);
  }

  protected canKan(hand: IHand, context: CallResolutionContext): boolean {
    return this.threeTilesFinder.has(context.target, hand.concealed);
  }

  protected canPon(hand: IHand, context: CallResolutionContext): boolean {
    return this.pairFinder.has(context.target, hand.concealed);
  }

  protected canRon(hand: IHand, context: CallResolutionContext): boolean {
    const winningHandShapes = this.winningHandShapeResolver.resolve(
      hand.concealed,
      hand.melds,
      context.target,
    );
    const discards = context.discards.get(hand.seat);

    if (discards === undefined) throw new TypeError();

    if (winningHandShapes.length === 0) return false;
    if (
      !winningHandShapes.every((shape) =>
        shape.waitTiles.every(
          (waitTile) => !waitTile.equals(context.target.type),
        ),
      )
    )
      return false;

    // フリテン
    return !winningHandShapes.every((shape) =>
      shape.waitTiles.every(
        (waitTile) =>
          !discards.every((discardTile) => discardTile.type.equals(waitTile)),
      ),
    );
  }

  private getNextSeatOf(seat: SeatPosition): SeatPosition {
    switch (seat) {
      case SeatPosition.East:
        return SeatPosition.South;

      case SeatPosition.South:
        return SeatPosition.West;

      case SeatPosition.West:
        return SeatPosition.North;

      case SeatPosition.North:
        return SeatPosition.East;

      default:
        throw new RangeError();
    }
  }

  public constructor(
    pairFinder: IPairFinder,
    serialPairFinder: ISerialPairFinder,
    threeTilesFinder: IThreeTilesFinder,
    winningHandShapeResolver: IWinningHandShapeResolver,
    thirteenOrphansWinningHandShapeResolver: IWinningHandShapeResolver,
  ) {
    super(thirteenOrphansWinningHandShapeResolver);

    this.pairFinder = pairFinder;
    this.serialPairFinder = serialPairFinder;
    this.threeTilesFinder = threeTilesFinder;
    this.winningHandShapeResolver = winningHandShapeResolver;
  }
}

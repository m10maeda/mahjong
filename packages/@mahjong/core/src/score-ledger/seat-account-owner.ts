import { AccountOwner, AccountType } from './account-owner';
import { SeatPosition } from '../seat-position';

export class SeatAccountOwner extends AccountOwner {
  public static readonly East = new SeatAccountOwner(SeatPosition.East);
  public static readonly North = new SeatAccountOwner(SeatPosition.North);
  public static readonly South = new SeatAccountOwner(SeatPosition.South);
  public static readonly West = new SeatAccountOwner(SeatPosition.West);

  public readonly seatPosition: SeatPosition;

  public compareTo(other: SeatAccountOwner): number {
    return this.seatPosition.compareTo(other.seatPosition);
  }

  public equals(other: AccountOwner): boolean {
    if (!(other instanceof SeatAccountOwner)) return false;

    return this.seatPosition.equals(other.seatPosition);
  }

  public [Symbol.toPrimitive](
    hint: 'number' | 'string' | 'default' = 'default',
  ): number | string {
    if (hint === 'string') return this.toString();

    return this.seatPosition[Symbol.toPrimitive](hint);
  }

  public toString(): string {
    switch (this.seatPosition) {
      case SeatPosition.East:
        return 'East';

      case SeatPosition.South:
        return 'South';

      case SeatPosition.West:
        return 'West';

      case SeatPosition.North:
        return 'North';

      default:
        throw new Error();
    }
  }

  public valueOf(): number {
    return this.seatPosition.valueOf();
  }

  private constructor(seatPosition: SeatPosition) {
    super(AccountType.Seat);

    this.seatPosition = seatPosition;
  }
}

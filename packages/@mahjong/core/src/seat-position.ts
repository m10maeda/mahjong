enum Position {
  East,
  South,
  West,
  North,
}

export class SeatPosition {
  public static readonly East = new SeatPosition(Position.East);
  public static readonly North = new SeatPosition(Position.North);
  public static readonly South = new SeatPosition(Position.South);
  public static readonly West = new SeatPosition(Position.West);

  private readonly value: Position;

  public compareTo(other: SeatPosition): number {
    return this.value - other.value;
  }

  public equals(other: SeatPosition): boolean {
    return this.value === other.value;
  }

  public [Symbol.toPrimitive](
    hint: 'number' | 'string' | 'default' = 'default',
  ): number | string {
    if (hint === 'string') return this.toString();

    return this.value;
  }

  public toString(): string {
    switch (this.value) {
      case Position.East:
        return 'East';

      case Position.South:
        return 'South';

      case Position.West:
        return 'West';

      case Position.North:
        return 'North';

      default:
        throw new Error();
    }
  }

  public valueOf(): Position {
    return this.value;
  }

  private constructor(value: Position) {
    this.value = value;
  }
}

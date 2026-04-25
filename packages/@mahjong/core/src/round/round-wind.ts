enum Wind {
  East,
  South,
  West,
  North,
}

export class RoundWind {
  public static readonly East = new RoundWind(Wind.East);
  public static readonly North = new RoundWind(Wind.North);
  public static readonly South = new RoundWind(Wind.South);
  public static readonly West = new RoundWind(Wind.West);

  private readonly value: Wind;

  public compareTo(other: RoundWind): number {
    return this.value - other.value;
  }

  public equals(other: RoundWind): boolean {
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
      case Wind.East:
        return 'East';

      case Wind.South:
        return 'South';

      case Wind.West:
        return 'West';

      case Wind.North:
        return 'North';

      default:
        throw new Error();
    }
  }

  public valueOf(): Wind {
    return this.value;
  }

  private constructor(value: Wind) {
    this.value = value;
  }
}

export class Honba {
  public static readonly Zero = new Honba(0);

  private readonly value: number;

  public compareTo(other: Honba): number {
    return this.value - other.value;
  }

  public equals(other: Honba): boolean {
    return this.value === other.value;
  }

  public increase(): Honba {
    return new Honba(this.value + 1);
  }

  public reset(): Honba {
    return Honba.Zero;
  }

  public [Symbol.toPrimitive](
    hint: 'number' | 'string' | 'default' = 'default',
  ): number | string {
    if (hint === 'string') return this.toString();

    return this.value;
  }

  public toString(): string {
    return this.value.toString();
  }

  public valueOf(): number {
    return this.value;
  }

  public constructor(value: number) {
    if (!Number.isInteger(value)) throw new Error();
    if (value < 0) throw new Error();

    this.value = value;
  }
}

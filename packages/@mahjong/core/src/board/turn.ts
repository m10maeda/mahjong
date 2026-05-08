export class Turn {
  private readonly value: number;

  public advance(): Turn {
    return new Turn(this.value + 1);
  }

  public compareTo(other: Turn): number {
    return this.value - other.value;
  }

  public equals(other: Turn): boolean {
    return this.value === other.value;
  }

  public [Symbol.toPrimitive](
    hint: 'number' | 'string' | 'default' = 'default',
  ): number | string {
    if (hint === 'string') return this.toString();

    return this.value.valueOf();
  }

  public toString(): string {
    return this.value.toString();
  }

  public valueOf(): number {
    return this.value;
  }

  public constructor(value: number) {
    if (!Number.isInteger(value)) throw new Error();
    if (value < 1) throw new Error();

    this.value = value;
  }
}

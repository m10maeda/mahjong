export class RoundIndex {
  private readonly value: number;

  public compareTo(other: RoundIndex): number {
    return this.value - other.value;
  }

  public equals(other: RoundIndex): boolean {
    return this.value === other.value;
  }

  public next(): RoundIndex {
    return new RoundIndex(this.value + 1);
  }

  public reset(): RoundIndex {
    return new RoundIndex(1);
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
    if (value < 1) throw new Error();
    if (value > 4) throw new Error();

    this.value = value;
  }
}

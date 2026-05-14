export class RoundIndex {
  private readonly max: number;

  private readonly value: number;

  public advance(): RoundIndex {
    if (this.value === this.max) throw new RangeError();

    return new RoundIndex(this.value + 1, this.max);
  }

  public compareTo(other: RoundIndex): number {
    return this.value - other.value;
  }

  public equals(other: RoundIndex): boolean {
    return this.value === other.value;
  }

  public reset(): RoundIndex {
    return new RoundIndex(1, this.max);
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

  public constructor(value: number, max: number) {
    if (!Number.isInteger(value)) throw new TypeError();
    if (value < 1) throw new Error();
    if (!Number.isInteger(max)) throw new TypeError();
    if (max < 1) throw new Error();
    if (value > max) throw new RangeError();

    this.value = value;
    this.max = max;
  }
}

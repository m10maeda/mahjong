export class MeldSequence {
  private readonly value: number;

  public compareTo(other: MeldSequence): number {
    return this.value - other.value;
  }

  public equals(other: MeldSequence): boolean {
    return this.value === other.value;
  }

  public next(): MeldSequence {
    return new MeldSequence(this.value + 1);
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
    if (!Number.isInteger(value)) throw new TypeError();
    if (value < 0) throw new RangeError();

    this.value = value;
  }

  public static new(): MeldSequence {
    return new MeldSequence(0);
  }
}

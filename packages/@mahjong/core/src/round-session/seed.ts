export class Seed {
  private readonly value: number;

  public equals(other: Seed): boolean {
    return this.value === other.value;
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
    if (!Number.isInteger(value)) throw new TypeError('Seed must be integer');

    if (value < 0 || value > 0xffffffff)
      throw new RangeError('Seed must be uint32');

    this.value = value;
  }
}

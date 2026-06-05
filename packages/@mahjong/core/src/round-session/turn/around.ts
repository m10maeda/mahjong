export class Around {
  public static readonly First = new Around(1);

  private readonly value: number;

  public advance(): Around {
    return new Around(this.value + 1);
  }

  public compareTo(other: Around): number {
    return this.value - other.value;
  }

  public equals(other: Around): boolean {
    return this.value === other.value;
  }

  public isFirst(): boolean {
    return this.equals(Around.First);
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

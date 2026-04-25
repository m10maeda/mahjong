export class Point {
  public static readonly Zero = new Point(0);

  private readonly value: number;

  public absolute(): Point {
    return new Point(Math.abs(this.value));
  }

  public add(addend: Point): Point {
    return new Point(this.value + addend.value);
  }

  public compareTo(other: Point): number {
    return this.value - other.value;
  }

  public equals(other: Point): boolean {
    return this.value === other.value;
  }

  public isZero(): boolean {
    return this.value === 0;
  }

  public negate(): Point {
    return new Point(-Math.abs(this.value));
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
    if (value % 100 !== 0) throw new Error();

    this.value = value;
  }
}

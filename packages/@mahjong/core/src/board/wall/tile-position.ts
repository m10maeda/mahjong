export class TilePosition {
  public static readonly Min = new TilePosition(0);

  private readonly value: number;

  public advance(position: number): TilePosition {
    return new TilePosition(this.value + position);
  }

  public compareTo(other: TilePosition): number {
    return this.value - other.value;
  }

  public distanceTo(other: TilePosition): number {
    return Math.abs(this.value - other.value);
  }

  public equals(other: TilePosition): boolean {
    return this.value === other.value;
  }

  public isMin(): boolean {
    return this.equals(TilePosition.Min);
  }

  public next(): TilePosition {
    return new TilePosition(this.value + 1);
  }

  public previous(): TilePosition {
    return new TilePosition(this.value - 1);
  }

  public [Symbol.toPrimitive](
    hint: 'number' | 'string' | 'default' = 'default',
  ): number | string {
    if (hint === 'string') return this.toString();

    return this.valueOf();
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

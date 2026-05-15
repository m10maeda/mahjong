export class Rank {
  public static readonly 1 = new Rank(1);
  public static readonly 2 = new Rank(2);
  public static readonly 3 = new Rank(3);
  public static readonly 4 = new Rank(4);
  public static readonly 5 = new Rank(5);
  public static readonly 6 = new Rank(6);
  public static readonly 7 = new Rank(7);
  public static readonly 8 = new Rank(8);
  public static readonly 9 = new Rank(9);

  private readonly value: number;

  public compareTo(other: Rank): number {
    return this.value - other.value;
  }

  public equals(other: Rank): boolean {
    return this.value === other.value;
  }

  public isEdge() {
    return this.value === 1 || this.value === 9;
  }

  public toString(): string {
    return this.value.toString();
  }

  private constructor(value: number) {
    this.value = value;
  }
}

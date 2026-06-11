import { Rank } from './rank';
import { Suit } from './suit';
import { TileType } from './tile-type';

export class SuitType extends TileType {
  /* eslint-disable @typescript-eslint/member-ordering */
  public static readonly Character1 = new SuitType(Suit.Character, Rank[1]);
  public static readonly Character2 = new SuitType(Suit.Character, Rank[2]);
  public static readonly Character3 = new SuitType(Suit.Character, Rank[3]);
  public static readonly Character4 = new SuitType(Suit.Character, Rank[4]);
  public static readonly Character5 = new SuitType(Suit.Character, Rank[5]);
  public static readonly Character6 = new SuitType(Suit.Character, Rank[6]);
  public static readonly Character7 = new SuitType(Suit.Character, Rank[7]);
  public static readonly Character8 = new SuitType(Suit.Character, Rank[8]);
  public static readonly Character9 = new SuitType(Suit.Character, Rank[9]);

  public static readonly Circle1 = new SuitType(Suit.Circle, Rank[1]);
  public static readonly Circle2 = new SuitType(Suit.Circle, Rank[2]);
  public static readonly Circle3 = new SuitType(Suit.Circle, Rank[3]);
  public static readonly Circle4 = new SuitType(Suit.Circle, Rank[4]);
  public static readonly Circle5 = new SuitType(Suit.Circle, Rank[5]);
  public static readonly Circle6 = new SuitType(Suit.Circle, Rank[6]);
  public static readonly Circle7 = new SuitType(Suit.Circle, Rank[7]);
  public static readonly Circle8 = new SuitType(Suit.Circle, Rank[8]);
  public static readonly Circle9 = new SuitType(Suit.Circle, Rank[9]);

  public static readonly Bamboo1 = new SuitType(Suit.Bamboo, Rank[1]);
  public static readonly Bamboo2 = new SuitType(Suit.Bamboo, Rank[2]);
  public static readonly Bamboo3 = new SuitType(Suit.Bamboo, Rank[3]);
  public static readonly Bamboo4 = new SuitType(Suit.Bamboo, Rank[4]);
  public static readonly Bamboo5 = new SuitType(Suit.Bamboo, Rank[5]);
  public static readonly Bamboo6 = new SuitType(Suit.Bamboo, Rank[6]);
  public static readonly Bamboo7 = new SuitType(Suit.Bamboo, Rank[7]);
  public static readonly Bamboo8 = new SuitType(Suit.Bamboo, Rank[8]);
  public static readonly Bamboo9 = new SuitType(Suit.Bamboo, Rank[9]);
  /* eslint-enable @typescript-eslint/member-ordering */

  public readonly rank: Rank;

  public readonly suit: Suit;

  public equals(other: TileType): boolean {
    if (!(other instanceof SuitType)) return false;
    if (this.suit !== other.suit) return false;

    return this.rank.equals(other.rank);
  }

  public isHonor(): boolean {
    return false;
  }

  public isSuit(): boolean {
    return true;
  }

  public isTerminal(): boolean {
    return this.rank.isEdge();
  }

  public suits(other: SuitType): boolean {
    return this.suit === other.suit;
  }

  public toString(): string {
    return `${this.rank.toString()}${this.suit}`;
  }

  private constructor(suit: Suit, rank: Rank) {
    super();
    this.suit = suit;
    this.rank = rank;
  }
}

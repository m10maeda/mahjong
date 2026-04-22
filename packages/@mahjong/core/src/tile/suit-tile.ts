import { Tile } from './tile';
import { TileModifier } from './tile-modifier';

import type { Rank } from './rank';
import type { Suit } from './suit';

export class SuitTile extends Tile {
  public readonly rank: Rank;

  public readonly suit: Suit;

  private readonly _modifier: TileModifier;

  public get modifier(): TileModifier {
    return this._modifier;
  }

  public equals(other: Tile): boolean {
    if (!(other instanceof SuitTile)) return false;
    if (this.suit !== other.suit) return false;
    if (!this.rank.equals(other.rank)) return false;

    return this.modifier === other.modifier;
  }

  public isEdge(): boolean {
    return this.rank.isEdge();
  }

  public toString(): string {
    if (this.modifier === TileModifier.Red)
      return `${this.rank.toString()}${this.suit}}r`;

    return `${this.rank.toString()}${this.suit}}`;
  }

  public types(other: SuitTile): boolean {
    return this.suit === other.suit;
  }

  public constructor(suit: Suit, rank: Rank, modifier: TileModifier) {
    super();

    this.suit = suit;
    this.rank = rank;
    this._modifier = modifier;
  }
}

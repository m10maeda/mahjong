import { TileModifier } from './tile-modifier';

import type { TileType } from './tile-type';

export class Tile {
  public type: TileType;

  private modifier: TileModifier;

  public equals(other: Tile): boolean {
    return this.type.equals(other.type) && this.modifier === other.modifier;
  }

  public hasSameTypeAs(other: Tile): boolean {
    return this.type.equals(other.type);
  }

  public isHonor(): boolean {
    return this.type.isHonor();
  }

  public isRed(): boolean {
    return this.modifier === TileModifier.Red;
  }

  public isTerminal(): boolean {
    return this.type.isTerminal();
  }

  public toString(): string {
    if (this.modifier === TileModifier.Red) return `${this.type.toString()}r`;

    return this.type.toString();
  }

  public constructor(type: TileType, modifier: TileModifier) {
    this.type = type;
    this.modifier = modifier;
  }
}

import type { TileModifier } from './tile-modifier';

export abstract class Tile {
  public abstract get modifier(): TileModifier;

  public abstract equals(other: Tile): boolean;
  public abstract isSameTileAs(other: Tile): boolean;
  public abstract toString(): string;
}

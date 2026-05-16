import { Honor } from './honor';
import { Tile } from './tile';
import { TileModifier } from './tile-modifier';

export class HonorTile extends Tile {
  public readonly honor: Honor;

  private readonly _modifier: TileModifier;

  public get modifier(): TileModifier {
    return this._modifier;
  }

  public equals(other: Tile): boolean {
    if (!(other instanceof HonorTile)) return false;

    return this.honor === other.honor && this.modifier === other.modifier;
  }

  public toString(): string {
    if (this.modifier === TileModifier.Red) return `${this.honor.toString()}zr`;

    return `${this.honor.toString()}z`;
  }

  public constructor(honor: Honor, modifier: TileModifier) {
    super();

    this.honor = honor;
    this._modifier = modifier;
  }
}

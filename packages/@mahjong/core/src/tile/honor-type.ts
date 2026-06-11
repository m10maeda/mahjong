import { Honor } from './honor';
import { TileType } from './tile-type';

export class HonorType extends TileType {
  /* eslint-disable @typescript-eslint/member-ordering */
  public static readonly East = new HonorType(Honor.East);
  public static readonly South = new HonorType(Honor.South);
  public static readonly West = new HonorType(Honor.West);
  public static readonly North = new HonorType(Honor.North);

  public static readonly White = new HonorType(Honor.White);
  public static readonly Green = new HonorType(Honor.Green);
  public static readonly Red = new HonorType(Honor.Red);
  /* eslint-enable @typescript-eslint/member-ordering */

  public readonly honor: Honor;

  public equals(other: TileType): boolean {
    if (!(other instanceof HonorType)) return false;

    return this.honor === other.honor;
  }

  public isHonor(): boolean {
    return true;
  }

  public isSuit(): boolean {
    return false;
  }

  public isTerminal(): boolean {
    return false;
  }

  public toString(): string {
    return `${this.honor.toString()}z`;
  }

  private constructor(honor: Honor) {
    super();

    this.honor = honor;
  }
}

import type { Tile } from '../../concepts';

export enum MeldType {
  Sequence,
  Triplet,
  ClosedQuadruplet,
  OpenQuadruplet,
  AddedQuadruplet,
}

export abstract class Meld implements Iterable<Tile> {
  private readonly type: MeldType;

  protected abstract get tiles(): readonly Tile[];

  public isQuadruplet(): boolean {
    if (this.type === MeldType.ClosedQuadruplet) return true;
    if (this.type === MeldType.OpenQuadruplet) return true;
    if (this.type === MeldType.AddedQuadruplet) return true;

    return false;
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public constructor(type: MeldType) {
    this.type = type;
  }
}

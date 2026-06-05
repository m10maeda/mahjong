import { TileGroup } from '../tile-group';

export enum TileGroupType {
  Sequence,
  Triplet,
  Quadruplet,
}

export enum TileGroupExposure {
  Concealed,
  Open,
}

export abstract class CompleteTileGroup extends TileGroup {
  public readonly exposure: TileGroupExposure;

  public readonly type: TileGroupType;

  public isOpen(): boolean {
    return this.exposure === TileGroupExposure.Open;
  }

  public constructor(type: TileGroupType, exposure: TileGroupExposure) {
    super();

    this.type = type;
    this.exposure = exposure;
  }
}

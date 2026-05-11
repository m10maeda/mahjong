import { TileDrawn, type BoardEvent } from '../../event';

export class WallProjection {
  public readonly tilesCount: number;

  public apply(event: BoardEvent): WallProjection {
    if (!(event instanceof TileDrawn)) return this;

    return new WallProjection(this.tilesCount - 1);
  }

  public constructor(tilesCount: number) {
    this.tilesCount = tilesCount;
  }
}

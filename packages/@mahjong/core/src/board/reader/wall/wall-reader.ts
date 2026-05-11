import type { WallProjection } from './wall-projection';

export interface IWallReader {
  getWall(): WallProjection;
}

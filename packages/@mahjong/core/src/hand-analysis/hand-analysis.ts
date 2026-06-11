import type { Tile, TileType } from '../tile';
import type { WinningHandShape } from '../winning-hand-shape';

export interface IHandAnalysis {
  get waitTiles(): readonly TileType[];
  findAllWinningHandShapes(): readonly WinningHandShape[];
  findAllWinningHandShapesWith(tile: Tile): readonly WinningHandShape[];
}

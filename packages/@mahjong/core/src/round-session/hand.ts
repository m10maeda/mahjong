import type { SeatPosition } from '../table';
import type { Tile, TileType } from '../tile';
import type { Pair, SerialPair, WinningHandShape } from '../winning-hand-shape';
import type { Meld } from './melds';

export interface IHand {
  get seat(): SeatPosition;
  get drawnTile(): Tile | undefined;
  get waitTiles(): readonly TileType[];
  get concealed(): readonly Tile[];
  get melds(): readonly Meld[];
  findAllPairCandidatesWith(tile: Tile): readonly Pair[];
  findAllSerialPairCandidatesWith(tile: Tile): readonly SerialPair[];
  findAllWinningHandShapes(): readonly WinningHandShape[];
  findAllWinningHandShapesWith(tile: Tile): readonly WinningHandShape[];
  isRiichi(): boolean;
  isTenpai(): boolean;
  owns(seat: SeatPosition): boolean;
}

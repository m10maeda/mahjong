import type { SeatPosition } from '../table';
import type { Tile } from '../tile';
import type { Pair, SerialPair } from '../winning-hand-shape';
import type { Meld } from './melds';

export interface IHand {
  get seat(): SeatPosition;
  get drawnTile(): Tile | undefined;
  get concealed(): readonly Tile[];
  get melds(): readonly Meld[];
  findAllPairCandidatesWith(tile: Tile): readonly Pair[];
  findAllSerialPairCandidatesWith(tile: Tile): readonly SerialPair[];
  owns(seat: SeatPosition): boolean;
}

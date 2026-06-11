import type { SeatPosition } from '../table';
import type { Tile } from '../tile';
import type { Meld } from './melds';

export interface IHand {
  get seat(): SeatPosition;
  get drawnTile(): Tile | undefined;
  get concealed(): readonly Tile[];
  get melds(): readonly Meld[];
  owns(seat: SeatPosition): boolean;
}

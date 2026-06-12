import type { Meld } from '../../round-session';
import type { Tile } from '../../tile';
import type { WinningHandShape } from '../../winning-hand-shape';

export interface IWinningHandShapeResolver {
  resolve(
    concealed: readonly Tile[],
    melds: readonly Meld[],
    winningTile: Tile,
  ): readonly WinningHandShape[];
}

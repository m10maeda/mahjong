import type { TileGroupDecomposition } from './tile-group-decomposition';
import type { Tile } from '../../../../concepts';
import type { Pair, SerialPair } from '../../../../winning-hand-shape';

export interface IConcealedHand extends Iterable<Tile> {
  drawnTile?: Tile;
  get decompose(): readonly TileGroupDecomposition[];
  get serialPairs(): readonly SerialPair[];
  consume(...tiles: readonly Tile[]): IConcealedHand;
  discard(tile: Tile): IConcealedHand;
  discardDrawnTile(): readonly [Tile, IConcealedHand];
  draw(tile: Tile): IConcealedHand;
  findAllPairCandidatesWith(tile: Tile): readonly Pair[];
  findAllSerialPairCandidatesWith(tile: Tile): readonly SerialPair[];
}

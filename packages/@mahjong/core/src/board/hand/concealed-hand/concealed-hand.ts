import type { TileGroupDecomposition } from '../../../hand-analysis';
import type { Tile } from '../../../tile';
import type { Pair, SerialPair } from '../../../winning-hand-shape';

export interface IConcealedHand extends Iterable<Tile> {
  drawnTile?: Tile;
  get decompose(): readonly TileGroupDecomposition[];
  get serialPairs(): readonly SerialPair[];
  consume(...tiles: readonly Tile[]): IConcealedHand;
  createPair(...tiles: readonly [Tile, Tile]): readonly [Pair, IConcealedHand];
  createSerialPair(
    ...tiles: readonly [Tile, Tile]
  ): readonly [SerialPair, IConcealedHand];
  discard(tile: Tile): IConcealedHand;
  discardDrawnTile(): readonly [Tile, IConcealedHand];
  draw(tile: Tile): IConcealedHand;
  findAllPairCandidatesWith(tile: Tile): readonly Pair[];
  findAllSerialPairCandidatesWith(tile: Tile): readonly SerialPair[];
}

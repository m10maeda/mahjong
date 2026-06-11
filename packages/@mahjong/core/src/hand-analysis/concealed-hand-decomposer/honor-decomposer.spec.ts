import { describe, expect, it } from 'vitest';

import { HonorDecomposer } from './honor-decomposer';
import { TileGroupDecomposition } from './tile-group-decomposition';
import { HonorType, Tile, TileModifier } from '../../tile';
import { Pair, Triplet } from '../../winning-hand-shape';

describe('HonorDecomposer', () => {
  const sut = new HonorDecomposer();

  describe('decompose', () => {
    describe('与えられた牌姿のすべての面子分解候補を返すこと', () => {
      it('111223z', () => {
        const result = sut.decompose(
          new Tile(HonorType.East, TileModifier.Normal),
          new Tile(HonorType.East, TileModifier.Normal),
          new Tile(HonorType.East, TileModifier.Normal),
          new Tile(HonorType.South, TileModifier.Normal),
          new Tile(HonorType.South, TileModifier.Normal),
          new Tile(HonorType.West, TileModifier.Normal),
        );

        expect(result).toEqual(
          expect.arrayContaining([
            new TileGroupDecomposition(
              [
                Triplet.closedOf(
                  new Tile(HonorType.East, TileModifier.Normal),
                  new Tile(HonorType.East, TileModifier.Normal),
                  new Tile(HonorType.East, TileModifier.Normal),
                ),
              ],
              [],
              [
                new Pair(
                  new Tile(HonorType.South, TileModifier.Normal),
                  new Tile(HonorType.South, TileModifier.Normal),
                ),
              ],
              [new Tile(HonorType.West, TileModifier.Normal)],
            ),
          ]),
        );
      });
    });
  });
});

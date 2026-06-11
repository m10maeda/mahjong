import { describe, expect, it } from 'vitest';

import { ComplexHandDecomposer } from './complex-hand-decomposer';
import { HonorDecomposer } from './honor-decomposer';
import { SuitDecomposer } from './suit-decomposer';
import { TileGroupDecomposition } from './tile-group-decomposition';
import { HonorType, SuitType, Tile, TileModifier } from '../../tile';
import {
  Pair,
  Sequence,
  SerialPair,
  SerialPairType,
  Triplet,
} from '../../winning-hand-shape';

describe('ComplexHandDecomposer', () => {
  const sut = new ComplexHandDecomposer(
    new SuitDecomposer(),
    new HonorDecomposer(),
  );

  describe('decompose', () => {
    describe('与えられた牌姿のすべての面子分解候補を返すこと', () => {
      it('111222333m', () => {
        const result = sut.decompose(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
        );

        expect(result).toEqual(
          expect.arrayContaining([
            new TileGroupDecomposition(
              [
                Triplet.closedOf(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character1, TileModifier.Normal),
                ),
                Triplet.closedOf(
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                ),
                Triplet.closedOf(
                  new Tile(SuitType.Character3, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                ),
              ],
              [],
              [],
              [],
            ),
            new TileGroupDecomposition(
              [
                Sequence.closedOf(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                ),
              ],
              [],
              [],
              [],
            ),
          ]),
        );
      });

      it('123m123p', () => {
        const result = sut.decompose(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Circle1, TileModifier.Normal),
          new Tile(SuitType.Circle2, TileModifier.Normal),
          new Tile(SuitType.Circle3, TileModifier.Normal),
        );

        expect(result).toEqual(
          expect.arrayContaining([
            new TileGroupDecomposition(
              [
                Sequence.closedOf(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Circle1, TileModifier.Normal),
                  new Tile(SuitType.Circle2, TileModifier.Normal),
                  new Tile(SuitType.Circle3, TileModifier.Normal),
                ),
              ],
              [],
              [],
              [],
            ),
          ]),
        );
      });

      it('112233m112233p', () => {
        const result = sut.decompose(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Circle1, TileModifier.Normal),
          new Tile(SuitType.Circle1, TileModifier.Normal),
          new Tile(SuitType.Circle2, TileModifier.Normal),
          new Tile(SuitType.Circle2, TileModifier.Normal),
          new Tile(SuitType.Circle3, TileModifier.Normal),
          new Tile(SuitType.Circle3, TileModifier.Normal),
        );

        expect(result).toEqual(
          expect.arrayContaining([
            new TileGroupDecomposition(
              [
                Sequence.closedOf(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Circle1, TileModifier.Normal),
                  new Tile(SuitType.Circle2, TileModifier.Normal),
                  new Tile(SuitType.Circle3, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Circle1, TileModifier.Normal),
                  new Tile(SuitType.Circle2, TileModifier.Normal),
                  new Tile(SuitType.Circle3, TileModifier.Normal),
                ),
              ],
              [],
              [],
              [],
            ),
          ]),
        );
      });

      it('123m11z', () => {
        const result = sut.decompose(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(HonorType.East, TileModifier.Normal),
          new Tile(HonorType.East, TileModifier.Normal),
        );

        expect(result).toEqual(
          expect.arrayContaining([
            new TileGroupDecomposition(
              [
                Sequence.closedOf(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                ),
              ],
              [],
              [
                new Pair(
                  new Tile(HonorType.East, TileModifier.Normal),
                  new Tile(HonorType.East, TileModifier.Normal),
                ),
              ],
              [],
            ),
          ]),
        );
      });

      it('123m456p11178s11z', () => {
        const result = sut.decompose(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Circle4, TileModifier.Normal),
          new Tile(SuitType.Circle5, TileModifier.Normal),
          new Tile(SuitType.Circle6, TileModifier.Normal),
          new Tile(SuitType.Bamboo1, TileModifier.Normal),
          new Tile(SuitType.Bamboo1, TileModifier.Normal),
          new Tile(SuitType.Bamboo1, TileModifier.Normal),
          new Tile(SuitType.Bamboo7, TileModifier.Normal),
          new Tile(SuitType.Bamboo8, TileModifier.Normal),
          new Tile(HonorType.East, TileModifier.Normal),
          new Tile(HonorType.East, TileModifier.Normal),
        );

        expect(result).toEqual(
          expect.arrayContaining([
            new TileGroupDecomposition(
              [
                Sequence.closedOf(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Circle4, TileModifier.Normal),
                  new Tile(SuitType.Circle5, TileModifier.Normal),
                  new Tile(SuitType.Circle6, TileModifier.Normal),
                ),
                Triplet.closedOf(
                  new Tile(SuitType.Bamboo1, TileModifier.Normal),
                  new Tile(SuitType.Bamboo1, TileModifier.Normal),
                  new Tile(SuitType.Bamboo1, TileModifier.Normal),
                ),
              ],
              [
                new SerialPair(
                  SerialPairType.BothSide,
                  [
                    new Tile(SuitType.Bamboo7, TileModifier.Normal),
                    new Tile(SuitType.Bamboo8, TileModifier.Normal),
                  ],
                  [SuitType.Bamboo6, SuitType.Bamboo9],
                ),
              ],
              [
                new Pair(
                  new Tile(HonorType.East, TileModifier.Normal),
                  new Tile(HonorType.East, TileModifier.Normal),
                ),
              ],
              [],
            ),
          ]),
        );
      });

      it('123m456p111789s11z', () => {
        const result = sut.decompose(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Circle4, TileModifier.Normal),
          new Tile(SuitType.Circle5, TileModifier.Normal),
          new Tile(SuitType.Circle6, TileModifier.Normal),
          new Tile(SuitType.Bamboo1, TileModifier.Normal),
          new Tile(SuitType.Bamboo1, TileModifier.Normal),
          new Tile(SuitType.Bamboo1, TileModifier.Normal),
          new Tile(SuitType.Bamboo7, TileModifier.Normal),
          new Tile(SuitType.Bamboo8, TileModifier.Normal),
          new Tile(SuitType.Bamboo9, TileModifier.Normal),
          new Tile(HonorType.East, TileModifier.Normal),
          new Tile(HonorType.East, TileModifier.Normal),
        );

        expect(result).toEqual(
          expect.arrayContaining([
            new TileGroupDecomposition(
              [
                Sequence.closedOf(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Circle4, TileModifier.Normal),
                  new Tile(SuitType.Circle5, TileModifier.Normal),
                  new Tile(SuitType.Circle6, TileModifier.Normal),
                ),
                Triplet.closedOf(
                  new Tile(SuitType.Bamboo1, TileModifier.Normal),
                  new Tile(SuitType.Bamboo1, TileModifier.Normal),
                  new Tile(SuitType.Bamboo1, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Bamboo7, TileModifier.Normal),
                  new Tile(SuitType.Bamboo8, TileModifier.Normal),
                  new Tile(SuitType.Bamboo9, TileModifier.Normal),
                ),
              ],
              [],
              [
                new Pair(
                  new Tile(HonorType.East, TileModifier.Normal),
                  new Tile(HonorType.East, TileModifier.Normal),
                ),
              ],
              [],
            ),
          ]),
        );
      });
    });
  });
});

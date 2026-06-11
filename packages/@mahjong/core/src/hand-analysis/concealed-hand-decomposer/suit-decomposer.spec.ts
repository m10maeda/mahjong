import { describe, expect, it } from 'vitest';

import { SuitDecomposer } from './suit-decomposer';
import { TileGroupDecomposition } from './tile-group-decomposition';
import { SuitType, Tile, TileModifier } from '../../tile';
import {
  Pair,
  Sequence,
  SerialPair,
  SerialPairType,
  Triplet,
} from '../../winning-hand-shape';

describe('SuitDecomposer', () => {
  const sut = new SuitDecomposer();

  describe('decompose', () => {
    describe('与えられた牌姿のすべての面子分解候補を返すこと', () => {
      it('123m', () => {
        const result = sut.decompose(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
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
              [],
              [],
            ),
          ]),
        );
      });

      it('112233m', () => {
        const result = sut.decompose(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
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
              ],
              [],
              [],
              [],
            ),
            new TileGroupDecomposition(
              [],
              [],
              [
                new Pair(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character1, TileModifier.Normal),
                ),
                new Pair(
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                ),
                new Pair(
                  new Tile(SuitType.Character3, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                ),
              ],
              [],
            ),
          ]),
        );
      });

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

      it('123456m', () => {
        const result = sut.decompose(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Character4, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character6, TileModifier.Normal),
          new Tile(SuitType.Character7, TileModifier.Normal),
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
                  new Tile(SuitType.Character4, TileModifier.Normal),
                  new Tile(SuitType.Character5, TileModifier.Normal),
                  new Tile(SuitType.Character6, TileModifier.Normal),
                ),
              ],
              [],
              [],
              [new Tile(SuitType.Character7, TileModifier.Normal)],
            ),
            new TileGroupDecomposition(
              [
                Sequence.closedOf(
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                  new Tile(SuitType.Character4, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Character5, TileModifier.Normal),
                  new Tile(SuitType.Character6, TileModifier.Normal),
                  new Tile(SuitType.Character7, TileModifier.Normal),
                ),
              ],
              [],
              [],
              [new Tile(SuitType.Character1, TileModifier.Normal)],
            ),
            new TileGroupDecomposition(
              [
                Sequence.closedOf(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Character5, TileModifier.Normal),
                  new Tile(SuitType.Character6, TileModifier.Normal),
                  new Tile(SuitType.Character7, TileModifier.Normal),
                ),
              ],
              [],
              [],
              [new Tile(SuitType.Character4, TileModifier.Normal)],
            ),
          ]),
        );
      });

      it('1112345678999m', () => {
        const result = sut.decompose(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Character4, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character6, TileModifier.Normal),
          new Tile(SuitType.Character7, TileModifier.Normal),
          new Tile(SuitType.Character8, TileModifier.Normal),
          new Tile(SuitType.Character9, TileModifier.Normal),
          new Tile(SuitType.Character9, TileModifier.Normal),
          new Tile(SuitType.Character9, TileModifier.Normal),
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
                Sequence.closedOf(
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                  new Tile(SuitType.Character4, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Character5, TileModifier.Normal),
                  new Tile(SuitType.Character6, TileModifier.Normal),
                  new Tile(SuitType.Character7, TileModifier.Normal),
                ),
                Triplet.closedOf(
                  new Tile(SuitType.Character9, TileModifier.Normal),
                  new Tile(SuitType.Character9, TileModifier.Normal),
                  new Tile(SuitType.Character9, TileModifier.Normal),
                ),
              ],
              [],
              [],
              [new Tile(SuitType.Character8, TileModifier.Normal)],
            ),

            new TileGroupDecomposition(
              [
                Sequence.closedOf(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Character4, TileModifier.Normal),
                  new Tile(SuitType.Character5, TileModifier.Normal),
                  new Tile(SuitType.Character6, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Character7, TileModifier.Normal),
                  new Tile(SuitType.Character8, TileModifier.Normal),
                  new Tile(SuitType.Character9, TileModifier.Normal),
                ),
              ],
              [],
              [
                new Pair(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character1, TileModifier.Normal),
                ),
                new Pair(
                  new Tile(SuitType.Character9, TileModifier.Normal),
                  new Tile(SuitType.Character9, TileModifier.Normal),
                ),
              ],
              [],
            ),
            new TileGroupDecomposition(
              [
                Triplet.closedOf(
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character1, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Character2, TileModifier.Normal),
                  new Tile(SuitType.Character3, TileModifier.Normal),
                  new Tile(SuitType.Character4, TileModifier.Normal),
                ),
                Sequence.closedOf(
                  new Tile(SuitType.Character5, TileModifier.Normal),
                  new Tile(SuitType.Character6, TileModifier.Normal),
                  new Tile(SuitType.Character7, TileModifier.Normal),
                ),
              ],
              [
                new SerialPair(
                  SerialPairType.Edge,
                  [
                    new Tile(SuitType.Character8, TileModifier.Normal),
                    new Tile(SuitType.Character9, TileModifier.Normal),
                  ],
                  [SuitType.Character7],
                ),
              ],
              [
                new Pair(
                  new Tile(SuitType.Character9, TileModifier.Normal),
                  new Tile(SuitType.Character9, TileModifier.Normal),
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

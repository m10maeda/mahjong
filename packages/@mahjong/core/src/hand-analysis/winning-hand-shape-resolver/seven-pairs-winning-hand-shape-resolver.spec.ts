import { describe, expect, it } from 'vitest';

import { SevenPairsWinningHandShapeResolver } from './seven-pairs-winning-hand-shape-resolver';
import { TripletMeld } from '../../round-session';
import { SuitType, Tile, TileModifier } from '../../tile';
import { Pair } from '../../winning-hand-shape';

describe('SevenPairsWinningHandShapeResolver', () => {
  const sut = new SevenPairsWinningHandShapeResolver();

  describe('resolve', () => {
    it('七対子の要件を満たす場合、1つ以上の SevenPairsWinningHandShape を返すこと', () => {
      const result = sut.resolve(
        [
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Character4, TileModifier.Normal),
          new Tile(SuitType.Character4, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character6, TileModifier.Normal),
          new Tile(SuitType.Character6, TileModifier.Normal),
          new Tile(SuitType.Character7, TileModifier.Normal),
        ],
        [],
        new Tile(SuitType.Character7, TileModifier.Normal),
      );

      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    describe('七対子の要件を満たさない場合、空の配列を返すこと', () => {
      it('副露がある場合、空の配列を返すこと', () => {
        const result = sut.resolve(
          [
            new Tile(SuitType.Character3, TileModifier.Normal),
            new Tile(SuitType.Character3, TileModifier.Normal),
            new Tile(SuitType.Character4, TileModifier.Normal),
            new Tile(SuitType.Character4, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character6, TileModifier.Normal),
          ],
          [
            new TripletMeld(
              new Pair(
                new Tile(SuitType.Character1, TileModifier.Normal),
                new Tile(SuitType.Character1, TileModifier.Normal),
              ),
              new Tile(SuitType.Character1, TileModifier.Normal),
            ),
            new TripletMeld(
              new Pair(
                new Tile(SuitType.Character2, TileModifier.Normal),
                new Tile(SuitType.Character2, TileModifier.Normal),
              ),
              new Tile(SuitType.Character2, TileModifier.Normal),
            ),
          ],
          new Tile(SuitType.Character6, TileModifier.Normal),
        );

        expect(result).toHaveLength(0);
      });

      it('対子が7個存在しない場合、空の配列を返すこと', () => {
        const result = sut.resolve(
          [
            new Tile(SuitType.Character1, TileModifier.Normal),
            new Tile(SuitType.Character1, TileModifier.Normal),
            new Tile(SuitType.Character2, TileModifier.Normal),
            new Tile(SuitType.Character2, TileModifier.Normal),
            new Tile(SuitType.Character3, TileModifier.Normal),
            new Tile(SuitType.Character3, TileModifier.Normal),
            new Tile(SuitType.Character4, TileModifier.Normal),
            new Tile(SuitType.Character4, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character6, TileModifier.Normal),
            new Tile(SuitType.Character6, TileModifier.Normal),
            new Tile(SuitType.Character7, TileModifier.Normal),
          ],
          [],
          new Tile(SuitType.Circle7, TileModifier.Normal),
        );

        expect(result).toHaveLength(0);
      });

      it('4枚使いの場合、空の配列を返すこと', () => {
        const result = sut.resolve(
          [
            new Tile(SuitType.Character1, TileModifier.Normal),
            new Tile(SuitType.Character1, TileModifier.Normal),
            new Tile(SuitType.Character1, TileModifier.Normal),
            new Tile(SuitType.Character1, TileModifier.Normal),
            new Tile(SuitType.Character3, TileModifier.Normal),
            new Tile(SuitType.Character3, TileModifier.Normal),
            new Tile(SuitType.Character4, TileModifier.Normal),
            new Tile(SuitType.Character4, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character6, TileModifier.Normal),
            new Tile(SuitType.Character6, TileModifier.Normal),
            new Tile(SuitType.Character7, TileModifier.Normal),
          ],
          [],
          new Tile(SuitType.Character7, TileModifier.Normal),
        );

        expect(result).toHaveLength(0);
      });
    });
  });
});

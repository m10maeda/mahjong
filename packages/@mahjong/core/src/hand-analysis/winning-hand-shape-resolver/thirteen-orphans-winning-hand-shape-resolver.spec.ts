import { describe, expect, it } from 'vitest';

import { ThirteenOrphansWinningHandShapeResolver } from './thirteen-orphans-winning-hand-shape-resolver';
import { HonorType, SuitType, Tile, TileModifier } from '../../tile';
import { ThirteenOrphansWaitShape } from '../../winning-hand-shape';

describe('ThirteenOrphansWinningHandShapeResolver', () => {
  const sut = new ThirteenOrphansWinningHandShapeResolver();

  describe('resolve', () => {
    describe('国士無双の要件を満たす場合、1つ以上の ThirteenOrphansWinningHandShape を返すこと', () => {
      it('不足牌がある場合、不足牌待ちの ThirteenOrphansWinningHandShape を返すこと', () => {
        const result = sut.resolve(
          [
            new Tile(SuitType.Character1, TileModifier.Normal),
            new Tile(SuitType.Character9, TileModifier.Normal),
            new Tile(SuitType.Circle1, TileModifier.Normal),
            new Tile(SuitType.Circle9, TileModifier.Normal),
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
            new Tile(SuitType.Bamboo9, TileModifier.Normal),
            new Tile(HonorType.East, TileModifier.Normal),
            new Tile(HonorType.South, TileModifier.Normal),
            new Tile(HonorType.West, TileModifier.Normal),
            new Tile(HonorType.North, TileModifier.Normal),
            new Tile(HonorType.White, TileModifier.Normal),
            new Tile(HonorType.Green, TileModifier.Normal),
            new Tile(HonorType.Green, TileModifier.Normal),
          ],
          [],
          new Tile(HonorType.Red, TileModifier.Normal),
        );

        expect(result.length).toBeGreaterThanOrEqual(1);

        expect(result[0]?.wait).toBe(ThirteenOrphansWaitShape.Missing);
      });

      it('不足牌がない場合、十三面待ちの ThirteenOrphansWinningHandShape を返すこと', () => {
        const result = sut.resolve(
          [
            new Tile(SuitType.Character1, TileModifier.Normal),
            new Tile(SuitType.Character9, TileModifier.Normal),
            new Tile(SuitType.Circle1, TileModifier.Normal),
            new Tile(SuitType.Circle9, TileModifier.Normal),
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
            new Tile(SuitType.Bamboo9, TileModifier.Normal),
            new Tile(HonorType.East, TileModifier.Normal),
            new Tile(HonorType.South, TileModifier.Normal),
            new Tile(HonorType.West, TileModifier.Normal),
            new Tile(HonorType.North, TileModifier.Normal),
            new Tile(HonorType.White, TileModifier.Normal),
            new Tile(HonorType.Green, TileModifier.Normal),
            new Tile(HonorType.Red, TileModifier.Normal),
          ],
          [],
          new Tile(HonorType.Red, TileModifier.Normal),
        );

        expect(result.length).toBeGreaterThanOrEqual(1);

        expect(result[0]?.wait).toBe(ThirteenOrphansWaitShape.ThirteenWay);
      });
    });

    it('国士無双の要件を満たさない場合、空の配列を返すこと', () => {
      const result = sut.resolve(
        [
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character9, TileModifier.Normal),
          new Tile(SuitType.Circle1, TileModifier.Normal),
          new Tile(SuitType.Circle9, TileModifier.Normal),
          new Tile(SuitType.Bamboo1, TileModifier.Normal),
          new Tile(SuitType.Bamboo9, TileModifier.Normal),
          new Tile(HonorType.East, TileModifier.Normal),
          new Tile(HonorType.South, TileModifier.Normal),
          new Tile(HonorType.West, TileModifier.Normal),
          new Tile(HonorType.North, TileModifier.Normal),
          new Tile(HonorType.White, TileModifier.Normal),
          new Tile(HonorType.Red, TileModifier.Normal),
          new Tile(HonorType.Red, TileModifier.Normal),
        ],
        [],
        new Tile(HonorType.Red, TileModifier.Normal),
      );

      expect(result).toHaveLength(0);
    });
  });
});

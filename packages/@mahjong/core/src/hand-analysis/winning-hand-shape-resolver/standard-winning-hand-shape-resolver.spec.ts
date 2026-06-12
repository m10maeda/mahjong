import { describe, expect, it } from 'vitest';

import { StandardWinningHandShapeResolver } from './standard-winning-hand-shape-resolver';
import { HonorType, SuitType, Tile, TileModifier } from '../../tile';
import {
  ComplexHandDecomposer,
  HonorDecomposer,
  SuitDecomposer,
} from '../concealed-hand-decomposer';

describe('StandardWinningHandShapeResolver', () => {
  const sut = new StandardWinningHandShapeResolver(
    new ComplexHandDecomposer(new SuitDecomposer(), new HonorDecomposer()),
  );

  describe('resolve', () => {
    describe('四面子一雀頭の要件を満たす場合、1つ以上の通常和了形を返すこと', () => {
      it('1123m123p123s111z,1m', () => {
        const result = sut.resolve(
          [
            new Tile(SuitType.Character1, TileModifier.Normal),
            new Tile(SuitType.Character1, TileModifier.Normal),
            new Tile(SuitType.Character2, TileModifier.Normal),
            new Tile(SuitType.Character3, TileModifier.Normal),
            new Tile(SuitType.Circle1, TileModifier.Normal),
            new Tile(SuitType.Circle2, TileModifier.Normal),
            new Tile(SuitType.Circle3, TileModifier.Normal),
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
            new Tile(SuitType.Bamboo2, TileModifier.Normal),
            new Tile(SuitType.Bamboo3, TileModifier.Normal),
            new Tile(HonorType.East, TileModifier.Normal),
            new Tile(HonorType.East, TileModifier.Normal),
            new Tile(HonorType.East, TileModifier.Normal),
          ],
          [],
          new Tile(SuitType.Character1, TileModifier.Normal),
        );

        expect(result.length).toBeGreaterThanOrEqual(1);
      });
    });
  });
});

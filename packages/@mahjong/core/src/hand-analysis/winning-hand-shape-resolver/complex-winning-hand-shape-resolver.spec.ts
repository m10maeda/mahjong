import { describe, expect, it } from 'vitest';

import { ComplexWinningHandShapeResolver } from './complex-winning-hand-shape-resolver';
import { SevenPairsWinningHandShapeResolver } from './seven-pairs-winning-hand-shape-resolver';
import { StandardWinningHandShapeResolver } from './standard-winning-hand-shape-resolver';
import { ThirteenOrphansWinningHandShapeResolver } from './thirteen-orphans-winning-hand-shape-resolver';
import { SuitType, Tile, TileModifier } from '../../tile';
import {
  ComplexHandDecomposer,
  HonorDecomposer,
  SuitDecomposer,
} from '../concealed-hand-decomposer';

describe('ComplexWinningHandShapeResolver', () => {
  const sut = new ComplexWinningHandShapeResolver(
    new StandardWinningHandShapeResolver(
      new ComplexHandDecomposer(new SuitDecomposer(), new HonorDecomposer()),
    ),
    new SevenPairsWinningHandShapeResolver(),
    new ThirteenOrphansWinningHandShapeResolver(),
  );

  describe('和了形を満たす場合、1つ以上の和了形を返すこと', () => {
    it('1122334455667,7m', () => {
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
  });
});

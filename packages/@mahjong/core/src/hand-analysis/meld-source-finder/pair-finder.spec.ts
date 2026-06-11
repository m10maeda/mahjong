import { describe, expect, it } from 'vitest';

import { PairFinder } from './pair-finder';
import { Tile, SuitType, TileModifier } from '../../tile';
import { Pair } from '../../winning-hand-shape';

describe('PairFinder', () => {
  const sut = new PairFinder();

  describe('findAll', () => {
    it('与えられた牌で対子が作れる場合、すべての対子の組み合わせを返すこと', () => {
      const pairs = sut.findAll(
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Red),
        new Tile(SuitType.Character5, TileModifier.Red),
      );

      expect(pairs).toEqual(
        expect.arrayContaining([
          new Pair(
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
          ),
          new Pair(
            new Tile(SuitType.Character5, TileModifier.Red),
            new Tile(SuitType.Character5, TileModifier.Red),
          ),
          new Pair(
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Red),
          ),
        ]),
      );
    });

    it('与えられた牌で対子が作れない場合、空の配列を返すこと', () => {
      const pairs = sut.findAll(
        new Tile(SuitType.Character5, TileModifier.Normal),
      );

      expect(pairs).toEqual([]);
    });
  });
});

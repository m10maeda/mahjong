import { describe, expect, it } from 'vitest';

import { SerialPairFinder } from './serial-pair-finder';
import { SuitType, Tile, TileModifier } from '../../tile';
import { SerialPair, SerialPairType } from '../../winning-hand-shape';

describe('SerialPairFinder', () => {
  const sut = new SerialPairFinder();

  describe('findAll', () => {
    it('与えられた牌で塔子が作れる場合、すべての塔子の組み合わせを返すこと', () => {
      const serialPairs = sut.findAll(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
        new Tile(SuitType.Character3, TileModifier.Normal),
      );

      expect(serialPairs).toEqual(
        expect.arrayContaining([
          new SerialPair(
            SerialPairType.Edge,
            [
              new Tile(SuitType.Character1, TileModifier.Normal),
              new Tile(SuitType.Character2, TileModifier.Normal),
            ],
            [SuitType.Character3],
          ),
          new SerialPair(
            SerialPairType.BothSide,
            [
              new Tile(SuitType.Character2, TileModifier.Normal),
              new Tile(SuitType.Character3, TileModifier.Normal),
            ],
            [SuitType.Character1, SuitType.Character4],
          ),
          new SerialPair(
            SerialPairType.Middle,
            [
              new Tile(SuitType.Character1, TileModifier.Normal),
              new Tile(SuitType.Character3, TileModifier.Normal),
            ],
            [SuitType.Character2],
          ),
        ]),
      );
    });

    it('与えられた牌で塔子が作れない場合、空の配列を返すこと', () => {
      const serialPairs = sut.findAll(
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character9, TileModifier.Normal),
      );

      expect(serialPairs).toEqual([]);
    });
  });
});

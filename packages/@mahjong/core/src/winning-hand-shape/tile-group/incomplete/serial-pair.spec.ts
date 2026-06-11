import { describe, expect, it } from 'vitest';

import { SerialPair, SerialPairType } from './serial-pair';
import { SuitType, Tile, TileModifier } from '../../../tile';

describe('SerialPair', () => {
  describe('extend', () => {
    it('塔子の受け入れ可能な牌の場合、明順子を返すこと', () => {
      const sut = new SerialPair(
        SerialPairType.BothSide,
        [
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Red),
        ],
        [SuitType.Character1, SuitType.Character4],
      );

      const result = sut.extend(
        new Tile(SuitType.Character4, TileModifier.Normal),
      );

      expect(result.isOpen()).toBe(true);
      expect([...result]).toEqual(
        expect.arrayContaining([
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Red),
          new Tile(SuitType.Character4, TileModifier.Normal),
        ]),
      );
    });

    it('塔子の受け入れ不可能な牌の場合、エラーを投げること', () => {
      const sut = new SerialPair(
        SerialPairType.BothSide,
        [
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Red),
        ],
        [SuitType.Character1, SuitType.Character4],
      );

      expect(() => {
        sut.extend(new Tile(SuitType.Character2, TileModifier.Normal));
      }).toThrow(Error);
    });
  });
});

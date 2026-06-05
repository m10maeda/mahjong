import { describe, expect, it } from 'vitest';

import { DeadWall } from './dead-wall';
import { SuitType, Tile, TileModifier } from '../../tile';

describe('DeadWall', () => {
  describe('doraIndicators', () => {
    it('ドラの枚数が1枚の場合、4番目の牌を返すこと', () => {
      const tiles = [
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
        new Tile(SuitType.Character3, TileModifier.Normal),
        new Tile(SuitType.Character4, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character6, TileModifier.Normal),
        new Tile(SuitType.Character7, TileModifier.Normal),
        new Tile(SuitType.Circle1, TileModifier.Normal),
        new Tile(SuitType.Circle2, TileModifier.Normal),
        new Tile(SuitType.Circle3, TileModifier.Normal),
        new Tile(SuitType.Circle4, TileModifier.Normal),
        new Tile(SuitType.Circle5, TileModifier.Normal),
        new Tile(SuitType.Circle6, TileModifier.Normal),
        new Tile(SuitType.Circle7, TileModifier.Normal),
      ] as const;
      const sut = DeadWall.new(...tiles);

      expect(sut.doraIndicators).toHaveLength(1);
      expect(sut.doraIndicators[0]?.equals(tiles[4])).toBe(true);
    });

    it('ドラの枚数が4枚の場合、4,6,8,10番目の牌を返すこと', () => {
      const tiles = [
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
        new Tile(SuitType.Character3, TileModifier.Normal),
        new Tile(SuitType.Character4, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character6, TileModifier.Normal),
        new Tile(SuitType.Character7, TileModifier.Normal),
        new Tile(SuitType.Circle1, TileModifier.Normal),
        new Tile(SuitType.Circle2, TileModifier.Normal),
        new Tile(SuitType.Circle3, TileModifier.Normal),
        new Tile(SuitType.Circle4, TileModifier.Normal),
        new Tile(SuitType.Circle5, TileModifier.Normal),
        new Tile(SuitType.Circle6, TileModifier.Normal),
        new Tile(SuitType.Circle7, TileModifier.Normal),
      ] as const;
      const sut = DeadWall.new(...tiles);

      const result = sut.addDora().addDora().addDora();

      expect(result.doraIndicators).toHaveLength(4);
      expect(result.doraIndicators[0]?.equals(tiles[4])).toBe(true);
      expect(result.doraIndicators[1]?.equals(tiles[6])).toBe(true);
      expect(result.doraIndicators[2]?.equals(tiles[8])).toBe(true);
      expect(result.doraIndicators[3]?.equals(tiles[10])).toBe(true);
    });
  });

  describe('blindDoraIndicators', () => {
    it('ドラの枚数が1枚の場合、5番目の牌を返すこと', () => {
      const tiles = [
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
        new Tile(SuitType.Character3, TileModifier.Normal),
        new Tile(SuitType.Character4, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character6, TileModifier.Normal),
        new Tile(SuitType.Character7, TileModifier.Normal),
        new Tile(SuitType.Circle1, TileModifier.Normal),
        new Tile(SuitType.Circle2, TileModifier.Normal),
        new Tile(SuitType.Circle3, TileModifier.Normal),
        new Tile(SuitType.Circle4, TileModifier.Normal),
        new Tile(SuitType.Circle5, TileModifier.Normal),
        new Tile(SuitType.Circle6, TileModifier.Normal),
        new Tile(SuitType.Circle7, TileModifier.Normal),
      ] as const;
      const sut = DeadWall.new(...tiles);

      expect(sut.blindDoraIndicators).toHaveLength(1);
      expect(sut.blindDoraIndicators[0]?.equals(tiles[5])).toBe(true);
    });

    it('ドラの枚数が4枚の場合、5,7,9,11番目の牌を返すこと', () => {
      const tiles = [
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
        new Tile(SuitType.Character3, TileModifier.Normal),
        new Tile(SuitType.Character4, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character6, TileModifier.Normal),
        new Tile(SuitType.Character7, TileModifier.Normal),
        new Tile(SuitType.Circle1, TileModifier.Normal),
        new Tile(SuitType.Circle2, TileModifier.Normal),
        new Tile(SuitType.Circle3, TileModifier.Normal),
        new Tile(SuitType.Circle4, TileModifier.Normal),
        new Tile(SuitType.Circle5, TileModifier.Normal),
        new Tile(SuitType.Circle6, TileModifier.Normal),
        new Tile(SuitType.Circle7, TileModifier.Normal),
      ] as const;
      const sut = DeadWall.new(...tiles);

      const result = sut.addDora().addDora().addDora();

      expect(result.blindDoraIndicators).toHaveLength(4);
      expect(result.blindDoraIndicators[0]?.equals(tiles[5])).toBe(true);
      expect(result.blindDoraIndicators[1]?.equals(tiles[7])).toBe(true);
      expect(result.blindDoraIndicators[2]?.equals(tiles[9])).toBe(true);
      expect(result.blindDoraIndicators[3]?.equals(tiles[11])).toBe(true);
    });
  });

  describe('drawRinshanTile', () => {
    it('与えられた牌を保持した新しい DeadWall を返すこと', () => {
      const tiles = [
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
        new Tile(SuitType.Character3, TileModifier.Normal),
        new Tile(SuitType.Character4, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character6, TileModifier.Normal),
        new Tile(SuitType.Character7, TileModifier.Normal),
        new Tile(SuitType.Circle1, TileModifier.Normal),
        new Tile(SuitType.Circle2, TileModifier.Normal),
        new Tile(SuitType.Circle3, TileModifier.Normal),
        new Tile(SuitType.Circle4, TileModifier.Normal),
        new Tile(SuitType.Circle5, TileModifier.Normal),
        new Tile(SuitType.Circle6, TileModifier.Normal),
        new Tile(SuitType.Circle7, TileModifier.Normal),
      ] as const;
      const sut = DeadWall.new(...tiles);

      const [, result] = sut.drawRinshanTile(
        new Tile(SuitType.Bamboo1, TileModifier.Normal),
      );

      expect(result).not.toBe(sut);
    });

    it('先頭の牌を取得できること', () => {
      const tiles = [
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
        new Tile(SuitType.Character3, TileModifier.Normal),
        new Tile(SuitType.Character4, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character6, TileModifier.Normal),
        new Tile(SuitType.Character7, TileModifier.Normal),
        new Tile(SuitType.Circle1, TileModifier.Normal),
        new Tile(SuitType.Circle2, TileModifier.Normal),
        new Tile(SuitType.Circle3, TileModifier.Normal),
        new Tile(SuitType.Circle4, TileModifier.Normal),
        new Tile(SuitType.Circle5, TileModifier.Normal),
        new Tile(SuitType.Circle6, TileModifier.Normal),
        new Tile(SuitType.Circle7, TileModifier.Normal),
      ] as const;
      const sut = DeadWall.new(...tiles);

      const [result] = sut.drawRinshanTile(
        new Tile(SuitType.Bamboo1, TileModifier.Normal),
      );

      expect(
        result.equals(new Tile(SuitType.Circle7, TileModifier.Normal)),
      ).toBe(true);
    });
  });
});

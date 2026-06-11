import { describe, expect, it } from 'vitest';

import { TileCounter } from './tile-counter';
import { SuitType, Tile, TileModifier } from '../tile';
import { TileCode } from './tile-code';

describe('TileCounter', () => {
  describe('minimumTile', () => {
    it('所持している牌のうち、最も小さい牌を返すこと', () => {
      const sut = TileCounter.from(
        new Tile(SuitType.Character2, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character3, TileModifier.Normal),
      );

      expect(sut.minimumTile).toEqual(
        new Tile(SuitType.Character1, TileModifier.Normal),
      );
    });

    it('所持している牌がない場合、undefined を返すこと', () => {
      const sut = TileCounter.from();

      expect(sut.minimumTile).toBeUndefined();
    });
  });

  describe('count', () => {
    it('与えられた牌の所持数を返すこと', () => {
      const sut = TileCounter.from(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
      );

      expect(sut.count(TileCode.m1)).toBe(2);
      expect(sut.count(TileCode.m2)).toBe(1);
      expect(sut.count(TileCode.m3)).toBe(0);
    });
  });

  describe('filter', () => {
    it('与えられた条件を満たす牌のみを残した TileCounter を返すこと', () => {
      const sut = TileCounter.from(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
      );

      const result = sut.filter((_, code) => code === TileCode.m1);

      expect(result.get(TileCode.m1)).toEqual([
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
      ]);
      expect(result.get(TileCode.m2)).toEqual([]);
    });
  });

  describe('get', () => {
    it('与えられたコードに対応する牌の配列を返すこと', () => {
      const sut = TileCounter.from(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
      );

      expect(sut.get(TileCode.m1)).toEqual([
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
      ]);
      expect(sut.get(TileCode.m2)).toEqual([
        new Tile(SuitType.Character2, TileModifier.Normal),
      ]);
    });

    it('与えられたコードに対応する牌を所持していない場合、空の配列を返すこと', () => {
      const sut = TileCounter.from(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
      );

      expect(sut.get(TileCode.m3)).toEqual([]);
    });
  });

  describe('has', () => {
    const sut = TileCounter.from(
      new Tile(SuitType.Character1, TileModifier.Normal),
      new Tile(SuitType.Character1, TileModifier.Normal),
      new Tile(SuitType.Character2, TileModifier.Normal),
    );

    it('与えられた牌を所持している場合、true を返すこと', () => {
      expect(sut.has(TileCode.m1)).toBe(true);
      expect(sut.has(TileCode.m2)).toBe(true);
    });

    it('与えられた牌を所持していない場合、false を返すこと', () => {
      expect(sut.has(TileCode.m3)).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('所持している牌がない場合、true を返すこと', () => {
      const sut = TileCounter.from();

      expect(sut.isEmpty()).toBe(true);
    });

    it('所持している牌がある場合、false を返すこと', () => {
      const sut = TileCounter.from(
        new Tile(SuitType.Character1, TileModifier.Normal),
      );

      expect(sut.isEmpty()).toBe(false);
    });
  });

  describe('remove', () => {
    it('与えられた牌をカウントから排除すること', () => {
      const sut = TileCounter.from(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
        new Tile(SuitType.Character3, TileModifier.Normal),
      );

      const result = sut.remove(
        new Tile(SuitType.Character2, TileModifier.Normal),
      );

      expect(result.has(TileCode.m2)).toBe(false);
    });
  });
});

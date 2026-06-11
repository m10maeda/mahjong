import { describe, expect, it } from 'vitest';

import { Pair } from './pair';
import { SuitType, Tile, TileModifier } from '../../../tile';

describe('Pair', () => {
  it('異なる牌種別の牌を与えられた場合、エラーを投げること', () => {
    expect(() => {
      new Pair(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Circle1, TileModifier.Normal),
      );
    }).toThrow(Error);
  });

  describe('composes', () => {
    it('与えられた牌種別で構成された対子の場合、true を返すこと', () => {
      expect(
        new Pair(
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Normal),
        ).composes(SuitType.Character5),
      ).toBe(true);

      expect(
        new Pair(
          new Tile(SuitType.Character5, TileModifier.Red),
          new Tile(SuitType.Character5, TileModifier.Normal),
        ).composes(SuitType.Character5),
      ).toBe(true);

      expect(
        new Pair(
          new Tile(SuitType.Character5, TileModifier.Red),
          new Tile(SuitType.Character5, TileModifier.Red),
        ).composes(SuitType.Character5),
      ).toBe(true);
    });

    it('与えられた牌種別で構成されていない対子の場合、false を返すこと', () => {
      expect(
        new Pair(
          new Tile(SuitType.Character5, TileModifier.Red),
          new Tile(SuitType.Character5, TileModifier.Red),
        ).composes(SuitType.Circle5),
      ).toBe(false);
      expect(
        new Pair(
          new Tile(SuitType.Character5, TileModifier.Red),
          new Tile(SuitType.Character5, TileModifier.Red),
        ).composes(SuitType.Character4),
      ).toBe(false);
    });
  });

  describe('extend', () => {
    it('与えられた牌で構成された対子の場合、明刻子を返すこと', () => {
      const sut = new Pair(
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Red),
      );

      const result = sut.extend(
        new Tile(SuitType.Character5, TileModifier.Normal),
      );

      expect(result.compose(SuitType.Character5)).toBe(true);
      expect(result.isOpen()).toBe(true);
    });

    it('与えられた牌で構成されていない対子の場合、エラーを投げること', () => {
      const sut = new Pair(
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Red),
      );

      expect(() => {
        sut.extend(new Tile(SuitType.Character4, TileModifier.Normal));
      }).toThrow(Error);
    });
  });

  describe('isSameTileGroupAs', () => {
    it('同じ牌種別で構成された対子を与えられた場合、true を返すこと', () => {
      const sut = new Pair(
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Red),
      );
      const target = new Pair(
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Normal),
      );

      expect(sut.isSameTileGroupAs(target)).toBe(true);
    });

    it('異なる牌種別で構成された対子を与えられた場合、false を返すこと', () => {
      const sut = new Pair(
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Red),
      );
      const target = new Pair(
        new Tile(SuitType.Circle5, TileModifier.Normal),
        new Tile(SuitType.Circle5, TileModifier.Normal),
      );

      expect(sut.isSameTileGroupAs(target)).toBe(false);
    });
  });
});

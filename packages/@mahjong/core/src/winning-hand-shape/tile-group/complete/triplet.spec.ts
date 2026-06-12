import { describe, expect, it } from 'vitest';

import { TileGroupType } from './complete-tile-group';
import { Triplet } from './triplet';
import { SuitType, Tile, TileModifier } from '../../../tile';

describe('Triplet', () => {
  describe('closedOf', () => {
    const sut = Triplet.closedOf(
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
    );

    it('暗刻子として扱える刻子を返すこと', () => {
      expect(sut.isOpen()).toBe(false);
      expect(sut.type).toBe(TileGroupType.Triplet);
    });
  });

  describe('openOf', () => {
    const sut = Triplet.openOf(
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
    );

    it('明刻子として扱える刻子を返すこと', () => {
      expect(sut.isOpen()).toBe(true);
      expect(sut.type).toBe(TileGroupType.Triplet);
    });
  });

  describe('compose', () => {
    it('与えられた牌種別で構成された刻子の場合、true を返すこと', () => {
      expect(
        Triplet.closedOf(
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Red),
          new Tile(SuitType.Character5, TileModifier.Normal),
        ).composes(SuitType.Character5),
      ).toBe(true);

      expect(
        Triplet.openOf(
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Red),
          new Tile(SuitType.Character5, TileModifier.Normal),
        ).composes(SuitType.Character5),
      ).toBe(true);
    });

    it('与えられた牌種別で構成されていない刻子の場合、false を返すこと', () => {
      expect(
        Triplet.openOf(
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Normal),
        ).composes(SuitType.Circle5),
      ).toBe(false);
    });
  });

  describe('isSameTileGroupAs', () => {
    const sut = Triplet.closedOf(
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
    );

    it('同じ牌種別で構成された順子を与えられた場合、true を返すこと', () => {
      expect(
        sut.isSameTileGroupAs(
          Triplet.closedOf(
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
          ),
        ),
      ).toBe(true);

      expect(
        sut.isSameTileGroupAs(
          Triplet.closedOf(
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Red),
            new Tile(SuitType.Character5, TileModifier.Normal),
          ),
        ),
      ).toBe(true);

      expect(
        sut.isSameTileGroupAs(
          Triplet.openOf(
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
          ),
        ),
      ).toBe(true);

      expect(
        sut.isSameTileGroupAs(
          Triplet.closedOf(
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Red),
            new Tile(SuitType.Character5, TileModifier.Normal),
          ),
        ),
      ).toBe(true);
    });

    it('異なる牌種別で構成された順子を与えられた場合、false を返すこと', () => {
      expect(
        sut.isSameTileGroupAs(
          Triplet.closedOf(
            new Tile(SuitType.Circle5, TileModifier.Normal),
            new Tile(SuitType.Circle5, TileModifier.Normal),
            new Tile(SuitType.Circle5, TileModifier.Normal),
          ),
        ),
      ).toBe(false);
    });
  });
});

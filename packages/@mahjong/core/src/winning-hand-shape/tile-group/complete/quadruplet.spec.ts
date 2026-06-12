import { describe, expect, it } from 'vitest';

import { TileGroupType } from './complete-tile-group';
import { Quadruplet } from './quadruplet';
import { SuitType, Tile, TileModifier } from '../../../tile';

describe('Quadruplet', () => {
  describe('closedOf', () => {
    const sut = Quadruplet.closedOf(
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
    );

    it('暗槓子として扱える槓子を返すこと', () => {
      expect(sut.isOpen()).toBe(false);
      expect(sut.type).toBe(TileGroupType.Quadruplet);
    });
  });

  describe('openOf', () => {
    const sut = Quadruplet.openOf(
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
    );

    it('明槓子として扱える槓子を返すこと', () => {
      expect(sut.isOpen()).toBe(true);
      expect(sut.type).toBe(TileGroupType.Quadruplet);
    });
  });

  describe('compose', () => {
    it('与えられた牌種別で構成された槓子の場合、true を返すこと', () => {
      expect(
        Quadruplet.closedOf(
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Red),
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Normal),
        ).composes(SuitType.Character5),
      ).toBe(true);

      expect(
        Quadruplet.openOf(
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Red),
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Normal),
        ).composes(SuitType.Character5),
      ).toBe(true);
    });

    it('与えられた牌種別で構成されていない槓子の場合、false を返すこと', () => {
      expect(
        Quadruplet.openOf(
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Normal),
          new Tile(SuitType.Character5, TileModifier.Normal),
        ).composes(SuitType.Circle5),
      ).toBe(false);
    });
  });

  describe('isSameTileGroupAs', () => {
    const sut = Quadruplet.closedOf(
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
    );

    it('同じ牌種別で構成された順子を与えられた場合、true を返すこと', () => {
      expect(
        sut.isSameTileGroupAs(
          Quadruplet.closedOf(
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
          ),
        ),
      ).toBe(true);

      expect(
        sut.isSameTileGroupAs(
          Quadruplet.closedOf(
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Red),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
          ),
        ),
      ).toBe(true);

      expect(
        sut.isSameTileGroupAs(
          Quadruplet.openOf(
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
          ),
        ),
      ).toBe(true);

      expect(
        sut.isSameTileGroupAs(
          Quadruplet.closedOf(
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Red),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
          ),
        ),
      ).toBe(true);
    });

    it('異なる牌種別で構成された順子を与えられた場合、false を返すこと', () => {
      expect(
        sut.isSameTileGroupAs(
          Quadruplet.closedOf(
            new Tile(SuitType.Circle5, TileModifier.Normal),
            new Tile(SuitType.Circle5, TileModifier.Normal),
            new Tile(SuitType.Circle5, TileModifier.Normal),
            new Tile(SuitType.Circle5, TileModifier.Normal),
          ),
        ),
      ).toBe(false);
    });
  });
});

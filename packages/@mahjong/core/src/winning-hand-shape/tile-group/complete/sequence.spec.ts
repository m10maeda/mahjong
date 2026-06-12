import { describe, expect, it } from 'vitest';

import { TileGroupType } from './complete-tile-group';
import { Sequence } from './sequence';
import { SuitType, Tile, TileModifier } from '../../../tile';

describe('Sequence', () => {
  describe('closedOf', () => {
    const sut = Sequence.closedOf(
      new Tile(SuitType.Character4, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character6, TileModifier.Normal),
    );

    it('暗順子として扱える順子を返すこと', () => {
      expect(sut.isOpen()).toBe(false);
      expect(sut.type).toBe(TileGroupType.Sequence);
    });
  });

  describe('openOf', () => {
    const sut = Sequence.openOf(
      new Tile(SuitType.Character4, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character6, TileModifier.Normal),
    );

    it('明順子として扱える順子を返すこと', () => {
      expect(sut.isOpen()).toBe(true);
      expect(sut.type).toBe(TileGroupType.Sequence);
    });
  });

  describe('isSameTileGroupAs', () => {
    const sut = Sequence.closedOf(
      new Tile(SuitType.Character4, TileModifier.Normal),
      new Tile(SuitType.Character5, TileModifier.Normal),
      new Tile(SuitType.Character6, TileModifier.Normal),
    );

    it('同じ牌種別で構成された順子を与えられた場合、true を返すこと', () => {
      expect(
        sut.isSameTileGroupAs(
          Sequence.closedOf(
            new Tile(SuitType.Character4, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character6, TileModifier.Normal),
          ),
        ),
      ).toBe(true);

      expect(
        sut.isSameTileGroupAs(
          Sequence.closedOf(
            new Tile(SuitType.Character4, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Red),
            new Tile(SuitType.Character6, TileModifier.Normal),
          ),
        ),
      ).toBe(true);

      expect(
        sut.isSameTileGroupAs(
          Sequence.openOf(
            new Tile(SuitType.Character4, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Normal),
            new Tile(SuitType.Character6, TileModifier.Normal),
          ),
        ),
      ).toBe(true);

      expect(
        sut.isSameTileGroupAs(
          Sequence.closedOf(
            new Tile(SuitType.Character4, TileModifier.Normal),
            new Tile(SuitType.Character5, TileModifier.Red),
            new Tile(SuitType.Character6, TileModifier.Normal),
          ),
        ),
      ).toBe(true);
    });

    it('異なる牌種別で構成された順子を与えられた場合、false を返すこと', () => {
      expect(
        sut.isSameTileGroupAs(
          Sequence.closedOf(
            new Tile(SuitType.Circle4, TileModifier.Normal),
            new Tile(SuitType.Circle5, TileModifier.Normal),
            new Tile(SuitType.Circle6, TileModifier.Normal),
          ),
        ),
      ).toBe(false);
    });
  });
});

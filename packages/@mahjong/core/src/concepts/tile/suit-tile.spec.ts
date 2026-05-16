import { describe, expect, it } from 'vitest';

import { Honor } from './honor';
import { HonorTile } from './honor-tile';
import { Rank } from './rank';
import { Suit } from './suit';
import { SuitTile } from './suit-tile';
import { TileModifier } from './tile-modifier';

describe('SuitTile', () => {
  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      const sut = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);
      const target = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);

      expect(sut.equals(target)).toBe(true);
    });

    describe('異なる値を与えられた場合', () => {
      it('HonorTile を与えられた場合、false を返すこと', () => {
        const sut = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);
        const target = new HonorTile(Honor.South, TileModifier.Normal);

        expect(sut.equals(target)).toBe(false);
      });

      describe('異なる SuitTile を与えられた場合、false を返すこと', () => {
        it('suit が異なる SuitTile を与えられた場合、false を返すこと', () => {
          const sut = new SuitTile(
            Suit.Character,
            Rank[5],
            TileModifier.Normal,
          );
          const target = new SuitTile(
            Suit.Circle,
            Rank[5],
            TileModifier.Normal,
          );

          expect(sut.equals(target)).toBe(false);
        });

        it('rank が異なる SuitTile を与えられた場合、false を返すこと', () => {
          const sut = new SuitTile(
            Suit.Character,
            Rank[5],
            TileModifier.Normal,
          );
          const target = new SuitTile(
            Suit.Character,
            Rank[4],
            TileModifier.Normal,
          );

          expect(sut.equals(target)).toBe(false);
        });

        it('modifier が異なる SuitTile を与えられた場合、false を返すこと', () => {
          const sut = new SuitTile(
            Suit.Character,
            Rank[5],
            TileModifier.Normal,
          );
          const target = new SuitTile(
            Suit.Character,
            Rank[5],
            TileModifier.Red,
          );

          expect(sut.equals(target)).toBe(false);
        });
      });
    });
  });

  describe('isEdge', () => {
    it('末端の値の場合、true を返すこと', () => {
      expect(
        new SuitTile(Suit.Character, Rank[1], TileModifier.Normal).isEdge(),
      ).toBe(true);
      expect(
        new SuitTile(Suit.Circle, Rank[1], TileModifier.Normal).isEdge(),
      ).toBe(true);
      expect(
        new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal).isEdge(),
      ).toBe(true);

      expect(
        new SuitTile(Suit.Character, Rank[9], TileModifier.Normal).isEdge(),
      ).toBe(true);

      expect(
        new SuitTile(Suit.Character, Rank[1], TileModifier.Red).isEdge(),
      ).toBe(true);
    });

    it('末端の値ではない場合、false を返すこと', () => {
      expect(
        new SuitTile(Suit.Character, Rank[2], TileModifier.Normal).isEdge(),
      ).toBe(false);
      expect(
        new SuitTile(Suit.Circle, Rank[2], TileModifier.Normal).isEdge(),
      ).toBe(false);
      expect(
        new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal).isEdge(),
      ).toBe(false);

      expect(
        new SuitTile(Suit.Character, Rank[8], TileModifier.Normal).isEdge(),
      ).toBe(false);

      expect(
        new SuitTile(Suit.Character, Rank[2], TileModifier.Red).isEdge(),
      ).toBe(false);
    });
  });

  describe('types', () => {
    it('同じ Suit の SuitTile を与えられた場合、true を返すこと', () => {
      const sut = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);
      const target = new SuitTile(Suit.Character, Rank[6], TileModifier.Normal);

      expect(sut.types(target)).toBe(true);
    });

    it('異なる Suit の値を持つ SuitTile を与えられた場合、true を返すこと', () => {
      const sut = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);
      const target = new SuitTile(Suit.Circle, Rank[5], TileModifier.Normal);

      expect(sut.types(target)).toBe(false);
    });
  });
});

import { describe, expect, it } from 'vitest';

import { Honor } from './honor';
import { HonorTile } from './honor-tile';
import { Rank } from './rank';
import { Suit } from './suit';
import { SuitTile } from './suit-tile';
import { TileModifier } from './tile-modifier';

describe('SuitTile', () => {
  describe('equals メソッド', () => {
    it('すべての属性が同じ SuitTile を渡した場合、true を返すこと', () => {
      const sut = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);
      const target = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);

      expect(sut.equals(target)).toBe(true);
    });

    it('HonorTile を渡した場合、false を返すこと', () => {
      const sut = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);
      const target = new HonorTile(Honor.South, TileModifier.Normal);

      expect(sut.equals(target)).toBe(false);
    });

    describe('属性が異なる SuitTile を渡した場合、false を返すこと', () => {
      it('Suit が異なる SuitTile を渡した場合、false を返すこと', () => {
        const sut = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);
        const target = new SuitTile(Suit.Circle, Rank[5], TileModifier.Normal);

        expect(sut.equals(target)).toBe(false);
      });

      it('Rank が異なる SuitTile を渡した場合、false を返すこと', () => {
        const sut = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);
        const target = new SuitTile(
          Suit.Character,
          Rank[4],
          TileModifier.Normal,
        );

        expect(sut.equals(target)).toBe(false);
      });

      it('TileModifier が異なる SuitTile を渡した場合、false を返すこと', () => {
        const sut = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);
        const target = new SuitTile(Suit.Character, Rank[5], TileModifier.Red);

        expect(sut.equals(target)).toBe(false);
      });
    });
  });

  describe('isEdge メソッド', () => {
    describe('末端の値の場合、true を返すこと', () => {
      it('1 の場合、true を返すこと', () => {
        const sut = new SuitTile(Suit.Character, Rank[1], TileModifier.Normal);

        const actual = sut.isEdge();

        expect(actual).toBe(true);
      });

      it('9 の場合、true を返すこと', () => {
        const sut = new SuitTile(Suit.Character, Rank[9], TileModifier.Normal);

        const actual = sut.isEdge();

        expect(actual).toBe(true);
      });
    });

    describe('末端の値ではない場合、false を返すこと', () => {
      it('2 の場合、false を返すこと', () => {
        const sut = new SuitTile(Suit.Character, Rank[2], TileModifier.Normal);

        const actual = sut.isEdge();

        expect(actual).toBe(false);
      });

      it('8 の場合、false を返すこと', () => {
        const sut = new SuitTile(Suit.Character, Rank[8], TileModifier.Normal);

        const actual = sut.isEdge();

        expect(actual).toBe(false);
      });
    });
  });

  describe('types メソッド', () => {
    it('同じ Suit の値を持つ SuitTile を渡した場合、true を返すこと', () => {
      const sut = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);
      const target = new SuitTile(Suit.Character, Rank[6], TileModifier.Normal);

      const actual = sut.types(target);

      expect(actual).toBe(true);
    });

    it('別の Suit の値を持つ SuitTile を渡した場合、true を返すこと', () => {
      const sut = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);
      const target = new SuitTile(Suit.Circle, Rank[5], TileModifier.Normal);

      const actual = sut.types(target);

      expect(actual).toBe(false);
    });
  });
});

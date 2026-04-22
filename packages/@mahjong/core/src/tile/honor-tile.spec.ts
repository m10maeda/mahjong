import { describe, expect, it } from 'vitest';

import { Honor } from './honor';
import { HonorTile } from './honor-tile';
import { Rank } from './rank';
import { Suit } from './suit';
import { SuitTile } from './suit-tile';
import { TileModifier } from './tile-modifier';

describe('HonorTile', () => {
  describe('equals メソッド', () => {
    it('すべての属性が同じ HonorTile を渡した場合、true を返すこと', () => {
      const sut = new HonorTile(Honor.East, TileModifier.Normal);
      const target = new HonorTile(Honor.East, TileModifier.Normal);

      expect(sut.equals(target)).toBe(true);
    });

    it('SuitTile を渡した場合、false を返すこと', () => {
      const sut = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);
      const target = new HonorTile(Honor.South, TileModifier.Normal);

      expect(sut.equals(target)).toBe(false);
    });

    describe('属性が異なる HonorTile を渡した場合、false を返すこと', () => {
      it('Honor が異なる HonorTile を渡した場合、false を返すこと', () => {
        const sut = new HonorTile(Honor.East, TileModifier.Normal);
        const target = new HonorTile(Honor.South, TileModifier.Normal);

        expect(sut.equals(target)).toBe(false);
      });

      it('TileModifier が異なる HonorTile を渡した場合、false を返すこと', () => {
        const sut = new HonorTile(Honor.East, TileModifier.Normal);
        const target = new HonorTile(Honor.East, TileModifier.Red);

        expect(sut.equals(target)).toBe(false);
      });
    });
  });
});

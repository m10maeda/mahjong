import { describe, expect, it } from 'vitest';

import { Honor } from './honor';
import { HonorTile } from './honor-tile';
import { Rank } from './rank';
import { Suit } from './suit';
import { SuitTile } from './suit-tile';
import { TileModifier } from './tile-modifier';

describe('HonorTile', () => {
  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      const sut = new HonorTile(Honor.East, TileModifier.Normal);
      const target = new HonorTile(Honor.East, TileModifier.Normal);

      expect(sut.equals(target)).toBe(true);
    });

    describe('異なる値を与えられた場合', () => {
      it('SuitTile を与えられた場合、false を返すこと', () => {
        const sut = new SuitTile(Suit.Character, Rank[5], TileModifier.Normal);
        const target = new HonorTile(Honor.South, TileModifier.Normal);

        expect(sut.equals(target)).toBe(false);
      });

      it('honor が異なる HonorTile を与えられた場合、false を返すこと', () => {
        const sut = new HonorTile(Honor.East, TileModifier.Normal);
        const target = new HonorTile(Honor.South, TileModifier.Normal);

        expect(sut.equals(target)).toBe(false);
      });

      it('modifier が異なる HonorTile を与えられた場合、false を返すこと', () => {
        const sut = new HonorTile(Honor.East, TileModifier.Normal);
        const target = new HonorTile(Honor.East, TileModifier.Red);

        expect(sut.equals(target)).toBe(false);
      });
    });
  });
});

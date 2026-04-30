import { describe, expect, it } from 'vitest';

import { OrderedTiles } from './ordered-tiles';
import { TilePosition } from './tile-position';
import { Rank, Suit, SuitTile, TileModifier } from '../../tile';

describe('OrderedTiles', () => {
  describe('size', () => {
    it('所持している Tile の数を返すこと', () => {
      const tiles = [
        new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
      ];
      const sut = new OrderedTiles(...tiles);

      expect(sut.size).toBe(tiles.length);
    });
  });

  describe('at', () => {
    const tiles = [
      new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
    ] as const;
    const sut = new OrderedTiles(...tiles);

    it('与えられた位置に Tile が存在する場合、Tile を返すこと', () => {
      const index = 1;

      expect(sut.at(new TilePosition(index))?.equals(tiles[index])).toBe(true);
    });

    it('与えられた位置に Tile が存在しない場合、undefined を返すこと', () => {
      const result = sut.at(new TilePosition(tiles.length));

      expect(result).toBeUndefined();
    });
  });

  describe('slice', () => {
    const sut = new OrderedTiles(
      new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[4], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[5], TileModifier.Normal),
    );

    it('与えられた位置の範囲に Tile が存在する場合、Tile の配列を返すこと', () => {
      const result = sut.slice(new TilePosition(1), new TilePosition(3));
      const expected = [
        new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
      ];

      expect(result).toEqual(expected);
    });

    it('与えられた位置の範囲に Tile が存在しない場合、空の配列を返すこと', () => {
      const result = sut.slice(new TilePosition(5), new TilePosition(7));

      expect(result).toEqual([]);
    });

    it('end を省略した場合、start から最後までの Tile の配列を返すこと', () => {
      const result = sut.slice(new TilePosition(3));
      const expected = [
        new SuitTile(Suit.Character, Rank[4], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[5], TileModifier.Normal),
      ];

      expect(result).toEqual(expected);
    });

    it('start と end が同じ場合、空の配列を返すこと', () => {
      const result = sut.slice(new TilePosition(1), new TilePosition(1));

      expect(result).toEqual([]);
    });

    it('start が end より大きい場合、空の配列を返すこと', () => {
      const result = sut.slice(new TilePosition(2), new TilePosition(1));

      expect(result).toEqual([]);
    });

    it('元の値は変化しないこと', () => {
      sut.slice(new TilePosition(1), new TilePosition(3));

      const expected = [
        new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[4], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[5], TileModifier.Normal),
      ];

      expect([...sut]).toEqual(expected);
    });
  });
});

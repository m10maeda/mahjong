import { describe, expect, it } from 'vitest';

import { OrderedTiles } from './ordered-tiles';
import { TilePosition } from './tile-position';
import { Wall } from './wall';
import { Rank, Suit, SuitTile, TileModifier } from '../../tile';

describe('Wall', () => {
  describe('有効な値を与えられた場合', () => {
    it('Wall として成立すること', () => {
      expect(() => {
        new Wall(
          new OrderedTiles(
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
            new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
            new SuitTile(Suit.Circle, Rank[1], TileModifier.Normal),
            new SuitTile(Suit.Circle, Rank[2], TileModifier.Normal),
          ),
          new TilePosition(2),
        );
      }).not.toThrow(Error);
    });
  });

  describe('無効な値を与えられた場合', () => {
    it('与えられた王牌の開始地点が、与えられた牌の総数より大きい場合、エラーを投げること', () => {
      expect(() => {
        new Wall(
          new OrderedTiles(
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
            new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
            new SuitTile(Suit.Circle, Rank[1], TileModifier.Normal),
            new SuitTile(Suit.Circle, Rank[2], TileModifier.Normal),
          ),
          new TilePosition(4),
        );
      }).toThrow(Error);
    });
  });

  describe('dead', () => {
    it('王牌の Tile を返すこと', () => {
      const tiles = [
        new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[4], TileModifier.Normal),
      ] as const;
      const sut = new Wall(new OrderedTiles(...tiles), new TilePosition(2));

      expect(sut.dead).toEqual([
        new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[4], TileModifier.Normal),
      ]);
    });
  });

  describe('at', () => {
    const tiles = [
      new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[4], TileModifier.Normal),
    ] as const;
    const sut = new Wall(new OrderedTiles(...tiles), new TilePosition(2));

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
    const tiles = [
      new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[4], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[5], TileModifier.Normal),
    ] as const;
    const sut = new Wall(new OrderedTiles(...tiles), new TilePosition(2));

    describe('与えられた位置の範囲に Tile が存在する場合', () => {
      it('終了位置を与えられた場合、与えられた開始位置と終了位置の範囲の Tile の配列を返すこと', () => {
        const result = sut.slice(new TilePosition(1), new TilePosition(3));
        const expected = [
          new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
        ];

        expect(result).toEqual(expected);
      });

      it('終了位置を与えられなかった場合、与えられた開始位置から最後までの Tile の配列を返すこと', () => {
        const result = sut.slice(new TilePosition(3));
        const expected = [
          new SuitTile(Suit.Character, Rank[4], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[5], TileModifier.Normal),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe('与えられた位置の範囲に Tile が存在しない場合', () => {
      it('与えられた開始位置と終了位置の範囲に Tile が存在しない場合、空の配列を返すこと', () => {
        const result = sut.slice(new TilePosition(5), new TilePosition(7));

        expect(result).toEqual([]);
      });

      it('与えられた開始位置と終了位置が同じ場合、空の配列を返すこと', () => {
        const result = sut.slice(new TilePosition(1), new TilePosition(1));

        expect(result).toEqual([]);
      });

      it('与えられた開始位置が与えられた終了位置より大きい場合、空の配列を返すこと', () => {
        const start = new TilePosition(2);
        const end = new TilePosition(1);

        expect(start > end).toBe(true);

        const result = sut.slice(start, end);

        expect(result).toEqual([]);
      });
    });

    it('元の値は変化しないこと', () => {
      sut.slice(new TilePosition(1), new TilePosition(3));

      expect([...sut.tiles]).toEqual(tiles);
    });
  });

  describe('withMovedDeadWallStartPosition', () => {
    const tiles = [
      new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
      new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
      new SuitTile(Suit.Circle, Rank[1], TileModifier.Normal),
      new SuitTile(Suit.Circle, Rank[2], TileModifier.Normal),
    ];
    const sut = new Wall(new OrderedTiles(...tiles), new TilePosition(2));
    const newPosition = new TilePosition(1);

    it('与えられた王牌開始位置の新しい値を返すこと', () => {
      expect(sut.deadWallStartPosition.equals(newPosition)).toBe(false);

      const result = sut.withMovedDeadWallStartPosition(newPosition);

      expect(result.deadWallStartPosition.equals(newPosition)).toBe(true);

      expect(result).not.toBe(sut);
    });

    it('元の値は変化しないこと', () => {
      expect(sut.deadWallStartPosition.equals(newPosition)).toBe(false);

      sut.withMovedDeadWallStartPosition(newPosition);

      expect(sut.deadWallStartPosition.equals(newPosition)).toBe(false);
      expect([...sut.tiles]).toEqual(tiles);
    });
  });
});

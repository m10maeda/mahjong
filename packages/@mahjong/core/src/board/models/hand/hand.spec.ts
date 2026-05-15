import { describe, expect, it } from 'vitest';

import { Hand } from './hand';
import { InvalidTileNotHeldError } from './invalid-tile-not-held-error';
import { Rank, Suit, SuitTile, TileModifier } from '../../../concepts';

describe('Hand', () => {
  describe('add', () => {
    it('与えられた牌を手牌に追加して、牌を捨てることが可能となること', () => {
      const sut = new Hand(
        new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
      );
      const target = new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal);

      expect(() => {
        sut.discard(target);
      }).toThrow(InvalidTileNotHeldError);

      const result = sut.add(target);

      expect(() => {
        result.discard(target);
      }).not.toThrow(InvalidTileNotHeldError);
    });

    it('新しい手牌を返すこと', () => {
      const sut = new Hand(
        new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
      );

      const result = sut.add(
        new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
      );

      expect(result).not.toBe(sut);
    });
  });

  describe('discard', () => {
    describe('与えられた牌を保持している場合', () => {
      it('TileNotHeldError を投げないこと', () => {
        const sut = new Hand(
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
        );

        expect(() => {
          sut.discard(
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          );
        }).not.toThrow(InvalidTileNotHeldError);
      });

      it('手牌から削除され、2回目以降は TileNotHeldError を投げること', () => {
        const sut = new Hand(
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
        );
        const target = new SuitTile(
          Suit.Character,
          Rank[1],
          TileModifier.Normal,
        );

        let result: Hand;

        expect(() => {
          result = sut.discard(target);
        }).not.toThrow(InvalidTileNotHeldError);

        expect(() => {
          result.discard(target);
        }).toThrow(InvalidTileNotHeldError);
      });

      it('新しい手牌を返すこと', () => {
        const sut = new Hand(
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
        );

        const result = sut.discard(
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        );

        expect(result).not.toBe(sut);
      });
    });

    describe('与えられた牌を保持していない場合', () => {
      it('TileNotHeldError を投げること', () => {
        const sut = new Hand(
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
        );

        expect(() => {
          sut.discard(new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal));
        }).toThrow(InvalidTileNotHeldError);
      });
    });
  });
});

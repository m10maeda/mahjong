import { describe, expect, it } from 'vitest';

import { Hand } from './hand';
import { InvalidTileNotHeldError } from './invalid-tile-not-held-error';
import { MeldNotHeldError } from './meld-not-held-error';
import { MeldOperation } from './meld-operation';
import { MeldTileGroup } from './meld-tile-group';
import { Rank, Suit, SuitTile, TileModifier } from '../../tile';

describe('Hand', () => {
  describe('add', () => {
    it('与えられた牌を手牌に追加して、牌を捨てることが可能となること', () => {
      const sut = new Hand([
        new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
      ]);
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
      const sut = new Hand([
        new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
      ]);

      const result = sut.add(
        new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
      );

      expect(result).not.toBe(sut);
    });
  });

  describe('discard', () => {
    describe('与えられた牌を保持している場合', () => {
      it('TileNotHeldError を投げないこと', () => {
        const sut = new Hand([
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
        ]);

        expect(() => {
          sut.discard(
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          );
        }).not.toThrow(InvalidTileNotHeldError);
      });

      it('手牌から削除され、2回目以降は TileNotHeldError を投げること', () => {
        const sut = new Hand([
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
        ]);
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
        const sut = new Hand([
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
        ]);

        const result = sut.discard(
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        );

        expect(result).not.toBe(sut);
      });
    });

    describe('与えられた牌を保持していない場合', () => {
      it('TileNotHeldError を投げること', () => {
        const sut = new Hand([
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
        ]);

        expect(() => {
          sut.discard(new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal));
        }).toThrow(InvalidTileNotHeldError);
      });
    });
  });

  describe('meld', () => {
    describe('副露で消費する牌が充足している場合', () => {
      it('TileNotHeldError を投げないこと', () => {
        const sut = new Hand([
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        ]);

        expect(() => {
          sut.meld(
            new MeldOperation(
              new MeldTileGroup(
                new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
                new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
                new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
              ),
              [
                new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
                new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
              ],
            ),
          );
        }).not.toThrow(InvalidTileNotHeldError);
      });

      it('与えられた消費牌が手牌から消費され、消費された牌を捨てようとすると TileNotHeldError を投げること', () => {
        const sut = new Hand([
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        ]);

        expect(() => {
          sut.discard(
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          );
        }).not.toThrow(InvalidTileNotHeldError);

        const result = sut.meld(
          new MeldOperation(
            new MeldTileGroup(
              new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
              new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
              new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
            ),
            [
              new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
              new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
            ],
          ),
        );

        expect(() => {
          result.discard(
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          );
        }).toThrow(InvalidTileNotHeldError);
      });
    });

    describe('副露で消費する牌が不足している場合', () => {
      it('TileNotHeldError を投げること', () => {
        const sut = new Hand(
          [new SuitTile(Suit.Character, Rank[1], TileModifier.Normal)],
          [
            new MeldTileGroup(
              new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
              new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
              new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
            ),
          ],
        );

        expect(() => {
          sut.meld(
            new MeldOperation(
              new MeldTileGroup(
                new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
                new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
                new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
              ),
              [
                new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
                new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
              ],
            ),
          );
        }).toThrow(InvalidTileNotHeldError);
      });
    });
  });

  describe('extend', () => {
    describe('与えられた拡張元になる副露面子と副露で消費する牌が充足している場合', () => {
      const sut = new Hand(
        [
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        ],
        [
          new MeldTileGroup(
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          ),
        ],
      );

      const base = new MeldTileGroup(
        new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
      );
      const meld = new MeldOperation(
        new MeldTileGroup(
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        ),
        [new SuitTile(Suit.Character, Rank[1], TileModifier.Normal)],
      );

      it('MeldNotHeldError を投げないこと', () => {
        expect(() => {
          sut.extend(base, meld);
        }).not.toThrow(MeldNotHeldError);
      });

      it('TileNotHeldError を投げないこと', () => {
        expect(() => {
          sut.extend(base, meld);
        }).not.toThrow(InvalidTileNotHeldError);
      });

      it('与えられた消費牌が手牌から消費され、消費された牌を捨てようとすると TileNotHeldError を投げること', () => {
        expect(() => {
          sut.discard(
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          );
        }).not.toThrow(InvalidTileNotHeldError);

        const result = sut.extend(base, meld);

        expect(() => {
          result.discard(
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          );
        }).toThrow(InvalidTileNotHeldError);
      });
    });

    describe('与えられた拡張元となる副露面子を所持していない場合', () => {
      const sut = new Hand(
        [
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        ],
        [
          new MeldTileGroup(
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
            new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          ),
        ],
      );

      const base = new MeldTileGroup(
        new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
      );
      const meld = new MeldOperation(
        new MeldTileGroup(
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        ),
        [new SuitTile(Suit.Character, Rank[1], TileModifier.Normal)],
      );

      it('MeldNotHeldError を投げること', () => {
        expect(() => {
          sut.extend(base, meld);
        }).toThrow(MeldNotHeldError);
      });
    });

    describe('副露で消費する牌が不足している場合', () => {
      it('TileNotHeldError を投げること', () => {
        const sut = new Hand(
          [new SuitTile(Suit.Character, Rank[1], TileModifier.Normal)],
          [
            new MeldTileGroup(
              new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
              new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
              new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
            ),
          ],
        );

        expect(() => {
          sut.extend(
            new MeldTileGroup(
              new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
              new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
              new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
            ),
            new MeldOperation(
              new MeldTileGroup(
                new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
                new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
                new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
                new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
              ),
              [new SuitTile(Suit.Character, Rank[2], TileModifier.Normal)],
            ),
          );
        }).toThrow(InvalidTileNotHeldError);
      });
    });
  });
});

import { describe, expect, it } from 'vitest';

import { Board } from './board';
import { DeadWall } from './dead-wall';
import { DiscardPile } from './discard-pile';
import { Hand, InvalidTileNotHeldError } from './hand';
import { Hands } from './hands';
import { InvalidHolderNotFoundError } from './invalid-holder-not-found-error';
import { OpenMeld } from './meld';
import { Melds } from './melds';
import { Wall } from './wall';
import { SeatPosition } from '../../seat-position';
import { Rank, Suit, SuitTile, TileModifier } from '../../tile';
import { MeldReference } from '../events/melded';

describe('Board', () => {
  function createBoard() {
    return new Board(
      new Wall(
        new SuitTile(Suit.Character, Rank[1], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[2], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[3], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[4], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[5], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[6], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[7], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[8], TileModifier.Normal),
        new SuitTile(Suit.Character, Rank[9], TileModifier.Normal),
      ),
      new DeadWall(
        new SuitTile(Suit.Circle, Rank[1], TileModifier.Normal),
        new SuitTile(Suit.Circle, Rank[2], TileModifier.Normal),
        new SuitTile(Suit.Circle, Rank[3], TileModifier.Normal),
        new SuitTile(Suit.Circle, Rank[4], TileModifier.Normal),
      ),
      new Hands(
        [
          SeatPosition.East,
          new Hand(
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[3], TileModifier.Normal),
          ),
        ],
        [
          SeatPosition.South,
          new Hand(
            new SuitTile(Suit.Bamboo, Rank[4], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[5], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[6], TileModifier.Normal),
          ),
        ],
        [
          SeatPosition.West,
          new Hand(
            new SuitTile(Suit.Bamboo, Rank[7], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[8], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[9], TileModifier.Normal),
          ),
        ],
      ),
      new DiscardPile(new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal)),
      new Melds(
        new OpenMeld(
          SeatPosition.East,
          [
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
          ],
          new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
          SeatPosition.West,
        ),
      ),
    );
  }

  describe('discard', () => {
    describe('与えられた位置の手牌が与えられた捨て牌を保持している場合', () => {
      it('TileNotHeldError を投げないこと', () => {
        const sut = createBoard();

        expect(() => {
          sut.discard(
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            SeatPosition.East,
            true,
          );
        }).not.toThrow(InvalidTileNotHeldError);
      });

      it('与えられた位置の手牌から与えられた捨て牌が捨てられ、2回目以降は TileNotHeldError を投げること', () => {
        const sut = createBoard();

        const [, result] = sut.discard(
          new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
          SeatPosition.East,
          true,
        );

        expect(() => {
          result.discard(
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            SeatPosition.East,
            true,
          );
        }).toThrow(InvalidTileNotHeldError);
      });
    });

    describe('与えられた位置の手牌が存在しない場合', () => {
      it('InvalidHolderNotFoundError を投げること', () => {
        const sut = createBoard();

        expect(() => {
          sut.discard(
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            SeatPosition.North,
            true,
          );
        }).toThrow(InvalidHolderNotFoundError);
      });
    });

    describe('与えられた位置の手牌が与えられた捨て牌を保持していない場合', () => {
      const sut = createBoard();

      it('TileNotHeldError を投げること', () => {
        expect(() => {
          sut.discard(
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            SeatPosition.South,
            true,
          );
        }).toThrow(InvalidTileNotHeldError);
      });
    });
  });

  describe('draw', () => {
    describe('与えられた位置の手牌が存在する場合', () => {
      it('与えられた位置の手牌に追加して、牌を捨てることが可能となること', () => {
        const sut = createBoard();

        const [tileDrawn, result] = sut.draw(SeatPosition.East);

        expect(() => {
          sut.discard(tileDrawn.tile, SeatPosition.East, true);
        }).toThrow(InvalidTileNotHeldError);

        expect(() => {
          result.discard(tileDrawn.tile, SeatPosition.East, true);
        }).not.toThrow(InvalidTileNotHeldError);
      });
    });

    describe('与えられた位置の手牌が存在しない場合', () => {
      it('InvalidHolderNotFoundError を投げること', () => {
        const sut = createBoard();

        expect(() => {
          sut.draw(SeatPosition.North);
        }).toThrow(InvalidHolderNotFoundError);
      });
    });
  });

  describe('drawFromDeadWall', () => {
    describe('与えられた位置の手牌が存在する場合', () => {
      it('与えられた位置の手牌に牌を手牌に追加して、牌を捨てることが可能となること', () => {
        const sut = createBoard();

        const [tileDrawn, result] = sut.drawFromDeadWall(SeatPosition.East);

        expect(() => {
          sut.discard(tileDrawn.tile, SeatPosition.East, true);
        }).toThrow(InvalidTileNotHeldError);

        expect(() => {
          result.discard(tileDrawn.tile, SeatPosition.East, true);
        }).not.toThrow(InvalidTileNotHeldError);
      });
    });

    describe('与えられた位置の手牌が存在しない場合', () => {
      it('InvalidHolderNotFoundError を投げること', () => {
        const sut = createBoard();

        expect(() => {
          sut.drawFromDeadWall(SeatPosition.North);
        }).toThrow(InvalidHolderNotFoundError);
      });
    });
  });

  describe('extendMeld', () => {
    describe('副露可能な条件を満たしている場合', () => {
      it('与えられた与えられた消費牌を手牌から消費すること', () => {
        const sut = createBoard();

        expect(() => {
          sut.discard(
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            SeatPosition.East,
            false,
          );
        }).not.toThrow(InvalidTileNotHeldError);

        const [, result] = sut.extendMeld(
          SeatPosition.East,
          new MeldReference(SeatPosition.East, 0),
          [new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal)],
        );

        expect(() => {
          result.discard(
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            SeatPosition.East,
            false,
          );
        }).toThrow(InvalidTileNotHeldError);
      });
    });
  });

  describe('meldFromSelf', () => {
    describe('副露可能な条件を満たしている場合', () => {
      it('与えられた与えられた消費牌を手牌から消費すること', () => {
        const sut = createBoard();

        expect(() => {
          sut.discard(
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            SeatPosition.East,
            false,
          );
        }).not.toThrow(InvalidTileNotHeldError);

        const [, result] = sut.meldFromSelf(SeatPosition.East, [
          new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
          new SuitTile(Suit.Bamboo, Rank[3], TileModifier.Normal),
        ]);

        expect(() => {
          result.discard(
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            SeatPosition.East,
            false,
          );
        }).toThrow(InvalidTileNotHeldError);
      });
    });
  });

  describe('meldWithClaimed', () => {
    describe('副露可能な条件を満たしている場合', () => {
      it('与えられた与えられた消費牌を手牌から消費すること', () => {
        const sut = createBoard();

        expect(() => {
          sut.discard(
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            SeatPosition.East,
            false,
          );
        }).not.toThrow(InvalidTileNotHeldError);

        const [, result] = sut.meldWithClaimed(
          SeatPosition.East,
          new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
          SeatPosition.West,
          [
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[3], TileModifier.Normal),
          ],
        );

        expect(() => {
          result.discard(
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            SeatPosition.East,
            false,
          );
        }).toThrow(InvalidTileNotHeldError);
      });
    });
  });
});

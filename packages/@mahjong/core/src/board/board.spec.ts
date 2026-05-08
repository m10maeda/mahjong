import { describe, expect, it } from 'vitest';

import { Board } from './board';
import { DeadWall } from './dead-wall';
import { DiscardPile } from './discard-pile';
import { Hand, MeldOperation, MeldTileGroup, TileNotHeldError } from './hand';
import { MeldNotHeldError } from './hand/meld-not-held-error';
import { Wall } from './wall';
import { SeatPosition } from '../seat-position';
import { Rank, Suit, SuitTile, TileModifier } from '../tile';
import { Hands } from './hands';
import { InvalidHolderNotFoundError } from './invalid-holder-not-found-error';

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
            [
              new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
              new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
              new SuitTile(Suit.Bamboo, Rank[3], TileModifier.Normal),
            ],
            [
              new MeldTileGroup(
                new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
                new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
                new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
              ),
            ],
          ),
        ],
        [
          SeatPosition.South,
          new Hand([
            new SuitTile(Suit.Bamboo, Rank[4], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[5], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[6], TileModifier.Normal),
          ]),
        ],
        [
          SeatPosition.West,
          new Hand([
            new SuitTile(Suit.Bamboo, Rank[7], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[8], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[9], TileModifier.Normal),
          ]),
        ],
      ),
      new DiscardPile(),
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
          );
        }).not.toThrow(TileNotHeldError);
      });

      it('与えられた位置の手牌から与えられた捨て牌が捨てられ、2回目以降は TileNotHeldError を投げること', () => {
        const sut = createBoard();

        const result = sut.discard(
          new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
          SeatPosition.East,
        );

        expect(() => {
          result.discard(
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            SeatPosition.East,
          );
        }).toThrow(TileNotHeldError);
      });
    });

    describe('与えられた位置の手牌が存在しない場合', () => {
      it('InvalidHolderNotFoundError を投げること', () => {
        const sut = createBoard();

        expect(() => {
          sut.discard(
            new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
            SeatPosition.North,
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
          );
        }).toThrow(TileNotHeldError);
      });
    });
  });

  describe('draw', () => {
    describe('与えられた位置の手牌が存在する場合', () => {
      it('与えられた位置の手牌に追加して、牌を捨てることが可能となること', () => {
        const sut = createBoard();

        const [drawnTile, result] = sut.draw(SeatPosition.East);

        expect(() => {
          sut.discard(drawnTile, SeatPosition.East);
        }).toThrow(TileNotHeldError);

        expect(() => {
          result.discard(drawnTile, SeatPosition.East);
        }).not.toThrow(TileNotHeldError);
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

        const [drawnTile, result] = sut.drawFromDeadWall(SeatPosition.East);

        expect(() => {
          sut.discard(drawnTile, SeatPosition.East);
        }).toThrow(TileNotHeldError);

        expect(() => {
          result.discard(drawnTile, SeatPosition.East);
        }).not.toThrow(TileNotHeldError);
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

  describe('extend', () => {
    describe('与えられた位置の手牌が存在しない場合', () => {
      it('InvalidHolderNotFoundError を投げること', () => {
        const sut = createBoard();

        const base = new MeldTileGroup(
          new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
          new SuitTile(Suit.Bamboo, Rank[1], TileModifier.Normal),
        );

        const operation = new MeldOperation(
          new MeldTileGroup(
            new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[3], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[4], TileModifier.Normal),
          ),
          [
            new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[3], TileModifier.Normal),
          ],
          new SuitTile(Suit.Bamboo, Rank[4], TileModifier.Normal),
        );

        expect(() => {
          sut.extend(SeatPosition.North, base, operation);
        }).toThrow(InvalidHolderNotFoundError);
      });
    });

    describe('与えられた元の副露面子が手牌に存在しない場合', () => {
      it('InvalidHolderNotFoundError を投げること', () => {
        const sut = createBoard();

        const base = new MeldTileGroup(
          new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
          new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
          new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
        );

        const operation = new MeldOperation(
          new MeldTileGroup(
            new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
          ),
          [new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal)],
        );

        expect(() => {
          sut.extend(SeatPosition.East, base, operation);
        }).toThrow(MeldNotHeldError);
      });
    });
  });

  describe('meld', () => {
    describe('与えられた位置の手牌が存在する場合', () => {
      it('InvalidHolderNotFoundError を投げないこと', () => {
        const sut = createBoard();

        const target = new MeldOperation(
          new MeldTileGroup(
            new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[3], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[4], TileModifier.Normal),
          ),
          [
            new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[3], TileModifier.Normal),
          ],
          new SuitTile(Suit.Bamboo, Rank[4], TileModifier.Normal),
        );

        expect(() => {
          sut.meld(SeatPosition.East, target);
        }).not.toThrow(InvalidHolderNotFoundError);
      });
    });

    describe('与えられた位置の手牌が存在しない場合', () => {
      it('InvalidHolderNotFoundError を投げること', () => {
        const sut = createBoard();

        const target = new MeldOperation(
          new MeldTileGroup(
            new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[3], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[4], TileModifier.Normal),
          ),
          [
            new SuitTile(Suit.Bamboo, Rank[2], TileModifier.Normal),
            new SuitTile(Suit.Bamboo, Rank[3], TileModifier.Normal),
          ],
          new SuitTile(Suit.Bamboo, Rank[4], TileModifier.Normal),
        );

        expect(() => {
          sut.meld(SeatPosition.North, target);
        }).toThrow(InvalidHolderNotFoundError);
      });
    });
  });
});

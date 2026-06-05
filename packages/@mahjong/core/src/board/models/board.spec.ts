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
import { Tile, SuitType, TileModifier, SeatPosition } from '../../concepts';
import { MeldReference, MeldSequence } from '../concepts';

describe('Board', () => {
  function createBoard() {
    return new Board(
      new Wall(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
        new Tile(SuitType.Character3, TileModifier.Normal),
        new Tile(SuitType.Character4, TileModifier.Normal),
        new Tile(SuitType.Character5, TileModifier.Normal),
        new Tile(SuitType.Character6, TileModifier.Normal),
        new Tile(SuitType.Character7, TileModifier.Normal),
        new Tile(SuitType.Character8, TileModifier.Normal),
        new Tile(SuitType.Character9, TileModifier.Normal),
      ),
      new DeadWall(
        new Tile(SuitType.Circle1, TileModifier.Normal),
        new Tile(SuitType.Circle2, TileModifier.Normal),
        new Tile(SuitType.Circle3, TileModifier.Normal),
        new Tile(SuitType.Circle4, TileModifier.Normal),
      ),
      new Hands(
        [
          SeatPosition.East,
          new Hand(
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
            new Tile(SuitType.Bamboo2, TileModifier.Normal),
            new Tile(SuitType.Bamboo3, TileModifier.Normal),
          ),
        ],
        [
          SeatPosition.South,
          new Hand(
            new Tile(SuitType.Bamboo4, TileModifier.Normal),
            new Tile(SuitType.Bamboo5, TileModifier.Normal),
            new Tile(SuitType.Bamboo6, TileModifier.Normal),
          ),
        ],
        [
          SeatPosition.West,
          new Hand(
            new Tile(SuitType.Bamboo7, TileModifier.Normal),
            new Tile(SuitType.Bamboo8, TileModifier.Normal),
            new Tile(SuitType.Bamboo9, TileModifier.Normal),
          ),
        ],
      ),
      new DiscardPile(new Tile(SuitType.Bamboo1, TileModifier.Normal)),
      new Melds([
        new MeldReference(SeatPosition.East, new MeldSequence(0)),
        new OpenMeld(
          SeatPosition.East,
          [
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
          ],
          new Tile(SuitType.Bamboo1, TileModifier.Normal),
          SeatPosition.West,
        ),
      ]),
    );
  }

  describe('discard', () => {
    describe('与えられた位置の手牌が与えられた捨て牌を保持している場合', () => {
      it('TileNotHeldError を投げないこと', () => {
        const sut = createBoard();

        expect(() => {
          sut.discard(
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
            SeatPosition.East,
            true,
          );
        }).not.toThrow(InvalidTileNotHeldError);
      });

      it('与えられた位置の手牌から与えられた捨て牌が捨てられ、2回目以降は TileNotHeldError を投げること', () => {
        const sut = createBoard();

        const [, result] = sut.discard(
          new Tile(SuitType.Bamboo1, TileModifier.Normal),
          SeatPosition.East,
          true,
        );

        expect(() => {
          result.discard(
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
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
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
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
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
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
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
            SeatPosition.East,
            false,
          );
        }).not.toThrow(InvalidTileNotHeldError);

        const [, result] = sut.extendMeld(
          SeatPosition.East,
          new MeldReference(SeatPosition.East, MeldSequence.new()),
          [new Tile(SuitType.Bamboo1, TileModifier.Normal)],
        );

        expect(() => {
          result.discard(
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
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
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
            SeatPosition.East,
            false,
          );
        }).not.toThrow(InvalidTileNotHeldError);

        const [, result] = sut.meldFromSelf(SeatPosition.East, [
          new Tile(SuitType.Bamboo1, TileModifier.Normal),
          new Tile(SuitType.Bamboo2, TileModifier.Normal),
          new Tile(SuitType.Bamboo3, TileModifier.Normal),
        ]);

        expect(() => {
          result.discard(
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
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
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
            SeatPosition.East,
            false,
          );
        }).not.toThrow(InvalidTileNotHeldError);

        const [, result] = sut.meldWithClaimed(
          SeatPosition.East,
          new Tile(SuitType.Bamboo1, TileModifier.Normal),
          SeatPosition.West,
          [
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
            new Tile(SuitType.Bamboo2, TileModifier.Normal),
            new Tile(SuitType.Bamboo3, TileModifier.Normal),
          ],
        );

        expect(() => {
          result.discard(
            new Tile(SuitType.Bamboo1, TileModifier.Normal),
            SeatPosition.East,
            false,
          );
        }).toThrow(InvalidTileNotHeldError);
      });
    });
  });
});

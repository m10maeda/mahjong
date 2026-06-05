import { describe, expect, it } from 'vitest';

import { DeadWall } from './dead-wall';
import { SuitType, Tile, TileModifier } from '../../../concepts';
import { InvalidNoTilesError } from '../invalid-no-tiles-error';

describe('DeadWall', () => {
  describe('有効な値を与えられた場合', () => {
    it('Wall として成立すること', () => {
      expect(() => {
        new DeadWall(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Character4, TileModifier.Normal),
        );
      }).not.toThrow(Error);
    });
  });

  describe('supply', () => {
    it('与えられた牌を保持した新しい DeadWall を返すこと', () => {
      const sut = new DeadWall();

      expect([...sut]).not.toHaveLength(1);

      const result = sut.supply(
        new Tile(SuitType.Character1, TileModifier.Normal),
      );

      expect([...result]).toHaveLength(1);
      expect(
        result
          .take()[0]
          .equals(new Tile(SuitType.Character1, TileModifier.Normal)),
      ).toBe(true);
    });
  });

  describe('take', () => {
    describe('牌を1枚以上保持している場合', () => {
      it('保持している牌を払い出すまで InvalidTileNotHeldError を投げないこと', () => {
        let sut = new DeadWall(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
        );

        expect(() => {
          [, sut] = sut.take();
        }).not.toThrow(InvalidNoTilesError);

        expect(() => {
          [, sut] = sut.take();
        }).not.toThrow(InvalidNoTilesError);

        expect(() => {
          [, sut] = sut.take();
        }).toThrow(InvalidNoTilesError);
      });

      it('保持している牌を順番に払い出す新しい DeadWall を返すこと', () => {
        const sut = new DeadWall(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
        );

        const [result1, newDeadWall] = sut.take();
        const [result2] = newDeadWall.take();

        expect(
          result1.equals(new Tile(SuitType.Character2, TileModifier.Normal)),
        ).toBe(true);
        expect(
          result2.equals(new Tile(SuitType.Character1, TileModifier.Normal)),
        ).toBe(true);
      });
    });

    describe('牌を保持していない場合', () => {
      const sut = new DeadWall();

      it('InvalidTileNotHeldError を投げること', () => {
        expect(() => {
          sut.take();
        }).toThrow(InvalidNoTilesError);
      });
    });
  });
});

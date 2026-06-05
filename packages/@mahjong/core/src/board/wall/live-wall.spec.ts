import { describe, expect, it } from 'vitest';

import { InvalidNoTilesError } from '../invalid-no-tiles-error';
import { LiveWall } from './live-wall';
import { SuitType, Tile, TileModifier } from '../../concepts';

describe('LiveWall', () => {
  describe('有効な値を与えられた場合', () => {
    it('Wall として成立すること', () => {
      expect(() => {
        new LiveWall(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Circle1, TileModifier.Normal),
          new Tile(SuitType.Circle2, TileModifier.Normal),
        );
      }).not.toThrow(Error);
    });
  });

  describe('takeLastTile', () => {
    describe('牌を保持している場合', () => {
      it('末尾の牌と新しい Wall を返すこと', () => {
        const sut = new LiveWall(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Character4, TileModifier.Normal),
          new Tile(SuitType.Circle1, TileModifier.Normal),
          new Tile(SuitType.Circle2, TileModifier.Normal),
        );

        const [firstDrawnTile, nextWall] = sut.takeLastTile();
        const [secondDrawnTile] = nextWall.takeLastTile();

        expect(
          firstDrawnTile.equals(
            new Tile(SuitType.Circle2, TileModifier.Normal),
          ),
        ).toBe(true);
        expect(
          secondDrawnTile.equals(
            new Tile(SuitType.Circle1, TileModifier.Normal),
          ),
        ).toBe(true);

        expect(nextWall).not.toBe(sut);
      });
    });

    describe('牌を保持していない場合', () => {
      it('InvalidTileNotFoundError を投げること', () => {
        const sut = new LiveWall();

        expect(() => {
          sut.takeLastTile();
        }).toThrow(InvalidNoTilesError);
      });
    });
  });

  describe('takeTile', () => {
    describe('牌を保持している場合', () => {
      it('先頭の牌と新しい Wall を返すこと', () => {
        const sut = new LiveWall(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character2, TileModifier.Normal),
          new Tile(SuitType.Character3, TileModifier.Normal),
          new Tile(SuitType.Character4, TileModifier.Normal),
          new Tile(SuitType.Circle1, TileModifier.Normal),
          new Tile(SuitType.Circle2, TileModifier.Normal),
        );

        const [firstDrawnTile, nextWall] = sut.takeTile();
        const [secondDrawnTile] = nextWall.takeTile();

        expect(
          firstDrawnTile.equals(
            new Tile(SuitType.Character1, TileModifier.Normal),
          ),
        ).toBe(true);
        expect(
          secondDrawnTile.equals(
            new Tile(SuitType.Character2, TileModifier.Normal),
          ),
        ).toBe(true);

        expect(nextWall).not.toBe(sut);
      });
    });

    describe('牌を保持していない場合', () => {
      it('InvalidTileNotFoundError を投げること', () => {
        const sut = new LiveWall();

        expect(() => {
          sut.takeTile();
        }).toThrow(InvalidNoTilesError);
      });
    });
  });
});

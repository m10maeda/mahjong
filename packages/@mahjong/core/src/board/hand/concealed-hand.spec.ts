import { describe, expect, it } from 'vitest';

import { ConcealedHand } from './concealed-hand';
import { SuitType, Tile, TileModifier } from '../../tile';
import { InvalidNoTilesError } from '../invalid-no-tiles-error';

describe('ConcealedHand', () => {
  it('所持している牌を展開すること', () => {
    const sut = new ConcealedHand(
      new Tile(SuitType.Character1, TileModifier.Normal),
      new Tile(SuitType.Character1, TileModifier.Normal),
      new Tile(SuitType.Character2, TileModifier.Normal),
    );

    const result = [...sut];

    expect(result).toEqual(
      expect.arrayContaining([
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
      ]),
    );
  });

  describe('add', () => {
    it('与えられた牌を追加した新しい ConcealedHand を返すこと', () => {
      const sut = new ConcealedHand(
        new Tile(SuitType.Character1, TileModifier.Normal),
      );

      expect([...sut]).toHaveLength(1);
      expect([...sut]).not.toEqual(
        expect.arrayContaining([
          new Tile(SuitType.Character2, TileModifier.Normal),
        ]),
      );

      const result = sut.add(
        new Tile(SuitType.Character2, TileModifier.Normal),
      );

      expect([...result]).toHaveLength(2);
      expect([...result]).toEqual(
        expect.arrayContaining([
          new Tile(SuitType.Character2, TileModifier.Normal),
        ]),
      );

      expect(result).not.toBe(sut);
    });
  });

  describe('remove', () => {
    describe('与えられた牌を所持している場合、与えられた牌を除外した新しい ConcealedHand を返すこと', () => {
      it('与えられた牌を2枚以上持つ場合、1枚だけ除外されていること', () => {
        const sut = new ConcealedHand(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
        );

        expect([...sut]).toHaveLength(2);

        const result = sut.remove(
          new Tile(SuitType.Character1, TileModifier.Normal),
        );

        expect([...result]).toHaveLength(1);
        expect([...result]).toEqual([
          new Tile(SuitType.Character1, TileModifier.Normal),
        ]);
      });
    });

    it('与えられた牌を所持していない場合、InvalidNoTilesError を投げること', () => {
      const sut = new ConcealedHand(
        new Tile(SuitType.Character1, TileModifier.Normal),
      );

      expect(() => {
        sut.remove(new Tile(SuitType.Character2, TileModifier.Normal));
      }).toThrow(InvalidNoTilesError);
    });
  });

  describe('removeAll', () => {
    it('与えられた牌をすべて除外した新しい ConcealedHand を返すこと', () => {
      const sut = new ConcealedHand(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
      );

      expect([...sut]).toHaveLength(3);

      const result = sut.removeAll(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
      );

      expect([...result]).toHaveLength(1);
      expect([...result]).toEqual([
        new Tile(SuitType.Character1, TileModifier.Normal),
      ]);
    });
  });

  it('与えられた牌の一部を所持していない場合、InvalidNoTilesError を投げること', () => {
    const sut = new ConcealedHand(
      new Tile(SuitType.Character1, TileModifier.Normal),
      new Tile(SuitType.Character2, TileModifier.Normal),
    );

    expect(() => {
      sut.removeAll(
        new Tile(SuitType.Character2, TileModifier.Normal),
        new Tile(SuitType.Character3, TileModifier.Normal),
      );
    }).toThrow(InvalidNoTilesError);
  });
});

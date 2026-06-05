import { describe, expect, it } from 'vitest';

import { DiscardPile } from './discard-pile';
import { HonorType, Tile, TileModifier } from '../../../concepts';

describe('DiscardedPile', () => {
  describe('latest', () => {
    it('履歴が存在する場合、最新の Tile を返すこと', () => {
      const sut = new DiscardPile(
        new Tile(HonorType.East, TileModifier.Normal),
        new Tile(HonorType.South, TileModifier.Normal),
        new Tile(HonorType.West, TileModifier.Normal),
        new Tile(HonorType.North, TileModifier.Normal),
      );

      expect(
        sut.latest?.equals(new Tile(HonorType.North, TileModifier.Normal)),
      ).toBe(true);
    });

    it('DiscardedTile が存在しない場合、undefined を返すこと', () => {
      const sut = new DiscardPile();

      expect(sut.latest).toBeUndefined();
    });
  });

  describe('add', () => {
    it('与えられた捨て牌を最新に持つ新しい値を返すこと', () => {
      const sut = new DiscardPile(
        new Tile(HonorType.East, TileModifier.Normal),
        new Tile(HonorType.South, TileModifier.Normal),
        new Tile(HonorType.West, TileModifier.Normal),
      );
      const target = new Tile(HonorType.North, TileModifier.Normal);

      const result = sut.add(target);

      expect(result.latest?.equals(target)).toBe(true);

      expect(result).not.toBe(sut);
    });
  });
});

import { describe, expect, it } from 'vitest';

import { DiscardHistory } from './discard-history';
import { DiscardRecord } from './discard-record';
import { HonorType, SeatPosition, Tile, TileModifier } from '../../concepts';

describe('DiscardedHistory', () => {
  describe('append', () => {
    it('与えられた捨て牌を最新に持つ新しい値を返すこと', () => {
      const sut = new DiscardHistory(
        new DiscardRecord(
          new Tile(HonorType.East, TileModifier.Normal),
          SeatPosition.East,
        ),
        new DiscardRecord(
          new Tile(HonorType.South, TileModifier.Normal),
          SeatPosition.South,
        ),
        new DiscardRecord(
          new Tile(HonorType.West, TileModifier.Normal),
          SeatPosition.West,
        ),
      );
      const target = new DiscardRecord(
        new Tile(HonorType.North, TileModifier.Normal),
        SeatPosition.North,
      );

      expect([...sut]).toHaveLength(3);

      const result = sut.append(target);

      expect([...result]).toHaveLength(4);
      expect(result).not.toBe(sut);
    });
  });
});

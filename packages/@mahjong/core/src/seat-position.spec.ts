import { describe, expect, it } from 'vitest';

import { SeatPosition } from './seat-position';

describe('SeatPosition', () => {
  describe('compareTo メソッド', () => {
    it('同じ値を持つ SeatPosition を渡した場合、0 を返すこと', () => {
      const sut = SeatPosition.East;
      const target = SeatPosition.East;

      const actual = sut.compareTo(target);

      expect(actual).toBe(0);
    });

    it('自身より前の値を持つ SeatPosition を渡した場合、1 以上を返すこと', () => {
      const sut = SeatPosition.South;
      const target = SeatPosition.East;

      const actual = sut.compareTo(target);

      expect(actual).toBeGreaterThanOrEqual(1);
    });

    it('自身より後の値を持つ SeatPosition を渡した場合、-1 以下を返すこと', () => {
      const sut = SeatPosition.East;
      const target = SeatPosition.South;

      const actual = sut.compareTo(target);

      expect(actual).lessThanOrEqual(-1);
    });
  });

  describe('equals メソッド', () => {
    it('同じ値を持つ SeatPosition を渡した場合、true を返すこと', () => {
      const sut = SeatPosition.East;
      const target = SeatPosition.East;

      const actual = sut.equals(target);

      expect(actual).toBe(true);
    });

    it('別の値を持つ SeatPosition を渡した場合、false を返すこと', () => {
      const sut = SeatPosition.East;
      const target = SeatPosition.South;

      const actual = sut.equals(target);

      expect(actual).toBe(false);
    });
  });
});

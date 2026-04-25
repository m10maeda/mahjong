import { describe, expect, it } from 'vitest';

import { PotAccountOwner } from './pot-account-owner';
import { SeatAccountOwner } from './seat-account-owner';

describe('SeatAccountOwner', () => {
  describe('compareTo メソッド', () => {
    it('同じ値を持つ SeatAccountOwner を渡した場合、0 を返すこと', () => {
      const sut = SeatAccountOwner.East;
      const target = SeatAccountOwner.East;

      const actual = sut.compareTo(target);

      expect(actual).toBe(0);
    });

    it('自身より小さい値を持つ SeatAccountOwner を渡した場合、1 以上を返すこと', () => {
      const sut = SeatAccountOwner.North;
      const target = SeatAccountOwner.East;

      const actual = sut.compareTo(target);

      expect(actual).toBeGreaterThanOrEqual(1);
    });

    it('自身より大きい値を持つ SeatAccountOwner を渡した場合、-1 以下を返すこと', () => {
      const sut = SeatAccountOwner.South;
      const target = SeatAccountOwner.North;

      const actual = sut.compareTo(target);

      expect(actual).lessThanOrEqual(-1);
    });
  });

  describe('equals メソッド', () => {
    it('同じ値を持つ SeatAccountOwner を渡した場合、true を返すこと', () => {
      const sut = SeatAccountOwner.East;
      const target = SeatAccountOwner.East;

      const actual = sut.equals(target);

      expect(actual).toBe(true);
    });

    it('異なる値を持つ SeatAccountOwner を渡した場合、false を返すこと', () => {
      const sut = SeatAccountOwner.East;
      const target = SeatAccountOwner.South;

      const actual = sut.equals(target);

      expect(actual).toBe(false);
    });

    it('PotAccountOwner を渡した場合、false を返すこと', () => {
      const sut = SeatAccountOwner.East;
      const target = new PotAccountOwner();

      const actual = sut.equals(target);

      expect(actual).toBe(false);
    });
  });
});

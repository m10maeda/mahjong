import { describe, expect, it } from 'vitest';

import { PotAccountOwner } from './pot-account-owner';
import { SeatAccountOwner } from './seat-account-owner';

describe('SeatAccountOwner', () => {
  describe('compareTo', () => {
    it('自身と同じ値を与えられた場合、0 を返すこと', () => {
      expect(SeatAccountOwner.East.compareTo(SeatAccountOwner.East)).toBe(0);
      expect(SeatAccountOwner.South.compareTo(SeatAccountOwner.South)).toBe(0);
      expect(SeatAccountOwner.West.compareTo(SeatAccountOwner.West)).toBe(0);
      expect(SeatAccountOwner.North.compareTo(SeatAccountOwner.North)).toBe(0);
    });

    it('自身より小さい値を与えられた場合、正の数値を返すこと', () => {
      expect(
        SeatAccountOwner.South.compareTo(SeatAccountOwner.East),
      ).toBeGreaterThan(0);

      expect(
        SeatAccountOwner.West.compareTo(SeatAccountOwner.East),
      ).toBeGreaterThan(0);
      expect(
        SeatAccountOwner.West.compareTo(SeatAccountOwner.South),
      ).toBeGreaterThan(0);

      expect(
        SeatAccountOwner.North.compareTo(SeatAccountOwner.East),
      ).toBeGreaterThan(0);
      expect(
        SeatAccountOwner.North.compareTo(SeatAccountOwner.South),
      ).toBeGreaterThan(0);
      expect(
        SeatAccountOwner.North.compareTo(SeatAccountOwner.West),
      ).toBeGreaterThan(0);
    });

    it('自身より大きい値を与えられた場合、負の数値を返すこと', () => {
      expect(SeatAccountOwner.East.compareTo(SeatAccountOwner.South)).lessThan(
        0,
      );
      expect(SeatAccountOwner.East.compareTo(SeatAccountOwner.West)).lessThan(
        0,
      );
      expect(SeatAccountOwner.East.compareTo(SeatAccountOwner.North)).lessThan(
        0,
      );

      expect(SeatAccountOwner.South.compareTo(SeatAccountOwner.West)).lessThan(
        0,
      );
      expect(SeatAccountOwner.South.compareTo(SeatAccountOwner.North)).lessThan(
        0,
      );

      expect(SeatAccountOwner.West.compareTo(SeatAccountOwner.North)).lessThan(
        0,
      );
    });
  });

  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      expect(SeatAccountOwner.East.equals(SeatAccountOwner.East)).toBe(true);
      expect(SeatAccountOwner.South.equals(SeatAccountOwner.South)).toBe(true);
      expect(SeatAccountOwner.West.equals(SeatAccountOwner.West)).toBe(true);
      expect(SeatAccountOwner.North.equals(SeatAccountOwner.North)).toBe(true);
    });

    it('異なる値を持つ SeatAccountOwner を与えられた場合、false を返すこと', () => {
      expect(SeatAccountOwner.East.equals(SeatAccountOwner.South)).toBe(false);
      expect(SeatAccountOwner.East.equals(SeatAccountOwner.West)).toBe(false);
      expect(SeatAccountOwner.East.equals(SeatAccountOwner.North)).toBe(false);

      expect(SeatAccountOwner.South.equals(SeatAccountOwner.East)).toBe(false);
      expect(SeatAccountOwner.South.equals(SeatAccountOwner.West)).toBe(false);
      expect(SeatAccountOwner.South.equals(SeatAccountOwner.North)).toBe(false);

      expect(SeatAccountOwner.West.equals(SeatAccountOwner.East)).toBe(false);
      expect(SeatAccountOwner.West.equals(SeatAccountOwner.South)).toBe(false);
      expect(SeatAccountOwner.West.equals(SeatAccountOwner.North)).toBe(false);

      expect(SeatAccountOwner.North.equals(SeatAccountOwner.East)).toBe(false);
      expect(SeatAccountOwner.North.equals(SeatAccountOwner.South)).toBe(false);
      expect(SeatAccountOwner.North.equals(SeatAccountOwner.West)).toBe(false);
    });

    it('PotAccountOwner を与えられた場合、false を返すこと', () => {
      const sut = SeatAccountOwner.East;
      const target = new PotAccountOwner();

      expect(sut.equals(target)).toBe(false);
    });
  });
});

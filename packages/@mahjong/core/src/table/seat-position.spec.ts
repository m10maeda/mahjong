import { describe, expect, it } from 'vitest';

import { SeatPosition } from './seat-position';

describe('SeatPosition', () => {
  describe('compareTo', () => {
    it('自身と同じ値を与えられた場合、0 を返すこと', () => {
      expect(SeatPosition.East.compareTo(SeatPosition.East)).toBe(0);
      expect(SeatPosition.South.compareTo(SeatPosition.South)).toBe(0);
      expect(SeatPosition.West.compareTo(SeatPosition.West)).toBe(0);
      expect(SeatPosition.North.compareTo(SeatPosition.North)).toBe(0);
    });

    it('自身より小さい値を与えられた場合、正の数値を返すこと', () => {
      expect(SeatPosition.South.compareTo(SeatPosition.East)).greaterThan(0);

      expect(SeatPosition.West.compareTo(SeatPosition.East)).greaterThan(0);
      expect(SeatPosition.West.compareTo(SeatPosition.South)).greaterThan(0);

      expect(SeatPosition.North.compareTo(SeatPosition.East)).greaterThan(0);
      expect(SeatPosition.North.compareTo(SeatPosition.South)).greaterThan(0);
      expect(SeatPosition.North.compareTo(SeatPosition.West)).greaterThan(0);
    });

    it('自身より大きい値を与えられた場合、負の数値を返すこと', () => {
      expect(SeatPosition.East.compareTo(SeatPosition.South)).lessThan(0);
      expect(SeatPosition.East.compareTo(SeatPosition.West)).lessThan(0);
      expect(SeatPosition.East.compareTo(SeatPosition.North)).lessThan(0);

      expect(SeatPosition.South.compareTo(SeatPosition.West)).lessThan(0);
      expect(SeatPosition.South.compareTo(SeatPosition.North)).lessThan(0);

      expect(SeatPosition.West.compareTo(SeatPosition.North)).lessThan(0);
    });
  });

  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      expect(SeatPosition.East.equals(SeatPosition.East)).toBe(true);
      expect(SeatPosition.South.equals(SeatPosition.South)).toBe(true);
      expect(SeatPosition.West.equals(SeatPosition.West)).toBe(true);
      expect(SeatPosition.North.equals(SeatPosition.North)).toBe(true);
    });

    it('異なる値を与えられた場合、false を返すこと', () => {
      expect(SeatPosition.East.equals(SeatPosition.South)).toBe(false);
      expect(SeatPosition.East.equals(SeatPosition.West)).toBe(false);
      expect(SeatPosition.East.equals(SeatPosition.North)).toBe(false);

      expect(SeatPosition.South.equals(SeatPosition.West)).toBe(false);
      expect(SeatPosition.South.equals(SeatPosition.North)).toBe(false);

      expect(SeatPosition.West.equals(SeatPosition.North)).toBe(false);
    });
  });
});

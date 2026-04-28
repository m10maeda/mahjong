import { describe, expect, it } from 'vitest';

import { RoundWind } from './round-wind';

describe('RoundWind', () => {
  describe('compareTo', () => {
    it('自身と同じ値を与えられた場合、0 を返すこと', () => {
      expect(RoundWind.East.compareTo(RoundWind.East)).toBe(0);
      expect(RoundWind.South.compareTo(RoundWind.South)).toBe(0);
      expect(RoundWind.West.compareTo(RoundWind.West)).toBe(0);
      expect(RoundWind.North.compareTo(RoundWind.North)).toBe(0);
    });

    it('自身より小さい値を与えられた場合、正の数値を返すこと', () => {
      expect(RoundWind.South.compareTo(RoundWind.East)).toBeGreaterThan(0);
      expect(RoundWind.West.compareTo(RoundWind.East)).toBeGreaterThan(0);
      expect(RoundWind.West.compareTo(RoundWind.South)).toBeGreaterThan(0);
      expect(RoundWind.North.compareTo(RoundWind.East)).toBeGreaterThan(0);
      expect(RoundWind.North.compareTo(RoundWind.South)).toBeGreaterThan(0);
      expect(RoundWind.North.compareTo(RoundWind.West)).toBeGreaterThan(0);
    });

    it('自身より大きい値を与えられた場合、負の数値を返すこと', () => {
      expect(RoundWind.East.compareTo(RoundWind.South)).lessThan(0);
      expect(RoundWind.East.compareTo(RoundWind.West)).lessThan(0);
      expect(RoundWind.East.compareTo(RoundWind.North)).lessThan(0);
      expect(RoundWind.South.compareTo(RoundWind.West)).lessThan(0);
      expect(RoundWind.South.compareTo(RoundWind.North)).lessThan(0);
      expect(RoundWind.West.compareTo(RoundWind.North)).lessThan(0);
    });
  });

  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      expect(RoundWind.East.equals(RoundWind.East)).toBe(true);
      expect(RoundWind.South.equals(RoundWind.South)).toBe(true);
      expect(RoundWind.West.equals(RoundWind.West)).toBe(true);
      expect(RoundWind.North.equals(RoundWind.North)).toBe(true);
    });

    it('異なる値を与えられた場合、false を返すこと', () => {
      expect(RoundWind.East.equals(RoundWind.South)).toBe(false);
      expect(RoundWind.East.equals(RoundWind.West)).toBe(false);
      expect(RoundWind.East.equals(RoundWind.North)).toBe(false);
      expect(RoundWind.South.equals(RoundWind.East)).toBe(false);
      expect(RoundWind.South.equals(RoundWind.West)).toBe(false);
      expect(RoundWind.South.equals(RoundWind.North)).toBe(false);
      expect(RoundWind.West.equals(RoundWind.East)).toBe(false);
      expect(RoundWind.West.equals(RoundWind.South)).toBe(false);
      expect(RoundWind.West.equals(RoundWind.North)).toBe(false);
      expect(RoundWind.North.equals(RoundWind.East)).toBe(false);
      expect(RoundWind.North.equals(RoundWind.South)).toBe(false);
      expect(RoundWind.North.equals(RoundWind.West)).toBe(false);
    });
  });
});

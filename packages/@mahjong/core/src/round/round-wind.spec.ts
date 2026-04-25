import { describe, expect, it } from 'vitest';

import { RoundWind } from './round-wind';

describe('RoundWind', () => {
  describe('compareTo メソッド', () => {
    it('同じ値を持つ RoundWind を渡した場合、0 を返すこと', () => {
      const sut = RoundWind.East;
      const target = RoundWind.East;

      const actual = sut.compareTo(target);

      expect(actual).toBe(0);
    });

    it('自身より小さい値を持つ RoundWind を渡した場合、1 以上を返すこと', () => {
      const sut = RoundWind.South;
      const target = RoundWind.East;

      const actual = sut.compareTo(target);

      expect(actual).toBeGreaterThanOrEqual(1);
    });

    it('自身より大きい値を持つ RoundWind を渡した場合、-1 以下を返すこと', () => {
      const sut = RoundWind.East;
      const target = RoundWind.South;

      const actual = sut.compareTo(target);

      expect(actual).lessThanOrEqual(-1);
    });
  });

  describe('equals メソッド', () => {
    it('同じ値を持つ RoundWind を渡した場合、true を返すこと', () => {
      const sut = RoundWind.East;
      const target = RoundWind.East;

      const actual = sut.equals(target);

      expect(actual).toBe(true);
    });

    it('別の値を持つ RoundWind を渡した場合、false を返すこと', () => {
      const sut = RoundWind.East;
      const target = RoundWind.South;

      const actual = sut.equals(target);

      expect(actual).toBe(false);
    });
  });
});

import { describe, expect, it } from 'vitest';

import { RoundIndex } from './round-index';
import { RoundProgress } from './round-progress';
import { RoundWind } from './round-wind';

describe('RoundProgress', () => {
  describe('compareTo', () => {
    it('同じ値を持つ Point を与えられた場合、0 を返すこと', () => {
      const sut = new RoundProgress(RoundWind.East, new RoundIndex(1));
      const target = new RoundProgress(RoundWind.East, new RoundIndex(1));

      expect(sut.compareTo(target)).toBe(0);
    });

    it('自身より前の RoundProgress を与えられた場合、1 以上を返すこと', () => {
      const sut = new RoundProgress(RoundWind.East, new RoundIndex(2));
      const target = new RoundProgress(RoundWind.East, new RoundIndex(1));

      expect(sut.compareTo(target)).toBeGreaterThan(0);
    });

    it('自身より後の RoundProgress を与えられた場合、-1 以下を返すこと', () => {
      const sut = new RoundProgress(RoundWind.East, new RoundIndex(1));
      const target = new RoundProgress(RoundWind.East, new RoundIndex(2));

      expect(sut.compareTo(target)).toBeLessThan(0);
    });
  });

  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      const sut = new RoundProgress(RoundWind.East, new RoundIndex(1));
      const target = new RoundProgress(RoundWind.East, new RoundIndex(1));

      expect(sut.equals(target)).toBe(true);
    });

    it('異なる値を与えられた場合、false を返すこと', () => {
      const sut = new RoundProgress(RoundWind.East, new RoundIndex(1));

      expect(
        sut.equals(new RoundProgress(RoundWind.West, new RoundIndex(1))),
      ).toBe(false);
      expect(
        sut.equals(new RoundProgress(RoundWind.East, new RoundIndex(2))),
      ).toBe(false);
    });
  });
});

import { describe, expect, it } from 'vitest';

import { RoundIndex } from './round-index';
import { RoundProgress } from './round-progress';
import { RoundWind } from './round-wind';

describe('RoundProgress', () => {
  describe('compareTo メソッド', () => {
    it('同じ値を持つ Point を渡した場合、0 を返すこと', () => {
      const sut = new RoundProgress(RoundWind.East, new RoundIndex(1));
      const target = new RoundProgress(RoundWind.East, new RoundIndex(1));

      const actual = sut.compareTo(target);

      expect(actual).toBe(0);
    });

    it('自身より前の RoundProgress を渡した場合、1 以上を返すこと', () => {
      const sut = new RoundProgress(RoundWind.East, new RoundIndex(2));
      const target = new RoundProgress(RoundWind.East, new RoundIndex(1));

      const actual = sut.compareTo(target);

      expect(actual).toBeGreaterThanOrEqual(1);
    });

    it('自身より後の RoundProgress を渡した場合、-1 以下を返すこと', () => {
      const sut = new RoundProgress(RoundWind.East, new RoundIndex(1));
      const target = new RoundProgress(RoundWind.East, new RoundIndex(2));

      const actual = sut.compareTo(target);

      expect(actual).toBeLessThanOrEqual(-1);
    });
  });

  describe('equals メソッド', () => {
    it('同じ値を持つ RoundProgress を渡した場合、true を返すこと', () => {
      const sut = new RoundProgress(RoundWind.East, new RoundIndex(1));
      const target = new RoundProgress(RoundWind.East, new RoundIndex(1));

      const actual = sut.equals(target);

      expect(actual).toBe(true);
    });

    describe('異なる値を持つ RoundProgress を渡した場合、false を返すこと', () => {
      it('RoundWind が異なる場合、false を返すこと', () => {
        const sut = new RoundProgress(RoundWind.East, new RoundIndex(1));
        const target = new RoundProgress(RoundWind.West, new RoundIndex(1));

        const actual = sut.equals(target);

        expect(actual).toBe(false);
      });

      it('RoundIndex が異なる場合、false を返すこと', () => {
        const sut = new RoundProgress(RoundWind.East, new RoundIndex(1));
        const target = new RoundProgress(RoundWind.East, new RoundIndex(2));

        const actual = sut.equals(target);

        expect(actual).toBe(false);
      });
    });
  });
});

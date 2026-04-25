import { describe, expect, it } from 'vitest';

import { Honba } from './honba';
import { Round } from './round';
import { RoundIndex } from './round-index';
import { RoundProgress } from './round-progress';
import { RoundWind } from './round-wind';

describe('Round', () => {
  describe('compareTo メソッド', () => {
    it('同じ値を持つ Round を渡した場合、0 を返すこと', () => {
      const sut = new Round(
        new RoundProgress(RoundWind.East, new RoundIndex(1)),
        new Honba(0),
      );
      const target = new Round(
        new RoundProgress(RoundWind.East, new RoundIndex(1)),
        new Honba(0),
      );

      const actual = sut.compareTo(target);

      expect(actual).toBe(0);
    });

    describe('自身より前の Round を渡した場合、1 以上を返すこと', () => {
      it('RoundProgress が前の場合、1 以上を返すこと', () => {
        const sut = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(2)),
          new Honba(0),
        );
        const target = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(1)),
          new Honba(0),
        );

        const actual = sut.compareTo(target);

        expect(actual).toBeGreaterThanOrEqual(1);
      });

      it('Honba が前の場合、1 以上を返すこと', () => {
        const sut = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(1)),
          new Honba(1),
        );
        const target = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(1)),
          new Honba(0),
        );

        const actual = sut.compareTo(target);

        expect(actual).toBeGreaterThanOrEqual(1);
      });
    });

    describe('自身より後の Round を渡した場合、-1 以下を返すこと', () => {
      it('RoundProgress が後の場合、-1 以下を返すこと', () => {
        const sut = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(1)),
          new Honba(0),
        );
        const target = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(2)),
          new Honba(0),
        );

        const actual = sut.compareTo(target);

        expect(actual).toBeLessThanOrEqual(-1);
      });

      it('Honba が後の場合、-1 以下を返すこと', () => {
        const sut = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(1)),
          new Honba(0),
        );
        const target = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(1)),
          new Honba(1),
        );

        const actual = sut.compareTo(target);

        expect(actual).toBeLessThanOrEqual(-1);
      });
    });
  });
  describe('equals メソッド', () => {
    it('同じ値を持つ Round を渡した場合、true を返すこと', () => {
      const sut = new Round(
        new RoundProgress(RoundWind.East, new RoundIndex(1)),
        new Honba(0),
      );
      const target = new Round(
        new RoundProgress(RoundWind.East, new RoundIndex(1)),
        new Honba(0),
      );

      const actual = sut.equals(target);

      expect(actual).toBe(true);
    });

    describe('異なる値を持つ Round を渡した場合、false を返すこと', () => {
      it('RoundProgress が異なる場合、false を返すこと', () => {
        const sut = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(1)),
          new Honba(0),
        );
        const target = new Round(
          new RoundProgress(RoundWind.West, new RoundIndex(1)),
          new Honba(0),
        );

        const actual = sut.equals(target);

        expect(actual).toBe(false);
      });

      it('Honba が異なる場合、false を返すこと', () => {
        const sut = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(1)),
          new Honba(0),
        );
        const target = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(1)),
          new Honba(1),
        );

        const actual = sut.equals(target);

        expect(actual).toBe(false);
      });
    });
  });
});

import { describe, expect, it } from 'vitest';

import { Honba } from './honba';
import { Round } from './round';
import { RoundIndex } from './round-index';
import { RoundProgress } from './round-progress';
import { RoundWind } from './round-wind';

describe('Round', () => {
  describe('compareTo', () => {
    it('自身と同じ値を与えられた場合、0 を返すこと', () => {
      const sut = new Round(
        new RoundProgress(RoundWind.East, new RoundIndex(1, 4)),
        new Honba(0),
      );
      const target = new Round(
        new RoundProgress(RoundWind.East, new RoundIndex(1, 4)),
        new Honba(0),
      );

      expect(sut.compareTo(target)).toBe(0);
    });

    it('自身より小さい値を与えられた場合、正の数値を返すこと', () => {
      const sut = new Round(
        new RoundProgress(RoundWind.East, new RoundIndex(2, 4)),
        new Honba(1),
      );

      expect(
        sut.compareTo(
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(1, 4)),
            new Honba(0),
          ),
        ),
      ).toBeGreaterThan(0);
      expect(
        sut.compareTo(
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(2, 4)),
            new Honba(0),
          ),
        ),
      ).toBeGreaterThan(0);
    });

    it('自身より大きい値を与えられた場合、負の数値を返すこと', () => {
      const sut = new Round(
        new RoundProgress(RoundWind.East, new RoundIndex(1, 4)),
        new Honba(0),
      );

      expect(
        sut.compareTo(
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(2, 4)),
            new Honba(0),
          ),
        ),
      ).toBeLessThan(0);
      expect(
        sut.compareTo(
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(1, 4)),
            new Honba(1),
          ),
        ),
      ).toBeLessThan(0);
    });
  });

  describe('advance', () => {
    describe('現在の局数が最大局数と同じの場合', () => {
      it('場風が進み、局数と本場数がリセットされた新しい値を返すこと', () => {
        const sut = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(4, 4)),
          new Honba(1),
        );

        const result = sut.advance();

        expect(result.wind.equals(RoundWind.South)).toBe(true);
        expect(result.index.valueOf()).toBe(1);
        expect(result.honba.valueOf()).toBe(0);
      });
    });

    describe('現在の局数が最大局数未満の場合', () => {
      it('場風は変わらず、局数が進み、本場数がリセットされた新しい値を返すこと', () => {
        const sut = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(3, 4)),
          new Honba(1),
        );

        const result = sut.advance();

        expect(result.wind.equals(RoundWind.East)).toBe(true);
        expect(result.index.valueOf()).toBe(4);
        expect(result.honba.valueOf()).toBe(0);
      });
    });
  });

  describe('carryover', () => {
    describe('現在の局数が最大局数と同じの場合', () => {
      it('場風が進み、局数がリセットされ、本場数が進んだ新しい値を返すこと', () => {
        const sut = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(4, 4)),
          new Honba(1),
        );

        const result = sut.carryover();

        expect(result.wind.equals(RoundWind.South)).toBe(true);
        expect(result.index.valueOf()).toBe(1);
        expect(result.honba.valueOf()).toBe(2);
      });
    });

    describe('現在の局数が最大局数未満の場合', () => {
      it('場風は変わらず、局数と本場数進んだ新しい値を返すこと', () => {
        const sut = new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(3, 4)),
          new Honba(1),
        );

        const result = sut.carryover();

        expect(result.wind.equals(RoundWind.East)).toBe(true);
        expect(result.index.valueOf()).toBe(4);
        expect(result.honba.valueOf()).toBe(2);
      });
    });
  });

  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      const sut = new Round(
        new RoundProgress(RoundWind.East, new RoundIndex(1, 4)),
        new Honba(0),
      );
      const target = new Round(
        new RoundProgress(RoundWind.East, new RoundIndex(1, 4)),
        new Honba(0),
      );

      expect(sut.equals(target)).toBe(true);
    });

    it('異なる値を与えられた場合、false を返すこと', () => {
      const sut = new Round(
        new RoundProgress(RoundWind.East, new RoundIndex(1, 4)),
        new Honba(0),
      );

      expect(
        sut.equals(
          new Round(
            new RoundProgress(RoundWind.West, new RoundIndex(1, 4)),
            new Honba(0),
          ),
        ),
      ).toBe(false);
      expect(
        sut.equals(
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(1, 4)),
            new Honba(1),
          ),
        ),
      ).toBe(false);
    });
  });

  describe('repeat', () => {
    it('場風と局数は変わらず、本場数進んだ新しい値を返すこと', () => {
      const sut = new Round(
        new RoundProgress(RoundWind.East, new RoundIndex(3, 4)),
        new Honba(1),
      );

      const result = sut.repeat();

      expect(result.wind.equals(RoundWind.East)).toBe(true);
      expect(result.index.valueOf()).toBe(3);
      expect(result.honba.valueOf()).toBe(2);
    });
  });
});

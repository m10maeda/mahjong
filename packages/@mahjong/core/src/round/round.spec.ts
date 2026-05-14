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
});

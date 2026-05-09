import { describe, expect, it } from 'vitest';

import { PotScoreHolder } from './pot-score-holder';
import { SeatScoreHolder } from './seat-score-holder';

describe('SeatScoreHolder', () => {
  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      expect(SeatScoreHolder.East.equals(SeatScoreHolder.East)).toBe(true);
      expect(SeatScoreHolder.South.equals(SeatScoreHolder.South)).toBe(true);
      expect(SeatScoreHolder.West.equals(SeatScoreHolder.West)).toBe(true);
      expect(SeatScoreHolder.North.equals(SeatScoreHolder.North)).toBe(true);
    });

    it('異なる値を持つ SeatAccountOwner を与えられた場合、false を返すこと', () => {
      expect(SeatScoreHolder.East.equals(SeatScoreHolder.South)).toBe(false);
      expect(SeatScoreHolder.East.equals(SeatScoreHolder.West)).toBe(false);
      expect(SeatScoreHolder.East.equals(SeatScoreHolder.North)).toBe(false);

      expect(SeatScoreHolder.South.equals(SeatScoreHolder.East)).toBe(false);
      expect(SeatScoreHolder.South.equals(SeatScoreHolder.West)).toBe(false);
      expect(SeatScoreHolder.South.equals(SeatScoreHolder.North)).toBe(false);

      expect(SeatScoreHolder.West.equals(SeatScoreHolder.East)).toBe(false);
      expect(SeatScoreHolder.West.equals(SeatScoreHolder.South)).toBe(false);
      expect(SeatScoreHolder.West.equals(SeatScoreHolder.North)).toBe(false);

      expect(SeatScoreHolder.North.equals(SeatScoreHolder.East)).toBe(false);
      expect(SeatScoreHolder.North.equals(SeatScoreHolder.South)).toBe(false);
      expect(SeatScoreHolder.North.equals(SeatScoreHolder.West)).toBe(false);
    });

    it('PotAccountOwner を与えられた場合、false を返すこと', () => {
      const sut = SeatScoreHolder.East;
      const target = new PotScoreHolder();

      expect(sut.equals(target)).toBe(false);
    });
  });
});

import { describe, expect, it } from 'vitest';

import { PotScoreHolder } from './pot-score-holder';
import { SeatScoreHolder } from './seat-score-holder';

describe('PotAccountOwner', () => {
  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      const sut = new PotScoreHolder();
      const target = new PotScoreHolder();

      expect(sut.equals(target)).toBe(true);
    });

    it('異なる値を与えられた場合、false を返すこと', () => {
      const sut = new PotScoreHolder();
      const target = SeatScoreHolder.East;

      expect(sut.equals(target)).toBe(false);
    });
  });
});

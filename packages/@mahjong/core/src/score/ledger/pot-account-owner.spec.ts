import { describe, expect, it } from 'vitest';

import { PotAccountOwner } from './pot-account-owner';
import { SeatAccountOwner } from './seat-account-owner';

describe('PotAccountOwner', () => {
  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      const sut = new PotAccountOwner();
      const target = new PotAccountOwner();

      expect(sut.equals(target)).toBe(true);
    });

    it('異なる値を与えられた場合、false を返すこと', () => {
      const sut = new PotAccountOwner();
      const target = SeatAccountOwner.East;

      expect(sut.equals(target)).toBe(false);
    });
  });
});

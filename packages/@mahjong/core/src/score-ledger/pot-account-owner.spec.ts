import { describe, expect, it } from 'vitest';

import { PotAccountOwner } from './pot-account-owner';
import { SeatAccountOwner } from './seat-account-owner';

describe('PotAccountOwner', () => {
  describe('equals メソッド', () => {
    it('PotAccountOwner を渡した場合、true を返すこと', () => {
      const sut = new PotAccountOwner();
      const target = new PotAccountOwner();

      const actual = sut.equals(target);

      expect(actual).toBe(true);
    });

    it('SeatAccountOwner を渡した場合、false を返すこと', () => {
      const sut = new PotAccountOwner();
      const target = SeatAccountOwner.East;

      const actual = sut.equals(target);

      expect(actual).toBe(false);
    });
  });
});

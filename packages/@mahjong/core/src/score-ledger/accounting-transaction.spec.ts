import { describe, expect, it } from 'vitest';

import { AccountingTransaction } from './accounting-transaction';
import { Point } from '../point';
import { Honba, Round, RoundIndex, RoundProgress, RoundWind } from '../round';
import { AccountingEntry } from './accounting-entry';
import { SeatAccountOwner } from './seat-account-owner';

describe('AccountingTransaction', () => {
  describe('不正な値で生成できないこと', () => {
    it('同じ AccountOwner を持つ AccountingEntry を複数渡した場合、エラーを投げること', () => {
      expect(() => {
        new AccountingTransaction(
          [
            new AccountingEntry(SeatAccountOwner.East, new Point(1000)),
            new AccountingEntry(SeatAccountOwner.East, new Point(-1000)),
          ],
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(1)),
            new Honba(0),
          ),
        );
      }).toThrow(Error);
    });
  });
});

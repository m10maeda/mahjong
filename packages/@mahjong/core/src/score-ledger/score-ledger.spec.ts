import { describe, expect, it } from 'vitest';

import { AccountingEntry } from './accounting-entry';
import { AccountingTransaction } from './accounting-transaction';
import { ScoreLedger } from './score-ledger';
import { SeatAccountOwner } from './seat-account-owner';
import { Point } from '../point';
import { Honba, Round, RoundIndex, RoundProgress, RoundWind } from '../round';

describe('ScoreLedger', () => {
  describe('record', () => {
    const sut = new ScoreLedger([]);
    const transaction = new AccountingTransaction(
      [
        new AccountingEntry(SeatAccountOwner.East, new Point(1000)),
        new AccountingEntry(SeatAccountOwner.South, new Point(-1000)),
      ],
      new Round(
        new RoundProgress(RoundWind.East, new RoundIndex(1)),
        new Honba(0),
      ),
    );

    it('与えられた AccountingTransaction を追加した新しい ScoreLedger を返すこと', () => {
      const result = sut.record(transaction);

      expect([...result]).toEqual([transaction]);

      expect(result).not.toBe(sut);
    });

    it('元の値は変化しないこと', () => {
      sut.record(transaction);

      expect([...sut]).toHaveLength(0);
    });
  });
});

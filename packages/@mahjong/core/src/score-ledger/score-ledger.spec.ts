import { describe, expect, it } from 'vitest';

import { AccountingEntry } from './accounting-entry';
import { AccountingTransaction } from './accounting-transaction';
import { ScoreLedger } from './score-ledger';
import { SeatAccountOwner } from './seat-account-owner';
import { Point } from '../point';
import { Honba, Round, RoundIndex, RoundProgress, RoundWind } from '../round';

describe('ScoreLedger', () => {
  describe('record メソッド', () => {
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

    it('新しい ScoreLedger を返す', () => {
      const actual = sut.record(transaction);

      expect(sut).not.toBe(actual);
    });

    it('新しい ScoreLedger にトランザクションが追加されている', () => {
      const actual = sut.record(transaction);

      expect([...actual]).toEqual([transaction]);
    });
  });
});

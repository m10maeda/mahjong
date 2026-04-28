import { describe, expect, it } from 'vitest';

import { AccountingTransaction } from './accounting-transaction';
import { Point } from '../point';
import { Honba, Round, RoundIndex, RoundProgress, RoundWind } from '../round';
import { AccountingEntry } from './accounting-entry';
import { SeatAccountOwner } from './seat-account-owner';

describe('AccountingTransaction', () => {
  describe('無効な値を与えられた場合', () => {
    it('同じ target を持つ値を複数与えられた場合、エラーを投げること', () => {
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

    it('与えられたすべての AccountingEntry の amount が 0 の場合、エラーを投げること', () => {
      expect(() => {
        new AccountingTransaction(
          [
            new AccountingEntry(SeatAccountOwner.East, new Point(0)),
            new AccountingEntry(SeatAccountOwner.South, new Point(0)),
          ],
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(1)),
            new Honba(0),
          ),
        );
      }).toThrow(Error);
    });
  });

  describe('createTransferTransaction', () => {
    it('amount の合計が 0 でない場合、エラーを投げること', () => {
      expect(() => {
        AccountingTransaction.createTransferTransaction(
          [
            [SeatAccountOwner.East, new Point(1000)],
            [SeatAccountOwner.South, new Point(-500)],
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

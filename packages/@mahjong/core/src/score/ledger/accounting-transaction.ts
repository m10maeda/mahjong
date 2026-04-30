import { AccountingEntry } from './accounting-entry';
import { Point } from '../point';

import type { AccountOwner } from './account-owner';
import type { Round } from '../../round';

export class AccountingTransaction implements Iterable<AccountingEntry> {
  public readonly round: Round;

  private readonly entries: readonly [
    AccountingEntry,
    AccountingEntry,
    ...AccountingEntry[],
  ];

  public [Symbol.iterator](): Iterator<AccountingEntry> {
    return this.entries[Symbol.iterator]();
  }

  public constructor(
    entries: readonly [AccountingEntry, AccountingEntry, ...AccountingEntry[]],
    round: Round,
  ) {
    const uniqueTargets = new Set(entries.map((entry) => entry.target));

    if (uniqueTargets.size !== entries.length) throw new Error();
    if (entries.some((entry) => entry.amount.isZero())) throw new Error();

    this.entries = [...entries];
    this.round = round;
  }

  public static createTransferTransaction(
    entries: readonly [
      [AccountOwner, Point],
      [AccountOwner, Point],
      ...[AccountOwner, Point][],
    ],
    round: Round,
  ): AccountingTransaction {
    if (
      !entries.reduce((sum, [, amount]) => sum.add(amount), Point.Zero).isZero()
    )
      throw new Error();

    return new AccountingTransaction(
      entries.map(
        ([target, amount]) => new AccountingEntry(target, amount),
      ) as [AccountingEntry, AccountingEntry, ...AccountingEntry[]],
      round,
    );
  }
}

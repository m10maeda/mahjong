import type { Point } from '../../point';
import type { AccountOwner } from '../account-owner';

export enum EntryReason {
  InitialDistribution,
  Payment,
  Receipt,
  Uma,
  Oka,
}

export class ScoreEntry {
  public readonly amount: Point;

  public readonly reason: EntryReason;

  public readonly target: AccountOwner;

  public constructor(target: AccountOwner, amount: Point, reason: EntryReason) {
    if (amount.isZero()) throw new Error();

    this.target = target;
    this.amount = amount;
    this.reason = reason;
  }
}

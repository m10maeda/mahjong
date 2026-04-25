import type { AccountOwner } from './account-owner';
import type { Point } from '../point';

export class AccountingEntry {
  public readonly amount: Point;

  public readonly target: AccountOwner;

  public constructor(target: AccountOwner, amount: Point) {
    this.target = target;
    this.amount = amount;
  }
}

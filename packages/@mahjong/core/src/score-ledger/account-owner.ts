export enum AccountType {
  Seat,
  Pot,
}

export abstract class AccountOwner {
  public readonly type: AccountType;

  public abstract equals(other: AccountOwner): boolean;

  public constructor(type: AccountType) {
    this.type = type;
  }
}

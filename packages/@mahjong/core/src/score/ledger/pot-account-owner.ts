import { AccountOwner, AccountType } from './account-owner';

export class PotAccountOwner extends AccountOwner {
  public equals(other: AccountOwner): boolean {
    return other instanceof PotAccountOwner;
  }

  public [Symbol.toPrimitive](
    hint: 'number' | 'string' | 'default' = 'default',
  ): number | string | null {
    if (hint !== 'string') return null;

    return this.toString();
  }

  public toString(): string {
    return 'Pot';
  }

  public constructor() {
    super(AccountType.Pot);
  }
}

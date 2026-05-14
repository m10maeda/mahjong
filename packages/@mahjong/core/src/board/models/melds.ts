import { InvalidMeldNotFoundError } from './invalid-meld-not-found-error';

import type { Meld } from './meld';
import type { MeldReference } from '../events/melded';

export class Melds implements Iterable<Meld> {
  private readonly melds: readonly Meld[];

  public add(meld: Meld): Melds {
    return new Melds(...this.melds, meld);
  }

  public get(reference: MeldReference): Meld | undefined {
    const candidates = [...this.melds.values()].filter((meld) =>
      meld.owner.equals(reference.seat),
    );

    return candidates[reference.sequence];
  }

  public replace(from: Meld, to: Meld): Melds {
    const index = this.melds.findIndex((meld) => meld.equals(from));

    if (index === -1) throw new InvalidMeldNotFoundError();

    return new Melds(
      ...[...this.melds.slice(0, index), to, ...this.melds.slice(index + 1)],
    );
  }

  public [Symbol.iterator](): Iterator<Meld> {
    return this.melds[Symbol.iterator]();
  }

  public constructor(...melds: readonly Meld[]) {
    this.melds = melds;
  }

  public static new(): Melds {
    return new Melds();
  }
}

import { InvalidMeldNotFoundError } from './invalid-meld-not-found-error';
import { MeldReference, MeldSequence } from '../concepts';

import type { Meld } from './meld';

export class Melds implements Iterable<Meld> {
  private readonly melds: readonly Meld[];

  public add(meld: Meld): readonly [MeldReference, Melds] {
    const reference = new MeldReference(meld.owner, this.getNextSequence());

    return [reference, new Melds(...this.melds, meld)];
  }

  public get(reference: MeldReference): Meld | undefined {
    const candidates = [...this.melds.values()].filter((meld) =>
      meld.owner.equals(reference.seat),
    );

    return candidates[reference.sequence.valueOf()];
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

  private getNextSequence(): MeldSequence {
    return new MeldSequence(this.melds.length);
  }

  public constructor(...melds: readonly Meld[]) {
    this.melds = melds;
  }

  public static new(): Melds {
    return new Melds();
  }
}

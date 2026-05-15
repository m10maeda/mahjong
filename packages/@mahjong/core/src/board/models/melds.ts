import { MeldReference, MeldSequence } from '../concepts';

import type { Meld } from './meld';

export class Melds implements Iterable<Meld> {
  private readonly melds: readonly (readonly [MeldReference, Meld])[];

  public add(meld: Meld): readonly [MeldReference, Melds] {
    const reference = new MeldReference(meld.owner, this.getNextSequence());

    return [reference, new Melds(...this.melds, [reference, meld])];
  }

  public get(reference: MeldReference): Meld | undefined {
    const target = this.melds.find(([_reference]) =>
      _reference.equals(reference),
    );

    return target?.[1];
  }

  public [Symbol.iterator](): Iterator<Meld> {
    return this.melds.map(([, meld]) => meld)[Symbol.iterator]();
  }

  public update(reference: MeldReference, meld: Meld): Melds {
    return new Melds(
      ...this.melds.map<readonly [MeldReference, Meld]>(
        ([_reference, _meld]) => {
          if (!_reference.equals(reference)) return [_reference, _meld];

          return [_reference, meld];
        },
      ),
    );
  }

  private getNextSequence(): MeldSequence {
    return new MeldSequence(this.melds.length);
  }

  public constructor(...melds: readonly (readonly [MeldReference, Meld])[]) {
    this.melds = melds;
  }

  public static new(): Melds {
    return new Melds();
  }
}

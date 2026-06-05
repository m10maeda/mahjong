import { Meld, MeldReference } from '../../round-session';

export class Melds implements Iterable<Meld> {
  private readonly melds: readonly (readonly [MeldReference, Meld])[];

  public add(meld: Meld): readonly [MeldReference, Melds] {
    const reference = this.getNextReference();

    return [reference, new Melds(...this.melds, [reference, meld])];
  }

  public get(reference: MeldReference): Meld | undefined {
    const target = this.melds.find(([_reference]) =>
      _reference.equals(reference),
    );

    return target?.[1];
  }

  public replace(reference: MeldReference, meld: Meld): Melds {
    return new Melds(
      ...this.melds.map<readonly [MeldReference, Meld]>(
        ([_reference, _meld]) => {
          if (!_reference.equals(reference)) return [_reference, _meld];

          return [_reference, meld];
        },
      ),
    );
  }

  public [Symbol.iterator](): Iterator<Meld> {
    return this.melds.map(([, meld]) => meld)[Symbol.iterator]();
  }

  private getNextReference(): MeldReference {
    return new MeldReference(this.melds.length);
  }

  public constructor(...melds: readonly (readonly [MeldReference, Meld])[]) {
    this.melds = melds;
  }

  public static new(): Melds {
    return new Melds();
  }
}

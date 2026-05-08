import { InvalidTileNotHeldError } from './invalid-tile-not-held-error';
import { MeldNotHeldError } from './meld-not-held-error';

import type { MeldOperation } from './meld-operation';
import type { MeldTileGroup } from './meld-tile-group';
import type { Tile } from '../../tile';

export class Hand {
  private readonly concealed: readonly Tile[];

  private readonly melds: readonly MeldTileGroup[];

  public add(tile: Tile): Hand {
    return new Hand([...this.concealed, tile], this.melds);
  }

  public discard(tile: Tile): Hand {
    const newConcealed = this.removeFromConcealed(tile);

    return new Hand(newConcealed, this.melds);
  }

  public extend(base: MeldTileGroup, operation: MeldOperation): Hand {
    const newConcealed = this.removeFromConcealed(...operation.consumed);

    const index = this.melds.findIndex((_meld) => _meld.equals(base));

    if (index === -1) throw new MeldNotHeldError();

    const newMelds = [
      ...this.melds.slice(0, index),
      ...this.melds.slice(index + 1),
    ];

    return new Hand(newConcealed, newMelds);
  }

  public meld(operation: MeldOperation): Hand {
    const newConcealed = this.removeFromConcealed(...operation.consumed);

    return new Hand(newConcealed, [...this.melds, operation.tileGroup]);
  }

  private removeFromConcealed(...tiles: readonly Tile[]): readonly Tile[] {
    let newConcealed = [...this.concealed];

    for (const tile of tiles) {
      const index = newConcealed.findIndex((_tile) => _tile.equals(tile));

      if (index === -1) throw new InvalidTileNotHeldError();

      newConcealed = [
        ...newConcealed.slice(0, index),
        ...newConcealed.slice(index + 1),
      ];
    }

    return newConcealed;
  }

  public constructor(
    concealed: readonly Tile[],
    melds: readonly MeldTileGroup[] = [],
  ) {
    this.concealed = concealed;
    this.melds = melds;
  }
}

import { InvalidTileNotHeldError } from './invalid-tile-not-held-error';

import type { Tile } from '../../../tile';

export class Hand implements Iterable<Tile> {
  private readonly tiles: readonly Tile[];

  public add(tile: Tile): Hand {
    return new Hand(...this.tiles, tile);
  }

  public consume(...tiles: readonly Tile[]): Hand {
    const newConcealed = this.removeFromConcealed(...tiles);

    return new Hand(...newConcealed);
  }

  public discard(tile: Tile): Hand {
    const newConcealed = this.removeFromConcealed(tile);

    return new Hand(...newConcealed);
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  private removeFromConcealed(...tiles: readonly Tile[]): readonly Tile[] {
    let newConcealed = [...this.tiles];

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

  public constructor(...tiles: readonly Tile[]) {
    this.tiles = tiles;
  }
}

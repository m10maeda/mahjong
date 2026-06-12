import { InvalidNoTilesError } from '../invalid-no-tiles-error';

import type { Tile } from '../../tile';

export class ConcealedHand implements Iterable<Tile> {
  private readonly tiles: readonly Tile[];

  public add(tile: Tile): ConcealedHand {
    return new ConcealedHand(...this.tiles, tile);
  }

  public remove(tile: Tile): ConcealedHand {
    let nextTiles = [...this.tiles];

    const index = nextTiles.findIndex((_tile) => _tile.equals(tile));

    if (index === -1) throw new InvalidNoTilesError();

    nextTiles = [...nextTiles.slice(0, index), ...nextTiles.slice(index + 1)];

    return new ConcealedHand(...nextTiles);
  }

  public removeAll(...tiles: readonly Tile[]): ConcealedHand {
    return tiles.reduce<ConcealedHand>(
      (concealed, tile) => concealed.remove(tile),
      this,
    );
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public constructor(...tiles: readonly Tile[]) {
    this.tiles = tiles;
  }
}

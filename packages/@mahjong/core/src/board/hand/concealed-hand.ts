import { InvalidNoTilesError } from '../invalid-no-tiles-error';

import type { Tile } from '../../tile';

export class ConcealedHand implements Iterable<Tile> {
  public readonly drawnTile?: Tile | undefined;

  private readonly tiles: readonly Tile[];

  public consume(...tiles: readonly Tile[]): ConcealedHand {
    if (!this.has(...tiles)) throw new InvalidNoTilesError();

    return this.remove(...tiles);
  }

  public discard(tile: Tile): ConcealedHand {
    if (!this.has(tile)) throw new InvalidNoTilesError();

    return this.remove(tile);
  }

  public discardDrawnTile(): readonly [Tile, ConcealedHand] {
    if (this.drawnTile === undefined) throw new InvalidNoTilesError();

    return [this.drawnTile, new ConcealedHand(this.tiles)];
  }

  public draw(tile: Tile): ConcealedHand {
    return new ConcealedHand(this.tiles, tile);
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return (
      this.drawnTile === undefined
        ? [...this.tiles]
        : [...this.tiles, this.drawnTile]
    )[Symbol.iterator]();
  }

  private has(...tiles: readonly Tile[]): boolean {
    let clone = [...this];

    for (const tile of tiles) {
      const index = clone.findIndex((_tile) => _tile.equals(tile));

      if (index === -1) return false;

      clone = [...clone.slice(0, index), ...clone.slice(index)];
    }

    return true;
  }

  private remove(...tiles: readonly Tile[]): ConcealedHand {
    let nextTiles = [...this];

    for (const tile of tiles) {
      const index = nextTiles.findIndex((_tile) => _tile.equals(tile));

      if (index === -1) throw new RangeError();

      nextTiles = [...nextTiles.slice(0, index), ...nextTiles.slice(index + 1)];
    }

    return new ConcealedHand(nextTiles);
  }

  public constructor(tiles: readonly Tile[], drawnTile?: Tile) {
    this.tiles = tiles;
    this.drawnTile = drawnTile;
  }
}

import { InvalidNoTilesError } from '../invalid-no-tiles-error';

import type { Tile } from '../../tile';

export class ConcealedHand implements Iterable<Tile> {
  public readonly drawnTile?: Tile | undefined;

  private readonly tiles: readonly Tile[];

  public discard(tile: Tile): ConcealedHand {
    if (!this.has(tile)) throw new InvalidNoTilesError();

    return this.removeAll(tile);
  }

  public discardDrawnTile(): readonly [Tile, ConcealedHand] {
    if (this.drawnTile === undefined) throw new InvalidNoTilesError();

    return [this.drawnTile, new ConcealedHand(this.tiles)];
  }

  public draw(tile: Tile): ConcealedHand {
    return new ConcealedHand(this.tiles, tile);
  }

  public remove(tile: Tile): ConcealedHand {
    let nextTiles = [...this];
    const index = nextTiles.findIndex((_tile) => _tile.equals(tile));

    if (index === -1) throw new InvalidNoTilesError();

    nextTiles = [...nextTiles.slice(0, index), ...nextTiles.slice(index + 1)];

    return new ConcealedHand(nextTiles, this.drawnTile);
  }

  public removeAll(...tiles: readonly Tile[]): ConcealedHand {
    return tiles.reduce<ConcealedHand>(
      (concealed, tile) => concealed.remove(tile),
      this,
    );
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return (
      this.drawnTile === undefined
        ? [...this.tiles]
        : [...this.tiles, this.drawnTile]
    )[Symbol.iterator]();
  }

  private has(tile: Tile): boolean {
    return this.tiles.find((_tile) => _tile.equals(tile)) !== undefined;
  }

  public constructor(tiles: readonly Tile[], drawnTile?: Tile) {
    this.tiles = tiles;
    this.drawnTile = drawnTile;
  }
}

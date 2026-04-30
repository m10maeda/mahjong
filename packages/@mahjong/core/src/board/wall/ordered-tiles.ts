import type { TilePosition } from './tile-position';
import type { Tile } from '../../tile';

export class OrderedTiles implements Iterable<Tile> {
  private readonly tiles: readonly Tile[];

  public get size(): number {
    return this.tiles.length;
  }

  public at(position: TilePosition): Tile | undefined {
    return this.tiles[position.valueOf()];
  }

  public slice(start: TilePosition, end?: TilePosition): readonly Tile[] {
    return [...this.tiles].slice(start.valueOf(), end?.valueOf());
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public constructor(...tiles: Tile[]) {
    this.tiles = [...tiles];
  }
}

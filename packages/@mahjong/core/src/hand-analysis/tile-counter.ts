import { TileCode } from './tile-code';
import { Tile } from '../tile';
import { TileCodeTranslator } from './tile-code-translator';

export class TileCounter implements Iterable<Tile> {
  private readonly tiles: ReadonlyMap<TileCode, readonly Tile[]>;

  public get minimumTile(): Tile | undefined {
    const sorted = [...this.tiles]
      .sort(([a], [b]) => a - b)
      .map(([, tiles]) => tiles);
    const [firstTileSet] = sorted;
    const [firstTile] = firstTileSet ?? [];

    return firstTile;
  }

  public count(code: TileCode): number {
    return this.tiles.get(code)?.length ?? 0;
  }

  public filter(
    predicate: (tiles: readonly Tile[], code: TileCode) => boolean,
  ): TileCounter {
    return new TileCounter(
      new Map(
        [...this.tiles.entries()].filter(([code, tiles]) =>
          predicate(tiles, code),
        ),
      ),
    );
  }

  public find(
    predicate: (tiles: readonly Tile[], code: TileCode) => boolean,
  ): readonly Tile[] | undefined {
    const candidate = [...this.tiles.entries()].find(([code, tiles]) =>
      predicate(tiles, code),
    );

    return candidate?.[1];
  }

  public findAll(
    predicate: (tiles: readonly Tile[], code: TileCode) => boolean,
  ): readonly (readonly Tile[])[] {
    return [...this.tiles.entries()]
      .filter(([code, tiles]) => predicate(tiles, code))
      .map(([, tiles]) => tiles);
  }

  public get(code: TileCode): readonly Tile[] {
    return this.tiles.get(code) ?? [];
  }

  public has(code: TileCode): boolean {
    return this.count(code) > 0;
  }

  public isEmpty(): boolean {
    return this.tiles.size === 0;
  }

  public remove(...tiles: readonly Tile[]): TileCounter {
    const newTiles = new Map(this.tiles);

    for (const tile of tiles) {
      const code = TileCodeTranslator.encode(tile.type);
      const _tiles = newTiles.get(code) ?? [];

      const index = _tiles.findIndex((_tile) => _tile.equals(tile));

      if (index === -1) throw new RangeError();

      const removed = [..._tiles.slice(0, index), ..._tiles.slice(index + 1)];

      newTiles.set(code, removed);

      if (removed.length === 0) {
        newTiles.delete(code);
      }
    }

    return new TileCounter(newTiles);
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return [...this.tiles.values()].flat()[Symbol.iterator]();
  }

  private constructor(tiles: Map<TileCode, readonly Tile[]>) {
    this.tiles = tiles;
  }

  public static from(...tiles: readonly Tile[]): TileCounter {
    const pool = new Map<TileCode, readonly Tile[]>();

    for (const tile of tiles) {
      const code = TileCodeTranslator.encode(tile.type);

      const pooled = pool.get(code);
      pool.set(code, pooled !== undefined ? [...pooled, tile] : [tile]);
    }

    return new TileCounter(pool);
  }
}

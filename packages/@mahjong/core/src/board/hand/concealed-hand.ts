import { Pair, type SerialPair } from '../../winning-hand-shape';
import { InvalidNoTilesError } from '../invalid-no-tiles-error';

import type {
  IConcealedHandDecomposer,
  IMeldSourceFinder,
  TileGroupDecomposition,
} from '../../hand-analysis';
import type { Tile } from '../../tile';

export class ConcealedHand implements Iterable<Tile> {
  public readonly drawnTile?: Tile | undefined;

  private readonly decomposer: IConcealedHandDecomposer;

  private readonly meldSourceFinder: IMeldSourceFinder;

  private readonly tiles: readonly Tile[];

  public get pairs(): readonly Pair[] {
    return this.meldSourceFinder.findAllPairPatterns(...this);
  }

  public get serialPairs(): readonly SerialPair[] {
    return this.meldSourceFinder.findAllSerialPairPatterns(...this);
  }

  public consume(...tiles: readonly Tile[]): ConcealedHand {
    if (!this.has(...tiles)) throw new InvalidNoTilesError();

    return this.remove(...tiles);
  }

  public createPair(
    ...tiles: readonly [Tile, Tile]
  ): readonly [Pair, ConcealedHand] {
    if (!this.has(...tiles)) throw new InvalidNoTilesError();

    const pair = new Pair(...tiles);
    const nextConcealedHand = this.remove(...pair);

    return [pair, nextConcealedHand];
  }

  public createSerialPair(
    ...tiles: readonly [Tile, Tile]
  ): readonly [SerialPair, ConcealedHand] {
    if (!this.has(...tiles)) throw new InvalidNoTilesError();

    const serialPair = this.serialPairs.find((serialPair) =>
      serialPair.composes(tiles[0].type, tiles[1].type),
    );

    if (serialPair === undefined) throw new TypeError();

    const nextConcealedHand = this.remove(...serialPair);

    return [serialPair, nextConcealedHand];
  }

  public decompose(): readonly TileGroupDecomposition[] {
    return this.decomposer.decompose(...this);
  }

  public discard(tile: Tile): ConcealedHand {
    if (!this.has(tile)) throw new InvalidNoTilesError();

    return this.remove(tile);
  }

  public discardDrawnTile(): readonly [Tile, ConcealedHand] {
    if (this.drawnTile === undefined) throw new InvalidNoTilesError();

    return [
      this.drawnTile,
      new ConcealedHand(this.decomposer, this.meldSourceFinder, this.tiles),
    ];
  }

  public draw(tile: Tile): ConcealedHand {
    return new ConcealedHand(
      this.decomposer,
      this.meldSourceFinder,
      this.tiles,
      tile,
    );
  }

  public findAllPairCandidatesWith(tile: Tile): readonly Pair[] {
    return this.pairs.filter((pair) => pair.composes(tile.type));
  }

  public findAllSerialPairCandidatesWith(tile: Tile): readonly SerialPair[] {
    return this.serialPairs.filter((serialPair) => serialPair.receives(tile));
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

    return new ConcealedHand(this.decomposer, this.meldSourceFinder, nextTiles);
  }

  public constructor(
    decomposer: IConcealedHandDecomposer,
    meldSourceFinder: IMeldSourceFinder,
    tiles: readonly Tile[],
    drawnTile?: Tile,
  ) {
    this.decomposer = decomposer;
    this.meldSourceFinder = meldSourceFinder;
    this.tiles = tiles;
    this.drawnTile = drawnTile;
  }
}

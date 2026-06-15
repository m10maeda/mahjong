import type { Tile } from '../../tile';
import type { Pair, SerialPair } from '../../winning-hand-shape';

export interface IMeldSourceFinder {
  findAllPairPatterns(
    target: Tile,
    concealed: readonly Tile[],
  ): readonly Pair[];
  findAllSerialPairPatterns(
    target: Tile,
    concealed: readonly Tile[],
  ): readonly SerialPair[];
  findAllTreeTiles(
    target: Tile,
    concealed: readonly Tile[],
  ): readonly (readonly [Tile, Tile, Tile])[];
}

export interface IPairFinder {
  findAll(target: Tile, concealed: readonly Tile[]): readonly Pair[];
  has(target: Tile, concealed: readonly Tile[]): boolean;
}

export interface ISerialPairFinder {
  findAll(target: Tile, concealed: readonly Tile[]): readonly SerialPair[];
  has(target: Tile, concealed: readonly Tile[]): boolean;
}

export interface IThreeTilesFinder {
  findAll(
    target: Tile,
    concealed: readonly Tile[],
  ): readonly (readonly [Tile, Tile, Tile])[];
  has(target: Tile, concealed: readonly Tile[]): boolean;
}

export class MeldSourceFinder implements IMeldSourceFinder {
  private readonly pairFinder: IPairFinder;

  private readonly serialPairFinder: ISerialPairFinder;

  private readonly threeTilesFinder: IThreeTilesFinder;

  public findAllPairPatterns(
    target: Tile,
    concealed: readonly Tile[],
  ): readonly Pair[] {
    return this.pairFinder.findAll(target, concealed);
  }

  public findAllSerialPairPatterns(
    target: Tile,
    concealed: readonly Tile[],
  ): readonly SerialPair[] {
    return this.serialPairFinder.findAll(target, concealed);
  }

  public findAllTreeTiles(
    target: Tile,
    concealed: readonly Tile[],
  ): readonly (readonly [Tile, Tile, Tile])[] {
    return this.threeTilesFinder.findAll(target, concealed);
  }

  public constructor(
    serialPairFinder: ISerialPairFinder,
    pairFinder: IPairFinder,
    threeTilesFinder: IThreeTilesFinder,
  ) {
    this.serialPairFinder = serialPairFinder;
    this.pairFinder = pairFinder;
    this.threeTilesFinder = threeTilesFinder;
  }
}

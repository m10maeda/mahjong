import { Tile } from '../../tile';
import {
  CompleteTileGroup,
  Pair,
  SerialPair,
  type TileGroup,
} from '../../winning-hand-shape';

export class TileGroupDecomposition {
  public readonly groups: readonly CompleteTileGroup[];

  public readonly pairs: readonly Pair[];

  public readonly reamingTiles: readonly Tile[];

  public readonly serialPairs: readonly SerialPair[];

  public get groupsCount(): number {
    return this.groups.length;
  }

  public get parisCount(): number {
    return this.pairs.length;
  }

  public get reamingTilesCount(): number {
    return this.reamingTiles.length;
  }

  public get serialPairsCount(): number {
    return this.serialPairs.length;
  }

  public add(group: TileGroup): TileGroupDecomposition;
  public add(tile: Tile): TileGroupDecomposition;
  public add(groupOrTile: TileGroup | Tile): TileGroupDecomposition {
    if (groupOrTile instanceof CompleteTileGroup)
      return new TileGroupDecomposition(
        [...this.groups, groupOrTile],
        this.serialPairs,
        this.pairs,
        this.reamingTiles,
      );

    if (groupOrTile instanceof SerialPair)
      return new TileGroupDecomposition(
        this.groups,
        [...this.serialPairs, groupOrTile],
        this.pairs,
        this.reamingTiles,
      );

    if (groupOrTile instanceof Pair)
      return new TileGroupDecomposition(
        this.groups,
        this.serialPairs,
        [...this.pairs, groupOrTile],
        this.reamingTiles,
      );

    if (groupOrTile instanceof Tile)
      return new TileGroupDecomposition(
        this.groups,
        this.serialPairs,
        this.pairs,
        [...this.reamingTiles, groupOrTile],
      );

    throw new TypeError();
  }

  public toString(): string {
    return [
      this.groups.map((group) => group.toString()).join(','),
      this.serialPairs.map((serialPair) => serialPair.toString()).join(','),
      this.pairs.map((pair) => pair.toString()).join(','),
      this.reamingTiles.map((tile) => tile.toString()).join(','),
    ]
      .filter((part) => part !== '')
      .join(',');
  }

  public constructor(
    groups: readonly CompleteTileGroup[],
    serialPairs: readonly SerialPair[],
    pairs: readonly Pair[],
    reamingTiles: readonly Tile[],
  ) {
    this.groups = groups;
    this.serialPairs = serialPairs;
    this.pairs = pairs;
    this.reamingTiles = reamingTiles;
  }

  public static empty(): TileGroupDecomposition {
    return new TileGroupDecomposition([], [], [], []);
  }

  public static merge(
    ...decompositions: TileGroupDecomposition[]
  ): TileGroupDecomposition {
    return new TileGroupDecomposition(
      decompositions.flatMap((decomposition) => decomposition.groups),
      decompositions.flatMap((decomposition) => decomposition.serialPairs),
      decompositions.flatMap((decomposition) => decomposition.pairs),
      decompositions.flatMap((decomposition) => decomposition.reamingTiles),
    );
  }
}

import { WinningHandShape } from '../winning-hand-shape';
import { ThirteenOrphansWaitShape } from './thirteen-orphans-wait-shape';
import { HonorType, SuitType, TileType, type Tile } from '../../concepts';

export class ThirteenOrphansWinningHandShape extends WinningHandShape {
  private static readonly REQUIRED_TILES = [
    SuitType.Character1,
    SuitType.Character9,
    SuitType.Circle1,
    SuitType.Circle9,
    SuitType.Bamboo1,
    SuitType.Bamboo9,
    HonorType.East,
    HonorType.South,
    HonorType.West,
    HonorType.North,
    HonorType.White,
    HonorType.Green,
    HonorType.Red,
  ];

  public readonly wait: ThirteenOrphansWaitShape;

  public readonly winningTile: Tile;

  private readonly tiles: readonly Tile[];

  public get waitTiles(): readonly TileType[] {
    if (this.wait === ThirteenOrphansWaitShape.Missing)
      return [this.winningTile.type];

    return ThirteenOrphansWinningHandShape.REQUIRED_TILES;
  }

  public [Symbol.iterator](): Iterator<Tile> {
    return this.tiles[Symbol.iterator]();
  }

  public constructor(
    tiles: readonly [
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
      Tile,
    ],
    winningTile: Tile,
    wait: ThirteenOrphansWaitShape,
  ) {
    super();

    const allTiles = [...tiles, winningTile];

    const tileCounts = new Array<number>(
      ThirteenOrphansWinningHandShape.REQUIRED_TILES.length,
    ).fill(0);

    for (const tile of allTiles) {
      const index = ThirteenOrphansWinningHandShape.REQUIRED_TILES.findIndex(
        (requiredTile) => requiredTile.equals(tile.type),
      );
      if (index === -1) throw new TypeError();

      const count = (tileCounts[index] ?? 0) + 1;
      tileCounts[index] = count;
      if (count > 2) throw new TypeError();
    }

    let pairCount = 0;
    for (const count of tileCounts) {
      if (count === 0) throw new TypeError();
      if (count === 2) pairCount++;
    }
    if (pairCount !== 1) throw new TypeError();

    this.tiles = tiles;
    this.winningTile = winningTile;
    this.wait = wait;
  }
}

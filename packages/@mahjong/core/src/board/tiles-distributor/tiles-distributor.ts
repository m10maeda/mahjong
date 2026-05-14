import { SeatPosition, type ITable } from '../../table';
import { Board } from '../models';

import type { Tile } from '../../tile';
import type { TilesDistributed } from '../events';
import type { Seed } from '../ports';
import type { ITilesDistributor } from '../runtime';
import type { TileSet } from '../tile-set';

export interface ITilesShuffler {
  shuffle(seed: Seed, ...tiles: readonly Tile[]): readonly Tile[];
}

export class TilesDistributor implements ITilesDistributor<Board> {
  private readonly shuffler: ITilesShuffler;

  private readonly table: ITable;

  private readonly tilesSet: TileSet;

  public distribute(seed: Seed): readonly [TilesDistributed, Board] {
    let shuffledTiles = this.shuffler.shuffle(seed, ...this.tilesSet);

    const dealtHands = new Map<SeatPosition, readonly Tile[]>(
      [...this.table].map((seat) => [seat, []]),
    );

    for (const size of [4, 4, 4, 1]) {
      for (const seat of this.table) {
        const [dealTiles, leftTiles] = [
          shuffledTiles.slice(0, size),
          shuffledTiles.slice(size),
        ];

        shuffledTiles = leftTiles;
        dealtHands.set(seat, [...(dealtHands.get(seat) ?? []), ...dealTiles]);
      }
    }

    const [wall, deadWall] = [
      shuffledTiles.slice(0, -14),
      shuffledTiles.slice(-14),
    ];

    const hands = [...dealtHands.entries()];

    return Board.new(wall, deadWall, hands);
  }

  public constructor(
    tilesSet: TileSet,
    shuffler: ITilesShuffler,
    table: ITable,
  ) {
    this.tilesSet = tilesSet;
    this.shuffler = shuffler;
    this.table = table;
  }
}

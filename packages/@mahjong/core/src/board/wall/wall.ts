import type { OrderedTiles } from './ordered-tiles';
import type { TilePosition } from './tile-position';
import type { Tile } from '../../tile';

export class Wall {
  public readonly deadWallStartPosition: TilePosition;

  private readonly _tiles: OrderedTiles;

  public get count(): number {
    return this._tiles.size;
  }

  public get dead(): readonly Tile[] {
    return this._tiles.slice(this.deadWallStartPosition);
  }

  public get tiles(): readonly Tile[] {
    return [...this._tiles];
  }

  public at(position: TilePosition): Tile | undefined {
    return this._tiles.at(position);
  }

  public slice(start: TilePosition, end?: TilePosition): readonly Tile[] {
    return this._tiles.slice(start, end);
  }

  public withMovedDeadWallStartPosition(position: TilePosition): Wall {
    return new Wall(this._tiles, position);
  }

  public constructor(tiles: OrderedTiles, deadWallStartPosition: TilePosition) {
    if (tiles.at(deadWallStartPosition) === undefined) throw new Error();

    this._tiles = tiles;
    this.deadWallStartPosition = deadWallStartPosition;
  }
}

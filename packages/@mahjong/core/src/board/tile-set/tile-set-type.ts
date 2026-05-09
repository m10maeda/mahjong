import { FourPlayersWithRed } from './four-players-with-red';
import { FourPlayersWithoutRed } from './four-players-without-red';
import { ThreePlayersWithRed } from './three-players-with-red';
import { ThreePlayersWithoutRed } from './three-players-without-red';

import type { AbstractTileSet, ITileSet } from './abstract-tile-set';
import type { Tile } from '../../tile';

export enum TileSetType {
  FourPlayersWithRed,
  FourPlayersWithoutRed,
  ThreePlayersWithRed,
  ThreePlayersWithoutRed,
}

export class TileSet implements ITileSet {
  public static readonly FourPlayersWithoutRed = new TileSet(
    new FourPlayersWithoutRed(),
  );

  public static readonly FourPlayersWithRed = new TileSet(
    new FourPlayersWithRed(),
  );

  public static readonly ThreePlayersWithoutRed = new TileSet(
    new ThreePlayersWithoutRed(),
  );

  public static readonly ThreePlayersWithRed = new TileSet(
    new ThreePlayersWithRed(),
  );

  private readonly base: AbstractTileSet;

  public [Symbol.iterator](): Iterator<Tile> {
    return this.base[Symbol.iterator]();
  }

  private constructor(base: AbstractTileSet) {
    this.base = base;
  }

  public static of(type: TileSetType): TileSet {
    switch (type) {
      case TileSetType.FourPlayersWithRed:
        return this.FourPlayersWithRed;

      case TileSetType.FourPlayersWithoutRed:
        return this.FourPlayersWithRed;

      case TileSetType.ThreePlayersWithRed:
        return this.FourPlayersWithRed;

      case TileSetType.ThreePlayersWithoutRed:
        return this.FourPlayersWithRed;

      default:
        throw new Error();
    }
  }
}

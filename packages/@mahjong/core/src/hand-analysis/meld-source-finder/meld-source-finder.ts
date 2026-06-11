import type { Tile } from '../../tile';
import type { Pair, SerialPair } from '../../winning-hand-shape';

export interface IMeldSourceFinder {
  findAllPairPatterns(...tiles: readonly Tile[]): readonly Pair[];
  findAllSerialPairPatterns(...tiles: readonly Tile[]): readonly SerialPair[];
}

export interface IPairFinder {
  findAll(...tiles: readonly Tile[]): readonly Pair[];
}

export interface ISerialPairFinder {
  findAll(...tiles: readonly Tile[]): readonly SerialPair[];
}

export class MeldSourceFinder implements IMeldSourceFinder {
  private readonly pairFinder: IPairFinder;

  private readonly serialPairFinder: ISerialPairFinder;

  public findAllPairPatterns(...tiles: readonly Tile[]): readonly Pair[] {
    return this.pairFinder.findAll(...tiles);
  }

  public findAllSerialPairPatterns(
    ...tiles: readonly Tile[]
  ): readonly SerialPair[] {
    return this.serialPairFinder.findAll(...tiles);
  }

  public constructor(
    serialPairFinder: ISerialPairFinder,
    pairFinder: IPairFinder,
  ) {
    this.serialPairFinder = serialPairFinder;
    this.pairFinder = pairFinder;
  }
}

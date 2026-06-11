import { TileCode } from '../tile-code';
import { TileCounter } from '../tile-counter';
import { TileGroupDecomposition } from './tile-group-decomposition';

import type { IConcealedHandDecomposer } from './concealed-hand-decomposer';
import type { Tile } from '../../tile';

export class ComplexHandDecomposer implements IConcealedHandDecomposer {
  /* eslint-disable @typescript-eslint/member-ordering */
  private static readonly CHARACTER_TILE_CODES = [
    TileCode.m1,
    TileCode.m2,
    TileCode.m3,
    TileCode.m4,
    TileCode.m5,
    TileCode.m6,
    TileCode.m7,
    TileCode.m8,
    TileCode.m9,
  ];
  private static readonly CIRCLE_TILE_CODES = [
    TileCode.p1,
    TileCode.p2,
    TileCode.p3,
    TileCode.p4,
    TileCode.p5,
    TileCode.p6,
    TileCode.p7,
    TileCode.p8,
    TileCode.p9,
  ];
  private static readonly BAMBOO_TILE_CODES = [
    TileCode.s1,
    TileCode.s2,
    TileCode.s3,
    TileCode.s4,
    TileCode.s5,
    TileCode.s6,
    TileCode.s7,
    TileCode.s8,
    TileCode.s9,
  ];
  private static readonly HONOR_TILE_CODES = [
    TileCode.z1,
    TileCode.z2,
    TileCode.z3,
    TileCode.z4,
    TileCode.z5,
    TileCode.z6,
    TileCode.z7,
  ];
  /* eslint-enable @typescript-eslint/member-ordering */

  private readonly honorDecomposer: IConcealedHandDecomposer;

  private readonly suitDecomposer: IConcealedHandDecomposer;

  public decompose(...tiles: readonly Tile[]): TileGroupDecomposition[] {
    const charactersCounter = TileCounter.from(...tiles).filter(
      (_tiles, code) =>
        ComplexHandDecomposer.CHARACTER_TILE_CODES.some(
          (_code) => _code === code,
        ),
    );
    const circlesCounter = TileCounter.from(...tiles).filter((_tiles, code) =>
      ComplexHandDecomposer.CIRCLE_TILE_CODES.some((_code) => _code === code),
    );
    const bamboosCounter = TileCounter.from(...tiles).filter((_tiles, code) =>
      ComplexHandDecomposer.BAMBOO_TILE_CODES.some((_code) => _code === code),
    );
    const honorsCounter = TileCounter.from(...tiles).filter((_tiles, code) =>
      ComplexHandDecomposer.HONOR_TILE_CODES.some((_code) => _code === code),
    );

    const characters = this.suitDecomposer.decompose(...charactersCounter);
    const circles = this.suitDecomposer.decompose(...circlesCounter);
    const bamboos = this.suitDecomposer.decompose(...bamboosCounter);
    const honors = this.honorDecomposer.decompose(...honorsCounter);

    const results: TileGroupDecomposition[] = [];

    for (const character of characters) {
      for (const circle of circles) {
        for (const bamboo of bamboos) {
          for (const honor of honors) {
            results.push(
              TileGroupDecomposition.merge(character, circle, bamboo, honor),
            );
          }
        }
      }
    }

    return results.filter((decomposition) =>
      ComplexHandDecomposer.filter(decomposition),
    );
  }

  public constructor(
    suitDecomposer: IConcealedHandDecomposer,
    honorDecomposer: IConcealedHandDecomposer,
  ) {
    this.suitDecomposer = suitDecomposer;
    this.honorDecomposer = honorDecomposer;
  }

  private static filter(decomposition: TileGroupDecomposition): boolean {
    return (
      decomposition.groupsCount <= 4 &&
      decomposition.parisCount <= 2 &&
      decomposition.serialPairsCount <= 4
    );
  }
}

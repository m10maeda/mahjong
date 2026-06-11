import { Tile } from '../../tile';
import { SerialPair, SerialPairType } from '../../winning-hand-shape';
import { TileCode } from '../tile-code';
import { TileCodeTranslator } from '../tile-code-translator';
import { TileCounter } from '../tile-counter';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SerialPairPattern = {
  receives: readonly TileCode[];
  serialPair: readonly [TileCode, TileCode];
};

export class SerialPairFinder {
  private static readonly BOTH_SIDE_SERIAL_PAIR_PATTERNS: SerialPairPattern[] =
    [
      {
        serialPair: [TileCode.m2, TileCode.m3],
        receives: [TileCode.m1, TileCode.m4],
      },
      {
        serialPair: [TileCode.m3, TileCode.m4],
        receives: [TileCode.m2, TileCode.m5],
      },
      {
        serialPair: [TileCode.m4, TileCode.m5],
        receives: [TileCode.m3, TileCode.m6],
      },
      {
        serialPair: [TileCode.m5, TileCode.m6],
        receives: [TileCode.m4, TileCode.m7],
      },
      {
        serialPair: [TileCode.m6, TileCode.m7],
        receives: [TileCode.m5, TileCode.m8],
      },
      {
        serialPair: [TileCode.m7, TileCode.m8],
        receives: [TileCode.m6, TileCode.m9],
      },
      {
        serialPair: [TileCode.p2, TileCode.p3],
        receives: [TileCode.p1, TileCode.p4],
      },
      {
        serialPair: [TileCode.p3, TileCode.p4],
        receives: [TileCode.p2, TileCode.p5],
      },
      {
        serialPair: [TileCode.p4, TileCode.p5],
        receives: [TileCode.p3, TileCode.p6],
      },
      {
        serialPair: [TileCode.p5, TileCode.p6],
        receives: [TileCode.p4, TileCode.p7],
      },
      {
        serialPair: [TileCode.p6, TileCode.p7],
        receives: [TileCode.p5, TileCode.p8],
      },
      {
        serialPair: [TileCode.p7, TileCode.p8],
        receives: [TileCode.p6, TileCode.p9],
      },
      {
        serialPair: [TileCode.s2, TileCode.s3],
        receives: [TileCode.s1, TileCode.s4],
      },
      {
        serialPair: [TileCode.s3, TileCode.s4],
        receives: [TileCode.s2, TileCode.s5],
      },
      {
        serialPair: [TileCode.s4, TileCode.s5],
        receives: [TileCode.s3, TileCode.s6],
      },
      {
        serialPair: [TileCode.s5, TileCode.s6],
        receives: [TileCode.s4, TileCode.s7],
      },
      {
        serialPair: [TileCode.s6, TileCode.s7],
        receives: [TileCode.s5, TileCode.s8],
      },
      {
        serialPair: [TileCode.s7, TileCode.s8],
        receives: [TileCode.s6, TileCode.s9],
      },
    ];
  private static readonly EDGE_SERIAL_PAIR_PATTERNS: SerialPairPattern[] = [
    {
      serialPair: [TileCode.m1, TileCode.m2],
      receives: [TileCode.m3],
    },
    {
      serialPair: [TileCode.m8, TileCode.m9],
      receives: [TileCode.m7],
    },
    {
      serialPair: [TileCode.p1, TileCode.p2],
      receives: [TileCode.p3],
    },
    {
      serialPair: [TileCode.p8, TileCode.p9],
      receives: [TileCode.p7],
    },
    {
      serialPair: [TileCode.s1, TileCode.s2],
      receives: [TileCode.s3],
    },
    {
      serialPair: [TileCode.s8, TileCode.s9],
      receives: [TileCode.s7],
    },
  ];

  private static readonly MIDDLE_SERIAL_PAIR_PATTERNS: SerialPairPattern[] = [
    {
      serialPair: [TileCode.m1, TileCode.m3],
      receives: [TileCode.m2],
    },
    {
      serialPair: [TileCode.m2, TileCode.m4],
      receives: [TileCode.m3],
    },
    {
      serialPair: [TileCode.m3, TileCode.m5],
      receives: [TileCode.m4],
    },
    {
      serialPair: [TileCode.m4, TileCode.m6],
      receives: [TileCode.m5],
    },
    {
      serialPair: [TileCode.m5, TileCode.m7],
      receives: [TileCode.m6],
    },
    {
      serialPair: [TileCode.m6, TileCode.m8],
      receives: [TileCode.m7],
    },
    {
      serialPair: [TileCode.m7, TileCode.m9],
      receives: [TileCode.m8],
    },
    {
      serialPair: [TileCode.p1, TileCode.p3],
      receives: [TileCode.p2],
    },
    {
      serialPair: [TileCode.p2, TileCode.p4],
      receives: [TileCode.p3],
    },
    {
      serialPair: [TileCode.p3, TileCode.p5],
      receives: [TileCode.p4],
    },
    {
      serialPair: [TileCode.p4, TileCode.p6],
      receives: [TileCode.p5],
    },
    {
      serialPair: [TileCode.p5, TileCode.p7],
      receives: [TileCode.p6],
    },
    {
      serialPair: [TileCode.p6, TileCode.p8],
      receives: [TileCode.p7],
    },
    {
      serialPair: [TileCode.p7, TileCode.p9],
      receives: [TileCode.p8],
    },
    {
      serialPair: [TileCode.s1, TileCode.s3],
      receives: [TileCode.s2],
    },
    {
      serialPair: [TileCode.s2, TileCode.s4],
      receives: [TileCode.s3],
    },
    {
      serialPair: [TileCode.s3, TileCode.s5],
      receives: [TileCode.s4],
    },
    {
      serialPair: [TileCode.s4, TileCode.s6],
      receives: [TileCode.s5],
    },
    {
      serialPair: [TileCode.s5, TileCode.s7],
      receives: [TileCode.s6],
    },
    {
      serialPair: [TileCode.s6, TileCode.s8],
      receives: [TileCode.s7],
    },
    {
      serialPair: [TileCode.s7, TileCode.s9],
      receives: [TileCode.s8],
    },
  ];

  private readonly bothSideSerialPairPatterns: SerialPairPattern[];

  private readonly edgeSerialPairPatterns: SerialPairPattern[];

  private readonly middleSerialPairPatterns: SerialPairPattern[];

  public findAll(...tiles: readonly Tile[]): readonly SerialPair[] {
    const counter = TileCounter.from(...tiles);

    return [
      ...this.calculateSerialPairPatterns(
        counter,
        this.bothSideSerialPairPatterns,
        SerialPairType.BothSide,
      ),
      ...this.calculateSerialPairPatterns(
        counter,
        this.edgeSerialPairPatterns,
        SerialPairType.Edge,
      ),
      ...this.calculateSerialPairPatterns(
        counter,
        this.middleSerialPairPatterns,
        SerialPairType.Middle,
      ),
    ];
  }

  private calculateSerialPairPatterns(
    counter: TileCounter,
    patterns: SerialPairPattern[],
    type: SerialPairType,
  ): readonly SerialPair[] {
    const candidates: SerialPair[] = [];

    for (const pattern of patterns) {
      const leftTiles = counter.get(pattern.serialPair[0]);
      const rightTiles = counter.get(pattern.serialPair[1]);

      const normalLeftTile = leftTiles.find((tile) => !tile.isRed());
      const redLeftTile = leftTiles.find((tile) => tile.isRed());
      const normalRightTile = rightTiles.find((tile) => !tile.isRed());
      const redRightTile = rightTiles.find((tile) => tile.isRed());
      const receivableTile = pattern.receives.map((receive) =>
        TileCodeTranslator.decode(receive),
      );

      if (normalLeftTile && normalRightTile) {
        candidates.push(
          new SerialPair(
            type,
            [normalLeftTile, normalRightTile],
            receivableTile,
          ),
        );
      }

      if (redLeftTile && normalRightTile) {
        candidates.push(
          new SerialPair(type, [redLeftTile, normalRightTile], receivableTile),
        );
      }

      if (redLeftTile && redRightTile) {
        candidates.push(
          new SerialPair(type, [redLeftTile, redRightTile], receivableTile),
        );
      }

      if (normalLeftTile && redRightTile) {
        candidates.push(
          new SerialPair(type, [normalLeftTile, redRightTile], receivableTile),
        );
      }
    }

    return candidates;
  }

  public constructor(
    bothSideSerialPairPatterns: SerialPairPattern[] = SerialPairFinder.BOTH_SIDE_SERIAL_PAIR_PATTERNS,
    edgeSerialPairPatterns: SerialPairPattern[] = SerialPairFinder.EDGE_SERIAL_PAIR_PATTERNS,
    middleSerialPairPatterns: SerialPairPattern[] = SerialPairFinder.MIDDLE_SERIAL_PAIR_PATTERNS,
  ) {
    this.bothSideSerialPairPatterns = bothSideSerialPairPatterns;
    this.edgeSerialPairPatterns = edgeSerialPairPatterns;
    this.middleSerialPairPatterns = middleSerialPairPatterns;
  }
}

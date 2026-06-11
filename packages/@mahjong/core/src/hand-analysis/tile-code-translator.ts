import { HonorType, SuitType, TileType } from '../tile';
import { TileCode } from './tile-code';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TileCodeTranslator {
  public static decode(code: TileCode): TileType {
    switch (code) {
      case TileCode.m1:
        return SuitType.Character1;
      case TileCode.m2:
        return SuitType.Character2;
      case TileCode.m3:
        return SuitType.Character3;
      case TileCode.m4:
        return SuitType.Character4;
      case TileCode.m5:
        return SuitType.Character5;
      case TileCode.m6:
        return SuitType.Character6;
      case TileCode.m7:
        return SuitType.Character7;
      case TileCode.m8:
        return SuitType.Character8;
      case TileCode.m9:
        return SuitType.Character9;
      case TileCode.p1:
        return SuitType.Circle1;
      case TileCode.p2:
        return SuitType.Circle2;
      case TileCode.p3:
        return SuitType.Circle3;
      case TileCode.p4:
        return SuitType.Circle4;
      case TileCode.p5:
        return SuitType.Circle5;
      case TileCode.p6:
        return SuitType.Circle6;
      case TileCode.p7:
        return SuitType.Circle7;
      case TileCode.p8:
        return SuitType.Circle8;
      case TileCode.p9:
        return SuitType.Circle9;
      case TileCode.s1:
        return SuitType.Bamboo1;
      case TileCode.s2:
        return SuitType.Bamboo2;
      case TileCode.s3:
        return SuitType.Bamboo3;
      case TileCode.s4:
        return SuitType.Bamboo4;
      case TileCode.s5:
        return SuitType.Bamboo5;
      case TileCode.s6:
        return SuitType.Bamboo6;
      case TileCode.s7:
        return SuitType.Bamboo7;
      case TileCode.s8:
        return SuitType.Bamboo8;
      case TileCode.s9:
        return SuitType.Bamboo9;
      case TileCode.z1:
        return HonorType.East;
      case TileCode.z2:
        return HonorType.South;
      case TileCode.z3:
        return HonorType.West;
      case TileCode.z4:
        return HonorType.North;
      case TileCode.z5:
        return HonorType.White;
      case TileCode.z6:
        return HonorType.Green;
      case TileCode.z7:
        return HonorType.Red;

      default:
        throw new RangeError();
    }
  }

  public static encode(tile: TileType): TileCode {
    if (tile.equals(SuitType.Character1)) return TileCode.m1;
    if (tile.equals(SuitType.Character2)) return TileCode.m2;
    if (tile.equals(SuitType.Character3)) return TileCode.m3;
    if (tile.equals(SuitType.Character4)) return TileCode.m4;
    if (tile.equals(SuitType.Character5)) return TileCode.m5;
    if (tile.equals(SuitType.Character6)) return TileCode.m6;
    if (tile.equals(SuitType.Character7)) return TileCode.m7;
    if (tile.equals(SuitType.Character8)) return TileCode.m8;
    if (tile.equals(SuitType.Character9)) return TileCode.m9;

    if (tile.equals(SuitType.Circle1)) return TileCode.p1;
    if (tile.equals(SuitType.Circle2)) return TileCode.p2;
    if (tile.equals(SuitType.Circle3)) return TileCode.p3;
    if (tile.equals(SuitType.Circle4)) return TileCode.p4;
    if (tile.equals(SuitType.Circle5)) return TileCode.p5;
    if (tile.equals(SuitType.Circle6)) return TileCode.p6;
    if (tile.equals(SuitType.Circle7)) return TileCode.p7;
    if (tile.equals(SuitType.Circle8)) return TileCode.p8;
    if (tile.equals(SuitType.Circle9)) return TileCode.p9;

    if (tile.equals(SuitType.Bamboo1)) return TileCode.s1;
    if (tile.equals(SuitType.Bamboo2)) return TileCode.s2;
    if (tile.equals(SuitType.Bamboo3)) return TileCode.s3;
    if (tile.equals(SuitType.Bamboo4)) return TileCode.s4;
    if (tile.equals(SuitType.Bamboo5)) return TileCode.s5;
    if (tile.equals(SuitType.Bamboo6)) return TileCode.s6;
    if (tile.equals(SuitType.Bamboo7)) return TileCode.s7;
    if (tile.equals(SuitType.Bamboo8)) return TileCode.s8;
    if (tile.equals(SuitType.Bamboo9)) return TileCode.s9;

    if (tile.equals(HonorType.East)) return TileCode.z1;
    if (tile.equals(HonorType.South)) return TileCode.z2;
    if (tile.equals(HonorType.West)) return TileCode.z3;
    if (tile.equals(HonorType.North)) return TileCode.z4;
    if (tile.equals(HonorType.White)) return TileCode.z5;
    if (tile.equals(HonorType.Green)) return TileCode.z6;
    if (tile.equals(HonorType.Red)) return TileCode.z7;

    throw new RangeError();
  }
}

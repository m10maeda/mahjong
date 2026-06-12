import type { IWinningHandShapeResolver } from './winning-hand-shape-resolver';
import type { Meld } from '../../round-session';
import type { Tile } from '../../tile';
import type { WinningHandShape } from '../../winning-hand-shape';

export class ComplexWinningHandShapeResolver implements IWinningHandShapeResolver {
  private readonly sevenPairs: IWinningHandShapeResolver;

  private readonly standard: IWinningHandShapeResolver;

  private readonly thirteenOrphans: IWinningHandShapeResolver;

  public resolve(
    concealed: readonly Tile[],
    melds: readonly Meld[],
    winningTile: Tile,
  ): readonly WinningHandShape[] {
    const standards = this.standard.resolve(concealed, melds, winningTile);
    const sevenPairs = this.sevenPairs.resolve(concealed, melds, winningTile);
    const thirteenOrphans = this.thirteenOrphans.resolve(
      concealed,
      melds,
      winningTile,
    );

    return [...standards, ...sevenPairs, ...thirteenOrphans];
  }

  public constructor(
    standard: IWinningHandShapeResolver,
    sevenPairs: IWinningHandShapeResolver,
    thirteenOrphans: IWinningHandShapeResolver,
  ) {
    this.standard = standard;
    this.sevenPairs = sevenPairs;
    this.thirteenOrphans = thirteenOrphans;
  }
}

import type { Meld } from '../round-session';
import type { Tile } from '../tile';

export class HandAnalysisContext {
  public readonly concealed: readonly Tile[];

  public readonly melds: readonly Meld[];

  public constructor(concealed: readonly Tile[], melds: readonly Meld[]) {
    this.concealed = concealed;
    this.melds = melds;
  }
}

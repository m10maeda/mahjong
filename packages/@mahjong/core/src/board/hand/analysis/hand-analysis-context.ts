import type { Meld } from '../../../round-session';
import type { IConcealedHand } from '../concealed-hand/concealed-hand';

export class HandAnalysisContext {
  public readonly concealed: IConcealedHand;

  public readonly melds: readonly Meld[];

  public constructor(concealed: IConcealedHand, melds: readonly Meld[]) {
    this.concealed = concealed;
    this.melds = melds;
  }
}

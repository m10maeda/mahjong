import type { DiscardPileProjection } from './discard-pile-projection';

export interface IDiscardPileReader {
  getDiscardPile(): DiscardPileProjection;
}

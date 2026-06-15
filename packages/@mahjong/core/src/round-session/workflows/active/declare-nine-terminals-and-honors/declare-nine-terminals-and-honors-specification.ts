import type { IHand } from '../../../hand';

export interface IDeclareNineTerminalsAndHonorsSpecification {
  isSatisfiedBy(hand: IHand): boolean;
}

import { InvalidDuplicatedSeatsError } from './invalid-duplicated-seats-error';
import { SeatPosition } from '../../table';

import type { Hand } from './hand';

export class Hands implements Iterable<readonly [SeatPosition, Hand]> {
  private readonly map: Map<SeatPosition, Hand>;

  public exists(holder: SeatPosition): boolean {
    return this.map.has(holder);
  }

  public [Symbol.iterator](): Iterator<readonly [SeatPosition, Hand]> {
    return this.map.entries();
  }

  public update(holder: SeatPosition, updater: (hand: Hand) => Hand): Hands {
    const newHands = Array.from(this.map.entries()).map<[SeatPosition, Hand]>(
      ([_holder, hand]) => {
        if (!_holder.equals(holder)) return [_holder, hand];

        const newHand = updater(hand);
        return [_holder, newHand];
      },
    );

    return new Hands(...newHands);
  }

  public constructor(...hands: readonly [SeatPosition, Hand][]) {
    const map = new Map(hands);

    const uniqueSeats = new Set([...hands].map(([holder]) => holder));

    if (map.size !== uniqueSeats.size) throw new InvalidDuplicatedSeatsError();

    this.map = map;
  }
}

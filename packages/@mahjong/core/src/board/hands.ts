import { Hand } from './hand';
import { InvalidDuplicatedSeatsError } from './invalid-duplicated-seats-error';
import { InvalidHolderNotFoundError } from './invalid-holder-not-found-error';
import { SeatPosition } from '../concepts';

export class Hands implements Iterable<Hand> {
  private readonly hands: ReadonlyMap<SeatPosition, Hand>;

  public get size(): number {
    return this.hands.size;
  }

  public find(predicate: (hand: Hand) => boolean): Hand | undefined {
    return [...this.hands.values()].find(predicate);
  }

  public get(seat: SeatPosition): Hand {
    const hand = [...this.hands.values()].find((hand) => hand.owns(seat));

    if (hand === undefined) throw new InvalidHolderNotFoundError();

    return hand;
  }

  public replace(hand: Hand): Hands {
    return new Hands(
      ...[...this.hands.values()].map<Hand>((_hand) => {
        if (_hand.equals(hand)) return hand;

        return _hand;
      }),
    );
  }

  public [Symbol.iterator](): Iterator<Hand> {
    return this.hands.values();
  }

  public constructor(...hands: readonly Hand[]) {
    const map = new Map(hands.map((hand) => [hand.seat, hand]));
    const uniqueSeats = new Set([...hands].map((hand) => hand.seat));

    if (map.size !== uniqueSeats.size) throw new InvalidDuplicatedSeatsError();

    this.hands = map;
  }
}

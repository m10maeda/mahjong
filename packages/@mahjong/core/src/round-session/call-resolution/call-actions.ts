import { SeatPosition } from '../../table';

import type { CallAction } from './call-action';

export class CallActions implements Iterable<
  readonly [SeatPosition, CallAction]
> {
  private readonly actions: ReadonlyMap<SeatPosition, CallAction>;

  public every(predicate: (action: CallAction) => boolean): boolean {
    return [...this.actions.values()].every(predicate);
  }

  public find(
    predicate: (action: CallAction) => boolean,
  ): readonly [SeatPosition, CallAction] | undefined {
    return [...this.actions.entries()].find(([, action]) => predicate(action));
  }

  public findAll(
    predicate: (action: CallAction) => boolean,
  ): readonly (readonly [SeatPosition, CallAction])[] {
    return [...this.actions.entries()].filter(([, action]) =>
      predicate(action),
    );
  }

  public get(seat: SeatPosition): CallAction {
    const action = this.actions.get(seat);

    if (action === undefined) throw new RangeError();

    return action;
  }

  public isEmpty(): boolean {
    return this.actions.size === 0;
  }

  public map(
    callbackfn: ([seat, action]: readonly [
      SeatPosition,
      CallAction,
    ]) => readonly [SeatPosition, CallAction],
  ): CallActions {
    return new CallActions(
      new Map(
        [...this.actions.entries()].map<readonly [SeatPosition, CallAction]>(
          callbackfn,
        ),
      ),
    );
  }

  public [Symbol.iterator](): Iterator<readonly [SeatPosition, CallAction]> {
    return this.actions.entries();
  }

  public constructor(actions: ReadonlyMap<SeatPosition, CallAction>) {
    this.actions = actions;
  }

  public static from(
    ...items: readonly (readonly [SeatPosition, CallAction])[]
  ): CallActions {
    return new CallActions(new Map(items));
  }
}

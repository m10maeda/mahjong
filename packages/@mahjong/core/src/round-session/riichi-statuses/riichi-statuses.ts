import { RiichiStatus } from './riichi-status';
import { SeatPosition, type ITable } from '../../table';

export class RiichiStatuses {
  private readonly statuses: ReadonlyMap<SeatPosition, RiichiStatus>;

  public declare(seat: SeatPosition, isFirstAround: boolean): RiichiStatuses {
    return new RiichiStatuses(
      new Map<SeatPosition, RiichiStatus>(
        [...this.statuses.entries()].map<readonly [SeatPosition, RiichiStatus]>(
          ([_seat, status]) => {
            if (_seat.equals(seat))
              return [_seat, status.declare(isFirstAround)];

            return [_seat, status];
          },
        ),
      ),
    );
  }

  public disableOneShotEligible(): RiichiStatuses {
    return new RiichiStatuses(
      new Map<SeatPosition, RiichiStatus>(
        [...this.statuses.entries()].map<readonly [SeatPosition, RiichiStatus]>(
          ([seat, status]) => [seat, status.disableOneShotEligible()],
        ),
      ),
    );
  }

  public establish(): readonly [SeatPosition | undefined, RiichiStatuses] {
    const [pendingSeat] =
      [...this.statuses].find(([, status]) => status.isPending()) ?? [];

    const nextStatuses = new RiichiStatuses(
      new Map<SeatPosition, RiichiStatus>(
        [...this.statuses.entries()].map<readonly [SeatPosition, RiichiStatus]>(
          ([seat, status]) => {
            if (status.isPending()) return [seat, status.establish()];

            return [seat, status];
          },
        ),
      ),
    );

    return [pendingSeat, nextStatuses];
  }

  public establishOf(seat: SeatPosition): boolean {
    const status = this.statuses.get(seat);

    if (status === undefined) throw new RangeError();

    return status.isEstablished();
  }

  public get(seat: SeatPosition): RiichiStatus | undefined {
    return this.statuses.get(seat);
  }

  public constructor(statuses: Map<SeatPosition, RiichiStatus>) {
    this.statuses = statuses;
  }

  public static new(table: ITable): RiichiStatuses {
    return new RiichiStatuses(
      new Map(
        [...table].map<readonly [SeatPosition, RiichiStatus]>((seat) => [
          seat,
          RiichiStatus.new(),
        ]),
      ),
    );
  }
}

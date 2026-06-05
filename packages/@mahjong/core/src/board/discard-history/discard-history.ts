import type { DiscardRecord } from './discard-record';
import type { SeatPosition } from '../../table';
import type { Tile } from '../../tile';

export class DiscardHistory implements Iterable<DiscardRecord> {
  private readonly records: readonly DiscardRecord[];

  public get latest(): DiscardRecord | undefined {
    return this.records[this.records.length - 1];
  }

  public allDiscardedTiles(seat: SeatPosition): readonly Tile[] {
    return [...this.records]
      .filter((record) => record.from.equals(seat))
      .map((record) => record.tile);
  }

  public append(record: DiscardRecord): DiscardHistory {
    return new DiscardHistory(...this, record);
  }

  public [Symbol.iterator](): Iterator<DiscardRecord> {
    return this.records[Symbol.iterator]();
  }

  public constructor(...records: DiscardRecord[]) {
    this.records = records;
  }

  public static new(): DiscardHistory {
    return new DiscardHistory();
  }
}

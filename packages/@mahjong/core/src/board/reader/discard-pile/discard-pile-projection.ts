import { DiscardedRecord } from './discarded-record';
import { BoardEvent, TileDiscarded } from '../../event';

export class DiscardPileProjection implements Iterable<DiscardedRecord> {
  private readonly records: readonly DiscardedRecord[];

  public apply(event: BoardEvent): DiscardPileProjection {
    if (!(event instanceof TileDiscarded)) return this;

    const record = new DiscardedRecord(event.tile, event.discarder, event.turn);

    return new DiscardPileProjection(...this.records, record);
  }

  public [Symbol.iterator](): Iterator<DiscardedRecord> {
    return this.records[Symbol.iterator]();
  }

  public constructor(...records: readonly DiscardedRecord[]) {
    this.records = records;
  }

  public static new(): DiscardPileProjection {
    return new DiscardPileProjection();
  }

  public static replay(
    ...events: readonly BoardEvent[]
  ): DiscardPileProjection {
    let projection = this.new();

    for (const event of events) {
      projection = projection.apply(event);
    }

    return projection;
  }
}

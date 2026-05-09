import type { MahjongEvent } from './event';

export interface IMahjongEventSubscriber<TEvent extends MahjongEvent> {
  handle(event: TEvent): Promise<void>;
}

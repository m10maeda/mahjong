import type { MahjongEvent } from './event';

export interface IMahjongEventPublisher<TEvent extends MahjongEvent> {
  publish(event: TEvent): Promise<void>;
}

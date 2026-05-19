import type { RoundSessionEvent } from './round-session-event';
import type { IMahjongEventSubscriber } from '../../event';

export interface IRoundSessionEventSubscriber extends IMahjongEventSubscriber<RoundSessionEvent> {}

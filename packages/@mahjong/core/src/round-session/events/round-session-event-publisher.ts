import type { RoundSessionEvent } from './round-session-event';
import type { IMahjongEventPublisher } from '../../event';

export interface IRoundSessionEventPublisher extends IMahjongEventPublisher<RoundSessionEvent> {}

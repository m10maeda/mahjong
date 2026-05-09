import type { HandSessionEvent } from './hand-session-event';
import type { IMahjongEventPublisher } from '../../event';

export interface IHandSessionEventPublisher extends IMahjongEventPublisher<HandSessionEvent> {}

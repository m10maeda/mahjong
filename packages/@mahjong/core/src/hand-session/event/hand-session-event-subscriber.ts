import type { HandSessionEvent } from './hand-session-event';
import type { IMahjongEventSubscriber } from '../../event';

export interface IHandSessionEventSubscriber extends IMahjongEventSubscriber<HandSessionEvent> {}

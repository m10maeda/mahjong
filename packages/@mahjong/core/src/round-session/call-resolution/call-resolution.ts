import type { CallResolutionContext } from './call-resolution-context';
import type { CallResolutionResult } from './call-resolution-result';
import type { ReactiveRoundSessionCommand } from '../commands';

export interface ICallResolution {
  canReceive(command: ReactiveRoundSessionCommand): boolean;
  hasPendingActions(): boolean;
  receive(
    command: ReactiveRoundSessionCommand,
  ): readonly [CallResolutionResult, ICallResolution];
  start(context: CallResolutionContext): ICallResolution;
}

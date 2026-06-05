import { describe, expect, it, vi } from 'vitest';

import {
  Honba,
  Round,
  RoundIndex,
  RoundProgress,
  RoundWind,
} from '../../round';
import { ScoreTransactionAppended } from '../events';
import { Point } from '../point';
import { ScoreLedger } from '../score-ledger';
import {
  ScoreEntry,
  ScoreHolder,
  ScoreTransaction,
} from '../score-transaction';
import { ScoreLedgerEngine } from './score-ledger-engine';

import type { IScoreLedgerEventPublisher } from './score-ledger-event-publisher';

describe('ScoreLedgerEngine', () => {
  describe('add', () => {
    it('イベントパブリッシャーが呼び出されること', async () => {
      const mockEventPublisher: IScoreLedgerEventPublisher = {
        publish: vi.fn(),
      };

      const sut = new ScoreLedgerEngine(new ScoreLedger(), mockEventPublisher);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEventPublisher.publish).not.toHaveBeenCalled();

      await sut.append(
        new ScoreTransaction(
          [
            new ScoreEntry(ScoreHolder.EastSeat, new Point(1000)),
            new ScoreEntry(ScoreHolder.Pot, new Point(-1000)),
          ],
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(2, 4)),
            Honba.Zero,
          ),
        ),
      );

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEventPublisher.publish).toHaveBeenCalled();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEventPublisher.publish).toHaveBeenCalledWith(
        new ScoreTransactionAppended(
          [
            new ScoreEntry(ScoreHolder.EastSeat, new Point(1000)),
            new ScoreEntry(ScoreHolder.Pot, new Point(-1000)),
          ],
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(2, 4)),
            Honba.Zero,
          ),
        ),
      );
    });
  });
});

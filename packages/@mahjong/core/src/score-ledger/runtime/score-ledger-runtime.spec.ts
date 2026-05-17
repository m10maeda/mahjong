import { describe, expect, it, vi } from 'vitest';

import {
  Honba,
  Round,
  RoundIndex,
  RoundProgress,
  RoundWind,
} from '../../concepts';
import { Point, ScoreEntry, ScoreHolder, ScoreTransaction } from '../concepts';
import { type IScoreLedgerEventPublisher, ScoreTransacted } from '../events';
import { ScoreLedger } from '../models';
import { Score } from '../ports';
import { ScoreBoardProjection } from '../projections';
import { ScoreLedgerRuntime } from './score-ledger-runtime';

describe('ScoreLedgerRuntime', () => {
  describe('getAllScores', () => {
    it('保持している得点を取得できること', () => {
      const mockEventPublisher: IScoreLedgerEventPublisher = {
        publish: vi.fn(),
      };

      const scores = [
        [ScoreHolder.EastSeat, new Point(24000)],
        [ScoreHolder.SouthSeat, new Point(17000)],
        [ScoreHolder.WestSeat, new Point(33000)],
        [ScoreHolder.NorthSeat, new Point(25000)],
        [ScoreHolder.Pot, new Point(1000)],
      ] as const;

      const sut = new ScoreLedgerRuntime(
        new ScoreLedger(),
        new ScoreBoardProjection(new Map<ScoreHolder, Point>(scores)),
        mockEventPublisher,
      );

      const result = sut.getAllScores();

      expect([...result][0]).toEqual(new Score(scores[0][0], scores[0][1]));
      expect([...result][1]).toEqual(new Score(scores[1][0], scores[1][1]));
      expect([...result][2]).toEqual(new Score(scores[2][0], scores[2][1]));
      expect([...result][3]).toEqual(new Score(scores[3][0], scores[3][1]));
      expect([...result][4]).toEqual(new Score(scores[4][0], scores[4][1]));
    });
  });

  describe('add', () => {
    const scores: readonly [ScoreHolder, Point][] = [
      [ScoreHolder.EastSeat, new Point(24000)],
      [ScoreHolder.SouthSeat, new Point(17000)],
      [ScoreHolder.WestSeat, new Point(33000)],
      [ScoreHolder.NorthSeat, new Point(25000)],
      [ScoreHolder.Pot, new Point(1000)],
    ];

    it('与えられた取引に基づいて読み取りモデルを更新すること', async () => {
      const mockEventPublisher: IScoreLedgerEventPublisher = {
        publish: vi.fn(),
      };

      const sut = new ScoreLedgerRuntime(
        new ScoreLedger(),
        new ScoreBoardProjection(new Map<ScoreHolder, Point>(scores)),
        mockEventPublisher,
      );

      await sut.append(
        new ScoreTransaction(
          [
            new ScoreEntry(ScoreHolder.EastSeat, new Point(9000)),
            new ScoreEntry(ScoreHolder.NorthSeat, new Point(-8000)),
            new ScoreEntry(ScoreHolder.Pot, new Point(-1000)),
          ],
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(2, 4)),
            Honba.Zero,
          ),
        ),
      );

      const result = sut.getAllScores();

      expect([...result][0]).toEqual(
        new Score(ScoreHolder.EastSeat, new Point(33000)),
      );
      expect([...result][1]).toEqual(
        new Score(ScoreHolder.SouthSeat, new Point(17000)),
      );
      expect([...result][2]).toEqual(
        new Score(ScoreHolder.WestSeat, new Point(33000)),
      );
      expect([...result][3]).toEqual(
        new Score(ScoreHolder.NorthSeat, new Point(17000)),
      );
      expect([...result][4]).toEqual(new Score(ScoreHolder.Pot, new Point(0)));
    });

    it('イベントパブリッシャーが呼び出されること', async () => {
      const mockEventPublisher: IScoreLedgerEventPublisher = {
        publish: vi.fn(),
      };

      const sut = new ScoreLedgerRuntime(
        new ScoreLedger(),
        new ScoreBoardProjection(new Map<ScoreHolder, Point>(scores)),
        mockEventPublisher,
      );

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
        new ScoreTransacted(
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

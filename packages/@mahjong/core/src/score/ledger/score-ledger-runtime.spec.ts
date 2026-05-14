import { describe, expect, it, vi } from 'vitest';

import { type IScoreLedgerEventPublisher, ScoreTransacted } from './event';
import { ScoreBoardProjection } from './reader';
import { ScoreEntry } from './score-entry';
import { PotScoreHolder, ScoreHolder, SeatScoreHolder } from './score-holder';
import { ScoreLedger } from './score-ledger';
import { ScoreLedgerRuntime } from './score-ledger-runtime';
import { Point } from '../point';
import { ScoreTransaction } from './score-transaction';
import {
  Honba,
  Round,
  RoundIndex,
  RoundProgress,
  RoundWind,
} from '../../round';

describe('ScoreLedgerRuntime', () => {
  describe('getScoreBoard', () => {
    it('保持している得点を取得できること', () => {
      const mockEventPublisher: IScoreLedgerEventPublisher = {
        publish: vi.fn(),
      };

      const scores: readonly [ScoreHolder, Point][] = [
        [SeatScoreHolder.East, new Point(24000)],
        [SeatScoreHolder.South, new Point(17000)],
        [SeatScoreHolder.West, new Point(33000)],
        [SeatScoreHolder.North, new Point(25000)],
        [PotScoreHolder.new(), new Point(1000)],
      ];

      const sut = new ScoreLedgerRuntime(
        new ScoreLedger(),
        new ScoreBoardProjection(new Map<ScoreHolder, Point>(scores)),
        mockEventPublisher,
      );

      const result = sut.getScoreBoard();

      expect([...result][0]).toEqual(scores[0]);
      expect([...result][1]).toEqual(scores[1]);
      expect([...result][2]).toEqual(scores[2]);
      expect([...result][3]).toEqual(scores[3]);
      expect([...result][4]).toEqual(scores[4]);
    });
  });

  describe('add', () => {
    const scores: readonly [ScoreHolder, Point][] = [
      [SeatScoreHolder.East, new Point(24000)],
      [SeatScoreHolder.South, new Point(17000)],
      [SeatScoreHolder.West, new Point(33000)],
      [SeatScoreHolder.North, new Point(25000)],
      [PotScoreHolder.new(), new Point(1000)],
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

      await sut.add(
        new ScoreTransaction(
          [
            new ScoreEntry(SeatScoreHolder.East, new Point(9000)),
            new ScoreEntry(SeatScoreHolder.North, new Point(-8000)),
            new ScoreEntry(PotScoreHolder.new(), new Point(-1000)),
          ],
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(2, 4)),
            Honba.Zero,
          ),
        ),
      );

      const result = sut.getScoreBoard();

      expect([...result][0]).toEqual([SeatScoreHolder.East, new Point(33000)]);
      expect([...result][1]).toEqual([SeatScoreHolder.South, new Point(17000)]);
      expect([...result][2]).toEqual([SeatScoreHolder.West, new Point(33000)]);
      expect([...result][3]).toEqual([SeatScoreHolder.North, new Point(17000)]);
      expect([...result][4]).toEqual([PotScoreHolder.new(), new Point(0)]);
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

      await sut.add(
        new ScoreTransaction(
          [
            new ScoreEntry(SeatScoreHolder.East, new Point(1000)),
            new ScoreEntry(PotScoreHolder.new(), new Point(-1000)),
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
            new ScoreEntry(SeatScoreHolder.East, new Point(1000)),
            new ScoreEntry(PotScoreHolder.new(), new Point(-1000)),
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

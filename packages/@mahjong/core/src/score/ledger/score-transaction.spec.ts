import { describe, expect, it } from 'vitest';

import { InvalidDuplicatedHolderError } from './invalid-duplicated-holder-error';
import { InvalidNoZeroSumError } from './invalid-no-zero-sum-error';
import { ScoreEntry } from './score-entry';
import { PotScoreHolder, SeatScoreHolder } from './score-holder';
import { ScoreTransaction } from './score-transaction';
import {
  Honba,
  Round,
  RoundIndex,
  RoundProgress,
  RoundWind,
} from '../../round';
import { Point } from '../point';

describe('ScoreTransaction', () => {
  describe('有効な値を与えられた場合', () => {
    it('ScoreTransaction として成立すること', () => {
      const result = new ScoreTransaction(
        [
          new ScoreEntry(SeatScoreHolder.East, new Point(-4000)),
          new ScoreEntry(SeatScoreHolder.South, new Point(9000)),
          new ScoreEntry(SeatScoreHolder.West, new Point(-2000)),
          new ScoreEntry(SeatScoreHolder.North, new Point(-2000)),
          new ScoreEntry(PotScoreHolder.new(), new Point(-1000)),
        ],
        new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(1)),
          Honba.Zero,
        ),
      );

      expect([...result]).toHaveLength(5);
    });
  });

  describe('無効な値を与えられた場合', () => {
    it('合計値が0ではない場合、エラーを投げること', () => {
      expect(() => {
        new ScoreTransaction(
          [
            new ScoreEntry(SeatScoreHolder.East, new Point(-2000)),
            new ScoreEntry(SeatScoreHolder.South, new Point(8000)),
            new ScoreEntry(SeatScoreHolder.West, new Point(-2000)),
            new ScoreEntry(SeatScoreHolder.North, new Point(-2000)),
          ],
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(1)),
            Honba.Zero,
          ),
        );
      }).toThrow(InvalidNoZeroSumError);
    });

    it('スコア所有者が重複する場合、エラーを投げること', () => {
      expect(() => {
        new ScoreTransaction(
          [
            new ScoreEntry(SeatScoreHolder.East, new Point(-4000)),
            new ScoreEntry(SeatScoreHolder.South, new Point(8000)),
            new ScoreEntry(SeatScoreHolder.South, new Point(-2000)),
            new ScoreEntry(SeatScoreHolder.East, new Point(-2000)),
          ],
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(1)),
            Honba.Zero,
          ),
        );
      }).toThrow(InvalidDuplicatedHolderError);
    });
  });
});

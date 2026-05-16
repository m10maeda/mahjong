import { describe, expect, it } from 'vitest';

import { InvalidDuplicatedHolderError } from './invalid-duplicated-holder-error';
import { InvalidNoZeroSumError } from './invalid-no-zero-sum-error';
import { Point } from './point';
import { ScoreEntry } from './score-entry';
import { ScoreHolder } from './score-holder';
import { ScoreTransaction } from './score-transaction';
import {
  Honba,
  Round,
  RoundIndex,
  RoundProgress,
  RoundWind,
} from '../../concepts';

describe('ScoreTransaction', () => {
  describe('有効な値を与えられた場合', () => {
    it('ScoreTransaction として成立すること', () => {
      const result = new ScoreTransaction(
        [
          new ScoreEntry(ScoreHolder.EastSeat, new Point(-4000)),
          new ScoreEntry(ScoreHolder.SouthSeat, new Point(9000)),
          new ScoreEntry(ScoreHolder.WestSeat, new Point(-2000)),
          new ScoreEntry(ScoreHolder.NorthSeat, new Point(-2000)),
          new ScoreEntry(ScoreHolder.Pot, new Point(-1000)),
        ],
        new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(1, 4)),
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
            new ScoreEntry(ScoreHolder.EastSeat, new Point(-2000)),
            new ScoreEntry(ScoreHolder.SouthSeat, new Point(8000)),
            new ScoreEntry(ScoreHolder.WestSeat, new Point(-2000)),
            new ScoreEntry(ScoreHolder.NorthSeat, new Point(-2000)),
          ],
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(1, 4)),
            Honba.Zero,
          ),
        );
      }).toThrow(InvalidNoZeroSumError);
    });

    it('スコア所有者が重複する場合、エラーを投げること', () => {
      expect(() => {
        new ScoreTransaction(
          [
            new ScoreEntry(ScoreHolder.EastSeat, new Point(-4000)),
            new ScoreEntry(ScoreHolder.SouthSeat, new Point(8000)),
            new ScoreEntry(ScoreHolder.SouthSeat, new Point(-2000)),
            new ScoreEntry(ScoreHolder.EastSeat, new Point(-2000)),
          ],
          new Round(
            new RoundProgress(RoundWind.East, new RoundIndex(1, 4)),
            Honba.Zero,
          ),
        );
      }).toThrow(InvalidDuplicatedHolderError);
    });
  });
});

import { describe, expect, it } from 'vitest';

import { ScoreBoardProjection } from './score-board-projection';
import {
  Honba,
  Round,
  RoundIndex,
  RoundProgress,
  RoundWind,
} from '../../round';
import { Point } from '../../score';
import { ScoreTransacted } from '../events';
import { PotScoreHolder, ScoreHolder, SeatScoreHolder } from '../models';
import { ScoreEntry } from '../models/score-entry';

describe('ScoreBoardProjection', () => {
  it('与えられた得点を保持すること', () => {
    const scores: readonly [ScoreHolder, Point][] = [
      [SeatScoreHolder.East, new Point(24000)],
      [SeatScoreHolder.South, new Point(17000)],
      [SeatScoreHolder.West, new Point(33000)],
      [SeatScoreHolder.North, new Point(25000)],
      [PotScoreHolder.new(), new Point(1000)],
    ];
    const sut = new ScoreBoardProjection(new Map<ScoreHolder, Point>(scores));

    expect([...sut][0]).toEqual(scores[0]);
    expect([...sut][1]).toEqual(scores[1]);
    expect([...sut][2]).toEqual(scores[2]);
    expect([...sut][3]).toEqual(scores[3]);
    expect([...sut][4]).toEqual(scores[4]);
  });

  describe('apply', () => {
    it('与えられたイベントに基づいて新しい値を返すこと', () => {
      const sut = new ScoreBoardProjection(
        new Map<ScoreHolder, Point>([
          [SeatScoreHolder.East, new Point(24000)],
          [SeatScoreHolder.South, new Point(17000)],
          [SeatScoreHolder.West, new Point(33000)],
          [SeatScoreHolder.North, new Point(25000)],
          [PotScoreHolder.new(), new Point(1000)],
        ]),
      );

      const target = new ScoreTransacted(
        [
          new ScoreEntry(SeatScoreHolder.East, new Point(9000)),
          new ScoreEntry(SeatScoreHolder.North, new Point(-8000)),
          new ScoreEntry(PotScoreHolder.new(), new Point(-1000)),
        ],
        new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(2, 4)),
          Honba.Zero,
        ),
      );

      const result = sut.apply(target);

      expect([...result][0]).toEqual([SeatScoreHolder.East, new Point(33000)]);
      expect([...result][1]).toEqual([SeatScoreHolder.South, new Point(17000)]);
      expect([...result][2]).toEqual([SeatScoreHolder.West, new Point(33000)]);
      expect([...result][3]).toEqual([SeatScoreHolder.North, new Point(17000)]);
      expect([...result][4]).toEqual([PotScoreHolder.new(), new Point(0)]);

      expect(result).not.toBe(sut);
    });
  });
});

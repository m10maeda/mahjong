import { describe, expect, it } from 'vitest';

import { ScoreBoardProjection } from './score-board-projection';
import {
  Honba,
  Round,
  RoundIndex,
  RoundProgress,
  RoundWind,
} from '../../concepts';
import { Point, ScoreEntry, ScoreHolder } from '../concepts';
import { ScoreTransacted } from '../events';

describe('ScoreBoardProjection', () => {
  it('与えられた得点を保持すること', () => {
    const scores: readonly [ScoreHolder, Point][] = [
      [ScoreHolder.EastSeat, new Point(24000)],
      [ScoreHolder.SouthSeat, new Point(17000)],
      [ScoreHolder.WestSeat, new Point(33000)],
      [ScoreHolder.NorthSeat, new Point(25000)],
      [ScoreHolder.Pot, new Point(1000)],
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
          [ScoreHolder.EastSeat, new Point(24000)],
          [ScoreHolder.SouthSeat, new Point(17000)],
          [ScoreHolder.WestSeat, new Point(33000)],
          [ScoreHolder.NorthSeat, new Point(25000)],
          [ScoreHolder.Pot, new Point(1000)],
        ]),
      );

      const target = new ScoreTransacted(
        [
          new ScoreEntry(ScoreHolder.EastSeat, new Point(9000)),
          new ScoreEntry(ScoreHolder.NorthSeat, new Point(-8000)),
          new ScoreEntry(ScoreHolder.Pot, new Point(-1000)),
        ],
        new Round(
          new RoundProgress(RoundWind.East, new RoundIndex(2, 4)),
          Honba.Zero,
        ),
      );

      const result = sut.apply(target);

      expect([...result][0]).toEqual([ScoreHolder.EastSeat, new Point(33000)]);
      expect([...result][1]).toEqual([ScoreHolder.SouthSeat, new Point(17000)]);
      expect([...result][2]).toEqual([ScoreHolder.WestSeat, new Point(33000)]);
      expect([...result][3]).toEqual([ScoreHolder.NorthSeat, new Point(17000)]);
      expect([...result][4]).toEqual([ScoreHolder.Pot, new Point(0)]);

      expect(result).not.toBe(sut);
    });
  });
});

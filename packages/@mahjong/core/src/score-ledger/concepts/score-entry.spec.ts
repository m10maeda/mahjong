import { describe, expect, it } from 'vitest';

import { Point } from './point';
import { ScoreEntry } from './score-entry';
import { ScoreHolder } from './score-holder';

describe('ScoreEntry', () => {
  describe('無効な値を与えられた場合', () => {
    it('与えられた amount が 0 の場合、エラーを投げること', () => {
      expect(() => {
        new ScoreEntry(ScoreHolder.EastSeat, new Point(0));
      }).toThrow(Error);
    });
  });
});

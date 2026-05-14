import { describe, expect, it } from 'vitest';

import { ScoreEntry } from './score-entry';
import { ScoreHolder } from './score-holder';
import { Point } from '../../score';

describe('ScoreEntry', () => {
  describe('無効な値を与えられた場合', () => {
    it('与えられた amount が 0 の場合、エラーを投げること', () => {
      expect(() => {
        new ScoreEntry(ScoreHolder.EastSeat, new Point(0));
      }).toThrow(Error);
    });
  });
});

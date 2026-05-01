import { describe, expect, it } from 'vitest';

import { ScoreEntry, EntryReason } from './score-entry';
import { Point } from '../../point';
import { SeatAccountOwner } from '../seat-account-owner';

describe('ScoreEntry', () => {
  describe('無効な値を与えられた場合', () => {
    it('与えられた amount が 0 の場合、エラーを投げること', () => {
      expect(() => {
        new ScoreEntry(
          SeatAccountOwner.East,
          new Point(0),
          EntryReason.Receipt,
        );
      }).toThrow(Error);
    });
  });
});

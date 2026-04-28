import { describe, expect, it } from 'vitest';

import { Rank } from './rank';

describe('Rank', () => {
  describe('compareTo', () => {
    it('自身と同じ値を与えられた場合、0 を返すこと', () => {
      expect(Rank[1].compareTo(Rank[1])).toBe(0);
      expect(Rank[2].compareTo(Rank[2])).toBe(0);
      expect(Rank[3].compareTo(Rank[3])).toBe(0);
      expect(Rank[4].compareTo(Rank[4])).toBe(0);
      expect(Rank[5].compareTo(Rank[5])).toBe(0);
      expect(Rank[6].compareTo(Rank[6])).toBe(0);
      expect(Rank[7].compareTo(Rank[7])).toBe(0);
      expect(Rank[8].compareTo(Rank[8])).toBe(0);
      expect(Rank[9].compareTo(Rank[9])).toBe(0);
    });

    it('自身より小さい値を与えられた場合、正の数値を返すこと', () => {
      expect(Rank[2].compareTo(Rank[1])).toBeGreaterThan(0);

      expect(Rank[3].compareTo(Rank[1])).toBeGreaterThan(0);
      expect(Rank[3].compareTo(Rank[2])).toBeGreaterThan(0);

      expect(Rank[4].compareTo(Rank[1])).toBeGreaterThan(0);
      expect(Rank[4].compareTo(Rank[2])).toBeGreaterThan(0);
      expect(Rank[4].compareTo(Rank[3])).toBeGreaterThan(0);

      expect(Rank[5].compareTo(Rank[1])).toBeGreaterThan(0);
      expect(Rank[5].compareTo(Rank[2])).toBeGreaterThan(0);
      expect(Rank[5].compareTo(Rank[3])).toBeGreaterThan(0);
      expect(Rank[5].compareTo(Rank[4])).toBeGreaterThan(0);

      expect(Rank[6].compareTo(Rank[1])).toBeGreaterThan(0);
      expect(Rank[6].compareTo(Rank[2])).toBeGreaterThan(0);
      expect(Rank[6].compareTo(Rank[3])).toBeGreaterThan(0);
      expect(Rank[6].compareTo(Rank[4])).toBeGreaterThan(0);
      expect(Rank[6].compareTo(Rank[5])).toBeGreaterThan(0);

      expect(Rank[7].compareTo(Rank[1])).toBeGreaterThan(0);
      expect(Rank[7].compareTo(Rank[2])).toBeGreaterThan(0);
      expect(Rank[7].compareTo(Rank[3])).toBeGreaterThan(0);
      expect(Rank[7].compareTo(Rank[4])).toBeGreaterThan(0);
      expect(Rank[7].compareTo(Rank[5])).toBeGreaterThan(0);
      expect(Rank[7].compareTo(Rank[6])).toBeGreaterThan(0);

      expect(Rank[8].compareTo(Rank[1])).toBeGreaterThan(0);
      expect(Rank[8].compareTo(Rank[2])).toBeGreaterThan(0);
      expect(Rank[8].compareTo(Rank[3])).toBeGreaterThan(0);
      expect(Rank[8].compareTo(Rank[4])).toBeGreaterThan(0);
      expect(Rank[8].compareTo(Rank[5])).toBeGreaterThan(0);
      expect(Rank[8].compareTo(Rank[6])).toBeGreaterThan(0);
      expect(Rank[8].compareTo(Rank[7])).toBeGreaterThan(0);

      expect(Rank[9].compareTo(Rank[1])).toBeGreaterThan(0);
      expect(Rank[9].compareTo(Rank[2])).toBeGreaterThan(0);
      expect(Rank[9].compareTo(Rank[3])).toBeGreaterThan(0);
      expect(Rank[9].compareTo(Rank[4])).toBeGreaterThan(0);
      expect(Rank[9].compareTo(Rank[5])).toBeGreaterThan(0);
      expect(Rank[9].compareTo(Rank[6])).toBeGreaterThan(0);
      expect(Rank[9].compareTo(Rank[7])).toBeGreaterThan(0);
      expect(Rank[9].compareTo(Rank[8])).toBeGreaterThan(0);
    });

    it('自身より大きい値を与えられた場合、負の数値を返すこと', () => {
      expect(Rank[1].compareTo(Rank[2])).toBeLessThan(0);
      expect(Rank[1].compareTo(Rank[3])).toBeLessThan(0);
      expect(Rank[1].compareTo(Rank[4])).toBeLessThan(0);
      expect(Rank[1].compareTo(Rank[5])).toBeLessThan(0);
      expect(Rank[1].compareTo(Rank[6])).toBeLessThan(0);
      expect(Rank[1].compareTo(Rank[7])).toBeLessThan(0);
      expect(Rank[1].compareTo(Rank[8])).toBeLessThan(0);
      expect(Rank[1].compareTo(Rank[9])).toBeLessThan(0);

      expect(Rank[2].compareTo(Rank[3])).toBeLessThan(0);
      expect(Rank[2].compareTo(Rank[4])).toBeLessThan(0);
      expect(Rank[2].compareTo(Rank[5])).toBeLessThan(0);
      expect(Rank[2].compareTo(Rank[6])).toBeLessThan(0);
      expect(Rank[2].compareTo(Rank[7])).toBeLessThan(0);
      expect(Rank[2].compareTo(Rank[8])).toBeLessThan(0);
      expect(Rank[2].compareTo(Rank[9])).toBeLessThan(0);

      expect(Rank[3].compareTo(Rank[4])).toBeLessThan(0);
      expect(Rank[3].compareTo(Rank[5])).toBeLessThan(0);
      expect(Rank[3].compareTo(Rank[6])).toBeLessThan(0);
      expect(Rank[3].compareTo(Rank[7])).toBeLessThan(0);
      expect(Rank[3].compareTo(Rank[8])).toBeLessThan(0);
      expect(Rank[3].compareTo(Rank[9])).toBeLessThan(0);

      expect(Rank[4].compareTo(Rank[5])).toBeLessThan(0);
      expect(Rank[4].compareTo(Rank[6])).toBeLessThan(0);
      expect(Rank[4].compareTo(Rank[7])).toBeLessThan(0);
      expect(Rank[4].compareTo(Rank[8])).toBeLessThan(0);
      expect(Rank[4].compareTo(Rank[9])).toBeLessThan(0);

      expect(Rank[5].compareTo(Rank[6])).toBeLessThan(0);
      expect(Rank[5].compareTo(Rank[7])).toBeLessThan(0);
      expect(Rank[5].compareTo(Rank[8])).toBeLessThan(0);
      expect(Rank[5].compareTo(Rank[9])).toBeLessThan(0);

      expect(Rank[6].compareTo(Rank[7])).toBeLessThan(0);
      expect(Rank[6].compareTo(Rank[8])).toBeLessThan(0);
      expect(Rank[6].compareTo(Rank[9])).toBeLessThan(0);

      expect(Rank[7].compareTo(Rank[8])).toBeLessThan(0);
      expect(Rank[7].compareTo(Rank[9])).toBeLessThan(0);

      expect(Rank[8].compareTo(Rank[9])).toBeLessThan(0);
    });
  });

  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      expect(Rank[1].equals(Rank[1])).toBe(true);
      expect(Rank[2].equals(Rank[2])).toBe(true);
      expect(Rank[3].equals(Rank[3])).toBe(true);
      expect(Rank[4].equals(Rank[4])).toBe(true);
      expect(Rank[5].equals(Rank[5])).toBe(true);
      expect(Rank[6].equals(Rank[6])).toBe(true);
      expect(Rank[7].equals(Rank[7])).toBe(true);
      expect(Rank[8].equals(Rank[8])).toBe(true);
      expect(Rank[9].equals(Rank[9])).toBe(true);
    });

    it('異なる値を与えられた場合、false を返すこと', () => {
      expect(Rank[1].equals(Rank[2])).toBe(false);
      expect(Rank[1].equals(Rank[3])).toBe(false);
      expect(Rank[1].equals(Rank[4])).toBe(false);
      expect(Rank[1].equals(Rank[5])).toBe(false);
      expect(Rank[1].equals(Rank[6])).toBe(false);
      expect(Rank[1].equals(Rank[7])).toBe(false);
      expect(Rank[1].equals(Rank[8])).toBe(false);
      expect(Rank[1].equals(Rank[9])).toBe(false);

      expect(Rank[2].equals(Rank[3])).toBe(false);
      expect(Rank[2].equals(Rank[4])).toBe(false);
      expect(Rank[2].equals(Rank[5])).toBe(false);
      expect(Rank[2].equals(Rank[6])).toBe(false);
      expect(Rank[2].equals(Rank[7])).toBe(false);
      expect(Rank[2].equals(Rank[8])).toBe(false);
      expect(Rank[2].equals(Rank[9])).toBe(false);

      expect(Rank[3].equals(Rank[4])).toBe(false);
      expect(Rank[3].equals(Rank[5])).toBe(false);
      expect(Rank[3].equals(Rank[6])).toBe(false);
      expect(Rank[3].equals(Rank[7])).toBe(false);
      expect(Rank[3].equals(Rank[8])).toBe(false);
      expect(Rank[3].equals(Rank[9])).toBe(false);

      expect(Rank[4].equals(Rank[5])).toBe(false);
      expect(Rank[4].equals(Rank[6])).toBe(false);
      expect(Rank[4].equals(Rank[7])).toBe(false);
      expect(Rank[4].equals(Rank[8])).toBe(false);
      expect(Rank[4].equals(Rank[9])).toBe(false);

      expect(Rank[5].equals(Rank[6])).toBe(false);
      expect(Rank[5].equals(Rank[7])).toBe(false);
      expect(Rank[5].equals(Rank[8])).toBe(false);
      expect(Rank[5].equals(Rank[9])).toBe(false);

      expect(Rank[6].equals(Rank[7])).toBe(false);
      expect(Rank[6].equals(Rank[8])).toBe(false);
      expect(Rank[6].equals(Rank[9])).toBe(false);

      expect(Rank[7].equals(Rank[8])).toBe(false);
      expect(Rank[7].equals(Rank[9])).toBe(false);

      expect(Rank[8].equals(Rank[9])).toBe(false);
    });
  });

  describe('isEdge', () => {
    it('末端の値の場合、true を返すこと', () => {
      expect(Rank[1].isEdge()).toBe(true);
      expect(Rank[9].isEdge()).toBe(true);
    });

    it('末端の値ではない場合、false を返すこと', () => {
      expect(Rank[2].isEdge()).toBe(false);
      expect(Rank[3].isEdge()).toBe(false);
      expect(Rank[4].isEdge()).toBe(false);
      expect(Rank[5].isEdge()).toBe(false);
      expect(Rank[6].isEdge()).toBe(false);
      expect(Rank[7].isEdge()).toBe(false);
      expect(Rank[8].isEdge()).toBe(false);
    });
  });
});

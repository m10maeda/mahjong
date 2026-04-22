import { describe, expect, it } from 'vitest';

import { Rank } from './rank';

describe('Rank', () => {
  describe('equals メソッド', () => {
    it('同じ値の Rank を渡した場合、true を返すこと', () => {
      const sut = Rank[5];
      const target = Rank[5];

      const actual = sut.equals(target);

      expect(actual).toBe(true);
    });

    it('別の値の Rank を渡した場合、false を返すこと', () => {
      const sut = Rank[5];
      const target = Rank[4];

      const actual = sut.equals(target);

      expect(actual).toBe(false);
    });
  });

  describe('compareTo メソッド', () => {
    it('同じ値の Rank を渡した場合、0 を返すこと', () => {
      const sut = Rank[5];
      const target = Rank[5];

      const actual = sut.compareTo(target);

      expect(actual).toBe(0);
    });

    it('自身より大きな値の Rank を渡した場合、-1 以下を返すこと', () => {
      const sut = Rank[5];
      const target = Rank[6];

      const actual = sut.compareTo(target);

      expect(actual).toBeLessThanOrEqual(-1);
    });

    it('自身より小さな値の Rank を渡した場合、1 以上を返すこと', () => {
      const sut = Rank[5];
      const target = Rank[4];

      const actual = sut.compareTo(target);

      expect(actual).toBeGreaterThanOrEqual(1);
    });
  });

  describe('isEdge メソッド', () => {
    describe('末端の値の場合、true を返すこと', () => {
      it('1 の場合、true を返すこと', () => {
        const sut = Rank[1];

        const actual = sut.isEdge();

        expect(actual).toBe(true);
      });

      it('9 の場合、true を返すこと', () => {
        const sut = Rank[9];

        const actual = sut.isEdge();

        expect(actual).toBe(true);
      });
    });

    describe('末端の値ではない場合、false を返すこと', () => {
      it('2 の場合、false を返すこと', () => {
        const sut = Rank[2];

        const actual = sut.isEdge();

        expect(actual).toBe(false);
      });

      it('8 の場合、false を返すこと', () => {
        const sut = Rank[8];

        const actual = sut.isEdge();

        expect(actual).toBe(false);
      });
    });
  });
});

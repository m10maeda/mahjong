import { describe, expect, it } from 'vitest';

import { Point } from './point';

describe('Point', () => {
  describe('有効な値を与えられた場合', () => {
    it('Point として成立すること', () => {
      const result = new Point(1000);

      expect(result.valueOf()).toBe(1000);
    });
  });

  describe('無効な値を与えられた場合', () => {
    it.each([0.1, -1, 10, NaN, Infinity])(
      '%s が与えられた場合、エラーを投げること',
      (value) => {
        expect(() => new Point(value)).toThrow(Error);
      },
    );
  });

  describe('absolute', () => {
    it('自身の絶対値を返すこと', () => {
      expect(new Point(1000).absolute().valueOf()).toBe(1000);
      expect(new Point(-1000).absolute().valueOf()).toBe(1000);
    });

    it('新しい値を返すこと', () => {
      const sut = new Point(1000);

      const result = sut.absolute();

      expect(result).not.toBe(sut);
    });

    it('元の値は変化しないこと', () => {
      const sut = new Point(-1000);

      sut.absolute();

      expect(sut.valueOf()).toBe(-1000);
    });
  });

  describe('add', () => {
    it('与えられた値と自身の値を加算した新しい値を返すこと', () => {
      const sut = new Point(1000);
      const delta = new Point(100);

      const result = sut.add(delta);

      expect(result.valueOf()).toBe(1100);

      expect(result).not.toBe(sut);
    });

    it('元の値は変化しないこと', () => {
      const sut = new Point(1000);
      const delta = new Point(100);

      sut.add(delta);

      expect(sut.valueOf()).toBe(1000);
      expect(delta.valueOf()).toBe(100);
    });
  });

  describe('compareTo', () => {
    it('自身と同じ値を与えられた場合、0 を返すこと', () => {
      const sut = new Point(100);
      const target = new Point(100);

      expect(sut.compareTo(target)).toBe(0);
    });

    it('自身より小さい値を与えられた場合、正の数値を返すこと', () => {
      const sut = new Point(200);
      const target = new Point(100);

      expect(sut.compareTo(target)).toBeGreaterThan(0);
    });

    it('自身より大きい値を与えられた場合、負の数値を返すこと', () => {
      const sut = new Point(100);
      const target = new Point(200);

      expect(sut.compareTo(target)).lessThan(0);
    });
  });

  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      const sut = new Point(100);
      const target = new Point(100);

      expect(sut.equals(target)).toBe(true);
    });

    it('異なる値を与えられた場合、false を返すこと', () => {
      const sut = new Point(100);
      const target = new Point(200);

      expect(sut.equals(target)).toBe(false);
    });
  });

  describe('negate', () => {
    it('負の絶対値の新しい値を返すこと', () => {
      expect(new Point(1000).negate().valueOf()).toBe(-1000);
      expect(new Point(-1000).negate().valueOf()).toBe(-1000);
    });

    it('元のオブジェクトは変化しないこと', () => {
      const sut = new Point(1000);

      sut.negate();

      expect(sut.valueOf()).toBe(1000);
    });
  });
});

import { describe, expect, it } from 'vitest';

import { Around } from './around';

describe('Around', () => {
  describe('有効な値を与えられた場合', () => {
    it('Turn として成立すること', () => {
      const result = new Around(1);

      expect(result.valueOf()).toBe(1);
    });
  });

  describe('無効な値を与えられた場合', () => {
    it.each([1.1, 0, NaN, Infinity])(
      '%s が与えられた場合、エラーを投げること',
      (value) => {
        expect(() => new Around(value)).toThrow(Error);
      },
    );
  });

  describe('advance', () => {
    it('自身の値に1を加えた新しい値を返すこと', () => {
      const sut = new Around(1);

      const result = sut.advance();

      expect(result.valueOf()).toBe(2);

      expect(result).not.toBe(sut);
    });

    it('自身の値を変更しないこと', () => {
      const sut = new Around(1);

      sut.advance();

      expect(sut.valueOf()).toBe(1);
    });
  });

  describe('compareTo', () => {
    it('自身と同じ値を与えられた場合、0 を返すこと', () => {
      const sut = new Around(1);
      const target = new Around(1);

      expect(sut.compareTo(target)).toBe(0);
    });

    it('自身より小さい値を与えられた場合、正の数値を返すこと', () => {
      const sut = new Around(2);
      const target = new Around(1);

      expect(sut.compareTo(target)).toBeGreaterThan(0);
    });

    it('自身より大きい値を与えられた場合、負の数値を返すこと', () => {
      const sut = new Around(1);
      const target = new Around(2);

      expect(sut.compareTo(target)).toBeLessThan(0);
    });
  });

  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      const sut = new Around(1);
      const target = new Around(1);

      expect(sut.equals(target)).toBe(true);
    });

    it('異なる値を与えられた場合、false を返すこと', () => {
      const sut = new Around(1);
      const target = new Around(2);

      expect(sut.equals(target)).toBe(false);
    });
  });
});

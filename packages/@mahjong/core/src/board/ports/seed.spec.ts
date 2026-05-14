import { describe, expect, it } from 'vitest';

import { Seed } from './seed';

describe('Seed', () => {
  describe('有効な値を与えられた場合', () => {
    it('Seed として成立すること', () => {
      const result = new Seed(1);

      expect(result.valueOf()).toBe(1);
    });
  });

  describe('無効な値を与えられた場合', () => {
    it.each([0.1, -1, NaN, Infinity])(
      '%s が与えられた場合、エラーを投げること',
      (value) => {
        expect(() => new Seed(value)).toThrow(Error);
      },
    );
  });

  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      const sut = new Seed(1);
      const target = new Seed(1);

      expect(sut.equals(target)).toBe(true);
    });

    it('異なる値を与えられた場合、false を返すこと', () => {
      const sut = new Seed(1);
      const target = new Seed(2);

      expect(sut.equals(target)).toBe(false);
    });
  });

  describe('toString', () => {
    it('文字列表現を返すこと', () => {
      const sut = new Seed(1);

      expect(sut.toString()).toBe('1');
    });
  });

  describe('valueOf', () => {
    it('数値表現を返すこと', () => {
      const sut = new Seed(1);

      expect(sut.valueOf()).toBe(1);
    });
  });
});

import { describe, expect, it } from 'vitest';

import { MeldReference } from './meld-reference';

describe('MeldReference', () => {
  describe('有効な値を与えられた場合', () => {
    it('MeldReference として成立すること', () => {
      const result = new MeldReference(1);

      expect(result.valueOf()).toBe(1);
    });
  });

  describe('無効な値を与えられた場合', () => {
    it.each([0.1, -1, NaN, Infinity])(
      '%s が与えられた場合、エラーを投げること',
      (value) => {
        expect(() => new MeldReference(value)).toThrow(Error);
      },
    );
  });

  describe('compareTo', () => {
    it('自身と同じ値を与えられた場合、0 を返すこと', () => {
      const sut = new MeldReference(1);
      const target = new MeldReference(1);

      expect(sut.compareTo(target)).toBe(0);
    });

    it('自身より小さい値を与えられた場合、正の数値を返すこと', () => {
      const sut = new MeldReference(2);
      const target = new MeldReference(1);

      expect(sut.compareTo(target)).toBeGreaterThan(0);
    });

    it('自身より大きい値を与えられた場合、負の数値を返すこと', () => {
      const sut = new MeldReference(1);
      const target = new MeldReference(2);

      expect(sut.compareTo(target)).lessThan(0);
    });
  });

  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      const sut = new MeldReference(1);
      const target = new MeldReference(1);

      expect(sut.equals(target)).toBe(true);
    });

    it('異なる値を与えられた場合、false を返すこと', () => {
      const sut = new MeldReference(1);
      const target = new MeldReference(2);

      expect(sut.equals(target)).toBe(false);
    });
  });
});

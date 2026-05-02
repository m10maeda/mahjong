import { describe, expect, it } from 'vitest';

import { Honba } from './honba';

describe('Honba', () => {
  describe('有効な値を与えられた場合', () => {
    it('Honba として成立すること', () => {
      const result = new Honba(1);

      expect(result.valueOf()).toBe(1);
    });
  });

  describe('無効な値を与えられた場合', () => {
    it.each([0.1, -1, NaN, Infinity])(
      '%s が与えられた場合、エラーを投げること',
      (value) => {
        expect(() => new Honba(value)).toThrow(Error);
      },
    );
  });

  describe('advance', () => {
    it('自身の値に 1 加算された新しい Honba を返すこと', () => {
      const sut = new Honba(0);

      const result = sut.advance();

      expect(result.valueOf()).toBe(1);

      expect(result).not.toBe(sut);
    });

    it('元の値は変化しないこと', () => {
      const sut = new Honba(0);

      sut.advance();

      expect(sut.valueOf()).toBe(0);
    });
  });

  describe('compareTo', () => {
    it('自身と同じ値を与えられた場合、0 を返すこと', () => {
      const sut = new Honba(1);
      const target = new Honba(1);

      expect(sut.compareTo(target)).toBe(0);
    });

    it('自身より小さい値を与えられた場合、正の数値を返すこと', () => {
      const sut = new Honba(1);
      const target = new Honba(0);

      expect(sut.compareTo(target)).toBeGreaterThan(0);
    });

    it('自身より大きい値を与えられた場合、負の数値を返すこと', () => {
      const sut = new Honba(0);
      const target = new Honba(1);

      expect(sut.compareTo(target)).lessThan(0);
    });
  });

  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      const sut = new Honba(1);
      const target = new Honba(1);

      expect(sut.equals(target)).toBe(true);
    });

    it('異なる値を与えられた場合、false を返すこと', () => {
      const sut = new Honba(0);
      const target = new Honba(1);

      expect(sut.equals(target)).toBe(false);
    });
  });

  describe('reset', () => {
    it('初期値の新しい Honba を返すこと', () => {
      const sut = new Honba(1);

      const result = sut.reset();

      expect(result.valueOf()).toBe(0);

      expect(result).not.toBe(sut);
    });

    it('元の値は変化しないこと', () => {
      const sut = new Honba(1);

      sut.reset();

      expect(sut.valueOf()).toBe(1);
    });
  });
});

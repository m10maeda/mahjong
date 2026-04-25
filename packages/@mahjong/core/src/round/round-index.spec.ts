import { describe, expect, it } from 'vitest';

import { RoundIndex } from './round-index';

describe('RoundIndex', () => {
  describe('不正な値で生成できないこと', () => {
    it('小数で生成しようとした場合、エラーを投げること', () => {
      expect(() => {
        new RoundIndex(0.1);
      }).toThrow(Error);
    });

    it('1 未満の値で生成しようとした場合、エラーを投げること', () => {
      expect(() => {
        new RoundIndex(-1);
      }).toThrow(Error);
    });

    it('4 より大きい値で生成しようとした場合、エラーを投げること', () => {
      expect(() => {
        new RoundIndex(5);
      }).toThrow(Error);
    });
  });

  describe('compareTo メソッド', () => {
    it('同じ値を持つ RoundIndex を渡した場合、0 を返すこと', () => {
      const sut = new RoundIndex(1);
      const target = new RoundIndex(1);

      const actual = sut.compareTo(target);

      expect(actual).toBe(0);
    });

    it('自身より小さい値を持つ RoundIndex を渡した場合、1 以上を返すこと', () => {
      const sut = new RoundIndex(2);
      const target = new RoundIndex(1);

      const actual = sut.compareTo(target);

      expect(actual).toBeGreaterThanOrEqual(1);
    });

    it('自身より大きい値を持つ RoundIndex を渡した場合、-1 以下を返すこと', () => {
      const sut = new RoundIndex(1);
      const target = new RoundIndex(2);

      const actual = sut.compareTo(target);

      expect(actual).lessThanOrEqual(-1);
    });
  });

  describe('equals メソッド', () => {
    it('同じ値を持つ RoundIndex を渡した場合、true を返すこと', () => {
      const sut = new RoundIndex(1);
      const target = new RoundIndex(1);

      const actual = sut.equals(target);

      expect(actual).toBe(true);
    });

    it('別の値を持つ RoundIndex を渡した場合、false を返すこと', () => {
      const sut = new RoundIndex(1);
      const target = new RoundIndex(2);

      const actual = sut.equals(target);

      expect(actual).toBe(false);
    });
  });

  describe('reset メソッド', () => {
    it('1 の値を持つ RoundIndex を返すこと', () => {
      const sut = new RoundIndex(2);

      const actual = sut.reset();

      expect(actual.valueOf()).toBe(1);
    });

    it('元のオブジェクトは変化しないこと', () => {
      const sut = new RoundIndex(1);

      sut.reset();

      expect(sut.valueOf()).toBe(1);
    });
  });
});

import { describe, expect, it } from 'vitest';

import { Honba } from './honba';

describe('Honba', () => {
  describe('不正な値で生成できないこと', () => {
    it('小数で生成しようとした場合、エラーを投げること', () => {
      expect(() => {
        new Honba(0.1);
      }).toThrow(Error);
    });

    it('0 未満の値で生成しようとした場合、エラーを投げること', () => {
      expect(() => {
        new Honba(-1);
      }).toThrow(Error);
    });
  });

  describe('compareTo メソッド', () => {
    it('同じ値を持つ Honba を渡した場合、0 を返すこと', () => {
      const sut = new Honba(1);
      const target = new Honba(1);

      const actual = sut.compareTo(target);

      expect(actual).toBe(0);
    });

    it('自身より小さい値を持つ Honba を渡した場合、1 以上を返すこと', () => {
      const sut = new Honba(1);
      const target = new Honba(0);

      const actual = sut.compareTo(target);

      expect(actual).toBeGreaterThanOrEqual(1);
    });

    it('自身より大きい値を持つ Honba を渡した場合、-1 以下を返すこと', () => {
      const sut = new Honba(0);
      const target = new Honba(1);

      const actual = sut.compareTo(target);

      expect(actual).lessThanOrEqual(-1);
    });
  });

  describe('equals メソッド', () => {
    it('同じ値を持つ Honba を渡した場合、true を返すこと', () => {
      const sut = new Honba(1);
      const target = new Honba(1);

      const actual = sut.equals(target);

      expect(actual).toBe(true);
    });

    it('別の値を持つ Honba を渡した場合、false を返すこと', () => {
      const sut = new Honba(0);
      const target = new Honba(1);

      const actual = sut.equals(target);

      expect(actual).toBe(false);
    });
  });

  describe('reset メソッド', () => {
    it('0 の値を持つ Honba を返すこと', () => {
      const sut = new Honba(1);

      const actual = sut.reset();

      expect(actual.valueOf()).toBe(0);
    });

    it('元のオブジェクトは変化しないこと', () => {
      const sut = new Honba(1);

      sut.reset();

      expect(sut.valueOf()).toBe(1);
    });
  });

  describe('increase メソッド', () => {
    it('自身の値に 1 加算された値を持つ Honba を返すこと', () => {
      const sut = new Honba(0);

      const actual = sut.increase();

      expect(actual.valueOf()).toBe(1);
    });

    it('元のオブジェクトは変化しないこと', () => {
      const sut = new Honba(0);

      sut.increase();

      expect(sut.valueOf()).toBe(0);
    });
  });
});

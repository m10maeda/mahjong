import { describe, expect, it } from 'vitest';

import { Point } from './point';

describe('Point', () => {
  describe('不正な値で生成できないこと', () => {
    it('小数で生成しようとした場合、エラーを投げること', () => {
      expect(() => {
        new Point(0.1);
      }).toThrow(Error);
    });

    it('10の単位が0以外の値で生成しようとした場合、エラーを投げること', () => {
      expect(() => {
        new Point(10);
      }).toThrow(Error);
    });
  });

  describe('absolute メソッド', () => {
    describe('保持している値の絶対値を持つ Point を返すこと', () => {
      it('1000 の値を持つ場合、1000 の値を持つ Point を返すこと', () => {
        const sut = new Point(1000);

        const actual = sut.absolute();

        expect(actual.valueOf()).toBe(1000);
      });

      it('-1000 の値を持つ場合、1000 の値を持つ Point を返すこと', () => {
        const sut = new Point(-1000);

        const actual = sut.absolute();

        expect(actual.valueOf()).toBe(1000);
      });
    });

    it('元のオブジェクトは変化しないこと', () => {
      const sut = new Point(-1000);

      sut.absolute();

      expect(sut.valueOf()).toBe(-1000);
    });
  });

  describe('add メソッド', () => {
    it('自身の持つ値と渡された値を合算した値を持つ Point を返すこと', () => {
      const a = new Point(1000);
      const b = new Point(100);

      const actual = a.add(b);

      expect(actual.valueOf()).toBe(1100);
    });

    it('元のオブジェクトは変化しないこと', () => {
      const a = new Point(1000);
      const b = new Point(100);

      a.add(b);

      expect(a.valueOf()).toBe(1000);
      expect(b.valueOf()).toBe(100);
    });
  });

  describe('compareTo メソッド', () => {
    it('同じ値を持つ Point を渡した場合、0 を返すこと', () => {
      const sut = new Point(100);
      const target = new Point(100);

      const actual = sut.compareTo(target);

      expect(actual).toBe(0);
    });

    it('自身より小さい値を持つ Point を渡した場合、1 以上を返すこと', () => {
      const sut = new Point(200);
      const target = new Point(100);

      const actual = sut.compareTo(target);

      expect(actual).toBeGreaterThanOrEqual(1);
    });

    it('自身より大きい値を持つ Point を渡した場合、-1 以下を返すこと', () => {
      const sut = new Point(100);
      const target = new Point(200);

      const actual = sut.compareTo(target);

      expect(actual).lessThanOrEqual(-1);
    });
  });

  describe('equals メソッド', () => {
    it('同じ値を持つ Point を渡した場合、true を返すこと', () => {
      const sut = new Point(100);
      const target = new Point(100);

      const actual = sut.equals(target);

      expect(actual).toBe(true);
    });

    it('別の値を持つ Point を渡した場合、false を返すこと', () => {
      const sut = new Point(100);
      const target = new Point(200);

      const actual = sut.equals(target);

      expect(actual).toBe(false);
    });
  });

  describe('negate メソッド', () => {
    describe('保持している値のマイナスの値を持つ Point を返すこと', () => {
      it('1000 の値を持つ場合、-1000 の値を持つ Point を返すこと', () => {
        const sut = new Point(1000);

        const actual = sut.negate();

        expect(actual.valueOf()).toBe(-1000);
      });

      it('-1000 の値を持つ場合、-1000 の値を持つ Point を返すこと', () => {
        const sut = new Point(-1000);

        const actual = sut.negate();

        expect(actual.valueOf()).toBe(-1000);
      });
    });

    it('元のオブジェクトは変化しないこと', () => {
      const sut = new Point(1000);

      sut.negate();

      expect(sut.valueOf()).toBe(1000);
    });
  });
});

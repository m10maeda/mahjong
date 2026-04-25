import { describe, expect, it } from 'vitest';

import { SeatPosition } from './seat-position';

describe('SeatPosition', () => {
  describe('compareTo メソッド', () => {
    it('同じ値を持つ SeatPosition を渡した場合、0 を返すこと', () => {
      const sut = SeatPosition.East;
      const target = SeatPosition.East;

      const actual = sut.compareTo(target);

      expect(actual).toBe(0);
    });

    it('自身より前の値を持つ SeatPosition を渡した場合、1 以上を返すこと', () => {
      const sut = SeatPosition.South;
      const target = SeatPosition.East;

      const actual = sut.compareTo(target);

      expect(actual).toBeGreaterThanOrEqual(1);
    });

    it('自身より後の値を持つ SeatPosition を渡した場合、-1 以下を返すこと', () => {
      const sut = SeatPosition.East;
      const target = SeatPosition.South;

      const actual = sut.compareTo(target);

      expect(actual).lessThanOrEqual(-1);
    });
  });

  describe('equals メソッド', () => {
    it('同じ値を持つ SeatPosition を渡した場合、true を返すこと', () => {
      const sut = SeatPosition.East;
      const target = SeatPosition.East;

      const actual = sut.equals(target);

      expect(actual).toBe(true);
    });

    it('別の値を持つ SeatPosition を渡した場合、false を返すこと', () => {
      const sut = SeatPosition.East;
      const target = SeatPosition.South;

      const actual = sut.equals(target);

      expect(actual).toBe(false);
    });
  });

  describe('[Symbol.toPrimitive] メソッド', () => {
    describe('hint 未指定の場合', () => {
      it('East の場合、0 を返すこと', () => {
        const sut = SeatPosition.East;

        const actual = sut[Symbol.toPrimitive]();

        expect(actual).toBe(0);
      });

      it('South の場合、1 を返すこと', () => {
        const sut = SeatPosition.South;

        const actual = sut[Symbol.toPrimitive]();

        expect(actual).toBe(1);
      });

      it('West の場合、2 を返すこと', () => {
        const sut = SeatPosition.West;

        const actual = sut[Symbol.toPrimitive]();

        expect(actual).toBe(2);
      });

      it('North の場合、3 を返すこと', () => {
        const sut = SeatPosition.North;

        const actual = sut[Symbol.toPrimitive]();

        expect(actual).toBe(3);
      });
    });

    describe('hint が "string" の場合', () => {
      it('East の場合、"East" を返すこと', () => {
        const sut = SeatPosition.East;

        const actual = sut[Symbol.toPrimitive]('string');

        expect(actual).toBe('East');
      });

      it('South の場合、"South" を返すこと', () => {
        const sut = SeatPosition.South;

        const actual = sut[Symbol.toPrimitive]('string');

        expect(actual).toBe('South');
      });

      it('West の場合、"West" を返すこと', () => {
        const sut = SeatPosition.West;

        const actual = sut[Symbol.toPrimitive]('string');

        expect(actual).toBe('West');
      });

      it('North の場合、"North" を返すこと', () => {
        const sut = SeatPosition.North;

        const actual = sut[Symbol.toPrimitive]('string');

        expect(actual).toBe('North');
      });
    });
  });

  describe('valueOf メソッド', () => {
    it('East の場合、0 を返すこと', () => {
      const sut = SeatPosition.East;

      const actual = sut.valueOf();

      expect(actual).toBe(0);
    });

    it('South の場合、1 を返すこと', () => {
      const sut = SeatPosition.South;

      const actual = sut.valueOf();

      expect(actual).toBe(1);
    });

    it('West の場合、2 を返すこと', () => {
      const sut = SeatPosition.West;

      const actual = sut.valueOf();

      expect(actual).toBe(2);
    });

    it('North の場合、3 を返すこと', () => {
      const sut = SeatPosition.North;

      const actual = sut.valueOf();

      expect(actual).toBe(3);
    });
  });
});

import { describe, expect, it } from 'vitest';

import { TilePosition } from './tile-position';

describe('TilePosition', () => {
  describe('有効な値を与えられた場合', () => {
    it('TilePosition として成立すること', () => {
      const result = new TilePosition(1);

      expect(result.valueOf()).toBe(1);
    });
  });

  describe('無効な値を与えられた場合', () => {
    it.each([0.1, -1, NaN, Infinity])(
      '%s が与えられた場合、エラーを投げること',
      (value) => {
        expect(() => new TilePosition(value)).toThrow(Error);
      },
    );
  });

  describe('advance', () => {
    it('自身の値から与えられた値まで進んだ新しい値を返すこと', () => {
      const sut = new TilePosition(2);

      const result = sut.advance(3);

      expect(result.valueOf()).toBe(5);

      expect(result).not.toBe(sut);
    });

    it('自身の値を変更しないこと', () => {
      const sut = new TilePosition(2);

      sut.previous();

      expect(sut.valueOf()).toBe(2);
    });
  });

  describe('compareTo', () => {
    it('同じ値を持つ TilePosition を与えられた場合、0 を返すこと', () => {
      const sut = new TilePosition(1);
      const target = new TilePosition(1);

      const result = sut.compareTo(target);

      expect(result).toBe(0);
    });

    it('自身より小さい値を持つ TilePosition を与えられた場合、1 以上を返すこと', () => {
      const sut = new TilePosition(2);
      const target = new TilePosition(1);

      const result = sut.compareTo(target);

      expect(result).toBeGreaterThan(0);
    });

    it('自身より大きい値を持つ TilePosition を与えられた場合、-1 以下を返すこと', () => {
      const sut = new TilePosition(1);
      const target = new TilePosition(2);

      const result = sut.compareTo(target);

      expect(result).toBeLessThan(0);
    });
  });

  describe('equals', () => {
    it('同じ値を持つ TilePosition を与えられた場合、true を返すこと', () => {
      const sut = new TilePosition(1);
      const target = new TilePosition(1);

      const result = sut.equals(target);

      expect(result).toBe(true);
    });

    it('異なる値を持つ TilePosition を与えられた場合、false を返すこと', () => {
      const sut = new TilePosition(1);
      const target = new TilePosition(2);

      const result = sut.equals(target);

      expect(result).toBe(false);
    });
  });

  describe('distanceTo', () => {
    it('自身と同じ値を持つ TilePosition を与えられた場合、0 を返すこと', () => {
      const sut = new TilePosition(1);
      const target = new TilePosition(1);

      const result = sut.distanceTo(target);

      expect(result).toBe(0);
    });

    describe('自身とは異なる値を持つ TilePosition を与えられた場合', () => {
      it('自身との値の差が正の場合、正の値を返すこと', () => {
        const sut = new TilePosition(3);
        const target = new TilePosition(1);

        const result = sut.distanceTo(target);

        expect(result).toBe(2);
      });

      it('自身との値の差が負の場合、正の値を返すこと', () => {
        const sut = new TilePosition(1);
        const target = new TilePosition(3);

        const result = sut.distanceTo(target);

        expect(result).toBe(2);
      });

      it('自身との差の絶対値を返すこと', () => {
        const sut = new TilePosition(1);
        const target = new TilePosition(4);

        const result = sut.distanceTo(target);

        expect(result).toBe(3);
      });
    });
  });

  describe('isMin', () => {
    it('値が0の TilePosition である場合、true を返すこと', () => {
      const sut = new TilePosition(0);

      const result = sut.isMin();

      expect(result).toBe(true);
    });

    it('値が0でない TilePosition である場合、false を返すこと', () => {
      const sut = new TilePosition(1);

      const result = sut.isMin();

      expect(result).toBe(false);
    });
  });

  describe('next', () => {
    it('自身の値の次の新しい値を返すこと', () => {
      const sut = new TilePosition(1);

      const result = sut.next();

      expect(result.valueOf()).toBe(2);

      expect(result).not.toBe(sut);
    });

    it('自身の値を変更しないこと', () => {
      const sut = new TilePosition(1);

      sut.next();

      expect(sut.valueOf()).toBe(1);
    });
  });

  describe('previous', () => {
    it('自身の値の前の新しい値を返すこと', () => {
      const sut = new TilePosition(2);

      const result = sut.previous();

      expect(result.valueOf()).toBe(1);

      expect(result).not.toBe(sut);
    });

    it('自身の値を変更しないこと', () => {
      const sut = new TilePosition(2);

      sut.previous();

      expect(sut.valueOf()).toBe(2);
    });
  });
});

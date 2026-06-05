import { describe, expect, it } from 'vitest';

import { HonorType } from './honor-type';
import { SuitType } from './suit-type';

describe('HonorType', () => {
  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      const sut = HonorType.East;
      const target = HonorType.East;

      expect(sut.equals(target)).toBe(true);
    });

    describe('異なる値を与えられた場合', () => {
      it('SuitTile を与えられた場合、false を返すこと', () => {
        const sut = SuitType.Character5;
        const target = HonorType.South;

        expect(sut.equals(target)).toBe(false);
      });

      it('honor が異なる HonorTile を与えられた場合、false を返すこと', () => {
        const sut = HonorType.East;
        const target = HonorType.South;

        expect(sut.equals(target)).toBe(false);
      });
    });
  });
});

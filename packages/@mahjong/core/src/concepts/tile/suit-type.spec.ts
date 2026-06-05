import { describe, expect, it } from 'vitest';

import { HonorType } from './honor-type';
import { SuitType } from './suit-type';

describe('SuitType', () => {
  describe('equals', () => {
    it('同じ値を与えられた場合、true を返すこと', () => {
      const sut = SuitType.Character5;
      const target = SuitType.Character5;

      expect(sut.equals(target)).toBe(true);
    });

    describe('異なる値を与えられた場合', () => {
      it('HonorTile を与えられた場合、false を返すこと', () => {
        const sut = SuitType.Character5;
        const target = HonorType.South;

        expect(sut.equals(target)).toBe(false);
      });

      describe('異なる SuitTile を与えられた場合、false を返すこと', () => {
        it('suit が異なる SuitTile を与えられた場合、false を返すこと', () => {
          const sut = SuitType.Character5;
          const target = SuitType.Circle5;

          expect(sut.equals(target)).toBe(false);
        });

        it('rank が異なる SuitTile を与えられた場合、false を返すこと', () => {
          const sut = SuitType.Character5;
          const target = SuitType.Character4;

          expect(sut.equals(target)).toBe(false);
        });
      });
    });
  });

  describe('isTerminal', () => {
    it('末端の値の場合、true を返すこと', () => {
      expect(SuitType.Character1.isTerminal()).toBe(true);
      expect(SuitType.Character9.isTerminal()).toBe(true);
      expect(SuitType.Circle1.isTerminal()).toBe(true);
      expect(SuitType.Circle9.isTerminal()).toBe(true);
      expect(SuitType.Bamboo1.isTerminal()).toBe(true);
      expect(SuitType.Bamboo9.isTerminal()).toBe(true);
    });

    it('末端の値ではない場合、false を返すこと', () => {
      expect(SuitType.Character2.isTerminal()).toBe(false);
      expect(SuitType.Circle2.isTerminal()).toBe(false);
      expect(SuitType.Bamboo2.isTerminal()).toBe(false);

      expect(SuitType.Character8.isTerminal()).toBe(false);
      expect(SuitType.Circle8.isTerminal()).toBe(false);
      expect(SuitType.Bamboo8.isTerminal()).toBe(false);
    });
  });

  describe('suits', () => {
    it('同じ Suit の SuitTile を与えられた場合、true を返すこと', () => {
      const sut = SuitType.Character5;
      const target = SuitType.Character6;

      expect(sut.suits(target)).toBe(true);
    });

    it('異なる Suit の値を持つ SuitTile を与えられた場合、true を返すこと', () => {
      const sut = SuitType.Character5;
      const target = SuitType.Circle5;

      expect(sut.suits(target)).toBe(false);
    });
  });
});

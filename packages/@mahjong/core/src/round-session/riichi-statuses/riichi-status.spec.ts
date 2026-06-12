import { describe, expect, it } from 'vitest';

import { RiichiStatus } from './riichi-status';

describe('RiichiStatus', () => {
  describe('declare', () => {
    it('未宣言の場合、成立待ち状態の新しい状態を返すこと', () => {
      const sut = RiichiStatus.new();

      const result = sut.declare(false);

      expect(result.isPending()).toBe(true);
      expect(result).not.toBe(sut);
    });

    it('宣言済みの場合、エラーを投げること', () => {
      const sut = RiichiStatus.new().declare(false);

      expect(() => {
        sut.declare(false);
      }).toThrow(Error);
    });
  });

  describe('establish', () => {
    it('宣言済みの場合、成立状態の新しい状態を返すこと', () => {
      const sut = RiichiStatus.new().declare(false);

      const result = sut.establish();

      expect(result.isEstablished()).toBe(true);
      expect(result).not.toBe(sut);
    });

    it('未宣言の場合、エラーを投げること', () => {
      const sut = RiichiStatus.new();

      expect(() => {
        sut.establish();
      }).toThrow(Error);
    });
  });

  describe('disableOneShotEligible', () => {
    it('成立状態の場合、非一発条件の状態の新しい状態を返すこと', () => {
      const sut = RiichiStatus.new().declare(false).establish();

      expect(sut.isOneShotEligible()).toBe(true);

      const result = sut.disableOneShotEligible();

      expect(result.isOneShotEligible()).toBe(false);
    });

    it('未成立状態の場合、状態をそのまま返すこと', () => {
      const sut = RiichiStatus.new().declare(false);

      expect(sut.isOneShotEligible()).toBe(true);

      const result = sut.disableOneShotEligible();

      expect(result.isOneShotEligible()).toBe(true);
    });
  });

  describe('isFirstAroundRiichi', () => {
    it('1巡目で宣言した場合、true を返すこと', () => {
      const sut = RiichiStatus.new().declare(true);

      expect(sut.isFirstAroundRiichi()).toBe(true);
    });

    it('1巡目以外で宣言した場合、true を返すこと', () => {
      const sut = RiichiStatus.new().declare(false);

      expect(sut.isFirstAroundRiichi()).toBe(false);
    });
  });
});

import { describe, expect, it } from 'vitest';

import { RiichiStatuses } from './riichi-statuses';
import { SeatPosition } from '../../table';

describe('RiichiStatuses', () => {
  describe('declare', () => {
    it('与えられた座席の立直状況を宣言済みにした新しい状況を返すこと', () => {
      const sut = RiichiStatuses.new([
        SeatPosition.East,
        SeatPosition.South,
        SeatPosition.West,
        SeatPosition.North,
      ]);
      const target = SeatPosition.East;

      expect(sut.get(target)?.isPending()).toBe(false);

      const result = sut.declare(target, false);

      expect(result.get(target)?.isPending()).toBe(true);
    });
  });

  describe('establish', () => {
    it('与えられた座席の立直状況を成立済みにした新しい状況を返すこと', () => {
      const target = SeatPosition.East;
      const sut = RiichiStatuses.new([
        SeatPosition.East,
        SeatPosition.South,
        SeatPosition.West,
        SeatPosition.North,
      ]).declare(target, false);

      expect(sut.get(target)?.isEstablished()).toBe(false);

      const [, result] = sut.establish();

      expect(result.get(target)?.isEstablished()).toBe(true);
    });
  });

  describe('disableOneShotEligible', () => {
    it('成立状態の立直状況を非一発条件にした新しい状態を返すこと', () => {
      const target = SeatPosition.East;
      const [, sut] = RiichiStatuses.new([
        SeatPosition.East,
        SeatPosition.South,
        SeatPosition.West,
        SeatPosition.North,
      ])
        .declare(target, false)
        .establish();

      expect(sut.get(target)?.isOneShotEligible()).toBe(true);

      const result = sut.disableOneShotEligible();

      expect(result.get(target)?.isOneShotEligible()).toBe(false);
    });
  });
});

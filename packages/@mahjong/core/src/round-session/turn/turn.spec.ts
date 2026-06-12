import { describe, expect, it } from 'vitest';

import { Around } from './around';
import { Turn } from './turn';
import { SeatPosition } from '../../table';

describe('Turn', () => {
  describe('isFirstAround', () => {
    it('1巡目の場合、true を返すこと', () => {
      const sut = new Turn(Around.First, SeatPosition.East, [
        SeatPosition.East,
        SeatPosition.South,
        SeatPosition.West,
        SeatPosition.North,
      ]);

      expect(sut.isFirstAround()).toBe(true);
    });

    it('1巡目ではない場合、false を返すこと', () => {
      const sut = new Turn(new Around(2), SeatPosition.East, [
        SeatPosition.East,
        SeatPosition.South,
        SeatPosition.West,
        SeatPosition.North,
      ]);

      expect(sut.isFirstAround()).toBe(false);
    });
  });

  describe('next', () => {
    it('現在の座席が最後の座席ではない場合、巡目は変えずに現在の座席を次の座席にした新しい番手を返すこと', () => {
      const sut = new Turn(Around.First, SeatPosition.East, [
        SeatPosition.East,
        SeatPosition.South,
        SeatPosition.West,
        SeatPosition.North,
      ]);

      const result = sut.next();

      expect(result.around.equals(sut.around)).toBe(true);
      expect(result.activeSeat.equals(SeatPosition.South)).toBe(true);
      expect(result).not.toBe(sut);
    });

    it('現在の座席が最後の座席の場合、巡目を繰り上げ現在の座席を最初の座席にした新しい番手を返すこと', () => {
      const sut = new Turn(Around.First, SeatPosition.North, [
        SeatPosition.East,
        SeatPosition.South,
        SeatPosition.West,
        SeatPosition.North,
      ]);

      const result = sut.next();

      expect(result.around.equals(new Around(2))).toBe(true);
      expect(result.activeSeat.equals(SeatPosition.East)).toBe(true);
      expect(result).not.toBe(sut);
    });
  });

  describe('of', () => {
    const sut = new Turn(Around.First, SeatPosition.East, [
      SeatPosition.East,
      SeatPosition.South,
      SeatPosition.West,
      SeatPosition.North,
    ]);

    it('与えられた座席が現在の座席の場合、true を返すこと', () => {
      expect(sut.of(SeatPosition.East)).toBe(true);
    });

    it('与えられた座席が現在の座席ではない場合、false を返すこと', () => {
      expect(sut.of(SeatPosition.South)).toBe(false);
    });
  });

  describe('skipTo', () => {
    it('与えられた座席を現在の座席にし、巡目を繰り上げた新しい番目を返すこと', () => {
      const sut = new Turn(Around.First, SeatPosition.East, [
        SeatPosition.East,
        SeatPosition.South,
        SeatPosition.West,
        SeatPosition.North,
      ]);

      const result = sut.skipTo(SeatPosition.South);

      expect(result.activeSeat.equals(SeatPosition.South)).toBe(true);
      expect(result.around.equals(new Around(2))).toBe(true);
      expect(result).not.toBe(sut);
    });
  });
});

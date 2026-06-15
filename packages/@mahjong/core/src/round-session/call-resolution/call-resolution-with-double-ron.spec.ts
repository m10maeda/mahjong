import { describe, expect, it, vi } from 'vitest';

import { CallAction, CallActionCandidate } from './call-action';
import { CallActions } from './call-actions';
import { CallResolutionType } from './call-resolution-context';
import { CallResolutionWithDoubleRon } from './call-resolution-with-double-ron';
import { SeatPosition } from '../../table';
import { OpenKanCall, RonCall } from '../commands';
import { FourPlayersCallCandidatesFinder } from './call-candidates-finder';
import { SuitType, Tile, TileModifier } from '../../tile';

import type { RonCallResolutionResult } from './call-resolution-result';

describe('CallResolutionWithDoubleRon', () => {
  describe('receive', () => {
    describe('ロン可能な座席が複数の場合', () => {
      const allAction = new CallAction([
        CallActionCandidate.Pass,
        CallActionCandidate.Ron,
        CallActionCandidate.Kan,
        CallActionCandidate.Pon,
        CallActionCandidate.Chii,
      ]);

      const sut = new CallResolutionWithDoubleRon(
        new FourPlayersCallCandidatesFinder(
          { has: vi.fn(() => true), findAll: vi.fn() },
          { has: vi.fn(() => true), findAll: vi.fn() },
          { has: vi.fn(() => true), findAll: vi.fn() },
          { resolve: vi.fn() },
          { resolve: vi.fn() },
        ),
        new CallActions(
          new Map([
            [SeatPosition.South, allAction],
            [SeatPosition.West, allAction],
            [SeatPosition.North, allAction],
          ]),
        ),
        CallResolutionType.Discard,
        SeatPosition.East,
      );

      it('すべてのロン可能な座席がロンをした場合、解決結果を返すこと', () => {
        const [step1Result, step1] = sut.receive(
          new RonCall(SeatPosition.South),
        );

        expect(step1Result.isResolved()).toBe(false);

        const [step2Result, step2] = step1.receive(
          new RonCall(SeatPosition.West),
        );

        expect(step2Result.isResolved()).toBe(false);

        const [result] = step2.receive(new RonCall(SeatPosition.North));

        expect(result.isResolved()).toBe(true);
        expect((result as RonCallResolutionResult).winners).toEqual(
          expect.arrayContaining([
            SeatPosition.South,
            SeatPosition.West,
            SeatPosition.North,
          ]),
        );
      });

      describe('1つのロン可能な座席がロンをした場合', () => {
        const allAction = new CallAction([
          CallActionCandidate.Pass,
          CallActionCandidate.Ron,
          CallActionCandidate.Kan,
          CallActionCandidate.Pon,
          CallActionCandidate.Chii,
        ]);

        const sut = new CallResolutionWithDoubleRon(
          new FourPlayersCallCandidatesFinder(
            { has: vi.fn(() => true), findAll: vi.fn() },
            { has: vi.fn(() => true), findAll: vi.fn() },
            { has: vi.fn(() => true), findAll: vi.fn() },
            { resolve: vi.fn() },
            { resolve: vi.fn() },
          ),
          new CallActions(
            new Map([
              [SeatPosition.South, allAction],
              [SeatPosition.West, allAction],
              [SeatPosition.North, allAction],
            ]),
          ),
          CallResolutionType.Discard,
          SeatPosition.East,
        );

        describe('一部のロン可能な座席が未リアクションの場合、未解決結果を返すこと', () => {
          it('カンを受け取った場合、未解決結果を返すこと', () => {
            const [result, resolution] = sut.receive(
              new OpenKanCall(
                SeatPosition.North,
                new Tile(SuitType.Character1, TileModifier.Normal),
                SeatPosition.East,
                [
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character1, TileModifier.Normal),
                  new Tile(SuitType.Character1, TileModifier.Normal),
                ],
              ),
            );

            expect(resolution.hasPendingActions()).toBe(true);
            expect(result.isResolved()).toBe(false);
          });

          it.todo('ポンを受け取った場合、未解決結果を返すこと');

          it.todo('チーを受け取った場合、未解決結果を返すこと');

          it.todo('パスを受け取った場合、未解決結果を返すこと');
        });
      });

      describe('すべてのロン可能な座席が未リアクションの場合、未解決結果を返すこと', () => {
        it.todo('カンを受け取った場合、未解決結果を返すこと');

        it.todo('ポンを受け取った場合、未解決結果を返すこと');

        it.todo('チーを受け取った場合、未解決結果を返すこと');

        it.todo('パスを受け取った場合、未解決結果を返すこと');
      });
    });

    describe('ロン可能な座席が0の場合', () => {
      it.todo('カン可能な座席がカンをした場合、解決結果を返すこと');

      it.todo('カン可能な座席が未リアクションの場合、未解決結果を返すこと');

      it.todo('ポン可能な座席がポンをした場合、解決結果を返すこと');

      it.todo('ポン可能な座席が未リアクションの場合、未解決結果を返すこと');

      describe('カンやポン可能な座席が0の場合', () => {
        it.todo('チー可能な座席がチーをした場合、解決結果を返すこと');
      });
    });

    it.todo('すべての座席がパスした場合、パス解決結果を返すこと');
  });
});

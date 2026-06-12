import { describe, expect, it } from 'vitest';

import { ConcealedHand } from './concealed-hand';
import { Melds } from './melds';
import { RawHand } from './raw-hand';
import {
  AddedQuadrupletMeld,
  ClosedQuadrupletMeld,
  MeldReference,
  OpenQuadrupletMeld,
  SequenceMeld,
  TripletMeld,
} from '../../round-session';
import { SuitType, Tile, TileModifier } from '../../tile';
import { Pair, SerialPair, SerialPairType } from '../../winning-hand-shape';
import { InvalidNoTilesError } from '../invalid-no-tiles-error';

describe('RawHand', () => {
  describe('discardDrawnTile', () => {
    describe('ツモ牌を所持している場合', () => {
      const sut = new RawHand(
        new ConcealedHand(),
        new Melds(),
        new Tile(SuitType.Character1, TileModifier.Normal),
      );

      it('ツモ牌とツモ牌を持たない新しい RawHand を返すこと', () => {
        expect(sut.drawnTile).toBeDefined();

        const [resultTile, resultHand] = sut.discardDrawnTile();

        expect(resultTile).toEqual(
          new Tile(SuitType.Character1, TileModifier.Normal),
        );
        expect(resultHand.drawnTile).toBeUndefined();
      });
    });

    it('ツモ牌を所持していない場合、InvalidNoTilesError を投げること', () => {
      const sut = new RawHand(new ConcealedHand(), new Melds());

      expect(sut.drawnTile).toBeUndefined();

      expect(() => {
        sut.discardDrawnTile();
      }).toThrow(InvalidNoTilesError);
    });
  });

  describe('discardFromConcealed', () => {
    describe('与えられた牌を所持している場合', () => {
      const sut = new RawHand(
        new ConcealedHand(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Circle1, TileModifier.Normal),
        ),
        new Melds(),
      );
      const target = new Tile(SuitType.Character1, TileModifier.Normal);

      it('与えられた牌を除外した新しい RawHand を返すこと', () => {
        expect(sut.concealed).toEqual(expect.arrayContaining([target]));

        const result = sut.discardFromConcealed(target);

        expect(result.concealed).not.toEqual(expect.arrayContaining([target]));
        expect(result).not.toBe(sut);
      });
    });
  });

  describe('draw', () => {
    it('与えられた牌をツモ牌に持つ新しい RawHand を返すこと', () => {
      const sut = new RawHand(new ConcealedHand(), new Melds());

      expect(sut.drawnTile).toBeUndefined();

      const result = sut.draw(
        new Tile(SuitType.Character1, TileModifier.Normal),
      );

      expect(result.drawnTile).toEqual(
        new Tile(SuitType.Character1, TileModifier.Normal),
      );
      expect(result).not.toBe(sut);
    });
  });

  describe('meldAddedQuadruplet', () => {
    const reference = new MeldReference(0);
    const sut = new RawHand(
      new ConcealedHand(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Circle1, TileModifier.Normal),
      ),
      new Melds([
        reference,
        new TripletMeld(
          new Pair(
            new Tile(SuitType.Character1, TileModifier.Normal),
            new Tile(SuitType.Character1, TileModifier.Normal),
          ),
          new Tile(SuitType.Character1, TileModifier.Normal),
        ),
      ]),
    );

    it('新しい RawHand を返すこと', () => {
      const result = sut.meldAddedQuadruplet(
        reference,
        new Tile(SuitType.Character1, TileModifier.Normal),
      );

      expect(result).not.toBe(sut);
    });

    it('新しい RawHand は消費牌を消費していること', () => {
      expect(sut.concealed).toHaveLength(2);

      const result = sut.meldAddedQuadruplet(
        reference,
        new Tile(SuitType.Character1, TileModifier.Normal),
      );

      expect(result.concealed).toHaveLength(1);
    });

    it('対象の副露が更新されていること', () => {
      expect(sut.melds).toHaveLength(1);

      const result = sut.meldAddedQuadruplet(
        reference,
        new Tile(SuitType.Character1, TileModifier.Normal),
      );

      expect(result.melds).toHaveLength(1);
      expect(result.melds).toEqual(
        expect.arrayContaining([
          new AddedQuadrupletMeld(
            [
              new Tile(SuitType.Character1, TileModifier.Normal),
              new Tile(SuitType.Character1, TileModifier.Normal),
            ],
            new Tile(SuitType.Character1, TileModifier.Normal),
            new Tile(SuitType.Character1, TileModifier.Normal),
          ),
        ]),
      );
    });
  });

  describe('meldClosedQuadruplet', () => {
    describe('与えられた消費牌が充足する場合', () => {
      const sut = new RawHand(
        new ConcealedHand(
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
        ),
        new Melds([
          new MeldReference(0),
          new TripletMeld(
            new Pair(
              new Tile(SuitType.Circle1, TileModifier.Normal),
              new Tile(SuitType.Circle1, TileModifier.Normal),
            ),
            new Tile(SuitType.Circle1, TileModifier.Normal),
          ),
        ]),
        new Tile(SuitType.Character1, TileModifier.Normal),
      );
      const targets = [
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
      ] as const;

      it('副露参照と新しい RawHand を返すこと', () => {
        const [resultReference, resultHand] = sut.meldClosedQuadruplet(targets);

        expect(resultReference.valueOf()).toEqual(1);

        expect(resultHand).not.toBe(sut);
      });

      it('新しい RawHand は消費牌を消費していること', () => {
        expect(sut.concealed).toHaveLength(3);

        const [, resultHand] = sut.meldClosedQuadruplet(targets);

        expect(resultHand.concealed).toHaveLength(0);
      });

      it('新しい RawHand は副露を追加していること', () => {
        expect(sut.melds).toHaveLength(1);

        const [, resultHand] = sut.meldClosedQuadruplet(targets);

        expect(resultHand.melds).toHaveLength(2);
        expect(resultHand.melds).toEqual(
          expect.arrayContaining([new ClosedQuadrupletMeld(targets)]),
        );
      });
    });
  });

  describe('meldOpenQuadruplet', () => {
    const sut = new RawHand(
      new ConcealedHand(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
      ),
      new Melds([
        new MeldReference(0),
        new TripletMeld(
          new Pair(
            new Tile(SuitType.Circle1, TileModifier.Normal),
            new Tile(SuitType.Circle1, TileModifier.Normal),
          ),
          new Tile(SuitType.Circle1, TileModifier.Normal),
        ),
      ]),
    );

    it('副露参照と新しい RawHand を返すこと', () => {
      const [resultReference, resultHand] = sut.meldOpenQuadruplet(
        new Tile(SuitType.Character1, TileModifier.Normal),
        [
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
        ],
      );

      expect(resultReference.valueOf()).toEqual(1);

      expect(resultHand).not.toBe(sut);
    });

    it('新しい RawHand は消費牌を消費していること', () => {
      expect(sut.concealed).toHaveLength(3);

      const [, resultHand] = sut.meldOpenQuadruplet(
        new Tile(SuitType.Character1, TileModifier.Normal),
        [
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
        ],
      );

      expect(resultHand.concealed).toHaveLength(0);
    });

    it('新しい RawHand は副露を追加していること', () => {
      expect(sut.melds).toHaveLength(1);

      const [, resultHand] = sut.meldOpenQuadruplet(
        new Tile(SuitType.Character1, TileModifier.Normal),
        [
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
          new Tile(SuitType.Character1, TileModifier.Normal),
        ],
      );

      expect(resultHand.melds).toHaveLength(2);
      expect(resultHand.melds).toEqual(
        expect.arrayContaining([
          new OpenQuadrupletMeld(
            [
              new Tile(SuitType.Character1, TileModifier.Normal),
              new Tile(SuitType.Character1, TileModifier.Normal),
              new Tile(SuitType.Character1, TileModifier.Normal),
            ],
            new Tile(SuitType.Character1, TileModifier.Normal),
          ),
        ]),
      );
    });
  });

  describe('meldOpenSequence', () => {
    const sut = new RawHand(
      new ConcealedHand(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
      ),
      new Melds([
        new MeldReference(0),
        new TripletMeld(
          new Pair(
            new Tile(SuitType.Circle1, TileModifier.Normal),
            new Tile(SuitType.Circle1, TileModifier.Normal),
          ),
          new Tile(SuitType.Circle1, TileModifier.Normal),
        ),
      ]),
    );
    const targetSerialPair = new SerialPair(
      SerialPairType.Edge,
      [
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character2, TileModifier.Normal),
      ],
      [SuitType.Character3],
    );

    it('副露参照と新しい RawHand を返すこと', () => {
      const [resultReference, resultHand] = sut.meldOpenSequence(
        new Tile(SuitType.Character1, TileModifier.Normal),
        targetSerialPair,
      );

      expect(resultReference.valueOf()).toEqual(1);

      expect(resultHand).not.toBe(sut);
    });

    it('新しい RawHand は消費牌を消費していること', () => {
      expect(sut.concealed).toHaveLength(2);

      const [, resultHand] = sut.meldOpenSequence(
        new Tile(SuitType.Character1, TileModifier.Normal),
        targetSerialPair,
      );

      expect(resultHand.concealed).toHaveLength(0);
    });

    it('新しい RawHand は副露を追加していること', () => {
      expect(sut.melds).toHaveLength(1);

      const [, resultHand] = sut.meldOpenSequence(
        new Tile(SuitType.Character3, TileModifier.Normal),
        targetSerialPair,
      );

      expect(resultHand.melds).toHaveLength(2);
      expect(resultHand.melds).toEqual(
        expect.arrayContaining([
          new SequenceMeld(
            targetSerialPair,
            new Tile(SuitType.Character3, TileModifier.Normal),
          ),
        ]),
      );
    });
  });

  describe('meldOpenTriplet', () => {
    const sut = new RawHand(
      new ConcealedHand(
        new Tile(SuitType.Character1, TileModifier.Normal),
        new Tile(SuitType.Character1, TileModifier.Normal),
      ),
      new Melds([
        new MeldReference(0),
        new TripletMeld(
          new Pair(
            new Tile(SuitType.Circle1, TileModifier.Normal),
            new Tile(SuitType.Circle1, TileModifier.Normal),
          ),
          new Tile(SuitType.Circle1, TileModifier.Normal),
        ),
      ]),
    );
    const targetPair = new Pair(
      new Tile(SuitType.Character1, TileModifier.Normal),
      new Tile(SuitType.Character1, TileModifier.Normal),
    );

    it('副露参照と新しい RawHand を返すこと', () => {
      const [resultReference, resultHand] = sut.meldOpenTriplet(
        new Tile(SuitType.Character1, TileModifier.Normal),
        targetPair,
      );

      expect(resultReference.valueOf()).toEqual(1);

      expect(resultHand).not.toBe(sut);
    });

    it('新しい RawHand は消費牌を消費していること', () => {
      expect(sut.concealed).toHaveLength(2);

      const [, resultHand] = sut.meldOpenTriplet(
        new Tile(SuitType.Character1, TileModifier.Normal),
        targetPair,
      );

      expect(resultHand.concealed).toHaveLength(0);
    });

    it('新しい RawHand は副露を追加していること', () => {
      expect(sut.melds).toHaveLength(1);

      const [, resultHand] = sut.meldOpenTriplet(
        new Tile(SuitType.Character1, TileModifier.Normal),
        targetPair,
      );

      expect(resultHand.melds).toHaveLength(2);
      expect(resultHand.melds).toEqual(
        expect.arrayContaining([
          new TripletMeld(
            targetPair,
            new Tile(SuitType.Character1, TileModifier.Normal),
          ),
        ]),
      );
    });
  });
});

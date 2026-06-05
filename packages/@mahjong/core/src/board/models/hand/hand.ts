import { HandAnalysisContext } from './analysis';
import { Melds } from './melds';
import { RawHand } from './raw-hand';
import { RiichiStatus } from './riichi-status';

import type { IHandAnalysis, IHandAnalyzer } from './analysis';
import type { IConcealedHand } from './concealed-hand';
import type { SeatPosition, Tile, TileType } from '../../../concepts';
import type {
  IHand,
  Meld,
  MeldReference,
  RiichiContext,
} from '../../../round-session';
import type {
  Pair,
  SerialPair,
  WinningHandShape,
} from '../../../winning-hand-shape';

export class Hand implements IHand {
  public readonly seat: SeatPosition;

  private readonly analysis: IHandAnalysis;

  private readonly analyzer: IHandAnalyzer;

  private readonly raw: RawHand;

  private readonly riichiStatus: RiichiStatus;

  public get concealed(): readonly Tile[] {
    return [...this.raw.concealed];
  }

  public get drawnTile(): Tile | undefined {
    return this.raw.drawnTile;
  }

  public get melds(): readonly Meld[] {
    return this.raw.melds;
  }

  public get waitTiles(): readonly TileType[] {
    return this.analysis.waitTiles;
  }

  public createRiichiContext(): RiichiContext {
    return this.riichiStatus.createContext();
  }

  public declareRiichi(isFirstAround: boolean): Hand {
    return new Hand(
      this.seat,
      this.raw,
      this.riichiStatus.declare(isFirstAround),
      this.analysis,
      this.analyzer,
    );
  }

  public disableOneShotEligible(): Hand {
    return new Hand(
      this.seat,
      this.raw,
      this.riichiStatus.disableOneShotEligible(),
      this.analysis,
      this.analyzer,
    );
  }

  public discardDrawnTile(): readonly [Tile, Hand] {
    const [discardTile, nextRawHand] = this.raw.discardDrawnTile();
    const analysis = this.analyze();

    return [
      discardTile,
      new Hand(
        this.seat,
        nextRawHand,
        this.riichiStatus,
        analysis,
        this.analyzer,
      ),
    ];
  }

  public discardFromConcealed(tile: Tile): Hand {
    if (this.riichiStatus.isEstablished()) throw new TypeError();

    const nextRawHand = this.raw.discardFromConcealed(tile);
    const analysis = this.analyze();

    return new Hand(
      this.seat,
      nextRawHand,
      this.riichiStatus,
      analysis,
      this.analyzer,
    );
  }

  public draw(tile: Tile): Hand {
    const nextRawHand = this.raw.draw(tile);
    const analysis = this.analyze();

    return new Hand(
      this.seat,
      nextRawHand,
      this.riichiStatus,
      analysis,
      this.analyzer,
    );
  }

  public equals(other: Hand): boolean {
    return this.seat.equals(other.seat);
  }

  public establishRiichi(): Hand {
    return new Hand(
      this.seat,
      this.raw,
      this.riichiStatus.establish(),
      this.analysis,
      this.analyzer,
    );
  }

  public findAllPairCandidatesWith(tile: Tile): readonly Pair[] {
    return this.raw.findAllPairCandidatesWith(tile);
  }

  public findAllSerialPairCandidatesWith(tile: Tile): readonly SerialPair[] {
    return this.raw.findAllSerialPairCandidatesWith(tile);
  }

  public findAllWinningHandShapes(): readonly WinningHandShape[] {
    return this.analysis.findAllWinningHandShapes();
  }

  public findAllWinningHandShapesWith(tile: Tile): readonly WinningHandShape[] {
    return this.analysis.findAllWinningHandShapesWith(tile);
  }

  public isPendingRiichi(): boolean {
    return this.riichiStatus.isPending();
  }

  public isRiichi(): boolean {
    return this.riichiStatus.isEstablished();
  }

  public isTenpai(): boolean {
    throw new Error('Method not implemented.');
  }

  public meldAddedQuadruplet(reference: MeldReference, addTile: Tile): Hand {
    const nextRawHand = this.raw.meldAddedQuadruplet(reference, addTile);

    const analysis = this.analyze();

    return new Hand(
      this.seat,
      nextRawHand,
      this.riichiStatus,
      analysis,
      this.analyzer,
    );
  }

  public meldClosedQuadruplet(
    consumeTiles: readonly [Tile, Tile, Tile, Tile],
  ): readonly [MeldReference, Hand] {
    const [reference, nextRawHand] =
      this.raw.meldClosedQuadruplet(consumeTiles);

    const analysis = this.analyze();

    return [
      reference,
      new Hand(
        this.seat,
        nextRawHand,
        this.riichiStatus,
        analysis,
        this.analyzer,
      ),
    ];
  }

  public meldOpenQuadruplet(
    claimTile: Tile,
    consumeTiles: readonly [Tile, Tile, Tile],
  ): readonly [MeldReference, Hand] {
    const [reference, nextRawHand] = this.raw.meldOpenQuadruplet(
      claimTile,
      consumeTiles,
    );

    const analysis = this.analyze();

    return [
      reference,
      new Hand(
        this.seat,
        nextRawHand,
        this.riichiStatus,
        analysis,
        this.analyzer,
      ),
    ];
  }

  public meldOpenSequence(
    claimTile: Tile,
    consumeTiles: readonly [Tile, Tile],
  ): readonly [MeldReference, Hand] {
    const [reference, nextRawHand] = this.raw.meldOpenSequence(
      claimTile,
      consumeTiles,
    );

    const analysis = this.analyze();

    return [
      reference,
      new Hand(
        this.seat,
        nextRawHand,
        this.riichiStatus,
        analysis,
        this.analyzer,
      ),
    ];
  }

  public meldOpenTriplet(
    claimTile: Tile,
    consumeTiles: readonly [Tile, Tile],
  ): readonly [MeldReference, Hand] {
    const [reference, nextRawHand] = this.raw.meldOpenTriplet(
      claimTile,
      consumeTiles,
    );

    const analysis = this.analyze();

    return [
      reference,
      new Hand(
        this.seat,
        nextRawHand,
        this.riichiStatus,
        analysis,
        this.analyzer,
      ),
    ];
  }

  public owns(seat: SeatPosition): boolean {
    return this.seat.equals(seat);
  }

  private analyze(): IHandAnalysis {
    const context = new HandAnalysisContext(this.raw.concealed, this.melds);

    return this.analyzer.analyze(context);
  }

  public constructor(
    seat: SeatPosition,
    raw: RawHand,
    riichiStatus: RiichiStatus,
    analysis: IHandAnalysis,
    analyzer: IHandAnalyzer,
  ) {
    this.seat = seat;
    this.raw = raw;
    this.riichiStatus = riichiStatus;
    this.analyzer = analyzer;
    this.analysis = analysis;
  }

  public static new(
    seat: SeatPosition,
    concealed: IConcealedHand,
    analyzer: IHandAnalyzer,
  ): Hand {
    const melds = new Melds();
    const analysis = analyzer.analyze(
      new HandAnalysisContext(concealed, [...melds]),
    );

    return new Hand(
      seat,
      new RawHand(concealed, melds),
      RiichiStatus.new(),
      analysis,
      analyzer,
    );
  }
}

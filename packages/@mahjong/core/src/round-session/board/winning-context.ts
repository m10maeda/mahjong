import type { RiichiContext } from './riichi-context';
import type { WinningHandShape } from '../../winning-hand-shape';

export enum WinningMethod {
  Ron,
  Chankan,
  SelfDrawFromLiveWall,
  SelfDrawFromDeadWall,
}

export class WinningContext {
  public readonly handShapes: readonly WinningHandShape[];

  public readonly method: WinningMethod;

  private readonly riichi: RiichiContext;

  public get isFirstAroundRiichi(): boolean {
    return this.riichi.isFirstAroundRiichi;
  }

  public get withOneShot(): boolean {
    return this.riichi.withOneShot;
  }

  public get withRiichi(): boolean {
    return this.riichi.withRiichi;
  }

  public constructor(
    handShapes: readonly WinningHandShape[],
    method: WinningMethod,
    riichi: RiichiContext,
  ) {
    this.handShapes = handShapes;
    this.method = method;
    this.riichi = riichi;
  }
}

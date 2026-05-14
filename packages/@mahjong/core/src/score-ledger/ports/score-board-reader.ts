import type { ScoreBoardProjection } from '../projections';

export interface IScoreBoardReader {
  getScoreBoard(): ScoreBoardProjection;
}

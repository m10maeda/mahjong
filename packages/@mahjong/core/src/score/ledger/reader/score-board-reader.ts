import type { ScoreBoardProjection } from './score-board-projection';

export interface IScoreBoardReader {
  getScoreBoard(): ScoreBoardProjection;
}

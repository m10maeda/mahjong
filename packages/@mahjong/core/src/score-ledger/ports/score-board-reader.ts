import type { ScoreHolder } from '../concepts';
import type { Score } from './score';

export interface IScoreBoardReader {
  getAllScores(): readonly Score[];
  getScoreBy(holder: ScoreHolder): Score | undefined;
}

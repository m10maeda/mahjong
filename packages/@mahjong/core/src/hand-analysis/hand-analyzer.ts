import type { IHandAnalysis } from './hand-analysis';
import type { HandAnalysisContext } from './hand-analysis-context';

export interface IHandAnalyzer {
  analyze(context: HandAnalysisContext): IHandAnalysis;
}

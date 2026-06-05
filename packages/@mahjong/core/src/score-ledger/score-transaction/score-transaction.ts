import { InvalidDuplicatedHolderError } from './invalid-duplicated-holder-error';
import { InvalidNoZeroSumError } from './invalid-no-zero-sum-error';
import { Point } from '../point';

import type { ScoreEntry } from './score-entry';
import type { Round } from '../../round';

export class ScoreTransaction implements Iterable<ScoreEntry> {
  public readonly round: Round;

  private readonly entries: readonly [ScoreEntry, ScoreEntry, ...ScoreEntry[]];

  public compareTo(other: ScoreTransaction): number {
    return this.round.compareTo(other.round);
  }

  public [Symbol.iterator](): Iterator<ScoreEntry> {
    return this.entries[Symbol.iterator]();
  }

  public constructor(
    entries: readonly [ScoreEntry, ScoreEntry, ...ScoreEntry[]],
    round: Round,
  ) {
    const sum = entries.reduce(
      (_sum, entry) => _sum.add(entry.amount),
      Point.Zero,
    );

    if (!sum.isZero()) throw new InvalidNoZeroSumError();

    const uniqueTargets = new Set([...entries].map((entry) => entry.target));
    if (entries.length !== uniqueTargets.size)
      throw new InvalidDuplicatedHolderError();

    this.entries = entries;
    this.round = round;
  }
}

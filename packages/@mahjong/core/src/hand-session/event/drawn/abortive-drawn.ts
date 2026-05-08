import { HandSessionEvent } from '../hand-session-event';

enum AbortiveReason {
  /** 九種九牌 */
  NineTerminalsAndHonors,

  /** 四開槓 */
  FourKans,

  /** 四家立直 */
  FourRiichi,

  /** 四風子連打 */
  FourWindsOutInFirstTurn,

  /** 三家和 */
  TripleRon,
}

export class AbortiveDrawn extends HandSessionEvent {
  /** 四開槓 */
  public static readonly FourKans = new AbortiveDrawn(AbortiveReason.FourKans);

  /** 四家立直 */
  public static readonly FourRiichi = new AbortiveDrawn(
    AbortiveReason.FourRiichi,
  );

  /** 四風子連打 */
  public static readonly FourWindsOutInFirstTurn = new AbortiveDrawn(
    AbortiveReason.FourWindsOutInFirstTurn,
  );

  /** 九種九牌 */
  public static readonly NineTerminalsAndHonors = new AbortiveDrawn(
    AbortiveReason.NineTerminalsAndHonors,
  );

  /** 三家和 */
  public static readonly TripleRon = new AbortiveDrawn(
    AbortiveReason.TripleRon,
  );

  public readonly reason: AbortiveReason;

  private constructor(reason: AbortiveReason) {
    super();

    this.reason = reason;
  }
}

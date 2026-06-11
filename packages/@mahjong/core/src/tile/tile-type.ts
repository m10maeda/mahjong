export abstract class TileType {
  public abstract equals(other: TileType): boolean;
  public abstract isHonor(): boolean;
  public abstract isSuit(): boolean;
  public abstract isTerminal(): boolean;
  public abstract toString(): string;

  public isTerminalOrHonor(): boolean {
    return this.isHonor() || this.isTerminal();
  }
}

import type { DeadWall } from './dead-wall';
import type { LiveWall } from './live-wall';
import type { Tile } from '../../concepts';

export class Wall {
  private readonly dead: DeadWall;

  private readonly live: LiveWall;

  public get blindDoraIndicators(): readonly Tile[] {
    return this.dead.blindDoraIndicators;
  }

  public get doraIndicators(): readonly Tile[] {
    return this.dead.doraIndicators;
  }

  public get reamingTileCount(): number {
    return this.live.reamingTileCount;
  }

  public addDora(): Wall {
    return new Wall(this.live, this.dead.addDora());
  }

  public canTakeTileFromLiveWall(): boolean {
    return this.live.isEmpty();
  }

  public takeFromDeadWall(): readonly [Tile, Wall] {
    const [supplyTile, newLiveWall] = this.live.takeLastTile();
    const [takenTile, newDeadWall] = this.dead.drawRinshanTile(supplyTile);

    return [takenTile, new Wall(newLiveWall, newDeadWall)];
  }

  public takeFromLiveWall(): readonly [Tile, Wall] {
    const [takenTile, newLiveWall] = this.live.takeTile();

    return [takenTile, new Wall(newLiveWall, this.dead)];
  }

  public constructor(live: LiveWall, dead: DeadWall) {
    this.live = live;
    this.dead = dead;
  }
}

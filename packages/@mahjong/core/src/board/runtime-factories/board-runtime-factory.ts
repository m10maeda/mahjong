import {
  DiscardTile,
  DrawTile,
  ExtendMeld,
  MeldFromSelf,
  MeldWithClaimed,
} from '../commands';
import {
  BoardEngine,
  BoardCommandDispatcher,
  BoardCommandExecutorBinding,
  DiscardTileExecuter,
  DrawTileExecuter,
  ExtendMeldExecuter,
  MeldFromSelfExecuter,
  MeldWithClaimedExecuter,
} from '../engine';
import { BoardRuntime } from '../runtime';
import {
  TilesDistributor,
  RandomGeneratorFactory,
  TilesShuffler,
} from '../tiles-distributor';

import type { ITable } from '../../concepts';
import type { IBoardEventPublisher } from '../events';
import type { Board } from '../models';
import type { IBoardRuntimeFactory } from '../ports';
import type { TileSet } from '../tile-set';

export class BoardRuntimeFactory implements IBoardRuntimeFactory {
  public create(
    table: ITable,
    tilesSet: TileSet,
    eventPublisher: IBoardEventPublisher,
  ): BoardRuntime<Board> {
    const engine = this.createEngine();
    const tilesDistributor = this.createTilesDistributor(table, tilesSet);

    return new BoardRuntime(engine, eventPublisher, tilesDistributor);
  }

  private createEngine(): BoardEngine<Board> {
    const commandDispatcher = new BoardCommandDispatcher(
      new BoardCommandExecutorBinding(DrawTile, new DrawTileExecuter()),
      new BoardCommandExecutorBinding(DiscardTile, new DiscardTileExecuter()),
      new BoardCommandExecutorBinding(MeldFromSelf, new MeldFromSelfExecuter()),
      new BoardCommandExecutorBinding(
        MeldWithClaimed,
        new MeldWithClaimedExecuter(),
      ),
      new BoardCommandExecutorBinding(ExtendMeld, new ExtendMeldExecuter()),
    );

    return new BoardEngine(commandDispatcher);
  }

  private createTilesDistributor(
    table: ITable,
    tilesSet: TileSet,
  ): TilesDistributor {
    const shuffler = new TilesShuffler(new RandomGeneratorFactory());

    return new TilesDistributor(tilesSet, shuffler, [...table]);
  }
}

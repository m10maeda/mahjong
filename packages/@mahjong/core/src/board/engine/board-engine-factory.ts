import {
  DiscardTile,
  DrawTile,
  ExtendMeld,
  MeldFromSelf,
  MeldWithClaimed,
} from '../commands';
import {
  TilesDistributor,
  RandomGeneratorFactory,
  TilesShuffler,
} from '../tiles-distributor';

import type { ITable } from '../../concepts';
import type { IBoardEventPublisher } from '../events';
import type { Board } from '../models';
import type { IBoardEngineFactory } from '../ports';
import type { TileSet } from '../tile-set';

import {
  BoardEngine,
  BoardCommandDispatcher,
  BoardCommandExecutorBinding,
  DiscardTileExecuter,
  DrawTileExecuter,
  ExtendMeldExecuter,
  MeldFromSelfExecuter,
  MeldWithClaimedExecuter,
} from '.';

export class BoardEngineFactory implements IBoardEngineFactory {
  public create(
    table: ITable,
    tilesSet: TileSet,
    eventPublisher: IBoardEventPublisher,
  ): BoardEngine<Board> {
    const dispatcher = this.createCommandDispatcher();
    const tilesDistributor = this.createTilesDistributor(table, tilesSet);

    return new BoardEngine(dispatcher, tilesDistributor, eventPublisher);
  }

  private createCommandDispatcher(): BoardCommandDispatcher<Board> {
    return new BoardCommandDispatcher(
      new BoardCommandExecutorBinding(DrawTile, new DrawTileExecuter()),
      new BoardCommandExecutorBinding(DiscardTile, new DiscardTileExecuter()),
      new BoardCommandExecutorBinding(MeldFromSelf, new MeldFromSelfExecuter()),
      new BoardCommandExecutorBinding(
        MeldWithClaimed,
        new MeldWithClaimedExecuter(),
      ),
      new BoardCommandExecutorBinding(ExtendMeld, new ExtendMeldExecuter()),
    );
  }

  private createTilesDistributor(
    table: ITable,
    tilesSet: TileSet,
  ): TilesDistributor {
    const shuffler = new TilesShuffler(new RandomGeneratorFactory());

    return new TilesDistributor(tilesSet, shuffler, [...table]);
  }
}

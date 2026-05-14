import type { TableType } from '../../table';
import type { IBoardEventPublisher } from '../events';
import type { TileSet } from '../tile-set';
import type { IBoardRuntime } from './board-runtime';

export interface IBoardRuntimeFactory {
  create(
    table: TableType,
    tilesSet: TileSet,
    eventPublisher: IBoardEventPublisher,
  ): IBoardRuntime;
}

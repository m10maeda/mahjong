import type { TableType } from '../../concepts';
import type { IBoardEventPublisher } from '../events';
import type { TileSet } from '../tile-set';
import type { IBoardEngine } from './board-engine';

export interface IBoardEngineFactory {
  create(
    table: TableType,
    tilesSet: TileSet,
    eventPublisher: IBoardEventPublisher,
  ): IBoardEngine;
}

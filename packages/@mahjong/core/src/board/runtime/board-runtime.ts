import { DiscardPileProjection } from '../reader/discard-pile/discard-pile-projection';

import type { BoardProjection } from './board-projection';
import type { SeatPosition } from '../../seat-position';
import type {
  BoardCommand,
  IBoardCommandApplier,
} from '../board-command-applier';
import type { IBoardCommandHandler } from '../board-command-handler';
import type { IBoardEventPublisher } from '../event';
import type { IDiscardPileReader } from '../reader/discard-pile/discard-pile-reader';
import type { HandProjection } from '../reader/hand/hand-projection';
import type { IHandReader } from '../reader/hand/hand-reader';
import type { IWallReader, WallProjection } from '../reader/wall';

export class BoardRuntime
  implements IBoardCommandHandler, IWallReader, IHandReader, IDiscardPileReader
{
  private readonly eventPublisher: IBoardEventPublisher;

  private board: IBoardCommandApplier;

  private projection: BoardProjection;

  public getAllHands(): readonly HandProjection[] {
    return this.projection.hands;
  }

  public getDiscardPile(): DiscardPileProjection {
    return this.projection.discardPile;
  }

  public getHandBy(seat: SeatPosition): HandProjection | undefined {
    return this.projection.getHandBy(seat);
  }

  public getWall(): WallProjection {
    return this.projection.wall;
  }

  public async handle(
    command: BoardCommand<IBoardCommandApplier>,
  ): Promise<void> {
    const [newBoard, event] = this.board.apply(command);

    this.board = newBoard;
    this.projection = this.projection.apply(event);

    await this.eventPublisher.publish(event);
  }

  public constructor(
    board: IBoardCommandApplier,
    projection: BoardProjection,
    eventPublisher: IBoardEventPublisher,
  ) {
    this.board = board;
    this.projection = projection;
    this.eventPublisher = eventPublisher;
  }
}

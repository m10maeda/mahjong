import type { BoardCommand } from '../commands';
import type { IBoardEventPublisher } from '../events';
import type { Seed, IBoardEngine } from '../ports';
import type { IBoardCommandExecutor } from './board-command-executor';
import type { ITilesDistributor } from './tiles-distributor';

export class BoardEngine<TBoard> implements IBoardEngine {
  private readonly eventPublisher: IBoardEventPublisher;

  private readonly executor: IBoardCommandExecutor<TBoard>;

  private readonly tilesDistributor: ITilesDistributor<TBoard>;

  private board?: TBoard;

  public async handle(command: BoardCommand) {
    if (!this.board) throw new Error('Board not prepared');

    const [event, nextBoard] = this.executor.execute(command, this.board);

    await this.eventPublisher.publish(event);

    this.board = nextBoard;
  }

  public async prepare(seed: Seed): Promise<void> {
    const [event, newBoard] = this.tilesDistributor.distribute(seed);

    await this.eventPublisher.publish(event);

    this.board = newBoard;
  }

  public constructor(
    executor: IBoardCommandExecutor<TBoard>,
    tilesDistributor: ITilesDistributor<TBoard>,
    eventPublisher: IBoardEventPublisher,
  ) {
    this.executor = executor;
    this.tilesDistributor = tilesDistributor;
    this.eventPublisher = eventPublisher;
  }
}

import type { BoardCommand } from '../commands';
import type { IBoardEventPublisher } from '../events';
import type { IBoardEngine } from './board-engine';
import type { ITilesDistributor } from './tiles-distributor';
import type { IBoardRuntime, Seed } from '../ports';

export class BoardRuntime<TBoard> implements IBoardRuntime {
  private readonly engine: IBoardEngine<TBoard>;

  private readonly eventPublisher: IBoardEventPublisher;

  private readonly tilesDistributor: ITilesDistributor<TBoard>;

  private board?: TBoard;

  public async handle(command: BoardCommand) {
    if (!this.board) throw new Error('Board not initialized');

    const [event, nextBoard] = this.engine.execute(command, this.board);

    await this.eventPublisher.publish(event);

    this.board = nextBoard;
  }

  public async setup(seed: Seed): Promise<void> {
    const [event, nextBoard] = this.tilesDistributor.distribute(seed);

    await this.eventPublisher.publish(event);

    this.board = nextBoard;
  }

  public constructor(
    engine: IBoardEngine<TBoard>,
    eventPublisher: IBoardEventPublisher,
    tilesDistributor: ITilesDistributor<TBoard>,
  ) {
    this.engine = engine;
    this.eventPublisher = eventPublisher;
    this.tilesDistributor = tilesDistributor;
  }
}

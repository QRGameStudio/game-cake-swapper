/// <reference path="./gameView.ts" />

interface block {
  color: number;
  size: number;
}

class Game {
  private stacks: block[][];
  private selectedStack: number;
  private gameOverHandler: () => void;
  private view: GameView;
  private moves: number;
  private best: number;
  readonly MAX: number;

  constructor(initSize: number, gameOver: () => void) {
    this.stacks = [
      new Array(initSize).fill(0).map((_, i) => {
        return { color: 0, size: i };
      }),
      [],
      new Array(initSize).fill(0).map((_, i) => {
        return { color: 1, size: i };
      }),
    ];
    this.selectedStack = -1;
    this.gameOverHandler = gameOver;
    this.MAX = initSize;
    this.moves = 0;
    this.loadBest();
    this.view = new GameView(this);
    this.view.draw();
  }

  private loadBest = () => {
    this.best = -1;
    // @ts-ignore
    new GStorage("QRHanoiTowers").get("HS", -1).then((b) => {
      this.best = parseInt(b);
      this.view.draw();
    });
  };

  private saveBest = () => {
    if (this.best === -1 || this.best > this.moves) {
      this.best = this.moves;
      // @ts-ignore
      new GStorage("QRHanoiTowers").set("HS", this.best.toString());
    }
  };

  private move = (from: number, to: number) => {
    const stackFrom = this.stacks[from];
    const stackTo = this.stacks[to];
    if (stackFrom.length === 0) return;
    if (stackTo.length > 0 && stackFrom[0].size > stackTo[0].size) return;
    stackTo.unshift(stackFrom.shift());
    this.moves += 1;
    if (this.testWin()) {
      this.saveBest();
      // @ts-ignore
      new GSongLib().play("successLong");
      this.gameOverHandler();
    }
  };

  private testWin = () => {
    return (
      this.stacks[0].filter((b) => b.color === 0).length === 0 &&
      this.stacks[1].length === 0 &&
      this.stacks[2].filter((b) => b.color === 1).length === 0
    );
  };

  getStack = (id: number) => {
    return { stack: [...this.stacks[id]], selected: id === this.selectedStack };
  };

  getMoves = () => this.moves;

  getBestMoves = () => this.best;

  click = (stackId: number) => {
    if (this.selectedStack === -1) this.selectedStack = stackId;
    else if (this.selectedStack === stackId) this.selectedStack = -1;
    else {
      this.move(this.selectedStack, stackId);
      this.selectedStack = -1;
    }
    this.view.draw();
  };
}

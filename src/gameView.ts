class GameView {
  private game: Game;
  private container: HTMLDivElement;

  constructor(game: Game) {
    this.game = game;
    this.container = document.getElementById("gameContent") as HTMLDivElement;
  }

  private clear = () => (this.container.innerHTML = "");

  private drawTower = ({ stack, selected }: { stack: block[]; selected: boolean }, offset: number) => {
    stack.reverse().forEach((b, i) => {
      const width = Math.floor((16 * (b.size + 1)) / this.game.MAX);
      const e = document.createElement("div");
      e.className = `block ${b.color === 0 ? "light" : "dark"}  ${selected && stack.length - 1 == i ? "selected" : ""}`;
      e.style.left = `${offset + 10 - Math.floor(width / 2)}vw`;
      e.style.width = `${width}vw`;
      e.style.bottom = `${50 + 8 * i}vh`;
      e.style.zIndex = `${100 - i}`;
      this.container.appendChild(e);
    });
  };

  private drawScore = () => {
    const e = document.createElement("div");
    e.className = "scoreBox";
    e.innerHTML = `Moves: ${this.game.getMoves()}`;
    this.container.appendChild(e);
    if (this.game.getBestMoves() >= 0) {
      const h = document.createElement("div");
      h.className = "hScoreBox";
      h.innerHTML = `Best: ${this.game.getBestMoves()}`;
      this.container.appendChild(h);
    }
  };

  draw = () => {
    this.clear();

    this.drawTower(this.game.getStack(0), 10);
    this.drawTower(this.game.getStack(1), 40);
    this.drawTower(this.game.getStack(2), 70);
    this.drawScore();
  };
}

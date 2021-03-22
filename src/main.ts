/// <reference path="./game.ts" />

const newGame = (height: number) => {
  // @ts-ignore
  new GTheme().apply();
  const game = new Game(height, () => {
    alert("Congratulations, you won");
    newGame(4);
  });

  document.getElementById("leftBtn").onclick = () => game.click(0);
  document.getElementById("middleBtn").onclick = () => game.click(1);
  document.getElementById("rightBtn").onclick = () => game.click(2);
};

newGame(4);

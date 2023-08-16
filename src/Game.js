import Player from "./Player";

const Game = () => {
  // create player objects
  const player = Player();
  const bot = Player();

  // access player boards and set to their own variables
  const playerBoard = player.getBoard();
  const botBoard = bot.getBoard();

  
};

export default Game;

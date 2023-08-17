import Player from "./Player";

const Game = (() => {
  // create player objects
  const player = Player();
  const enemy = Player();

  const getPlayer = () => player;

  const getEnemy = () => enemy;

  return { getPlayer, getEnemy };
})();

export default Game;

// factory function that has state and functions.
// DOM needs to call from your game object to start the game, what game object would do when a cell is clicked in the UI.
// make action and retrieve states
// Update board states

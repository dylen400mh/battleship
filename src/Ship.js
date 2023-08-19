const Ship = (length, row, col, axis) => {
  // hits start at 0
  let hits = 0;

  // increments number of hits on a ship
  const hit = () => {
    hits += 1;
  };

  // returns number of hits
  const getHits = () => hits;

  // determines if a ship has sunk
  const isSunk = () => length === hits;

  return { length, hit, getHits, isSunk, row, col, axis };
};

export default Ship;

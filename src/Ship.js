const Ship = (length, row, col, axis) => {
  // hits start at 0
  let hits = 0;

  const getCells = () => {
    const cells = [];
    if (axis === "horizontal") {
      for (let i = col, j = 0; j < length; i += 1, j += 1) {
        cells.push([row, i]);
      }
    }

    if (axis === "vertical") {
      for (let i = row, j = 0; j < length; i += 1, j += 1) {
        cells.push([i, col]);
      }
    }

    return cells;
  };

  // increments number of hits on a ship
  const hit = () => {
    hits += 1;
  };

  // returns number of hits
  const getHits = () => hits;

  // determines if a ship has sunk
  const isSunk = () => length === hits;

  return { length, hit, getHits, isSunk, row, col, axis, getCells };
};

export default Ship;

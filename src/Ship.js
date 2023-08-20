const Ship = (length, row, col, axis) => {
  // hits start at 0
  let hits = 0;

  // get the cells a ship occupies
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

  // determines if a ship has sunk
  const isSunk = () => length === hits;

  return { length, row, col, axis, hit, isSunk, getCells };
};

export default Ship;

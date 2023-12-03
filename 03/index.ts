import input from "./input.js";

const rows = input.trim().split("\n");

type Matrix = string[][];

const matrix = rows.map((row) => row.split(""));

const isSpecialChar = (char) => !char.match(/\d/) && char !== ".";

/**
 * [rowIndex - 1, cellIndex - 1] [rowIndex - 1, cellIndex] [rowIndex - 1, cellIndex + 1]
 * [rowIndex, cellIndex - 1    ] [rowIndex, cellIndex    ] [ rowIndex, cellIndex + 1   ]
 * [rowIndex + 1, cellIndex - 1] [rowIndex + 1, cellIndex] [rowIndex + 1, cellIndex + 1]
 */
function getAdjacentCharactesrs(
  matrix: Matrix,
  rowIndex: number,
  cellIndex: number
) {
  return [
    {
      position: [rowIndex - 1, cellIndex - 1],
      char: matrix[rowIndex - 1]?.[cellIndex - 1],
    },
    {
      position: [rowIndex - 1, cellIndex],
      char: matrix[rowIndex - 1]?.[cellIndex],
    },
    {
      position: [rowIndex - 1, cellIndex + 1],
      char: matrix[rowIndex - 1]?.[cellIndex + 1],
    },
    {
      position: [rowIndex, cellIndex - 1],
      char: matrix[rowIndex]?.[cellIndex - 1],
    },
    {
      position: [rowIndex, cellIndex + 1],
      char: matrix[rowIndex]?.[cellIndex + 1],
    },
    {
      position: [rowIndex + 1, cellIndex - 1],
      char: matrix[rowIndex + 1]?.[cellIndex - 1],
    },
    {
      position: [rowIndex + 1, cellIndex],
      char: matrix[rowIndex + 1]?.[cellIndex],
    },
    {
      position: [rowIndex + 1, cellIndex + 1],
      char: matrix[rowIndex + 1]?.[cellIndex + 1],
    },
  ];
}

function getNumberDetails(matrix: Matrix, rowIndex: number, cellIndex: number) {
  let minCellIndex = cellIndex;
  let maxCellIndex = cellIndex;

  while (!isNaN(matrix[rowIndex][minCellIndex]) && minCellIndex >= 0) {
    minCellIndex--;
  }
  while (
    !isNaN(matrix[rowIndex][maxCellIndex]) &&
    maxCellIndex < matrix[rowIndex].length - 1
  ) {
    maxCellIndex++;
  }

  return {
    min: minCellIndex,
    max: maxCellIndex,
    number: parseInt(
      matrix[rowIndex].slice(minCellIndex + 1, maxCellIndex + 1).join("")
    ),
  };
}

// Part 1
function parseMatrix(matrix: Matrix) {
  const numberMap = new Map();

  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      // if char is a special character (exclude dot)
      if (isSpecialChar(cell)) {
        getAdjacentCharactesrs(matrix, rowIndex, cellIndex).forEach((adj) => {
          if (!isNaN(adj.char)) {
            let { min, max, number } = getNumberDetails(
              matrix,
              adj.position[0],
              adj.position[1]
            );
            const key = adj.position[0] + "-" + min;
            numberMap.set(key, number);
          }
        });
      }
    });
  });

  return numberMap;
}

const total = [...parseMatrix(matrix).values()].reduce(
  (acc, val) => acc + val,
  0
);

console.log("total part 1:", total);

// Part 2
function parseMatrix2(matrix: Matrix) {
  let total = 0;

  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      // if char is a special character (exclude dot)
      if (cell === "*") {
        const numbers = new Map();
        getAdjacentCharactesrs(matrix, rowIndex, cellIndex).forEach((adj) => {
          if (!isNaN(adj.char)) {
            let { min, max, number } = getNumberDetails(
              matrix,
              adj.position[0],
              adj.position[1]
            );
            const key = adj.position[0] + "-" + min;
            numbers.set(key, number);
          }
        });

        if (numbers.size === 2) {
          total += [...numbers.values()][0] * [...numbers.values()][1];
        }
      }
    });
  });

  return total;
}

console.log("total part 2:", parseMatrix2(matrix));

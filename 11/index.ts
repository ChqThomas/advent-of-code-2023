import input from "./input.js";

let matrix = input
  .trim()
  .split("\n")
  .map((row) => row.split("")) as Matrix;

type Case = "." | "#";
type Matrix = Case[][];

function expand(matrix: Matrix) {
  const rowsToDuplicate: number[] = [];
  const colsToDuplicate: number[] = [];

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    if (row.every((cell) => cell === ".")) {
      rowsToDuplicate.push(i);
    }
  }

  const cols = matrix[0].map((_, index) =>
    matrix.map((row) => row[index]).reverse()
  );

  for (let i = 0; i < cols.length; i++) {
    const col = cols[i];
    if (col.every((cell) => cell === ".")) {
      colsToDuplicate.push(i);
    }
  }

  return [rowsToDuplicate, colsToDuplicate];
}

function printMatrix(matrix: Matrix) {
  matrix.forEach((row) => console.log(row.join("")));
}

function findGalaxies(matrix: Matrix) {
  let galaxies: [number, number][] = [];

  matrix.forEach((row, x) => {
    row.forEach((col, y) => {
      if (col === "#") {
        galaxies.push([x, y]);
      }
    });
  });

  return galaxies;
}

const getPairs = (arr) =>
  arr.map((v, i) => arr.slice(i + 1).map((w) => [v, w])).flat();

function solve(matrix: Matrix, crossedSize: number) {
  const [rowsToDuplicate, colsToDuplicate] = expand(matrix);
  const galaxies = findGalaxies(matrix);
  const galaxiesPairs = getPairs(galaxies);

  return galaxiesPairs.reduce((acc, [start, end]) => {
    return (
      acc +
      getShortestPath(
        matrix,
        start,
        end,
        rowsToDuplicate,
        colsToDuplicate,
        crossedSize
      )
    );
  }, 0);
}

function getShortestPath(
  matrix: Matrix,
  start: [number, number],
  end: [number, number],
  rowsToDuplicate: number[],
  colsToDuplicate: number[],
  crossedSize: number
) {
  let crossed = 0;

  for (
    let i = Math.min(start[0], end[0]);
    i <= Math.max(start[0], end[0]);
    i++
  ) {
    if (rowsToDuplicate.includes(i)) {
      crossed++;
    }
  }

  for (
    let i = Math.min(start[1], end[1]);
    i <= Math.max(start[1], end[1]);
    i++
  ) {
    if (colsToDuplicate.includes(i)) {
      crossed++;
    }
  }

  return (
    Math.abs(start[0] - end[0]) +
    Math.abs(start[1] - end[1]) +
    crossed * (crossedSize - 1)
  );
}

console.log("total part 1 :", solve(matrix, 2));
console.log("total part 2 :", solve(matrix, 1000000));

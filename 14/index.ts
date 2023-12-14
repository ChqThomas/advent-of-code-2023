import input from "./input.js";

let rows = input
  .split("\n")
  .map((r) => r.split("")) as Row[];

type Case = "." | "#" | "O";
type Row = Case[];


function printMatrix(matrix: Row[]) {
  matrix.forEach((row) => console.log(row.join("")));
}


function rotateMatrix(matrix: Row[]): Row[] {
  return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
}

function rotateMatrixInverse(matrix: Row[]): Row[] {
  return matrix[0].map((val, index) => matrix.map(row => row[row.length-1-index]));
}

function tilt(matrix: Row[]): Row[] {

  matrix = rotateMatrix(matrix);

  matrix.forEach((row) => {
    let rockCount = 0;

    row.forEach((cell, i) => {
      
      if (cell === 'O') {
        rockCount++;
        row[i] = '.'
      } else if (cell === '#') {
        for (let j = 0; j < rockCount; j++) {
          row[i - j - 1] = 'O';
        }
        rockCount = 0;
      }
      
      if (i === row.length - 1) {
        for (let j = 0; j < rockCount; j++) {
          row[i - j] = 'O';
        }
        rockCount = 0;
      }
    })
  })

  return rotateMatrixInverse(matrix);
}

function cycle(matrix: Row[]): Row[] {
  matrix = tilt(matrix);
  matrix = rotateMatrix(matrix);
  matrix = tilt(matrix);
  matrix = rotateMatrix(matrix);
  matrix = tilt(matrix);
  matrix = rotateMatrix(matrix);
  matrix = tilt(matrix);
  matrix = rotateMatrix(matrix);
  return matrix
}

function countTotal(matrix: Row[]): number {
  let total = 0;
  matrix.forEach((row, i) => {
    let rowScore = matrix.length - i;
    row.forEach((cell) => {
      if (cell === "O") {
        total += rowScore;
      }
    });
  });
  return total;
}


// printMatrix(rows)
// printMatrix(cycle(rows))
console.log("total part 1 :", countTotal(tilt(rows)));

// works with 1000 instead of 1000000000 :)
for (let i = 0; i < 10000; i++) {
  rows = cycle(rows);
}

console.log("total part 2 :", countTotal(rows));




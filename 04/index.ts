import input from "./input.js";

let rows = input.trim().split("\n");

const parseNumbers = (numbers) =>
  numbers
    .split(" ")
    .filter((n) => n !== "")
    .map((n) => parseInt(n));

// Part 1
function getRowScore(row: string): number {
  let score = 0;

  let numbers = row.split(":")[1].split("|");

  const winningNumbers = parseNumbers(numbers[0]);
  const ownedNumbers = parseNumbers(numbers[1]);

  ownedNumbers.forEach((n) => {
    if (winningNumbers.includes(n)) {
      if (score === 0) {
        score += 1;
      } else {
        score *= 2;
      }
    }
  });

  return score;
}

const total = rows.reduce((acc, row) => acc + getRowScore(row), 0);

console.log("total part 1:", total);

function getWinCount(
  row: string,
): number {
  let numbers = row.split(":")[1].split("|");

  const winningNumbers = parseNumbers(numbers[0]);
  const ownedNumbers = parseNumbers(numbers[1]);

  return ownedNumbers.filter((n) => winningNumbers.includes(n)).length;
}

const wins = rows.map((row, index) => {
  return getWinCount(row);
})

let allCards = Array(wins.length).fill(1);

for (let i = 0; i < wins.length; i++) {
  let point = wins[i];
  for (let j = i + 1; j <= i + point; j++) {
    allCards[j] += allCards[i];
  }
}

const total2 = allCards.reduce((acc, v) => acc + v, 0);

console.log("total part 2:", total2);

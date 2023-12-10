import input from "./input.js";

let rows = input.trim().split("\n").map(row => row.split(" ").map(n => parseInt(n)));

function getNextValue(history: number[]) {

  let sequences = [history];
  let currentSequence = history;

  while (!isAllZero(currentSequence)) {
    currentSequence = getChildSequence(currentSequence);
    sequences.push(currentSequence);
  }

  const solvedSequences = sequences.reverse();
  
  solvedSequences.forEach((sequence, i) => {
    if (isAllZero(sequence)) {
      sequence.push(0);
    } else {
      const prev = sequences[i - 1];
      sequence.push(prev[prev.length - 1] + sequence[sequence.length - 1]);
    }
  });

  const lastSequence = solvedSequences[solvedSequences.length - 1];

  return lastSequence[lastSequence.length - 1]
}

function getChildSequence(history: number[]) {
  let childSequence: number[] = [];
  for (let i = 1; i < history.length; i++) {
    childSequence.push(history[i] - history[i - 1]);
  }
  return childSequence;
}

function isAllZero(sequence: number[]) {
  return sequence.every((n) => n === 0);
}

let total = rows.reduce((acc, row) => {
  return acc + getNextValue(row);
}, 0);

console.log("total part 1 :", total);

// Part 2

function getPrevValue(history: number[]) {

  let sequences = [history];
  let currentSequence = history;

  while (!isAllZero(currentSequence)) {
    currentSequence = getChildSequence(currentSequence);
    sequences.push(currentSequence);
  }

  const solvedSequences = sequences.reverse();
  
  solvedSequences.forEach((sequence, i) => {
    if (isAllZero(sequence)) {
      sequence.unshift(0);
    } else {
      const prev = sequences[i - 1];
      sequence.unshift(sequence[0] - prev[0]);
    }
  });

  return solvedSequences.reverse()[0][0]
}

let total2 = rows.reduce((acc, row) => {
  return acc + getPrevValue(row);
}, 0);

console.log("total part 2 :", total2);

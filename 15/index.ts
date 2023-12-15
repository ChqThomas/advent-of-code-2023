import input from "./input.js";

let sequences = input.split(",");

function getAsciiCode(char: string) {
  return char.charCodeAt(0);
}

function hash(sequence: string) {
  let current = 0;
  sequence.split("").forEach((char) => {
    current += getAsciiCode(char);
    current *= 17;
    current %= 256;
  })

  return current;
}

const total = sequences.reduce((acc, sequence) => {
  return acc + hash(sequence);
}, 0);

console.log("total part 1 :", total);




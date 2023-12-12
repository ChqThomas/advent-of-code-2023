import input from "./input.js";

let rows = input
  .split("\n")
  .map((r) => r.split(" "))
  .map(([springs, records]) => {
    return {
      springs: springs.split(""),
      records: records.split(",").map((r) => +r),
    };
  }) as Row[];

type Spring = "." | "#" | "?";
type Row = {
  springs: Spring[];
  records: number[];
};

// bruteforce :)
function solve(row: Row) {
  const unknowns = row.springs.reduce((acc: number[], s, i) => {
    if (s === "?") {
      acc.push(i);
    }
    return acc;
  }, []);

  const allPossible = combinations(unknowns);

  console.log("possibilities", allPossible.length);

  return allPossible.filter((combination) => {
    const newSprings = row.springs.map((s, i) => {
      if (s === "?") {
        if (combination.includes(i)) {
          return "#";
        } else {
          return ".";
        }
      }
      return s;
    });

    // console.log(newSprings, newSprings.join('').split('.').map((s) => s.length).filter(s => s > 0));

    return (
      newSprings
        .join("")
        .split(".")
        .map((s) => s.length)
        .filter((s) => s > 0)
        .toString() === row.records.toString()
    );
  }).length;
}

// https://stackoverflow.com/a/42531964
function combinations(array) {
  return new Array(1 << array.length)
    .fill()
    .map((e1, i) => array.filter((e2, j) => i & (1 << j)));
}

// const total1 = rows.reduce((acc, r) => acc + solve(r), 0);

// console.log("total part 1 :", total1);


// part 2 

function unfold(row: Row) {
  row.springs = Array(5).fill(row.springs).flat();
  row.records = Array(5).fill(row.records).flat();

  return row;
}

// too slow ..
const total2 = rows.reduce((acc, r) => acc + solve(unfold(r)), 0);

console.log("total part 2 :", total2);
import input from "./input.js";

export type Direction = "L" | "R";

export type Node = {
  L: string;
  R: string;
};

function parseInput(input: string): [Direction[], Map<string, Node>] {
  let rows = input.trim().split("\n");
  let directions = rows[0].split("") as Direction[];
  let nodes = new Map();
  rows.splice(0, 2);
  rows.forEach((r) => {
    nodes.set(r.split(" ")[0], {
      L: r.split("").splice(7, 3).join(""),
      R: r.split("").splice(12, 3).join(""),
    });
  });

  return [directions, nodes];
}

const [directions, nodes] = parseInput(input);

function getNextDirection(directions: Direction[], step: number) {
  return directions[step % directions.length];
}

function findEnd(directions: Direction[], nodes: Map<string, Node>) {
  let step = 0;
  let currentStep = "AAA";
  let currentDirection = getNextDirection(directions, step);

  while (currentStep !== "ZZZ") {
    let node = nodes.get(currentStep)!;
    currentStep = node[currentDirection];
    step++;
    currentDirection = getNextDirection(directions, step)
  }

  return step;
}

console.log("total part 1 :", findEnd(directions, nodes));

// part 2

const startingNodes = new Map(
  [...nodes]
  .filter(([k, v]) => k.endsWith('A') )
);

function findEnd2(directions: Direction[], startingNodes: Map<string, Node>, nodes: Map<string, Node>) {
  let step = 0;
  let currentSteps = [...startingNodes.keys()];
  let currentDirection = getNextDirection(directions, step);

  while (!currentSteps.every((k) => k.endsWith('Z'))) {

    currentSteps = currentSteps.map((k) => {
      let node = nodes.get(k)!;
      return node[currentDirection];
    })

    step++;
    currentDirection = getNextDirection(directions, step);

    if (step % 1000000 === 0) {
      console.log(step, currentSteps);
    }
  }

  return step;
}

// Too slow :(
console.log("total part 2 :", findEnd2(directions, startingNodes, nodes));
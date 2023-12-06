import input from "./input.js";

let rows = input.trim().split("\n");

const timesStr = rows[0].split('     ');
const distancesStr = rows[1].split('   ');

// Could be cleaner :)
const times = timesStr.slice(1, timesStr.length).map((time, i) => parseInt(time.trim()));
const distances = distancesStr.slice(1, distancesStr.length).map((distance, i) => parseInt(distance.trim()));

type Race = {
  time: number,
  distance: number
}

const races: Race[] = times.map((time, i) => ({
  time: time,
  distance: distances[i]
}))

function canWinRace(speedPerSecond: number, goalDistance: number, remainingTime: number) {
  return speedPerSecond * remainingTime > goalDistance;
}

export function getPossibleWinsCount(race: Race) {
  let winsCount = 0;

  for (let i = 0; i < race.time; i++) {
    if (canWinRace(i, race.distance, race.time - i)) {
      winsCount++;
    }
  }

  return winsCount;
}

const total1 = races.reduce((acc, race) => acc * getPossibleWinsCount(race), 1);

console.log("total part 1:", total1);

// Part 2
// Could be cleaner :)
const race2: Race = {
  time: parseInt(timesStr.slice(1, timesStr.length).map((time, i) => time.trim()).join('')),
  distance: parseInt(distancesStr.slice(1, distancesStr.length).map((distance, i) => distance.trim()).join(''))
}

console.log("total part 2:", getPossibleWinsCount(race2));

import input from './input.js';

const rows = input.trim().split('\n');

function getColors(round) {
    return {
        red: parseInt(round.match(/(\d+) red/g)) || 0,
        blue: parseInt(round.match(/(\d+) blue/g)) || 0,
        green: parseInt(round.match(/(\d+) green/g)) || 0
    }
}

// Part 1
function parseGame(row) {
    const id = parseInt(row.match(/\d+/g));
    const rounds = row.replace(/.*: /g, '').split(';');
    const valid = rounds.every(round => {
        const { red, blue, green } = getColors(round);
        return red <= 12 && green <= 13 && blue <= 14;
    });
    
    return valid ? id : 0;
}

const total1 = rows.reduce((acc, r) => {
    return acc += parseGame(r);
}, 0);

console.log('total part 1:', total1);

// Part 2
function parseGamePower(row) {
    const rounds = row.replace(/.*: /g, '').split(';');

    let minRed = 0;
    let minBlue = 0;
    let minGreen = 0;

    rounds.forEach(round => {
        const { red, blue, green } = getColors(round);
        minRed = Math.max(minRed, red);
        minBlue = Math.max(minBlue, blue);
        minGreen = Math.max(minGreen, green);
    });
    
    return minRed * minBlue * minGreen;
}

const total2 = rows.reduce((acc, r) => {
    return acc += parseGamePower(r);
}, 0);

console.log('total part 2:', total2);

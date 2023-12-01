import input from './input.js';

const rows = input.trim().split('\n');

// Part 1
const total1 = rows.reduce((acc, r) => {
    const digits = r.replace(/\D/g, '');
    return acc += parseInt(digits[0] + digits[digits.length - 1]);
}, 0);

console.log('Total part 1:', total1);

// Part 2
const total2 = rows.reduce((acc, r) => {

    const numbers = { 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine' };

    for (const [key, value] of Object.entries(numbers)) {
        r = r.replace(new RegExp(value, 'g'), `${value}${key}${value}`);
    }

    const digits = r.replace(/\D/g, '');
    return acc += parseInt(digits[0] + digits[digits.length - 1]);
}, 0);

console.log('Total part 2:', total2);


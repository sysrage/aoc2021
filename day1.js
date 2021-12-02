const { readFileSync } = require('fs');
const data = readFileSync('./data/day1.txt', 'utf8').split(/\r?\n/).map(d => parseInt(d));

// Part 1
let last = 0;
let increases = -1;
for (const entry of data) {
    if (entry > last) increases++;
    last = entry;
}
console.log('\n\n=== PART 1 ===');
console.log(`Total Increases: ${increases}`);

// Part 2
increases = 0;
for (let i = 1; i < data.length; i++) {
    if (data[i] + data[i+1] + data[i+2] > data[i-1] + data[i] + data[i+1]) increases++;
}
console.log('\n\n=== PART 2 ===');
console.log(`Total Increases: ${increases}`);

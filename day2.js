const { readFileSync } = require('fs');
const data = readFileSync('./data/day2.txt', 'utf8').split(/\r?\n/);

// Part 1
let pos = 0;
let depth = 0;
for (const entry of data) {
    const [ command, value ] = entry.split(' ');
    switch (command) {
        case 'forward': {
            pos += parseInt(value);
        } break;

        case 'up': {
            depth -= parseInt(value);
        } break;

        case 'down': {
            depth += parseInt(value);
        } break;
    }
}
console.log('\n\n=== PART 1 ===');
console.log(`Final Position: ${pos}`);
console.log(`Final Depth: ${depth}`);
console.log(`Part 1 Answer: ${pos * depth}`);

// Part 2
pos = 0;
depth = 0;
aim = 0;
for (const entry of data) {
    const [ command, value ] = entry.split(' ');
    switch (command) {
        case 'forward': {
            pos += parseInt(value);
            depth += aim * parseInt(value);
        } break;

        case 'up': {
            aim -= parseInt(value);
        } break;

        case 'down': {
            aim += parseInt(value);
        } break;
    }
}
console.log('\n\n=== PART 2 ===');
console.log(`Final Position: ${pos}`);
console.log(`Final Depth: ${depth}`);
console.log(`Part 1 Answer: ${pos * depth}`);

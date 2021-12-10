const { readFileSync } = require('fs');
const data = readFileSync('./data/day10.txt', 'utf8').split(/\r?\n/).filter(d => d !== '');

const openChars = ['(', '[', '{', '<'];
const closeChars = [')', ']', '}', '>'];
const scoreTable = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
};

// Part 1
console.log('\n\n=== PART 1 ===');
let score = 0;
const incomplete = [];
for (const [index, row] of data.entries()) {
    let validLine = true;
    const line = row.split('');
    const openers = [];
    for (let i = 0; i < line.length; i++) {
        if (openChars.includes(line[i])) {
            openers.push(line[i]);
            continue;
        }
        const closeCharIndex = closeChars.indexOf(line[i]);
        if (closeCharIndex < 0) {
            // console.log(`Invalid character: ${line[i]}`);
            validLine = false;
            break;
        }
        if (openers[openers.length - 1] !== openChars[closeCharIndex]) {
            // console.log(`Unexpected Close Character On Row ${index}: ${line[i]} -- score: ${scoreTable[line[i]]}`);
            score += scoreTable[line[i]];
            validLine = false;
            break;
        }
        if (!validLine) continue;
        openers.pop();
    }
    if (validLine) {
        incomplete.push({ index, openers });
    }
}
console.log(`Total Score: ${score}`);


// Part 2
console.log('\n\n=== PART 2 ===');
const scoreTable2 = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
};
const scores = [];
for (const row of incomplete) {
    score = 0;
    for (let i = row.openers.length - 1; i >= 0; i--) {
        score = score * 5;
        score += scoreTable2[row.openers[i]];
    }
    scores.push(score);
}
console.log(`Middle Score: ${scores.sort((a, b) => (a - b))[Math.floor(scores.length / 2)]}`);

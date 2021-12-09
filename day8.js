const { readFileSync } = require('fs');
const data = readFileSync('./data/day8.txt', 'utf8').split(/\r?\n/).filter(d => d !== '');

const mappedData = data.map(d => {
    const split = d.split('|');
    const patterns = split[0].trim().split(' ');
    const output = split[1].trim().split(' ');
    return { patterns, output };
});

const digitMap = [
    { digit: 0, segments: 'abcefg'},
    { digit: 1, segments: 'cf'},
    { digit: 2, segments: 'acdeg'},
    { digit: 3, segments: 'acdfg'},
    { digit: 4, segments: 'bcdf'},
    { digit: 5, segments: 'abdfg'},
    { digit: 6, segments: 'abdefg'},
    { digit: 7, segments: 'acf'},
    { digit: 8, segments: 'abcdefg'},
    { digit: 9, segments: 'abcdfg'},
];


// Part 1
let uniqueCount = 0;
for (const input of mappedData) {
    for (let display = 0; display < input.output.length; display++) {
        const lenMatches = digitMap.filter(d => d.segments.length === input.output[display].length);
        if (lenMatches.length === 1) uniqueCount++;
    }
};
console.log('\n\n=== PART 1 ===');
console.log(`Total Unique Output Digits: ${uniqueCount}`);


// Part 2
let total = 0;
for (const input of mappedData) {
    const { patterns, output } = input;
    const decoder = new Array(10).fill(null);
    const segmentDecoder = {
        'a': null,
        'b': null,
        'c': null,
        'd': null,
        'e': null,
        'f': null,
        'g': null,
    };

    // Map unique digits to decoder
    for (const signal of [...patterns, ...output]) {
        const lenMatches = digitMap.filter(d => d.segments.length === signal.length);
        if (lenMatches.length === 1) {
            decoder[lenMatches[0].digit] = signal;
        }
    }

    // A is easy
    segmentDecoder['a'] = decoder[7].split('').filter(l => !decoder[1].includes(l))[0];

    // Determine segment values of all six-segment digits
    const sixLengthSignals = [...patterns, ...output].filter( p => p.length === 6);
    const zeroAndSix = []
    for (const s of sixLengthSignals) {
        const g = s.split('').filter(l => !decoder[7].includes(l) && !decoder[4].includes(l)).filter(l => decoder[8].includes(l) && !decoder[7].includes(l));
        if (g.length === 1) {
            segmentDecoder['g'] = g[0];
        } else {
            zeroAndSix.push(s);
        }
    }
    decoder[9] = decoder[4] + segmentDecoder['a'] + segmentDecoder['g'];
    for (const s of zeroAndSix) {
        segmentDecoder['e'] = s.split('').filter(l => !decoder[4].includes(l) && !decoder[7].includes(l)).filter(l => l !== segmentDecoder['g'])[0];
    }
    decoder[0] = zeroAndSix.filter(s => s.split('').filter(l => !decoder[7].includes(l)).length === 3)[0];
    decoder[6] = zeroAndSix.filter(s => s.split('').filter(l => !decoder[7].includes(l)).length === 4)[0];

    segmentDecoder['c'] = decoder[8].split('').filter(l => !decoder[6].includes(l))[0];
    segmentDecoder['d'] = decoder[8].split('').filter(l => !decoder[0].includes(l))[0];
    segmentDecoder['b'] = decoder[4].split('').filter(l => !decoder[1].includes(l)).filter(l => l !== segmentDecoder['d'])[0];
    segmentDecoder['f'] = decoder[1].split('').filter(l => l !== segmentDecoder['c'])[0];

    const searchPatterns = [
        { digit: 2, pattern: 'acdeg'},
        { digit: 3, pattern: 'acdfg'},
        { digit: 5, pattern: 'abdfg'},
    ];
    for (const searchPattern of searchPatterns) {
        const decodedPattern = searchPattern.pattern.split('').map(l => segmentDecoder[l]).sort().join('');
        decoder[searchPattern.digit] = patterns.filter(p => p.split('').sort().join('') === decodedPattern)[0];
    }

    const sortedDecoder = decoder.map(d => d.split('').sort().join(''));

    const displayOutput = [];
    for (const screen of output) {
        displayOutput.push(sortedDecoder.indexOf(screen.split('').sort().join('')));
    }
    total += parseInt(displayOutput.join(''));
};
console.log('\n\n=== PART 2 ===');
console.log(`Total Output: ${total}`);

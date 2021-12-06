const { readFileSync } = require('fs');
const data = readFileSync('./data/day5.txt', 'utf8').split(/\r?\n/);

// Build lists of lines
const lines = [];
const allX = [];
const allY = [];
for (const line of data) {
    if (line === '') continue;
    const splitLine = /([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/.exec(line);
    const start = [parseInt(splitLine[1]), parseInt(splitLine[2])];
    const end = [parseInt(splitLine[3]), parseInt(splitLine[4])];
    lines.push({ start, end });
    allX.push(start[0], end[0]);
    allY.push(start[1], end[1]);
}

// Build blank map of sea floor
const seaFloor = [];
const part2Floor = [];
for (let i = 0; i <= Math.max(...allY); i++) {
    seaFloor.push(new Array(Math.max(...allX) + 1).fill(0));
    part2Floor.push(new Array(Math.max(...allX) + 1).fill(0));
}

// Function to update sea floor map with line data
const addLine = (start, end, diagonal) => {
    if (start[0] === end[0]) {
        // Horizontal Line
        const x = start[0];
        const startY = start[1] < end[1] ? start[1] : end[1];
        const endY = start[1] < end[1] ? end[1] : start[1];
        for (let y = startY; y <= endY; y++) {
            seaFloor[x][y]++;
            if (diagonal) part2Floor[x][y]++;
        }
    } else if (start[1] === end[1]) {
        // Vertical Line
        const y = start[1];
        const startX = start[0] < end[0] ? start[0] : end[0];
        const endX = start[0] < end[0] ? end[0] : start[0];
        for (let x = startX; x <= endX; x++) {
            seaFloor[x][y]++;
            if (diagonal) part2Floor[x][y]++;
        }
    } else {
        // Diagonal Line
        if (!diagonal) return;
        const startX = start[0] < end[0] ? start[0] : end[0];
        const endX = start[0] < end[0] ? end[0] : start[0];
        const startY = start[0] < end[0] ? start[1] : end[1];
        const endY = start[0] < end[0] ? end[1] : start[1];
        let y = startY;
        for (let x = startX; x <= endX; x++) {
            part2Floor[x][y]++;
            if (startY < endY) {
                y++;
            } else {
                y--;
            }
        }
    }
};

// Add all horizontal and vertical lines to sea floor -- Part 1
for (const line of lines) {
    addLine(line.start, line.end);
}

// Search for line intersections -- Part 1
let intersections = 0;
for (const row of seaFloor) {
    const rowIntersections = row.reduce((a, v) => (v > 1 ? a += 1 : a), 0);
    intersections += rowIntersections;
}

console.log('\n\n=== PART 1 ===');
console.log(`Intersection Points: ${intersections}`);

// Add all diagonal lines to sea floor -- Part 2
for (const line of lines) {
    addLine(line.start, line.end, true);
}

// Search for line intersections -- Part 2
intersections = 0;
for (const row of part2Floor) {
    const rowIntersections = row.reduce((a, v) => (v > 1 ? a += 1 : a), 0);
    intersections += rowIntersections;
}

console.log('\n\n=== PART 2 ===');
console.log(`Intersection Points: ${intersections}`);

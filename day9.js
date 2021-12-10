const { readFileSync } = require('fs');
// const data = readFileSync('./data/day9.txt', 'utf8').split(/\r?\n/).filter(d => d !== '').map(d => d.split('').map(n => parseInt(n)));
const rawData = `
2199943210
3987894921
9856789892
8767896789
9899965678
`;
const data = rawData.split(/\r?\n/).filter(d => d !== '').map(d => d.split('').map(n => parseInt(n)));

// Part 1
console.log('\n\n=== PART 1 ===');
let total = 0;
const lowpoints = [];
for (let x = 0; x < data[0].length; x++) {
    for (let y = 0; y < data.length; y++) {
        const value = data[y][x];
        const lowerThanLeft = x === 0 ? true : value < data[y][x - 1];
        const lowerThanRight = x === data[y].length - 1 ? true : value < data[y][x + 1];
        const lowerThanUp = y === 0 ? true : value < data[y - 1][x];
        const lowerThanDown = y === data.length - 1 ? true : value < data[y + 1][x];
        if (lowerThanLeft && lowerThanRight && lowerThanUp && lowerThanDown) {
            total += 1 + value;
            lowpoints.push({ x, y });
        }
    }
}
console.log(`Sum of risk levels: ${total}`);

// Part 2
const ventMap = [];
for (let x = 0; x < data[0].length; x++) {
    for (let y = 0; y < data.length; y++) {
        if (y > ventMap.length - 1) ventMap.push([]);
        if (lowpoints.filter(lp => lp.x === x && lp.y === y).length) {
            ventMap[y].push('*');
        } else {
            ventMap[y].push('#');
        }
    }
}

total = 1;
const getSize = (startX, startY, direction) => {
    let size = 0;
    switch (direction) {
        case 'left': {
            for (let x = startX - 1; x >= 0; x--) {
                if (data[startY][x] === 9) break;
                size++;
            }
        } break;
        case 'right': {
            for (let x = startX + 1; x < data[startY].length; x++) {
                if (data[startY][x] === 9) break;
                size++;
            }
        } break;
        case 'up': {
            for (let y = startY - 1; y >= 0; y--) {
                if (data[y][startX] === 9) break;
                size++;
            }
        } break;
        case 'down': {
            for (let y = startY + 1; y < data.length; y++) {
                if (data[y][startX] === 9) break;
                size++;
            }
        } break;
    }
    return size;
};

console.log('\n\n=== PART 2 ===');
for (const [index, lowpoint] of lowpoints.entries()) {
    ventMap[lowpoint.y][lowpoint.x] = index;
    const leftSize = getSize(lowpoint.x, lowpoint.y, 'left');
    const rightSize = getSize(lowpoint.x, lowpoint.y, 'right');
    const upSize = getSize(lowpoint.x, lowpoint.y, 'up');
    const downSize = getSize(lowpoint.x, lowpoint.y, 'down');

    // Test Left
    for (let currentX = lowpoint.x; currentX >= 0; currentX--) {
        if (data[lowpoint.y][currentX] === 9) break;
        ventMap[lowpoint.y][currentX] = index;
        // Test Left-Up
        const currentUpSize = getSize(currentX, lowpoint.y, 'up');
        for (let currentY = lowpoint.y; currentY >= lowpoint.y - currentUpSize; currentY--) {
            ventMap[currentY][currentX] = index;
        }
        // Test Left-Down
        const currentDownSize = getSize(currentX, lowpoint.y, 'down');
        for (let currentY = lowpoint.y; currentY < lowpoint.y + currentDownSize; currentY++) {
            ventMap[currentY][currentX] = index;
        }

    }
    // Test Right
    for (let currentX = lowpoint.x + 1; currentX < data[lowpoint.y].length; currentX++) {
        if (data[lowpoint.y][currentX] === 9) break;
        ventMap[lowpoint.y][currentX] = index;
        // Test Right-Up
        const currentUpSize = getSize(currentX, lowpoint.y, 'up');
        for (let currentY = lowpoint.y; currentY >= lowpoint.y - currentUpSize; currentY--) {
            ventMap[currentY][currentX] = index;
        }
        // Test Right-Down
        const currentDownSize = getSize(currentX, lowpoint.y, 'down');
        for (let currentY = lowpoint.y; currentY < lowpoint.y + currentDownSize; currentY++) {
            ventMap[currentY][currentX] = index;
        }

    }



    total += leftSize + rightSize + upSize + downSize;
    console.log(`lowpoint ${lowpoint.x}, ${lowpoint.y}`);
    console.log(`Sum of all sizes: ${1 + leftSize + rightSize + upSize + downSize}`);
    // console.log('leftSize', leftSize);
    // console.log('rightSize', rightSize);
    // console.log('upSize', upSize);
    // console.log('downSize', downSize);
    // console.log(`Lowpoint ${lowpoint.x}, ${lowpoint.y}: ${1 + leftSize + rightSize + downSize + upSize}`);
}
for (const row of ventMap.map(row => row.join(''))) {
    console.log(`${row}\r\n`);
}

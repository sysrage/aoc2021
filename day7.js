const { readFileSync } = require('fs');
const data = readFileSync('./data/day7.txt', 'utf8').split(/\r?\n/).filter(d => d !== '')[0].split(',').map(d => parseInt(d));

const max = data.reduce((a, v) => (v > a ? v : a));
const min = data.reduce((a, v) => (v < a ? v : a));

let minUsagePos = 0;
let minUsageFuel = 0;
for (let pos = min; pos <= max; pos++) {
    let fuel = 0;
    for (const crab of data) {
        fuel += pos > crab ? pos - crab : crab - pos;
    }
    if (!minUsagePos || fuel < minUsageFuel) {
        minUsagePos = pos;
        minUsageFuel = fuel;
    }
}

console.log('\n\n=== PART 1 ===');
console.log(`Horizontal Position: ${minUsagePos} (${minUsageFuel} fuel)`);


minUsagePos = 0;
minUsageCost = 0;
for (let pos = min; pos <= max; pos++) {
    let totalCost = 0;
    for (const crab of data) {
        const steps = pos > crab ? pos - crab : crab - pos;
        let cost = 0;
        for (let i = 0; i < steps; i++) {
            cost += i + 1;
        }
        totalCost += cost;
    }
    if (!minUsagePos || totalCost < minUsageCost) {
        minUsagePos = pos;
        minUsageCost = totalCost;
    }
}

console.log('\n\n=== PART 2 ===');
console.log(`Horizontal Position: ${minUsagePos} (${minUsageCost} fuel)`);

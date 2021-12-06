const { readFileSync } = require('fs');
const data = readFileSync('./data/day6.txt', 'utf8').split(/\r?\n/).filter(d => d !== '')[0].split(',').map(d => parseInt(d));
console.log('\n\n=== PART 1 ===');
console.log(`Initial Fish: ${data.join(',')}`);
let newFishCount = 0;
for (let day = 1; day <= 80; day++) {
    newFishCount = 0;
    for (let fishIndex = 0; fishIndex < data.length; fishIndex++) {
        if (data[fishIndex] === 0) {
            data.splice(fishIndex, 1, 7);
            newFishCount++;
        }
        data.splice(fishIndex, 1, data[fishIndex] - 1);
    }
    if (newFishCount > 0) data.push(...new Array(newFishCount).fill(8));
    console.log(`After Day ${day}: ${data.length}`);
}


const data2 = readFileSync('./data/day6.txt', 'utf8').split(/\r?\n/).filter(d => d !== '')[0].split(',').map(d => parseInt(d));
const buckets = {};
for (let i = 0; i <= 8; i++) {
    buckets[i] = 0;
}
for (const bucket of Object.keys(buckets)) {
    buckets[bucket] = data2.reduce((a, v) => (v == bucket ? a + 1 : a), 0);
}

console.log('\n\n=== PART 2 ===');
console.log('Initial Fish Buckets:', JSON.stringify(buckets, null, 2));
for (let day = 1; day <= 256; day++) {
    newFishCount = 0;
    for (const bucket of Object.keys(buckets)) {
        if (bucket === '0') {
            newFishCount = buckets[bucket];
            buckets[bucket] = 0;
        } else {
            buckets[bucket - 1] += buckets[bucket];
            buckets[bucket] = 0;
        }
    }
    if (newFishCount > 0) {
        buckets[6] += newFishCount;
        buckets[8] += newFishCount;
    }
}
console.log('Ending Fish Buckets:', JSON.stringify(buckets, null, 2));
let totalFish = 0;
for (const bucket of Object.keys(buckets)) {
    totalFish += buckets[bucket];
}
console.log(`Total Fish: ${totalFish}`);

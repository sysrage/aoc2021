const { readFileSync } = require('fs');
const data = readFileSync('./data/day3.txt', 'utf8').split(/\r?\n/);

// Part 1
const getScores = (inputData) => {
    const scores = {};
    for (let i = 0; i < inputData[0].length; i++) {
        scores[i] = { 0: 0, 1: 0 };
        for (const entry of inputData) {
            if (!entry) continue;
            scores[i][entry[i]]++;
        }
    }
    return scores;
};

// Part 1
(() => {
    const scores = getScores(data);
    let gamma = '';
    let epsilon = '';
    for (let i = 0; i < data[0].length; i++) {
        if (scores[i][0] > scores[i][1]) {
            gamma += '0';
            epsilon += '1';
        } else {
            gamma += '1';
            epsilon += '0';
        }
    }
    const gammaRate = parseInt(gamma, 2);
    const epsilonRate = parseInt(epsilon, 2);
    console.log('\n\n=== PART 1 ===');
    console.log(`Gamma Rate: ${gammaRate}`);
    console.log(`Epsilon Rate: ${epsilonRate}`);
    console.log(`Answer: ${gammaRate * epsilonRate}`);
})();


// Part 2
(() => {
    let oxygen = [ ...data ];
    let i = 0;
    while (oxygen.length > 1) {
        const scores = getScores(oxygen);
        const o = scores[i][0] === scores[i][1] ? '1' : scores[i][0] > scores[i][1] ? '0' : '1';
        for (let j = 0; j < oxygen.length; j++) {
            if (oxygen[j][i] !== o) {
                oxygen.splice(j, 1);
                j--;
            }
        }
        i++;
        if (i > scores.length) break;
    }

    let co2 = [ ...data ];
    i = 0;
    while (co2.length > 1) {
        const scores = getScores(co2);
        const c = scores[i][0] === scores[i][1] ? '0' : scores[i][0] < scores[i][1] ? '0' : '1';
        for (let j = 0; j < co2.length; j++) {
            if (co2[j][i] !== c) {
                co2.splice(j, 1);
                j--;
            }
        }
        i++;
        if (i > scores.length) break;
    }
    const oxygenRate = parseInt(oxygen[0], 2);
    const co2Rate = parseInt(co2[0], 2);
    console.log('\n\n=== PART 2 ===');
    console.log(`Oxygen Rate: ${oxygenRate}`);
    console.log(`CO2 Rate: ${co2Rate}`);
    console.log(`Life Support Rate: ${oxygenRate * co2Rate}`);
})();

const { readFileSync } = require('fs');
const data = readFileSync('./data/day4.txt', 'utf8').split(/\r?\n/);

const numbersCalled = data.shift().split(',');
const boards = {};
let boardNumber = 0;
for (const [index, line] of data.entries()) {
    if (line === '') {
        boardNumber++;
        if (index < data.length - 1 && !Object.keys(boards).includes(boardNumber)) boards[boardNumber] = [];
        continue;
    }
    const boardRow = line.match(/[0-9]{1,2}/g);
    boards[boardNumber].push(boardRow);
}
const scoreBoards = {};
for (const boardNum of Object.keys(boards)) {
    scoreBoards[boardNum] = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];
}

const countMarked = (arr) => (arr.reduce((a, v) => (v === 1 ? a + 1 : a), 0));

let winningBoard = false;
let firstWinner = false;
let firstScore = 0;
let lastWinner = false;
let lastScore = 0;
const winnerList = [];
for (const numberCalled of numbersCalled) {
    winningBoard = false;
    for (const boardNum of Object.keys(boards)) {
        if (winnerList.includes(boardNum)) continue;
        const boardToTest = boards[boardNum];
        // Mark number on scoreBoard if found
        for (let rowNum = 0; rowNum < boardToTest.length; rowNum++) {
            const row = boardToTest[rowNum];
            const match = row.indexOf(numberCalled);
            if (match >= 0) scoreBoards[boardNum][rowNum].splice(match, 1, 1);
        }
        // Check scoreBoard for 5-in-a-row
        for (const row of scoreBoards[boardNum]) {
            if (countMarked(row) === 5) {
                winningBoard = boardNum;
                break;
            }
        }
        if (!winningBoard) {
            for (let i = 0; i < scoreBoards[boardNum][0].length; i++) {
                let markCount = 0;
                for (const row of scoreBoards[boardNum]) {
                    if (row[i] === 1) markCount++;
                }
                if (markCount === 5) {
                    winningBoard = boardNum;
                    break;
                }
            }
        }

        if (winningBoard) {
            // Determine score for winning board
            let score = 0;
            for (let row = 0; row < boards[winningBoard].length; row++) {
                for (let col = 0; col < boards[winningBoard][row].length; col++) {
                    if (scoreBoards[winningBoard][row][col] === 0) score += parseInt(boards[winningBoard][row][col]);
                }
            }

            if (!firstWinner) {
                firstWinner = winningBoard;
                firstScore = score * numberCalled;
            }

            lastWinner = winningBoard;
            lastScore = score * numberCalled;
            winnerList.push(winningBoard);
        }
    }
}

console.log('\n\n=== PART 1 ===');
console.log(`Board #${firstWinner} is the winner!`);
console.log(`Score: ${firstScore}`);
console.log(boards[firstWinner]);
console.log(scoreBoards[firstWinner]);

console.log('\n\n=== PART 2 ===');
console.log(`Last Board To Win: ${lastWinner}`);
console.log(`Score: ${lastScore}`);
console.log(boards[lastWinner]);
console.log(scoreBoards[lastWinner]);

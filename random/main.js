let prompt = require("prompt-sync")();

// console.log(prompt("what's your name? "));

// 1. Deposite some money
// 2. Determine number of lines to bet on
// 3. Collect a bet anmount
// 4. Spin the slot machince
// 5. check if the user won
// 6. Give the user their winnings
// 7. Play again

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};

const deposit = () => {
    while (true) {
        const depositAmount = parseFloat(prompt("Enter a deposit amount: "));

        if (depositAmount > 0 || !isNaN(depositAmount)) {
            return depositAmount;
        } else {
            console.log("Invalid deposit amount, try again.");
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = parseFloat(
            prompt("Enter the number of lines to bet on (1-3): ")
        );

        if (lines > 0 && lines <= 3) {
            return lines;
        } else {
            console.log("Invalid number of lines, try again.");
        }
    }
};

const getBetPerLine = (balance, lines) => {
    while (true) {
        const bet = parseFloat(prompt("Enter the bet per line: "));

        if (bet > 0 && bet <= balance / lines) {
            return bet;
        } else {
            console.log("Invalid s, try again.");
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    // console.log(symbols);
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (let row of rows) {
        let rowStr = "";
        for (const [i, symbol] of row.entries()) {
            rowStr += symbol;
            if (i !== row.length - 1) {
                rowStr += " | ";
            }
        }
        console.log(rowStr);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];

        let allSame = true;

        for (const symbol of symbols) {
            if (symbol !== symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};

const game = () => {
    let balance = deposit();
    while (true) {
        const numberOfLines = getNumberOfLines();
        const bet = getBetPerLine(balance, numberOfLines);
        balance -= bet * numberOfLines;

        const reels = spin();
        const rows = transpose(reels);
        console.log(`You have a balance of ${balance}`);
        printRows(rows);

        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log(`You won, $${winnings}`);
        console.log(`You have a balance of ${balance}`);

        if (balance <= 0) break;

        const playAgain = prompt("Do you want to play again (y/n)? ");
        if (playAgain != "y") break;
    }
    console.log("Game Over!");
};

game();

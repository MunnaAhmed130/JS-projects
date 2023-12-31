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

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBetPerLine(balance, numberOfLines);

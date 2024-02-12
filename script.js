const status = document.getElementById('status');
const restartButton = document.getElementById('restart-button');
const resultContainer = document.getElementById('result'); // Result container

const X_CLASS = 'x';
const O_CLASS = 'o';
let xTurn = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    xTurn = true;
    resultContainer.innerText = ''; // Clear the result container
    cells.forEach(cell => {
        cell.innerText = ''; // Clear the cell content
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.classList.remove('winner');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    status.innerText = "Player X's turn";
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    cell.innerText = currentClass.toUpperCase(); // Set inner text to 'X' or 'O'
    cell.classList.add(currentClass);
}

function swapTurns() {
    xTurn = !xTurn;
    status.innerText = xTurn ? "Player X's turn" : "Player O's turn";
}

function setBoardHoverClass() {
    // You can implement this function if needed
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function endGame(draw) {
    if (draw) {
        status.innerText = "It's a Draw!";
    } else {
        const winner = xTurn ? "Player X" : "Player O";
        status.innerText = `${winner} Wins!`;
        resultContainer.innerText = `${winner} Wins!`; // Display result in the result container
        highlightWinnerCells(xTurn ? X_CLASS : O_CLASS);
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function highlightWinnerCells(winningClass) {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (
            cells[a].classList.contains(winningClass) &&
            cells[b].classList.contains(winningClass) &&
            cells[c].classList.contains(winningClass)
        ) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
        }
    });
}

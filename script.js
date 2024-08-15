const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
const player1ScoreDisplay = document.getElementById('player1-score');
const player2ScoreDisplay = document.getElementById('player2-score');
const player1SymbolDisplay = document.getElementById('player1-symbol');
const player2SymbolDisplay = document.getElementById('player2-symbol');
const symbolBtns = document.querySelectorAll('.symbol-btn');
const player1Container = document.querySelector('.player1');
const player2Container = document.querySelector('.player2');

let player1Score = 0;
let player2Score = 0;
let currentPlayer = 'X';
let player1Symbol = 'X';
let player2Symbol = 'O';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.remove('hidden');
    cell.classList.add('revealed');

    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer === player1Symbol ? '1' : '2'} Wins!`;
        highlightWinner(currentPlayer === player1Symbol ? player1Container : player2Container);
        gameActive = false;
        updateScore();
    } else if (board.every(cell => cell !== '')) {
        message.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === player1Symbol ? player2Symbol : player1Symbol;
        updateCurrentTurnIndicator();
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function updateScore() {
    if (currentPlayer === player1Symbol) {
        player1Score++;
        player1ScoreDisplay.textContent = player1Score;
    } else {
        player2Score++;
        player2ScoreDisplay.textContent = player2Score;
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('revealed');
        cell.classList.add('hidden');
    });
    currentPlayer = player1Symbol;
    gameActive = true;
    message.textContent = '';
    updateCurrentTurnIndicator();
    removeWinnerHighlight();
}

function updateCurrentTurnIndicator() {
    cells.forEach(cell => cell.classList.remove('current-turn'));
    cells.forEach(cell => {
        if (cell.textContent === '') {
            cell.classList.add('current-turn');
            return;
        }
    });
    highlightCurrentPlayer();
}

function highlightCurrentPlayer() {
    if (currentPlayer === player1Symbol) {
        player1Container.classList.add('active');
        player2Container.classList.remove('active');
    } else {
        player1Container.classList.remove('active');
        player2Container.classList.add('active');
    }
}

function removeWinnerHighlight() {
    player1Container.classList.remove('winner');
    player2Container.classList.remove('winner');
    highlightCurrentPlayer();
}

function highlightWinner(winnerContainer) {
    winnerContainer.classList.add('winner');
}

function handleSymbolChange(e) {
    const selectedSymbol = e.target.getAttribute('data-symbol');
    player1Symbol = selectedSymbol;
    player2Symbol = selectedSymbol === 'X' ? 'O' : 'X';
    player1SymbolDisplay.textContent = player1Symbol;
    player2SymbolDisplay.textContent = player2Symbol;
    restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
symbolBtns.forEach(btn => btn.addEventListener('click', handleSymbolChange));

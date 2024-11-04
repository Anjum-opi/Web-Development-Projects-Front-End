// Get elements from the DOM
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

// Variables for game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

// Winning combinations for Tic-Tac-Toe
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle player's turn
const handleCellClick = (e) => {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) return;

    updateCell(cell, index);
    checkWinner();
};

// Update the cell and board state
const updateCell = (cell, index) => {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
};

// Check for a winner or a draw
const checkWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        isGameActive = false;
        statusText.textContent = `${currentPlayer} Wins!`;
        return;
    }

    if (!board.includes('')) {
        isGameActive = false;
        statusText.textContent = 'Draw!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `It's ${currentPlayer}'s turn`;
};

// Restart the game
const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => (cell.textContent = ''));
};

// Add event listeners to cells and restart button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

// Set the initial status text
statusText.textContent = `It's ${currentPlayer}'s turn`;

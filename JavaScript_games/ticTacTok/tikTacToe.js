const board = document.getElementById('board');
const cells = [];

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    cells.push(cell);
    board.appendChild(cell);
};
function handleCellClick() {
    const index = parseInt(this.getAttribute('data-index'));

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        this.textContent = currentPlayer;

        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            alert("It's a draw!");
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // שורות
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // עמודות
        [0, 4, 8], [2, 4, 6]             // אלכסונים
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}
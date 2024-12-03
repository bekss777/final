let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const cells = document.querySelectorAll('[data-cell]');
const gameContainer = document.getElementById('game-container');
const authContainer = document.getElementById('auth-container');
const logoutButton = document.getElementById('logout');

const handleCellClick = (event) => {
    const index = Array.from(cells).indexOf(event.target);
    if (gameBoard[index] || !isGameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонт
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикаль
        [0, 4, 8], [2, 4, 6] // диагонали
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            alert(`${gameBoard[a]} выиграл!`);
            isGameActive = false;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        alert('Ничья!');
        isGameActive = false;
    }
};

const startGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    cells.forEach(cell => cell.textContent = '');
    gameContainer.style.display = 'block';
    authContainer.style.display = 'none';
};

const logout = () => {
    gameContainer.style.display = 'none';
    authContainer.style.display = 'flex';
};

const registerForm = document.getElementById('register');
const loginForm = document.getElementById('login');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Здесь должен быть код для регистрации пользователя на сервере.
    alert('Регистрация успешна!');
    startGame();
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Здесь должен быть код для авторизации пользователя на сервере.
    alert('Авторизация успешна!');
    startGame();
});

logoutButton.addEventListener('click', logout);

cells.forEach(cell =

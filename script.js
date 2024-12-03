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
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    gameContainer.style.display = 'none';
    authContainer.style.display = 'flex';
};

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (localStorage.getItem('username') === username) {
        alert('Пользователь с таким именем уже существует');
        return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert('Регистрация успешна!');
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (localStorage.getItem('username') === username && localStorage.getItem('password') === password) {
        alert('Авторизация успешна!');
        startGame();
    } else {
        alert('Неверные данные');
    }
});

logoutButton.addEventListener('click', logout);

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Проверка, авторизован ли пользователь
if (localStorage.getItem('username') && localStorage.getItem('password')) {
    gameContainer.style.display = 'block';
    authContainer.style.display = 'none';
}

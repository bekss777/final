// Сохраняем данные о пользователях
let users = [];

function showRegistration() {
    document.getElementById('registrationSection').style.display = 'block';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('gameSection').style.display = 'none';
}

function showLogin() {
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('gameSection').style.display = 'none';
}

function showGame() {
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('gameSection').style.display = 'block';
}

// Обработчик регистрации
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    
    // Проверка на уникальность имени пользователя
    if (users.some(user => user.username === username)) {
        alert("Этот пользователь уже существует!");
        return;
    }
    
    // Добавляем пользователя
    users.push({ username, password });
    alert("Регистрация успешна! Теперь войдите в систему.");
    showLogin();
});

// Обработчик авторизации
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    // Проверяем наличие пользователя
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        alert("Авторизация успешна!");
        showGame();
    } else {
        alert("Неверное имя пользователя или пароль.");
    }
});

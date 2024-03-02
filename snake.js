document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const GRID_SIZE = 30;
    const CELL_SIZE = 10;
    const snake = [{x: 15, y: 15}];
    let food = {x: 10, y: 10};
    let dx = 0, dy = 0;
    let intervalId;

    function draw() {
        gameBoard.innerHTML = '';

        const snakeElement = document.createElement('div');
        snakeElement.className = 'snake';
        snake.forEach(part => {
            const segment = snakeElement.cloneNode();
            segment.style.left = part.x * CELL_SIZE + 'px';
            segment.style.top = part.y * CELL_SIZE + 'px';
            gameBoard.appendChild(segment);
        });

        const foodElement = document.createElement('div');
        foodElement.className = 'food';
        foodElement.style.left = food.x * CELL_SIZE + 'px';
        foodElement.style.top = food.y * CELL_SIZE + 'px';
        gameBoard.appendChild(foodElement);
    }

    function moveSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            generateFood();
        } else {
            snake.pop();
        }
    }

    function generateFood() {
        food.x = Math.floor(Math.random() * GRID_SIZE);
        food.y = Math.floor(Math.random() * GRID_SIZE);
    }

    function checkCollision() {
        if (snake[0].x < 0 || snake[0].x >= GRID_SIZE || snake[0].y < 0 || snake[0].y >= GRID_SIZE) {
            return true;
        }
        return snake.slice(1).some(part => part.x === snake[0].x && part.y === snake[0].y);
    }

    function update() {
        if (checkCollision()) {
            clearInterval(intervalId);
            alert('Game Over!');
            return;
        }
        moveSnake();
        draw();
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp' && dy === 0) {
            dx = 0;
            dy = -1;
        } else if (e.key === 'ArrowDown' && dy === 0) {
            dx = 0;
            dy = 1;
        } else if (e.key === 'ArrowLeft' && dx === 0) {
            dx = -1;
            dy = 0;
        } else if (e.key === 'ArrowRight' && dx === 0) {
            dx = 1;
            dy = 0;
        }
    });

    intervalId = setInterval(update, 100);
});

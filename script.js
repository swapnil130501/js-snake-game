document.addEventListener('DOMContentLoaded', () => {
    const gameArena = document.getElementById('game-arena');

    const arenaSize = 600;
    const cellSize = 20;

    let score = 0;
    let gameStarted = false;
    let food = {x: 300, y: 200};  // {x: 15 * 20, y: 10 * 20}
    let snake = [{x : 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];

    let dx = cellSize;
    let dy = 0;

    function updateSnake() {
        const newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(newHead);

        //check collision with food
        if(newHead.x === food.x && newHead.y === food.y) {
            score += 10;
        }

        else {
            snake.pop();
        }
    }

    function changeDirection(e) {
        console.log("key pressed", e);
        const isGoingDown = dy === cellSize;
        const isGoingUp = dy === -cellSize;
        const isGoingRight = dx === cellSize;
        const isGoingLeft = dx === -cellSize;

        if(e.key === 'ArrowUp' && !isGoingDown ) {
            dx = 0;
            dy = -cellSize;
        } else if(e.key === 'ArrowDown' && !isGoingUp) {
            dx = 0;
            dy = cellSize;
        } else if(e.key === 'ArrowLeft' && !isGoingRight) {
            dx = -cellSize;
            dy = 0;
        } else if(e.key === 'ArrowRight' && !isGoingLeft) {
            dx = cellSize;
            dy = 0;
        }
    }

    function drawDiv(x, y, className) {
        const divElement = document.createElement('div');
        divElement.classList.add(className);
        divElement.style.top = `${y}px`;
        divElement.style.left = `${x}px`;
        return divElement;
    }

    function initiateGame() {
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';
        
        document.body.insertBefore(scoreBoard, gameArena);

        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game';
        startButton.classList.add('start-button');

        startButton.addEventListener('click', () => {
            startButton.style.display = 'none';

            runGame();

        })

        document.body.appendChild(startButton);
    }

    function gameLoop() {
        setInterval(() => {
            updateSnake();
            drawFoodAndSnake();
        }, 200)
    }

    function runGame() {
        if(!gameStarted) {
            gameStarted = true;
            document.addEventListener('keydown', changeDirection);
            gameLoop();
        }
    }

    function drawFoodAndSnake() {
        gameArena.innerHTML = '';
        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement);

        snake.forEach((it) => {
            const snakeElement = drawDiv(it.x, it.y, 'snake');
            gameArena.appendChild(snakeElement);
        })
    }

    initiateGame();

})
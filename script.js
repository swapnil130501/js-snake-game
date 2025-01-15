document.addEventListener('DOMContentLoaded', () => {
    const gameArena = document.getElementById('game-arena');

    const arenaSize = 600;
    const cellSize = 20;

    let score = 0;
    let gameStarted = false;
    let food = {x: 300, y: 200};  // {x: 15 * 20, y: 10 * 20}
    let snake = [{x : 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];

    let intervalId;
    let gameSpeed = 200;

    let dx = cellSize;
    let dy = 0;

    function updateSnake() {
        const newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(newHead);

        //check collision with food
        if(newHead.x === food.x && newHead.y === food.y) {
            score += 10;
            updateFood();

            if(gameSpeed > 50) {
                clearInterval(intervalId);
                gameSpeed -= 10;
                gameLoop();
            }
        }

        else {
            snake.pop();
        }
    }

    function updateFood() {
        let newX = 0;
        let newY = 0;

        do {
            newX = Math.floor(Math.random() * 30) * cellSize;
            newY = Math.floor(Math.random() * 30) * cellSize;
        } while(snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY));

        food = { x: newX, y: newY };
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

    function updateScoreBoard() {
        const scoreBoard = document.getElementById('score-board');
        scoreBoard.textContent = `Score: ${score}`
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

    function isGameOver() {
        const selfCollision = snake.slice(1).some(cell => cell.x === snake[0].x && cell.y === snake[0].y);

        const x = snake[0].x < 0;
        const y = snake[0].y < 0;
        const z = snake[0].x >= arenaSize - cellSize;
        const w = snake[0].y >= arenaSize - cellSize;

        return x || y || z || w || selfCollision;
    }

    function gameLoop() {
        intervalId = setInterval(() => {
            if(isGameOver()) {
                clearInterval(intervalId);
                gameStarted = false;
                return;
            }
            updateSnake();
            drawFoodAndSnake();
            updateScoreBoard();
        }, gameSpeed);
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
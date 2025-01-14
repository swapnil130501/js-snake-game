document.addEventListener('DOMContentLoaded', () => {
    const gameArena = document.getElementById('game-arena');

    const arenaSize = 600;
    const cellSize = 20;

    let score = 0;
    let gameStarted = false;
    let food = {x: 300, y: 200};  // {x: 15 * 20, y: 10 * 20}
    let snake = [{x : 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];


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

    function runGame() {
        if(!gameStarted) {
            gameStarted = true;
            
            // gameLoop(); todo
        }
    }

    function drawFoodAndSnake() {
        gameArena.innerHTML = '';

        const foodElement = drawDiv(food.x, food.y, 'food');
    }

    initiateGame();

})
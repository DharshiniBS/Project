const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreValue = document.getElementById('scoreVal');

const Height = gameBoard.height
const Width = gameBoard.width
const Unit = 25
let foodX, foodY
let xVelocity = 25
let yVelocity = 0
let score = 0
let gameActive = true
let gameStarted = false
let gamePaused = false

let snake = [
    { x: Unit * 3, y: 0 },
    { x: Unit * 2, y: 0 },
    { x: Unit, y: 0 },
    { x: 0, y: 0 }
]
window.addEventListener('keydown', keyPress)
startGame()

function startGame() {
    context.fillStyle = '#212121'
    context.fillRect(0, 0, Width, Height) //(xstart,ystart,width,height )
    createFood()
    displayFood()
    drawSnake()
}

function clearBoard() {
    context.fillStyle = '#212121'
    context.fillRect(0, 0, Width, Height)
}

function createFood() {
    foodX = Math.floor(Math.random() * Width / Unit) * Unit
    foodY = Math.floor(Math.random() * Height / Unit) * Unit

}

function displayFood() {
    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, Unit, Unit)
}

function drawSnake() {
    context.fillStyle = 'aqua'
    context.strokeStyle = '#212121'
    snake.forEach((snakeitm) => {
        context.fillRect(snakeitm.x, snakeitm.y, Unit, Unit)
        context.strokeRect(snakeitm.x, snakeitm.y, Unit, Unit)
    })
}

function moveSnake() {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    }
    snake.unshift(head)
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1
        scoreValue.textContent = score
        createFood()
    }
    else
        snake.pop()
}

function nextTick() {
    if(gameActive && !gamePaused) {
        setTimeout(() => {
            clearBoard()
            displayFood()
            moveSnake()
            drawSnake()
            checkGameOver()
            nextTick()
        }, 200)
    }
    else if(!gameActive) {
        clearBoard()
        context.font = "bold 50px serif"
        context.fillStyle = "white"
        context.textAlign = "center"
        context.fillText("Game Over!!", Width / 2, Height / 2)
    }
}

function keyPress(event) {
    if (!gameStarted) {
        gameStarted = true
        nextTick()
    }
    //pause when space is pressed
    if(event.keyCode===32){
        console.log('clicked')
        if(gamePaused){
            gamePaused = false;
            nextTick();
        }
        else
            gamePaused = true;
    }

    // arrow keys keycode 37(left),38(top),39(right),40(bot)
    const left = 37
    const up = 38
    const right = 39
    const down = 40

    switch (true) {
        case (event.keyCode == left && xVelocity != Unit)://left key pressed && not moving in right
            xVelocity = -Unit
            yVelocity = 0
            break
        case (event.keyCode == right && xVelocity != -Unit)://right key pressed and not moving left
            xVelocity = Unit
            yVelocity = 0
            break
        case (event.keyCode == up && yVelocity != Unit)://Up key pressed && not moving down
            xVelocity = 0
            yVelocity = -Unit
            break
        case (event.keyCode == down && yVelocity != -Unit)://down key pressed && not moving up
            xVelocity = 0
            yVelocity = Unit
            break
    }
}

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].x >= Width):
        case (snake[0].y < 0):
        case (snake[0].y >= Height):
            gameActive = false;
            break;
    }
    //check if snake head collides with body
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            gameActive = false;
        }
    }
}
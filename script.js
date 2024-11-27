const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const basketWidth = 100;
const basketHeight = 20;
let basketX = (canvas.width - basketWidth) / 2;
const basketY = canvas.height - basketHeight - 10;

const ballRadius = 10;
let ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
let ballY = -ballRadius;
let ballSpeed = 4;

let score = 0;
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawBasket() {
    ctx.beginPath();
    ctx.rect(basketX, basketY, basketWidth, basketHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#DD0000';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + score, 8, 20);
}

function moveBasket() {
    if (rightPressed && basketX < canvas.width - basketWidth) {
        basketX += 7;
    } else if (leftPressed && basketX > 0) {
        basketX -= 7;
    }
}

function moveBall() {
    ballY += ballSpeed;
    if (ballY + ballRadius > canvas.height) {
        ballY = -ballRadius;
        ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
        score -= 1;  // Decrease score if ball is missed
    } else if (ballY + ballRadius >= basketY && ballX >= basketX && ballX <= basketX + basketWidth) {
        ballY = -ballRadius;
        ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
        score += 1;  // Increase score if ball is caught
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawBall();
    drawScore();
    moveBasket();
    moveBall();
    requestAnimationFrame(draw);
}

draw();

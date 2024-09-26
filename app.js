const canvas = document.getElementById("game-board");
const context = canvas.getContext("2d");
let start = document.getElementById("start");
const startPoint = document.getElementById("start-point");
const gameOver = document.getElementById("game-over");
let restart = document.getElementById("restart");
const buttons = document.getElementById("buttons");
canvas.style.display = "none";
const unitSize = 25;
const record = document.getElementById("record");
const arrows = {
  arrowUp: document.getElementById("arrow-up"),
  arrowDown: document.getElementById("arrow-down"),
  arrowRight: document.getElementById("arrow-right"),
  arrowLeft: document.getElementById("arrow-left"),
};
let velocityX = 250;
let velocityY = 250;
let count = 1;
snake = [
  {
    x: 250 + unitSize,
    y: 250,
  },
  {
    x: 250,
    y: 250,
  },
];
let restarted = false;
let goingUp;
let goingDown;
let goingRight;
let goingLeft;
let recordCount = 0;
let randomX = Math.round((Math.random() * canvas.width) / unitSize) * unitSize;
let randomY = Math.round((Math.random() * canvas.height) / unitSize) * unitSize;
record.textContent = "SCORE: 0";
buttons.style.display = "none";

if (randomX === 0) {
  randomX += unitSize;
} else if (randomX === canvas.width) {
  randomX -= unitSize;
}
if (randomY === 0) {
  randomY += unitSize;
} else if (randomY === canvas.height) {
  randomY -= unitSize;
}
start.addEventListener("click", disappear);
window.addEventListener("keypress", (event) => {
  if (event.key === " ") {
    let gameOverDisplay = window.getComputedStyle(gameOver).display;
    if (gameOverDisplay === "none") {
      disappear();
    } else {
      restartGame();
    }
  }
});
window.addEventListener("click", arrowWork);
window.addEventListener("keydown", control);
function arrowWork(event) {
  if (event.target.id === "arrow-up" && !goingDown) {
    arrows.arrowUp.style.backgroundColor = "black";
    arrows.arrowUp.style.color = "#9bba5a";
    setTimeout(() => {
      arrows.arrowUp.style.backgroundColor = "#9bba5a";
      arrows.arrowUp.style.color = "black";
    }, 200);
    goingUp = true;
    goingRight = false;
    goingLeft = false;
  } else if (event.target.id === "arrow-down" && !goingUp) {
    arrows.arrowDown.style.backgroundColor = "black";
    arrows.arrowDown.style.color = "#9bba5a";
    setTimeout(() => {
      arrows.arrowDown.style.backgroundColor = "#9bba5a";
      arrows.arrowDown.style.color = "black";
    }, 200);
    goingDown = true;
    goingRight = false;
    goingLeft = false;
  } else if (event.target.id === "arrow-right" && !goingLeft) {
    arrows.arrowRight.style.backgroundColor = "black";
    arrows.arrowRight.style.color = "#9bba5a";
    setTimeout(() => {
      arrows.arrowRight.style.backgroundColor = "#9bba5a";
      arrows.arrowRight.style.color = "black";
    }, 200);
    goingRight = true;
    goingUp = false;
    goingDown = false;
  } else if (event.target.id === "arrow-left" && !goingRight) {
    arrows.arrowLeft.style.backgroundColor = "black";
    arrows.arrowLeft.style.color = "#9bba5a";
    setTimeout(() => {
      arrows.arrowLeft.style.backgroundColor = "#9bba5a";
      arrows.arrowLeft.style.color = "black";
    }, 200);
    goingLeft = true;
    goingUp = false;
    goingDown = false;
  }
}
function disappear() {
  startPoint.remove();
  canvas.style.display = "block";
  buttons.style.display = "flex";
  requestAnimationFrame(animate);
}
function animate() {
  setTimeout(() => {
    let snakeMove = requestAnimationFrame(animate);
    if (
      snake[0].x === canvas.width ||
      snake[snake.length - 1].x === canvas.width ||
      snake[0].y === canvas.height ||
      snake[snake.length - 1].y === canvas.height ||
      snake[0].x <= -1 ||
      snake[snake.length - 1].x <= -1 ||
      snake[0].y <= -1 ||
      snake[snake.length - 1].y <= -1
    ) {
      cancelAnimationFrame(snakeMove);
      gameOver.style.display = "flex";
      restart.addEventListener("click", () => {
        restartGame();
      });
    } else {
      snake.forEach((item, index) => {
        if (index !== 0 && index !== snake.length - 1) {
          if (
            (item.x === snake[0].x && item.y === snake[0].y) ||
            (item.x === snake[snake.length - 1].x &&
              item.y === snake[snake.length - 1].y) ||
            (snake[0].x === snake[snake.length - 1].x &&
              snake[0].y === snake[snake.length - 1].y)
          ) {
            cancelAnimationFrame(snakeMove);
            gameOver.style.display = "flex";
            restart.addEventListener("click", () => {
              restartGame();
            });
          }
        }
      });
    }
  }, 1000 / 15);
  draw();
  if (goingUp && !goingDown) {
    moveTop();
  } else if (goingDown && !goingUp) {
    moveBottom();
  } else if (goingRight && !goingLeft) {
    moveRight();
  } else if (goingLeft && !goingRight) {
    moveLeft();
  }
}
function draw() {
  count++;
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.forEach((item) => {
    context.beginPath();
    context.strokeStyle = "black";
    context.fillStyle = "#9bba5a";
    context.roundRect(item.x, item.y, unitSize, unitSize, 10);
    context.fill();
    context.stroke();
  });
  drawFood();
}
function moveTop() {
  velocityX += 0;
  velocityY += -unitSize;
  snake.push({ x: velocityX, y: velocityY });
  snake.shift();
}
function moveBottom() {
  velocityX += 0;
  velocityY += unitSize;
  snake.push({ x: velocityX, y: velocityY });
  snake.shift();
}
function moveRight() {
  velocityX += unitSize;
  velocityY += 0;
  snake.push({ x: velocityX, y: velocityY });
  snake.shift();
}
function moveLeft() {
  velocityX += -unitSize;
  velocityY += 0;
  snake.push({ x: velocityX, y: velocityY });
  snake.shift();
}
function control(event) {
  console.log(event.key);
  if (event.key === "ArrowUp" && !goingDown) {
    arrows.arrowUp.style.backgroundColor = "black";
    arrows.arrowUp.style.color = "#9bba5a";
    setTimeout(() => {
      arrows.arrowUp.style.backgroundColor = "#9bba5a";
      arrows.arrowUp.style.color = "black";
    }, 200);
    goingUp = true;
    goingRight = false;
    goingLeft = false;
  } else if (event.key === "ArrowDown" && !goingUp) {
    arrows.arrowDown.style.backgroundColor = "black";
    arrows.arrowDown.style.color = "#9bba5a";
    setTimeout(() => {
      arrows.arrowDown.style.backgroundColor = "#9bba5a";
      arrows.arrowDown.style.color = "black";
    }, 200);
    goingDown = true;
    goingRight = false;
    goingLeft = false;
  } else if (event.key === "ArrowRight" && !goingLeft) {
    arrows.arrowRight.style.backgroundColor = "black";
    arrows.arrowRight.style.color = "#9bba5a";
    setTimeout(() => {
      arrows.arrowRight.style.backgroundColor = "#9bba5a";
      arrows.arrowRight.style.color = "black";
    }, 200);
    goingRight = true;
    goingUp = false;
    goingDown = false;
  } else if (event.key === "ArrowLeft" && !goingRight) {
    arrows.arrowLeft.style.backgroundColor = "black";
    arrows.arrowLeft.style.color = "#9bba5a";
    setTimeout(() => {
      arrows.arrowLeft.style.backgroundColor = "#9bba5a";
      arrows.arrowLeft.style.color = "black";
    }, 200);
    goingLeft = true;
    goingUp = false;
    goingDown = false;
  }
}
function drawFood() {
  context.beginPath();
  context.lineWidth = 4;
  context.moveTo(randomX + 12, randomY - 7);
  context.lineTo(randomX + 11, randomY + 5);
  context.stroke();
  context.fillStyle = "red";
  context.strokeStyle = "black";
  context.roundRect(randomX, randomY, unitSize, unitSize, 10);
  context.fill();
  context.stroke();
  if (
    (snake[0].x === randomX && snake[0].y === randomY) ||
    (snake[snake.length - 1].x === randomX &&
      snake[snake.length - 1].y === randomY)
  ) {
    recordCount++;
    record.textContent = `SCORE: ${recordCount}`;
    randomX = Math.round((Math.random() * canvas.width) / unitSize) * unitSize;
    randomY = Math.round((Math.random() * canvas.height) / unitSize) * unitSize;
    if (randomX === 0) {
      randomX += unitSize;
    } else if (randomX === canvas.width) {
      randomX -= unitSize;
    }
    if (randomY === 0) {
      randomY += unitSize;
    } else if (randomY === canvas.height) {
      randomY -= unitSize;
    }
    snake.push({ x: 250, y: unitSize * count });
  }
}
function restartGame() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  gameOver.style.display = "none";
  velocityX = 250;
  velocityY = 250;
  snake = [
    {
      x: 250 + unitSize,
      y: 250,
    },
    {
      x: 250,
      y: 250,
    },
  ];
  recordCount = 0;
  record.textContent = `SCORE: ${recordCount}`;
  count = 1;
  randomX = Math.round((Math.random() * canvas.width) / unitSize) * unitSize;
  randomY = Math.round((Math.random() * canvas.height) / unitSize) * unitSize;
  if (randomX === 0) {
    randomX += unitSize;
  } else if (randomX === canvas.width) {
    randomX -= unitSize;
  }
  if (randomY === 0) {
    randomY += unitSize;
  } else if (randomY === canvas.height) {
    randomY -= unitSize;
  }
  requestAnimationFrame(animate);
}

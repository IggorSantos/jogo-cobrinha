let canvas = document.getElementById('snake')
let context = canvas.getContext("2d")
let box = 32
let snake = []
snake[0] = {
  x: 5 * box,
  y: 5 * box
}
let direction = 'right'
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}
let ramenImg = new Image()
let narutoImg = new Image()
let width = 50;
let height = 50;
ramenImg.src="img/ramen.png"
narutoImg.src="img/naruto.png"

function criarBG(){
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}


function criarCobrinha(){
  for(i=0; i<snake.length; i++){
    context.drawImage(narutoImg, snake[i].x, snake[i].y, width, height)
  }
}

 function drawFood(){
  context.drawImage(ramenImg, food.x, food.y, width, height);
}

document.addEventListener('keydown', update)

function update(event){
  if(event.keyCode == 37 && direction != "right") direction = "left";
  if(event.keyCode == 38 && direction != "down") direction = "up";
  if(event.keyCode == 39 && direction != "left") direction = "right";
  if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
  if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  for(i = 1; i < snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
      clearInterval(jogo);
      alert("Game Over :(");
    }
  }
  criarBG()
  criarCobrinha()
  drawFood()

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if(direction == "right") snakeX += box
  if(direction == "left") snakeX -= box
  if(direction == "up") snakeY -= box
  if(direction == "down") snakeY += box

  if(snakeX != food.x || snakeY != food.y){
    snake.pop()
  }else{
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  narutoImg.onload = function(){

  }
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
}

let jogo = setInterval(iniciarJogo, 100)

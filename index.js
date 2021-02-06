let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let directions = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1 ) * box,
    y: Math.floor(Math.random() * 15 + 1) * box 
};

function criarBG(){
    context.fillStyle = "black";
    context.fillRect(0,0,16 * box, 16 * box);
}

function criarCobrinha(){
    for (i=0 ;i<snake.length; i++){
        context.fillStyle = 'Green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "Red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && directions != "right") directions = "left";
    if(event.keyCode == 38 && directions != "down") directions = "up";
    if(event.keyCode == 39 && directions != "left") directions = "right";
    if(event.keyCode == 40 && directions != "up") directions = "down";
}

function iniciarjogo(){
    
    if(snake[0].x > 15 * box && directions == "right") snake[0].x=0;
    if(snake[0].x < 0 && directions == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && directions == "down") snake[0].y=0;
    if(snake[0].y < 0 && directions == "up") snake[0].y= 16 * box;

    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("GAME OVER!");
        }
    }

    criarBG();
    criarCobrinha();    
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(directions == 'right') snakeX += box;
    if(directions == 'left') snakeX -= box;
    if(directions == 'up') snakeY -= box;
    if(directions == 'down') snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1 ) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarjogo, 100);
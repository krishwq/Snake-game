//game constant
let inputdir = { x: 0, y: 0 };
let foodsound = new Audio('eattingsound.mp3');
let gameoversound = new Audio('endsound.mp3');
let musicsound = new Audio('background.mp3');
let movesound = new Audio('movesound.mp3');
let speed = 10;
let schore = 0;
let isopen = 0;
let lastPaintTime = 0;
let snakearr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 };
let rulebook = document.querySelector(".rule");

//game functions

//1.to change the speed
function speed1() {
    let velocity = document.getElementById("dif").value;
    switch (velocity) {
        case "1": speed = 3;
            break;
        case "2": speed = 5; break;
        case "3": speed = 10; break;
        case "4": speed = 15; break;
        case "5": speed = 20; break;
        default: speed = 10; break;
    }
}
//2.to show the rules
function show() {
    if (isopen) {
        rulebook.classList.add("hide");
        isopen = 0;
    }
    else {
        rulebook.classList.remove("hide");
        isopen = 1;
    }
}

//3.for speed and control the game
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameengine();

}
//4.to check collision
function iscollide(snake) {
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

}
function gameengine() {

    if (iscollide(snakearr)) {
        gameoversound.play();
        musicsound.pause();
        inputdir = { x: 0, y: 0 };
        alert("game over! press OK to exit");
        snakearr = [{ x: 13, y: 15 }];
        musicsound.play();
        schore = 0;
        schoreBox.innerHTML = "score:0";
    }
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodsound.play();
        schore += 1;
        if (schore > hiscoreval) {
            hiscoreval = schore;
            localStorage.setItem("highscore", JSON.stringify(hiscoreval));
            highschoreBox.innerHTML = "High Score :" + hiscoreval;
        }
        schoreBox.innerHTML = "score: " + schore;
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };


    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;


    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}







//main logic
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    hiscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(highscore);
    highschoreBox.innerHTML = "High Score :" + hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 };
    musicsound.play();
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }
});
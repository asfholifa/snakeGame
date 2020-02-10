var game = $("#snake")[0], //id convas
    ctx = game.getContext("2d"),
    xZ = game.width / 2 - 25,
    yZ = game.height / 2 - 25,
    xZarr = [],
    yZarr = [], //Массивы координат змейки
    xF, yF,
    p = 0; //Координаты позиции фрукта

var color;
var interval;

var feilIMg = $("#gameOverImg")[0]

class Snake {

    constructor(xS, yS, qS, rS, xK, yK, vK) {
        this.xS = xS;
        this.yS = yS;
        this.qS = qS;
        this.rS = rS;
        this.xK = xK;
        this.yK = yK;
        this.vK = vK;
    };

    goToTheUp() {
        if (this.vK != 1) {
            this.xK = 0;
            this.yK = -1;
            this.vK = 1
        };
    };

    goToTheDown() {
        if (this.vK != 1) {
            this.xK = 0;
            this.yK = 1;
            this.vK = 1
        };
    };

    goToTheLeft() {
        if (this.vK != 2) {
            this.xK = -1;
            this.yK = 0;
            this.vK = 2
        };
    };

    goToTheRight() {
        if (this.vK != 2) {
            this.xK = 1;
            this.yK = 0;
            this.vK = 2
        };
    };

    coordinatesWhileItGoes() {
        //Рассчитываем координату при движении
        xZ = xZ + this.xK * this.qS;
        if (xZ >= this.xS) action.feil();
        if (xZ < 0) action.feil();
        yZ = yZ + this.yK * this.qS;
        if (yZ >= this.yS) action.feil();
        if (yZ < 0) action.feil();
    };

    drawSnake() {
        //Цвет и цикл вывода массива элементов змейки с отрисовкой
        ctx.fillStyle = "Black";
        for (var i = 0; i <= (this.rS); i++) ctx.fillRect(xZarr[i] + 1,
            yZarr[i] + 1, this.qS - 2, this.qS - 2); //Отрисовка массива змейки
    };

    eatingFruit() {
        //Кушаем фрукт, при совпадении координат головы змеи и фрукта - выводим новый фрукт и счетчик +1
        if (xF == xZ && yF == yZ) {
            fruit.spawnFruit();
            this.rS++;
        } else { //Иначе - стираем хвост, т.е. змейка перемещается без прироста
            xZarr.pop();
            yZarr.pop();
        }
    };
};

let snake = new Snake(game.width, game.height, 25, 0, 0, 0);


class Board {
    boardSize() {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, snake.xS, snake.yS);
    };

    clash() {
        for (var i = 0; i <= (snake.rS); i++)
            if (xZarr[i] == xZ && yZarr[i] == yZ) action.feil();
    };

    counter() {
        ctx.fillStyle = "Black";
        ctx.font = "bold 25pt Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(snake.rS + 1, 15, 25);
    };
};

let board = new Board();


class Fruit {

    spawnFruit() {
        xF = Math.round((snake.xS / snake.qS - 1) * Math.random()) * snake.qS;
        yF = Math.round((snake.yS / snake.qS - 1) * Math.random()) * snake.qS;
        for (var i = 0; i <= (snake.rS); i++)
            if (xZarr[i] == xF && yZarr[i] == yF) spawnFruit();
    };

    fruitColor() {
        ctx.beginPath();
        ctx.arc(xF + snake.qS / 2, yF + snake.qS / 2, snake.qS / 2, snake.qS / 2, Math.PI * 2, true);
        ctx.fillStyle = "Red";
        ctx.fill();
    };

};

let fruit = new Fruit();
fruit.spawnFruit();

class Menu {

    dificultsComand = function (x) {
        clearInterval(interval);
        $("#dificult").fadeOut();
        interval = setInterval(draw, x);

        $("#repeatBtn").click(function () {
            $("#menu").fadeOut();
            clearInterval(interval);
            interval = setInterval(draw, x);
            fruit.spawnFruit();
            action.repeat();
        });

        $("#backBtnMenu").click(function () {
            $("#menu").fadeOut();
            interval = setInterval(draw, x);
        });

        $("#okPalleteBtn").click(function () {
            $("#colorPalleteMenu").fadeOut();
            clearInterval(interval);
            interval = setInterval(draw, x);
        });

        $("#pause").click(function () {
            $("#pause").fadeOut();
            interval = setInterval(draw, x);
        });

        $("#btnPause").click(function () {
            $("#pause").fadeIn();
            clearInterval(interval);
            $("#pause").click(function () {
                $("#pause").fadeOut();
            });
        });

        action.onkeydown(event);

    };

    menuCall() {
        $("#btnMenu").click(function () {
            clearInterval(interval);
            $("#menu").fadeIn();

            $("#colorPalleteBtn").click(function () {
                $("#menu").fadeOut();
                $("#colorPalleteMenu").fadeIn();
            })

            $("#exitBtn").click(function () {
                close();
            });

            $("#dificultBtnMenu").click(function () {
                $("#dificult").fadeIn();
                $("#menu").fadeOut();
            });

            $("#backBtnDificult").click(function () {
                $("#dificult").fadeOut();
                $("#menu").fadeIn();
            });

            $("#buttonHard").click(function () {
                menu.dificultsComand(40);
            });

            $("#buttonNormal").click(function () {
                menu.dificultsComand(80);
            });

            $("#buttonEasy").click(function () {
                menu.dificultsComand(160);
            });

            $("#backBtnMenu").click(function () {
                $("#menu").fadeOut();
            });

        });
    };
};

let menu = new Menu();

class Action {

    repeat() {
        xZ = snake.xS / 2 - snake.qS;
        yZ = snake.yS / 2 - snake.qS;
        xZarr.length = 1;
        yZarr.length = 1;
        snake.rS = 0;
    };

    feil() {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.fill();
        ctx.stroke();
        xZarr.length = 0;
        yZarr.length = 0;
        clearInterval(interval);
        ctx.drawImage(feilIMg, 40, 0);
    };
};

let action = new Action();

cp = ColorPicker($('#pcr')[0], $('#picker')[0],
    function (hex, hsv, rgb, mousePicker, mousepcr) {
        currentColor = hex;
        ColorPicker.positionIndicators(
            $('#pcr-indicator')[0],
            $('#picker-indicator')[0],
            mousepcr, mousePicker);

        $('#hex')[0].innerHTML = hex;
        $('#rgb')[0].innerHTML = 'rgb(' + rgb.r.toFixed() + ',' + rgb.g.toFixed() + ',' + rgb.b.toFixed() + ')';
        $('#hsv')[0].innerHTML = 'hsv(' + hsv.h.toFixed() + ',' + hsv.s.toFixed(2) + ',' + hsv.v.toFixed(2) + ')';

        $('#pcr_bg')[0].style.backgroundColor = hex;
        color = hex;
    });
cp.setHex('#D4EDFB');

menu.menuCall();

onkeydown = function (event) {
    event.preventDefault();
    switch (event.keyCode) {
        case 38:
        case 87:
            snake.goToTheUp();
            break;
        case 39:
        case 68:
            snake.goToTheRight(); //Вправо
            break;
        case 40:
        case 83:
            snake.goToTheDown(); //Вниз
            break;
        case 37:
        case 65:
            snake.goToTheLeft(); //Влево
            break;
        case 32:
            if (p == 0) {
                p = 1;
                $("#pause").fadeIn();
                clearInterval(interval);
            } else {
                p = 0;
                $("#pause").fadeOut();
                interval = setInterval(draw, x)
            };
    };

    $("#upButton").click(function () {
        snake.goToTheUp();
    });

    $("#leftButton").click(function () {
        snake.goToTheLeft();
    });

    $("#rightButton").click(function () {
        snake.goToTheRight();
    });

    $("#downButton").click(function () {
        snake.goToTheDown();
    });
};

function draw() {
    board.boardSize();

    fruit.fruitColor();

    snake.coordinatesWhileItGoes();

    board.clash();

    xZarr.unshift(xZ);
    yZarr.unshift(yZ);

    snake.drawSnake();

    snake.eatingFruit();

    board.counter();
}
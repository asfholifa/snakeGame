let color,
    interval,
    p = 0;



class Game {
    constructor(idConv) {
        this.idConv = idConv;
    }
}

let game = new Game($("#snake")[0]);


class Convas {
    constructor(ctx) {
        this.ctx = ctx
    }
}

let convas = new Convas(game.idConv.getContext("2d"));

class Snake {

    constructor(xZ, yZ, xZarr, yZarr, xK, yK, vK) {
        this.xZ = xZ;
        this.yZ = yZ;
        this.xZarr = xZarr;
        this.yZarr = yZarr;
        this.xK = xK;
        this.yK = yK;
        this.vK = vK;
    };

    goUp() {
        if (this.vK != 1) {
            this.xK = 0;
            this.yK = -1;
            this.vK = 1
        };
    };

    goDown() {
        if (this.vK != 1) {
            this.xK = 0;
            this.yK = 1;
            this.vK = 1
        };
    };

    goLeft() {
        if (this.vK != 2) {
            this.xK = -1;
            this.yK = 0;
            this.vK = 2
        };
    };

    goRight() {
        if (this.vK != 2) {
            this.xK = 1;
            this.yK = 0;
            this.vK = 2
        };
    };

    coordinatesWhileItGoes() {
        //Рассчитываем координату при движении
        this.xZ = this.xZ + this.xK * board.qS;
        this.yZ = this.yZ + this.yK * board.qS;
    };

    eatFruit() {
        //Кушаем фрукт, при совпадении координат головы змеи и фрукта - выводим новый фрукт и счетчик +1
        if (fruit.xF == this.xZ && fruit.yF == this.yZ) {
            fruit.spawn();
            board.rS++;
        } else { //Иначе - стираем хвост, т.е. змейка перемещается без прироста
            this.xZarr.pop();
            this.yZarr.pop();
        }
    };
};

let snake = new Snake(game.idConv.width / 2 - 25, game.idConv.height / 2 - 25, [], [], 0, 0);

class Board {
    constructor(xS, yS, qS, rS) {
        this.xS = xS;
        this.yS = yS;
        this.qS = qS;
        this.rS = rS;
    };

    size() {
        convas.ctx.fillStyle = color;
        convas.ctx.fillRect(0, 0, this.xS, this.yS);
    };

    clash() {
        for (var i = 0; i <= (this.rS); i++)
            if (snake.xZarr[i] == snake.xZ && snake.yZarr[i] == snake.yZ) action.fail();
        if (snake.yZ >= this.yS) action.fail();
        if (snake.yZ < 0) action.fail();
        if (snake.xZ >= this.xS) action.fail();
        if (snake.xZ < 0) action.fail();
    };

    counter() {
        convas.ctx.fillStyle = "Black";
        convas.ctx.font = "bold 25pt Arial";
        convas.ctx.textBaseline = "middle";
        convas.ctx.textAlign = "center";
        convas.ctx.fillText(board.rS + 1, 15, 25);
    };

    drawSnake() {
        //Цвет и цикл вывода массива элементов змейки с отрисовкой
        convas.ctx.fillStyle = "Black";
        for (var i = 0; i <= (board.rS); i++) convas.ctx.fillRect(snake.xZarr[i] + 1,
            snake.yZarr[i] + 1, board.qS - 2, board.qS - 2); //Отрисовка массива змейки
    };
};

let board = new Board(game.idConv.width, game.idConv.height, 25, 0);


class Fruit {
    constructor(xF, yF){
        this.xF = xF;
        this.yF = yF;
    };

    spawn() {
        this.xF = Math.round((board.xS / board.qS - 1) * Math.random()) * board.qS;
        this.yF = Math.round((board.yS / board.qS - 1) * Math.random()) * board.qS;
        for (var i = 0; i <= (board.rS); i++)
            if (snake.xZarr[i] == this.xF && snake.yZarr[i] == this.yF) this.spawn();
    };

    getColor() {
        convas.ctx.beginPath();
        convas.ctx.arc(this.xF + board.qS / 2, this.yF + board.qS / 2, board.qS / 2, board.qS / 2, Math.PI * 2, true);
        convas.ctx.fillStyle = "Red";
        convas.ctx.fill();
    };

};

let fruit = new Fruit(0,0);

class Menu {

    static dificultsComand(x) {
        clearInterval(interval);
        $("#dificult").fadeOut();
        interval = setInterval(draw, x);

        $("#repeatBtn").click(function () {
            $("#menu").fadeOut();
            clearInterval(interval);
            interval = setInterval(draw, x);
            fruit.spawn();
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

        onkeydown(event);

    };

    call() {
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
                Menu.dificultsComand(40);
            });

            $("#buttonNormal").click(function () {
                Menu.dificultsComand(80);
            });

            $("#buttonEasy").click(function () {
                Menu.dificultsComand(160);
            });

            $("#backBtnMenu").click(function () {
                $("#menu").fadeOut();
            });

        });
    };
};

let menu = new Menu();

class Action {
    constructor(failIMg) {
        this.failIMg = failIMg;
    }

    repeat() {
        snake.xZ = board.xS / 2 - board.qS;
        snake.yZ = board.yS / 2 - board.qS;
        snake.xZarr.length = 1;
        snake.yZarr.length = 1;
        board.rS = 0;
    };

    fail() {
        convas.ctx.fillStyle = color;
        convas.ctx.strokeStyle = color;
        convas.ctx.fill();
        convas.ctx.stroke();
        snake.xZarr.length = 0;
        snake.yZarr.length = 0;
        clearInterval(interval);
        convas.ctx.drawImage(this.failIMg, 40, 0);
    };
};

let action = new Action($("#gameOverImg")[0]);

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

menu.call();

onkeydown = function (event) {
    event.preventDefault();
    switch (event.keyCode) {
        case 38:
        case 87:
            snake.goUp();
            break;
        case 39:
        case 68:
            snake.goRight(); //Вправо
            break;
        case 40:
        case 83:
            snake.goDown(); //Вниз
            break;
        case 37:
        case 65:
            snake.goLeft(); //Влево
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
        snake.goUp();
    });

    $("#leftButton").click(function () {
        snake.goLeft();
    });

    $("#rightButton").click(function () {
        snake.goRight();
    });

    $("#downButton").click(function () {
        snake.goDown();
    });
};

fruit.spawn();

function draw() {
    board.size();

    fruit.getColor();

    snake.coordinatesWhileItGoes();

    board.clash();

    snake.xZarr.unshift(snake.xZ);
    snake.yZarr.unshift(snake.yZ);

    board.drawSnake();

    snake.eatFruit();

    board.counter();
}
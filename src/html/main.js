var game = $("#snake")[0], //id convas
    ctx = game.getContext("2d"),
    xZ = game.width / 2 - 25,
    yZ = game.height / 2 - 25,
    xZarr = [],
    yZarr = [], //Массивы координат змейки
    xF, yF, //Координаты позиции фрукта
    p = 0;

var color;
var interval;

var feilIMg = $("#gameOverImg")[0]

class Snake {

    constructor(xS, yS, qS, rS, xK, yK) {
        this.xS = xS;
        this.yS = yS;
        this.qS = qS;
        this.rS = rS;
        this.xK = xK;
        this.yK = yK;
    };


    coordinatesWhileItGoes() {
        //Рассчитываем координату при движении
        xZ = xZ + this.xK * this.qS;
        if (xZ >= this.xS) feil();
        if (xZ < 0) feil();
        yZ = yZ + this.yK * this.qS;
        if (yZ >= this.yS) feil();
        if (yZ < 0) feil();
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


class Board extends Snake {
    boardSize() {
        //Фон и размер игрового поля
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, snake.xS, snake.yS);
    };

    clash() {
        //Проверка на столкновение
        for (var i = 0; i <= (snake.rS); i++)
            if (xZarr[i] == xZ && yZarr[i] == yZ) feil();
    };

    counter() {
        //Выводим счетчик съеденных фруктов
        ctx.fillStyle = "Black"; //Цвет шрифта счетчика
        ctx.font = "bold 25pt Arial"; //Стиль, размер и шрифт
        ctx.textBaseline = "middle"; //Расположение по вертикали
        ctx.textAlign = "center"; //Расположение по горизонтали
        ctx.fillText(snake.rS + 1, 15, 25); //Расположение счетчика (привязка к фрукту)
    };
};

let board = new Board();


class Fruit extends Snake {

    //Функция случайного выбора координат для фрукта
    spawnFruit() {
        xF = Math.round((snake.xS / snake.qS - 1) * Math.random()) * snake.qS;
        yF = Math.round((snake.yS / snake.qS - 1) * Math.random()) * snake.qS;
        for (var i = 0; i <= (snake.rS); i++)
            if (xZarr[i] == xF && yZarr[i] == yF) spawnFruit(); //Повторный рандом при наложении на змейку
    };

    fruitColor() {
        //Цвет и позиция фрукта
        ctx.beginPath();
        ctx.arc(xF + snake.qS / 2, yF + snake.qS / 2, snake.qS / 2, snake.qS / 2, Math.PI * 2, true); //Разметка оружности
        ctx.fillStyle = "Red"; //Цвет круга
        ctx.fill();
    };

};

let fruit = new Fruit();
fruit.spawnFruit();


function feil() {
    clearInterval(interval);
    ctx.drawImage(feilIMg, 40, 0);
};

function repeat() {
    xZ = snake.xS / 2 - snake.qS;
    yZ = snake.yS / 2 - snake.qS;
    xZarr.length = 1; //Стираем X-массив змейки до 1 элемента
    yZarr.length = 1; //Стираем Y-массив змейки до 1 элемента
    snake.rS = 0; //Обнуляем счетчик
};

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

$("#upButton").click(function () {
    if (snake.vK != 1) {
        snake.xK = 0;
        snake.yK = -1;
        snake.vK = 1
    };
});

$("#leftButton").click(function () {
    if (snake.vK != 2) {
        snake.xK = -1;
        snake.yK = 0;
        snake.vK = 2
    };
});

$("#rightButton").click(function () {
    if (snake.vK != 2) {
        snake.xK = 1;
        snake.yK = 0;
        snake.vK = 2
    };
});

$("#downButton").click(function () {
    if (snake.vK != 1) {
        snake.xK = 0;
        snake.yK = 1;
        snake.vK = 1
    };
});



dificultsComand = function (x) {
    clearInterval(interval);
    $("#dificult").fadeOut();
    interval = setInterval(draw, x);

    $("#repeatBtn").click(function () {
        $("#menu").fadeOut();
        clearInterval(interval);
        interval = setInterval(draw, x);
        repeat();
    });

    $("#backBtnMenu").click(function () {
        $("#menu").fadeOut();
        interval = setInterval(draw, x);
    });

    $("#okPalleteBtn").click(function () {
        $("#colorPalleteMenu").fadeOut();
        interval = setInterval(draw, x);
    });

    $("#pause").click(function () {
        $("#pause").fadeOut();
        interval = setInterval(draw, x);
    });

    onkeydown = function (event) {
        event.preventDefault();
        switch (event.keyCode) {
            case 38:
            case 87:
                if (snake.vK != 1) {
                    snake.xK = 0;
                    snake.yK = -1;
                    snake.vK = 1
                };
                break; //Вверх
            case 39:
            case 68:
                if (snake.vK != 2) {
                    snake.xK = 1;
                    snake.yK = 0;
                    snake.vK = 2
                };
                break; //Вправо
            case 40:
            case 83:
                if (snake.vK != 1) {
                    snake.xK = 0;
                    snake.yK = 1;
                    snake.vK = 1
                };
                break; //Вниз
            case 37:
            case 65:
                if (snake.vK != 2) {
                    snake.xK = -1;
                    snake.yK = 0;
                    snake.vK = 2
                };
                break; //Влево
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
    };
};

$("#btnPause").click(function () {
    $("#pause").fadeIn();
    clearInterval(interval);
    $("#pause").click(function () {
        $("#pause").fadeOut();
    });
});

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
        dificultsComand(40);
    });

    $("#buttonNormal").click(function () {
        dificultsComand(80);
    });

    $("#buttonEasy").click(function () {
        dificultsComand(160);
    });

    $("#backBtnMenu").click(function () {
        $("#menu").fadeOut();
    });

});


function draw() {
    board.boardSize();

    fruit.fruitColor();

    snake.coordinatesWhileItGoes();

    board.clash();

    //Заменяем координаты в начальных элементах массива
    xZarr.unshift(xZ);
    yZarr.unshift(yZ);

    snake.drawSnake();

    snake.eatingFruit();

    board.counter();
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var path = require("path");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('snakeGame.start', function () {
        var panel = vscode.window.createWebviewPanel('snakeGame', 'Snake Game', vscode.ViewColumn.One, {
            enableScripts: true
        });
        var pathUpButton = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'img', '2.png'));
        var upButtonImg = panel.webview.asWebviewUri(pathUpButton);
        var pathLeftButton = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'img', '1.png'));
        var leftButtonImg = panel.webview.asWebviewUri(pathLeftButton);
        var pathDownButton = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'img', '3.png'));
        var downButtonImg = panel.webview.asWebviewUri(pathDownButton);
        var pathRightButton = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'img', '4.png'));
        var rightButtonImg = panel.webview.asWebviewUri(pathRightButton);
        var pathJsCode = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'main.js'));
        var jsCode = panel.webview.asWebviewUri(pathJsCode);
        var pathCssCode = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'style.css'));
        var cssCode = panel.webview.asWebviewUri(pathCssCode);
        var pathColorPicker = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'assets', 'clr_pick', 'colorpicker.min.js'));
        var colorPicker = panel.webview.asWebviewUri(pathColorPicker);
        var pathMenuImg = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'img', 'menu.png'));
        var menuImg = panel.webview.asWebviewUri(pathMenuImg);
        var pathPauseImg = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'img', 'pause.png'));
        var pauseImg = panel.webview.asWebviewUri(pathPauseImg);
        var pathGameOverImg = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'img', 'gameOver.png'));
        var gameOverImg = panel.webview.asWebviewUri(pathGameOverImg);
        var pathPauseGif = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'img', 'gif.gif'));
        var pauseGif = panel.webview.asWebviewUri(pathPauseGif);
        panel.webview.html = getWebviewContent(leftButtonImg, upButtonImg, rightButtonImg, downButtonImg, jsCode, cssCode, colorPicker, menuImg, pauseImg, gameOverImg, pauseGif);
    }));
}
exports.activate = activate;
function getWebviewContent(upButtonImg, leftButtonImg, rightButtonImg, downButtonImg, jsCode, cssCode, colorPicker, menuImg, pauseImg, gameOverImg, pauseGif) {
    return "<!DOCTYPE html>\n    <html lang=\"ru\">\n    \n    <head>\n        <script type=\"text/javascript\" src=\"" + colorPicker + "\"></script>\n        <script src=\"http://code.jquery.com/jquery-2.0.2.min.js\"></script>\n        <link rel=\"stylesheet\" href=\"" + cssCode + "\">\n        <meta charset=\"utf-8\" />\n        <title>Snake</title>\n    </head>\n    \n    <body>\n    \n        <div class=\"menuBar\">\n            <div class=\"menu\" id=\"btnMenu\">\n                <img class=\"menuImg\" src=\"" + menuImg + "\" alt=\"\">\n            </div>\n    \n            <div class=\"menu\" id=\"btnPause\">\n                <img class=\"menuImg\" src=\"" + pauseImg + "\" alt=\"\">\n            </div>\n        </div>\n    \n        <div class=\"back-dialog\" id=\"menu\">\n            <div class=\"mainMenu-buttonsBar\">\n                <input type=\"button\" value=\"\u041D\u0430\u0447\u0430\u0442\u044C \u0441\u043D\u0430\u0447\u0430\u043B\u0430\" class=\"button\" id=\"repeatBtn\">\n                <input type=\"button\" value=\"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C\" class=\"button\" id=\"dificultBtnMenu\">\n                <input type=\"button\" value=\"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0446\u0432\u0435\u0442 \u0444\u043E\u043D\u0430\" class=\"button\" id=\"colorPalleteBtn\">\n                <input type=\"button\" value=\"\u041D\u0430\u0437\u0430\u0434\" class=\"button\" id=\"backBtnMenu\">\n            </div>\n        </div>\n    \n        <div class=\"back-dialog\" id=\"colorPalleteMenu\">\n            <div class=\"dialog-content\">\n                <div id=\"color-picker\" class=\"cp-default\">\n                    <div class=\"picker-wrapper\">\n                        <div id=\"picker\" class=\"picker\"></div>\n                        <div id=\"picker-indicator\" class=\"picker-indicator\"></div>\n                    </div>\n                    <div class=\"pcr-wrapper\">\n                        <div id=\"pcr\" class=\"pcr\"></div>\n                        <div id=\"pcr-indicator\" class=\"pcr-indicator\"></div>\n                    </div>\n                    <ul id=\"color-values\">\n                        <li><label>RGB:</label><span id=\"rgb\"></span></li>\n                        <li><label>HSV:</label><span id=\"hsv\"></span></li>\n                        <li><label>HEX:</label><span id=\"hex\"></span></li>\n                        <li>\n                            <div id=\"pcr_bg\"></div>\n                        </li>\n                    </ul>\n                </div>\n                <input type=\"button\" value=\"\u041E\u043A\" class=\"button\" id=\"okPalleteBtn\">\n            </div>\n        </div>\n    \n        <!-- Div \u0441 \u043A\u043B\u0430\u0441\u0441\u043E\u043C back-dialog \u0431\u0443\u0434\u0435\u0442 \u0437\u0430\u0442\u0435\u043C\u043D\u044F\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 -->\n        <div class=\"back-dialog\" id=\"dificult\">\n            <!-- \u0411\u043B\u043E\u043A \u0441 \u043D\u0430\u0448\u0438\u043C \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u043E\u043C -->\n            <div class=\"dialog-content\">\n                <!-- \u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0438 \u043A\u043D\u043E\u043F\u043A\u0430 \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F \u043E\u043A\u043D\u0430 -->\n                <div class=\"dificultButtons\">\n                    <input type=\"button\" value=\"\u041B\u0435\u0433\u043A\u0430\u044F\" class=\"button\" id=\"buttonEasy\">\n                    <input type=\"button\" value=\"\u0421\u0440\u0435\u0434\u043D\u044F\u044F\" class=\"button\" id=\"buttonNormal\">\n                    <input type=\"button\" value=\"\u0421\u043B\u043E\u0436\u043D\u0430\u044F\" class=\"button\" id=\"buttonHard\">\n                </div>\n                <div id=\"backBtnInDifBar\">\n                    <input type=\"button\" value=\"\u041D\u0430\u0437\u0430\u0434\" class=\"button\" id=\"backBtnDificult\">\n                </div>\n            </div>\n        </div>\n    \n        <div class=\"canvas\">\n            <canvas id=\"snake\" width=\"800\" height=\"650\">HTML 5 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0435\u0442\u0441\u044F</canvas>\n        </div>\n    \n        <div class=\"container\">\n            <div class=\"gamePad\">\n                <div class=\"firstButton\">\n                    <input type=\"image\" class=\"buttons\" id=\"upButton\" src=\"" + upButtonImg + "\">\n                </div>\n                <div class=\"otherButtons\">\n                    <input type=\"image\" class=\"buttons\" id=\"leftButton\" src=\"" + leftButtonImg + "\">\n                    <input type=\"image\" class=\"buttons\" id=\"downButton\" src=\"" + downButtonImg + "\">\n                    <input type=\"image\" class=\"buttons\" id=\"rightButton\" src=\"" + rightButtonImg + "\">\n                </div>\n            </div>\n        </div>\n    \n        <div class=\"pauseScreen\" id=\"pause\">\n            <img class=\"gif\" src=\"" + pauseGif + "\">\n        </div>\n    \n        <img id=\"gameOverImg\" src=\"" + gameOverImg + "\" class=\"gameOver\">\n        <script type=\"application/javascript\" src=\"" + jsCode + "\"> </script>\n    \n    </body>\n    \n    </html>";
}
//# sourceMappingURL=extension.js.map
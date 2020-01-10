import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('snakeGame.start', () => {
            const panel = vscode.window.createWebviewPanel(
                'snakeGame',
                'Snake Game',
                vscode.ViewColumn.One,
                {
                    enableScripts: true
                }
            );

            const pathUpButton = vscode.Uri.file(
                path.join(context.extensionPath, 'src', 'html', 'img', '2.png')
            );
            const upButtonImg = panel.webview.asWebviewUri(pathUpButton);

            const pathLeftButton = vscode.Uri.file(
                path.join(context.extensionPath, 'src', 'html', 'img', '1.png')
            );
            const leftButtonImg = panel.webview.asWebviewUri(pathLeftButton);

            const pathDownButton = vscode.Uri.file(
                path.join(context.extensionPath, 'src', 'html', 'img', '3.png')
            );
            const downButtonImg = panel.webview.asWebviewUri(pathDownButton);

            const pathRightButton = vscode.Uri.file( 
                path.join(context.extensionPath, 'src', 'html', 'img', '4.png')
            );
            const rightButtonImg = panel.webview.asWebviewUri(pathRightButton);

            const pathJsCode = vscode.Uri.file( 
                path.join(context.extensionPath, 'src', 'html', 'main.js')
            );
            const jsCode = panel.webview.asWebviewUri(pathJsCode);

            const pathCssCode = vscode.Uri.file( 
                path.join(context.extensionPath, 'src', 'html', 'style.css')
            );
            const cssCode = panel.webview.asWebviewUri(pathCssCode);

            const pathColorPicker = vscode.Uri.file( 
                path.join(context.extensionPath, 'src', 'html', 'assets', 'clr_pick', 'colorpicker.min.js')
            );
            const colorPicker = panel.webview.asWebviewUri(pathColorPicker);

            const pathMenuImg = vscode.Uri.file( 
                path.join(context.extensionPath, 'src', 'html', 'img', 'menu.png')
            );
            const menuImg = panel.webview.asWebviewUri(pathMenuImg);

            const pathPauseImg = vscode.Uri.file( 
                path.join(context.extensionPath, 'src', 'html', 'img', 'pause.png')
            );
            const pauseImg = panel.webview.asWebviewUri(pathPauseImg);

            const pathGameOverImg = vscode.Uri.file( 
                path.join(context.extensionPath, 'src', 'html', 'img', 'gameOver.png')
            );
            const gameOverImg = panel.webview.asWebviewUri(pathGameOverImg);
            
            const pathPauseGif = vscode.Uri.file( 
                path.join(context.extensionPath, 'src', 'html', 'img', 'gif.gif')
            );
            const pauseGif = panel.webview.asWebviewUri(pathPauseGif);

            panel.webview.html = getWebviewContent(leftButtonImg, upButtonImg
                , rightButtonImg, downButtonImg, jsCode, cssCode, colorPicker, menuImg
                , pauseImg, gameOverImg, pauseGif);
        })
    );
}

function getWebviewContent(upButtonImg: vscode.Uri, leftButtonImg: vscode.Uri
            , rightButtonImg: vscode.Uri, downButtonImg: vscode.Uri, jsCode: vscode.Uri
            , cssCode: vscode.Uri, colorPicker: vscode.Uri, menuImg: vscode.Uri
            , pauseImg: vscode.Uri, gameOverImg: vscode.Uri, pauseGif: vscode.Uri) {
    return `<!DOCTYPE html>
    <html lang="ru">
    
    <head>
        <script type="text/javascript" src="${colorPicker}"></script>
        <script src="http://code.jquery.com/jquery-2.0.2.min.js"></script>
        <link rel="stylesheet" href="${cssCode}">
        <meta charset="utf-8" />
        <title>Snake</title>
    </head>
    
    <body>
    
        <div class="menuBar">
            <div class="menu" id="btnMenu">
                <img class="menuImg" src="${menuImg}" alt="">
            </div>
    
            <div class="menu" id="btnPause">
                <img class="menuImg" src="${pauseImg}" alt="">
            </div>
        </div>
    
        <div class="back-dialog" id="menu">
            <div class="mainMenu-buttonsBar">
                <input type="button" value="Начать сначала" class="button" id="repeatBtn">
                <input type="button" value="Выбрать сложность" class="button" id="dificultBtnMenu">
                <input type="button" value="Выбрать цвет фона" class="button" id="colorPalleteBtn">
                <input type="button" value="Назад" class="button" id="backBtnMenu">
            </div>
        </div>
    
        <div class="back-dialog" id="colorPalleteMenu">
            <div class="dialog-content">
                <div id="color-picker" class="cp-default">
                    <div class="picker-wrapper">
                        <div id="picker" class="picker"></div>
                        <div id="picker-indicator" class="picker-indicator"></div>
                    </div>
                    <div class="pcr-wrapper">
                        <div id="pcr" class="pcr"></div>
                        <div id="pcr-indicator" class="pcr-indicator"></div>
                    </div>
                    <ul id="color-values">
                        <li><label>RGB:</label><span id="rgb"></span></li>
                        <li><label>HSV:</label><span id="hsv"></span></li>
                        <li><label>HEX:</label><span id="hex"></span></li>
                        <li>
                            <div id="pcr_bg"></div>
                        </li>
                    </ul>
                </div>
                <input type="button" value="Ок" class="button" id="okPalleteBtn">
            </div>
        </div>
    
        <!-- Div с классом back-dialog будет затемнять страницу -->
        <div class="back-dialog" id="dificult">
            <!-- Блок с нашим контентом -->
            <div class="dialog-content">
                <!-- Заголовок и кнопка закрытия окна -->
                <div class="dificultButtons">
                    <input type="button" value="Легкая" class="button" id="buttonEasy">
                    <input type="button" value="Средняя" class="button" id="buttonNormal">
                    <input type="button" value="Сложная" class="button" id="buttonHard">
                </div>
                <div id="backBtnInDifBar">
                    <input type="button" value="Назад" class="button" id="backBtnDificult">
                </div>
            </div>
        </div>
    
        <div class="canvas">
            <canvas id="snake" width="800" height="650">HTML 5 не поддерживется</canvas>
        </div>
    
        <div class="container">
            <div class="gamePad">
                <div class="firstButton">
                    <input type="image" class="buttons" id="upButton" src="${upButtonImg}">
                </div>
                <div class="otherButtons">
                    <input type="image" class="buttons" id="leftButton" src="${leftButtonImg}">
                    <input type="image" class="buttons" id="downButton" src="${downButtonImg}">
                    <input type="image" class="buttons" id="rightButton" src="${rightButtonImg}">
                </div>
            </div>
        </div>
    
        <div class="pauseScreen" id="pause">
            <img class="gif" src="${pauseGif}">
        </div>
    
        <img id="gameOverImg" src="${gameOverImg}" class="gameOver">
        <script type="application/javascript" src="${jsCode}"> </script>
    
    </body>
    
    </html>`;
}
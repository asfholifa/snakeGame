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
            panel.webview.html = getWebviewContent();
        })
    );
}

var fs = require("fs");

var contetn = fs.readFileSync(__dirname + '/html/index.html', 'utf8');
console.log(contetn);

function getWebviewContent() {
    return contetn;
}
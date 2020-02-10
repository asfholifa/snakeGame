"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('snakeGame.start', function () {
        var panel = vscode.window.createWebviewPanel('snakeGame', 'Snake Game', vscode.ViewColumn.One, {
            enableScripts: true
        });
        panel.webview.html = getWebviewContent();
    }));
}
exports.activate = activate;
var fs = require("fs");
var contetn = fs.readFileSync(__dirname + '/html/index.html', 'utf8');
console.log(contetn);
function getWebviewContent() {
    return contetn;
}
//# sourceMappingURL=extension.js.map
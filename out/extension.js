"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var path = require("path");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('snakeGame.start', function () {
        var panel = vscode.window.createWebviewPanel('snakeGame', 'Snake Game', vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src'))]
        });
        var fs = require("fs");
        var pathToHtml = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'index.html'));
        var pathUri = pathToHtml.with({ scheme: 'vscode-resource' });
        var onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'style.css'));
        var css = panel.webview.asWebviewUri(onDiskPath);
        panel.webview.html = fs.readFileSync(pathUri.fsPath, 'utf8');
    }));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map
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
                    enableScripts: true,
                    localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src'))]
                });
            let fs = require("fs");

            let pathToHtml = vscode.Uri.file(
                path.join(context.extensionPath, 'src', 'html', 'index.html')
            );

            let pathUri = pathToHtml.with({ scheme: 'vscode-resource' });

            let onDiskPath = vscode.Uri.file(
                path.join(context.extensionPath, 'src', 'html', 'style.css')
              );
            let css = panel.webview.asWebviewUri(onDiskPath);

            panel.webview.html = fs.readFileSync(pathUri.fsPath, 'utf8');
        })
    );
}
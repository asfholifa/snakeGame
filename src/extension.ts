import * as vscode from 'vscode';
import {
    fstat
} from 'fs';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('snakeGame.start', () => {
            const panel = vscode.window.createWebviewPanel(
                'snakeGame',
                'Snake Game',
                vscode.ViewColumn.One, {
                    enableScripts: true

                }
            );
            var fs = require("fs");

            fs.readFileSync('/src/html/index.html', 'utf8', (err: any, data: any) => {
                if (err) throw err;
                console.log(data);
            });
        })
    );
}
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('aiws.openWorkspace', async () => {
    const panel = vscode.window.createWebviewPanel('aiWorkspace', 'AI Workspace', vscode.ViewColumn.One, { enableScripts: true });

    panel.webview.html = getWebviewContent();

    // TODO: wire up to backend via WebSocket, authenticate using SecretStorage
  });

  context.subscriptions.push(disposable);
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html>
  <body>
    <h2>AI Workspace (MVP)</h2>
    <div id="status">Not connected</div>
    <script>
      // webview can call VS Code API via acquireVsCodeApi()
      // placeholder for WebSocket connection logic
    </script>
  </body>
</html>`;
}

export function deactivate() {}

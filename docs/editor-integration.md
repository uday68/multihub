# Editor Integration Strategy (VS Code MVP)

Goals:
- Provide an in-editor UI to manage the Workspace, prompts, prompt versions and model runs.
- Real-time sync with backend via WebSocket; fallback to REST for operations.

Key features:
- Side panel (WebView) called "AI Workspace" with:
  - Workspace selector
  - Prompt editor + version history
  - Model run controls (select models, run, cancel)
  - Contributions list (accept/reject)
- Inline decorations and code actions to apply suggestions
- Commands:
  - `aiws.openWorkspace`
  - `aiws.createPromptVersion`
  - `aiws.runPrompt`

Authentication:
- Use system browser SSO/OAuth flow and store tokens in `SecretStorage`.
- Tokens are scoped per workspace.

Offline/latency handling:
- Local queue and optimistic UI; replay on reconnect.
- Provide status indicators in panel.

Extension skeleton next steps:
- Scaffold VS Code extension with above commands and a simple WebView that connects to `wss://` and authenticates via token.
- Implement minimal telemetry for usage events.

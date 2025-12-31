# WebSocket Protocol (MVP)

Connect: wss://api.example.com/ws?workspaceId={id}&token={sessionToken}

Client -> Server events:
- intent.update
  - payload: { summary: string, intentMeta?: object }
- prompt.create
  - payload: { title: string, text: string, reason?: string }
- prompt.run
  - payload: { promptVersionId: string, models?: ["openai/gpt-..","anthropic/..."], mode: "parallel|sequential" }

Server -> Client events:
- workspace.update
  - payload: { state: { workspace data } }
- model.contribution
  - payload: { modelId, contributionId, snippet, metadata }
- error
  - payload: { code, message }

Message envelope:
{
  "type": "intent.update",
  "requestId": "uuid",
  "payload": { ... }
}

Notes:
- All model contributions are non-authoritative; UI shows accept/reject controls.
- Use requestId for idempotency and tracing.

# Telemetry & Logging (MVP)

Error categories:
- model-failure: provider returned an error
- timeout: request to model timed out
- hallucination: hallucination flag raised by detectors
- prompt-regression: output indicates regression vs known-good
- infra: DB or queue failure

Telemetry events (recommended minimal schema):
- eventId: uuid
- eventType: string (model-call, model-response, hallucination-detected, prompt-change)
- workspaceId
- promptVersionId
- modelId
- requestId
- latencyMs
- tokensUsed
- outcome: success|failure
- tags: array
- createdAt

Logging
- Structured JSON logs (use pino or bunyan in Node)
- Persist critical events in `logs` collection with type and structured details
- Send metrics to Prometheus / metrics pipeline and traces to Jaeger

Alerting
- Alert on high model-failure rate, queue backlog, auth failures spike

Notes
- Keep logs minimal and GDPR safe: do not log raw user content; prefer hashes and summaries
- Use sampling for verbose debug traces in production

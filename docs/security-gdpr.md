# Security, GDPR & Storage Rules (MVP)

Principles:
- Do not persist raw user files, images, or large attachments. Store metadata, hashes and short summaries only.
- Minimize PII storage. When unavoidable, encrypt at rest and limit access.
- Audit all access and changes to prompts and sessions.

Data handling rules:
- Raw content exclusion: any uploaded/ingested file should be hashed; store only the hash and a short summary.
- Summaries: store concise model-generated summaries only; keep raw text out when possible.
- Token usage: record tokensUsed as metadata; do not log raw token payloads.
- Export/Delete: provide APIs to export a workspace's minimal dataset (summaries and metadata) and to permanently delete all workspace data.

Retention policies:
- Sessions: TTL (e.g., 30 days) using `expiresAt` TTL index.
- Logs: configurable retention, default 1 year (use TTL index).
- Prompt versions: retain indefinitely by default; allow archiving policy for older than X years.

Security controls:
- Authentication: support OIDC/SAML and enforce MFA for admin flows
- Authorization: RBAC per workspace (future), least privilege principles
- Secrets: use a secret manager (Azure Key Vault / AWS Secrets Manager)
- Network: use VPC/private networking for model provider traffic in enterprise
- Encryption: TLS in transit; encryption at rest for DB and storage

Compliance:
- Design data deletion workflows to fully remove references and summaries
- Keep logs of deletion and export actions for audit
- Provide DPA text and support DPI requests

Developer checklist:
- Avoid printing raw user content in logs
- Use `logger` helper for structured logs
- Add static scanning (SAST), dependency checks, and periodic pen-testing

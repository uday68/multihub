# Auth & Session Model (MVP)

Goals:
- Support SSO/OAuth for integrated login (recommended: OIDC providers)
- Support project-scoped sessions (project tokens) for editor integrations and CI
- Auditable sessions with revocation and TTL

Flows:
1. Integrated Login (SSO / OIDC)
   - User clicks "Sign in", extension or web UI opens system browser to IdP.
   - IdP returns authorization code → backend exchanges for tokens.
   - Backend issues a short-lived session token (JWT or opaque token) scoped to workspace(s).
   - Token is returned to client and stored in secure storage (e.g., VS Code SecretStorage).

2. Project-scoped sessions
   - Create session via POST /workspaces/{id}/sessions (requires workspace admin role)
   - Server creates an opaque token, stores its hash in `sessions` collection with expiresAt and scope.
   - Token is returned once to caller; only hash persisted.

Security specifics:
- Never store raw refresh tokens in DB; encrypt if necessary and store minimal metadata
- Use hashing (bcrypt/argon2) for opaque token persistence
- JWT option: keep tokens short-lived and use refresh token flows for web clients
- Provide session revocation endpoint: POST /sessions/{id}/revoke which deletes the session or marks it invalid

Auditing:
- All session create/revoke operations must be logged in `logs` with actor and timestamp

Session TTL and retention:
- `sessions.expiresAt` uses TTL index to auto-expire sessions
- Logs retention configurable (e.g., 1 year) with TTL index

Notes:
- For enterprise: support SAML / SCIM for user provisioning and group sync
- Always provide audit export and data deletion APIs for GDPR compliance

# Implementation Roadmap (MVP) — 3 month plan (4 x 2-week sprints)

Sprint 1 (Weeks 1-2): Core backend and schema
- Tasks:
  - Implement MongoDB schema & migration (done)
  - Basic REST (workspaces, prompts) + OpenAPI (done)
  - Session model (project-scoped tokens) + auth skeleton (done)
- Acceptance criteria:
  - Collections created and indexes in place
  - Endpoints to create workspace & prompt work
  - Session create/revoke works via API

Sprint 2 (Weeks 3-4): Model adapters + editor integration
- Tasks:
  - Adapter pattern implemented for two providers (mock + OpenAI/Anthropic)
  - VS Code extension: WebView + connect via session token
  - WebSocket real-time protocol implemented server-side
- Acceptance criteria:
  - Adapters return contributions saved in DB
  - Editor side panel connects and displays contributions

Sprint 3 (Weeks 5-6): Prompt versioning & conflict handling
- Tasks:
  - Prompt version diffs, UI for history
  - Contribution accept/reject flow and conflict flags
  - Telemetry & logging hooked into model calls
- Acceptance criteria:
  - Version history visible and revertable
  - Contributions can be accepted and applied to prompt
  - Telemetry events collected for model calls

Sprint 4 (Weeks 7-8): Hardening and pilot
- Tasks:
  - Tests (unit, integration), CI pipeline
  - Documentation and pilot onboarding guide
  - GDPR & retention policy enforcement
- Acceptance criteria:
  - CI passing on main branch
  - Pilot team can sign in and run workflows end-to-end

Notes & Next steps:
- After MVP pilot (2-4 weeks), iterate into Phase 2 features (RBAC, multi-workspace, JetBrains plugin).
- Start security review early; add automated scans to CI.

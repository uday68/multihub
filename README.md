# AI Cognitive Workspace — MVP

> Centralized, editor-integrated AI workspace for coordinated, multi-model collaboration.

---

## 🔹 What is this?
A commercial-ready, editor-native AI Cognitive Workspace designed to let multiple LLMs operate on the same evolving, versioned context without manual mediation. This repository contains the MVP implementation: backend services, schema definitions, a VS Code extension scaffold, migration scripts, and documentation.

## 💡 Why this exists
- Reduce cognitive overhead for developers and researchers by making the workspace the single source of truth.
- Enable reproducible prompt engineering via versioned prompts and auditable model contributions.
- Provide a secure, scalable foundation for building multi-model editor integrations.

---

## 🎯 Core Principles
- **Workspace-first, model-second** — users interact with the workspace; models provide suggestions. 🔁
- **Prompt-as-artifact** — prompts are versioned, diffed, and audited. 📚
- **Model-agnostic** — adapter pattern supports multiple providers. 🔗
- **Editor-native** — VS Code extension included; JetBrains parity planned. ⚙️

---

## 🧩 MVP Features
- One Workspace, one evolving prompt, prompt version history
- Two model adapters (adapter pattern; mock adapter included)
- VS Code extension scaffold with WebView and commands
- MongoDB-backed state (prompts, versions, sessions, contributions, logs)
- Session & token model for project-scoped sessions
- Migration script and basic OpenAPI spec
- Telemetry and structured logging

---

## 📂 Repo Layout (important files)
- `server/` — Node.js backend, Mongoose models, REST routes, WebSocket protocol docs
- `extension/` — VS Code extension scaffold
- `docs/` — design docs, API spec, schemas, roadmap
- `server/migrations/` — DB migration scripts
- `.github/workflows/ci.yml` — CI checks

---

## 🚀 Quickstart (dev)
Prerequisites: Node 18+, MongoDB, and (for extension) VS Code.

1. Install server deps and run migrations

```bash
# server
cd server
npm ci
MONGO_URI="mongodb://localhost:27017/aiws" node migrations/001_create_collections_and_indexes.js
```

2. Start server (example)

```bash
cd server
npm run dev   # or `npm run start` if configured
```

3. Run extension (in another terminal)

```bash
cd extension
npm ci
npm run build
# open the extension in VS Code (Run > Start Debugging)
```

4. Run tests & lints

```bash
# root or server
npm test --prefix server
npm run lint --prefix server
```

---

## 🔌 API & WebSocket
- OpenAPI skeleton: `docs/openapi-mvp.yaml`
- WebSocket protocol: `server/src/ws/protocol.md`

Use session tokens (project-scoped) to authenticate WebSocket connections.

---

## 🛡 Security & GDPR
- Do **not** store raw files or images; store only metadata, hashes, and summaries.
- Sessions are stored as token hashes and TTL-based expiry is used.
- See `docs/security-gdpr.md` for detailed guidance.

---

## 📈 Roadmap & Next Steps
See `docs/roadmap-sprints.md` and `docs/phase2-enterprise.md` for Phase 2 and Enterprise features: RBAC, JetBrains plugin, vector DB grounding, prompt regression tests, and on-prem deployment patterns.

---

## 🤝 Contributing
Contributions are welcome. Please follow the standard flow:
1. Fork → feature branch → PR
2. Run tests and linters (CI checks are enforced via GitHub Actions)
3. Include tests for new features and update docs

See `docs/ci-checklist.md` for CI expectations.

---

## 📞 Contact
For questions or to propose enterprise integration, open an issue or contact the maintainer via the repository.

---

## 📜 License
Add a `LICENSE` file (suggestion: MIT for early-stage work, switch to a commercial license for enterprise deployments).

---

If you want, I can add badges, example screenshots for the VS Code extension, or a section that explains how to add a new model adapter. Which would you like me to add next? ✅
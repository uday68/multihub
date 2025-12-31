# CI Checklist (MVP)

Pre-merge checks (required):
- [ ] Run unit tests (backend + extension unit tests)
- [ ] Run integration tests for critical flows (workspace create, prompt create, model adapter mock)
- [ ] Run TypeScript compile (server + extension)
- [ ] Run linters (ESLint/TSLint) and formatters (Prettier)
- [ ] Security scans: dependency audit (`npm audit` / `snyk`)
- [ ] SAST (static analysis) and license checks

CD / Release checks:
- [ ] Ensure migration script runs on staging and success checks
- [ ] Run smoke test (end-to-end) against a staging deployment

Automations:
- Use GitHub Actions workflow to run checks on PRs
- Enforce branch protection rules

Notes:
- Add a step to validate OpenAPI spec using `openapi-generator` tests
- Add a step to verify required env vars are present in deployment pipelines (no secrets in logs)

# Phase 2 & Enterprise Expansion (overview)

Core Phase 2 features:
- Multi-workspace & team collaboration
- Fine-grained RBAC & role management (project, org, system roles)
- JetBrains extension parity with VS Code
- Versioned prompt testing & CI integration (prompt regression test suite)
- Vector DB integration for similarity and grounding (Pinecone/Weaviate/Azure Vector)
- Better conflict resolution UI (diffs, accept / merge suggestions)

Enterprise capabilities:
- SAML/SCIM provisioning, enterprise SSO
- On-prem / private cloud deployment pattern
- VPC peering, private endpoints for model provider traffic
- Usage billing & cost tracking per workspace/org
- Compliance: SOC2, GDPR DPA, logging retention policy, exportability
- High availability: multi-region deployments, DB replication & sharding

Operational notes:
- Introduce tenant id in most DB tables for multi-tenant designs
- Provide migration scripts & versioned IaC for on-prem installations
- Provide hardened defaults for secrets management and network security

Model marketplace idea:
- A registry of available adapters with versioned compatibility
- Plugin model to add custom adapters (enterprise sign-off)

Roadmap consideration:
- Phase 2 should be delivered after MVP is validated with 2-3 pilot teams.
- Prioritize RBAC, multi-workspace, JetBrains parity, and prompt testing in first Phase 2 sprint.

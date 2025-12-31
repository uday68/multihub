# MongoDB Schemas for AI Cognitive Workspace (MVP)

This document defines collection schemas, indexes and retention rules for the MVP.

Collections:

1) workspaces
- _id: ObjectId
- name: string
- ownerId: ObjectId
- members: [{ userId: ObjectId, role: "owner|editor|viewer" }]
- activePromptId: ObjectId
- settings: object
- createdAt, updatedAt

Indexes:
- ownerId
- name (unique per ownerId)

Retention: persist indefinitely unless workspace deleted.

---

2) prompts
- _id
- workspaceId
- title
- currentVersionId
- createdBy
- metadata
- createdAt, updatedAt

Indexes:
- workspaceId

---

3) prompt_versions
- _id
- promptId
- versionNumber (integer or semantic)
- diffFromPrev (string)
- fullText (string) — model-ready
- reason
- author
- knownFailures: [string]
- createdAt

Indexes:
- promptId + versionNumber (unique)

Retention: keep history; optionally archive older than X years.

---

4) sessions
- _id
- workspaceId
- sessionScope: "project|user"
- sessionTokenHash
- createdBy
- createdAt
- expiresAt (Date)

Indexes:
- expiresAt TTL index (sessions auto-expire)

---

5) contributions
- _id
- workspaceId
- promptVersionId
- modelId
- content (text or summary)
- metadata: { tokensUsed, latency, confidence }
- conflicts: boolean
- accepted: boolean|null
- createdAt

Indexes:
- workspaceId
- promptVersionId


---
6) logs
- _id
- workspaceId
- level (info|warn|error)
- type (model-failure|timeout|hallucination|prompt-regression)
- details (object)
- createdAt

Indexes:
- workspaceId + createdAt (for queries)
- TTL optional for older logs based on policy

---
7) summaries
- _id
- workspaceId
- summaryText
- summaryHash
- sourceRef (object: { collection, id })
- createdAt

Storage and GDPR
- Do not store raw files or images. Store hashes, meta and summaries only.
- Provide export/delete endpoints that remove linked summaries and contributions.
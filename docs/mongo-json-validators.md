# MongoDB JSON Schema Validators (examples)

Example: validate `sessions` collection to ensure `expiresAt` is a date and `sessionScope` is valid.

{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["workspaceId", "sessionTokenHash", "sessionScope"],
    "properties": {
      "workspaceId": { "bsonType": "objectId" },
      "sessionTokenHash": { "bsonType": "string" },
      "sessionScope": { "enum": ["project", "user"] },
      "expiresAt": { "bsonType": "date" }
    }
  }
}

Apply via:

db.createCollection('sessions', { validator: <schema-here>, validationLevel: 'moderate' });

Notes:
- Validators help ensure data quality.
- Keep validators strict for critical collections (sessions, prompt_versions).

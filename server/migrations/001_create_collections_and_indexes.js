/**
 * Simple migration script for MongoDB indexes and validators
 * Usage: MONGO_URI=mongodb://... node 001_create_collections_and_indexes.js
 */

const { MongoClient } = require('mongodb');

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('Set MONGO_URI');

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();

  // Workspaces
  await db.createCollection('workspaces').catch(() => {});
  await db.collection('workspaces').createIndex({ ownerId: 1, name: 1 }, { unique: true, partialFilterExpression: { name: { $exists: true } } });

  // Prompts
  await db.createCollection('prompts').catch(() => {});
  await db.collection('prompts').createIndex({ workspaceId: 1 });

  // Prompt versions
  await db.createCollection('prompt_versions').catch(() => {});
  await db.collection('prompt_versions').createIndex({ promptId: 1, versionNumber: 1 }, { unique: true });

  // Sessions
  await db.createCollection('sessions').catch(() => {});
  // TTL index on expiresAt
  await db.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

  // Contributions
  await db.createCollection('contributions').catch(() => {});
  await db.collection('contributions').createIndex({ workspaceId: 1 });
  await db.collection('contributions').createIndex({ promptVersionId: 1 });

  // Logs
  await db.createCollection('logs').catch(() => {});
  await db.collection('logs').createIndex({ workspaceId: 1, createdAt: -1 });

  // Summaries
  await db.createCollection('summaries').catch(() => {});
  await db.collection('summaries').createIndex({ summaryHash: 1 });

  console.log('Migration finished');
  await client.close();
}

run().catch(err => { console.error(err); process.exit(1); });

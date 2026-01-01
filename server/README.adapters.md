# Adapter How-To (MVP)

This document describes how to add a model adapter to the AI Workspace.

Key points:
- Adapters implement the `ModelAdapter` interface in `server/src/adapters/adapter.interface.ts`.
- Adapters should be side-effect free and return an `AdapterResult`.

Steps to add an adapter:
1. Create a new file under `server/src/adapters`, e.g., `myprovider.adapter.ts`.
2. Export a class that implements `ModelAdapter` with `id`, `name` and `run(prompt, context)`.
3. Add the adapter instance to `server/src/adapters/index.ts`.
4. Add configuration via env vars in `.env` or secrets in deployment.
5. Add unit tests mocking external API calls (use `nock`).

Example minimal adapter:

```ts
import { ModelAdapter, AdapterResult } from './adapter.interface';
import { v4 as uuidv4 } from 'uuid';

export class ExampleAdapter implements ModelAdapter {
  id = 'example';
  name = 'Example Provider';
  async run(prompt: string, context = ''): Promise<AdapterResult> {
    return { id: uuidv4(), modelId: this.id, output: `Echo: ${prompt}` };
  }
}
```

Register it in `src/adapters/index.ts`:

```ts
import { ExampleAdapter } from './example.adapter';
export const adapters = { example: new ExampleAdapter(), ... };
```

import { ModelAdapter, AdapterResult } from './adapter.interface';
import { v4 as uuidv4 } from 'uuid';

export class MockAdapter implements ModelAdapter {
  id = 'mock-adapter';
  name = 'Mock Adapter';

  async run(prompt: string): Promise<AdapterResult> {
    const output = `Mock response for: ${prompt.slice(0, 200)}`;
    return {
      id: uuidv4(),
      modelId: this.id,
      output,
      metadata: { tokensUsed: Math.max(1, Math.floor(prompt.length / 4)) },
    };
  }
}

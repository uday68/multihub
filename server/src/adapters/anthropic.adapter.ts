import { ModelAdapter, AdapterResult } from './adapter.interface';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export class AnthropicAdapter implements ModelAdapter {
  id = 'anthropic-adapter';
  name = 'Anthropic Adapter';

  apiKey: string;
  apiUrl: string;

  constructor(apiKey?: string, apiUrl?: string) {
    this.apiKey = apiKey || process.env.ANTHROPIC_API_KEY || '';
    this.apiUrl = apiUrl || process.env.ANTHROPIC_API_URL || 'https://api.anthropic.com/v1/complete';
  }

  async run(prompt: string, context = ''): Promise<AdapterResult> {
    if (!this.apiKey) throw new Error('ANTHROPIC_API_KEY not set');

    const payload = {
      model: 'claude-2',
      prompt: `System: You are an assistant for AI Workspace.\nContext: ${context}\nUser: ${prompt}`,
      max_tokens: 300,
    };

    const resp = await axios.post(this.apiUrl, payload, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });

    const text = resp?.data?.completion || JSON.stringify(resp.data);
    return { id: uuidv4(), modelId: this.id, output: text, metadata: { tokensUsed: resp?.data?.usage } };
  }
}

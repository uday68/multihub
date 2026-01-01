import { ModelAdapter, AdapterResult } from './adapter.interface';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export class OpenAIAdapter implements ModelAdapter {
  id = 'openai-adapter';
  name = 'OpenAI Adapter';

  apiKey: string;
  apiUrl: string;

  constructor(apiKey?: string, apiUrl?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || '';
    this.apiUrl = apiUrl || process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';
  }

  async run(prompt: string, context = ''): Promise<AdapterResult> {
    if (!this.apiKey) throw new Error('OPENAI_API_KEY not set');

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an assistant for AI Workspace.' },
        { role: 'user', content: `${context}\n\n${prompt}` },
      ],
      max_tokens: 1024,
    };

    const resp = await axios.post(this.apiUrl, payload, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });

    const text = resp?.data?.choices?.[0]?.message?.content || JSON.stringify(resp.data);
    return { id: uuidv4(), modelId: this.id, output: text, metadata: { tokensUsed: resp?.data?.usage } };
  }
}

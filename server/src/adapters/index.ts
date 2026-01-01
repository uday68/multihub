import { MockAdapter } from './mock.adapter';
import { OpenAIAdapter } from './openai.adapter';
import { AnthropicAdapter } from './anthropic.adapter';

export const adapters = {
  mock: new MockAdapter(),
  openai: new OpenAIAdapter(),
  anthropic: new AnthropicAdapter(),
};

export type AdapterKey = keyof typeof adapters;

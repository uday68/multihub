import nock from 'nock';
import { OpenAIAdapter } from '../openai.adapter';

test('OpenAIAdapter calls API and returns text', async () => {
  const scope = nock('https://api.openai.com')
    .post('/v1/chat/completions')
    .reply(200, { choices: [{ message: { content: 'Test response' } }], usage: { prompt_tokens: 10 } });

  const a = new OpenAIAdapter('fake-key');
  const res = await a.run('Hi');

  expect(res).toHaveProperty('id');
  expect(res.modelId).toBe('openai-adapter');
  expect(res.output).toMatch(/Test response/);

  scope.done();
});

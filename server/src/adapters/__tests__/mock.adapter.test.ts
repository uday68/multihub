import { MockAdapter } from '../mock.adapter';

test('MockAdapter returns result', async () => {
  const a = new MockAdapter();
  const res = await a.run('Hello world');
  expect(res).toHaveProperty('id');
  expect(res.modelId).toBe('mock-adapter');
  expect(res.output).toMatch(/Mock response for/);
});

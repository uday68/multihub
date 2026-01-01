export type AdapterResult = {
  id: string;
  modelId: string;
  output: string;
  metadata?: Record<string, any>;
};

export interface ModelAdapter {
  id: string;
  name: string;
  run(prompt: string, context?: string): Promise<AdapterResult>;
}

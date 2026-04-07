export type InputType = 'text' | 'textarea' | 'select' | 'json';
export type OutputType = 'text' | 'json' | 'markdown' | 'file';

export interface DemoInput {
  name: string;
  type: InputType;
  label: string;
  description: string;
  default_value: string;
  options?: string[];
  placeholder?: string;
}

export interface DemoOutput {
  name: string;
  type: OutputType;
  label: string;
  description: string;
  example_value: string;
}

export interface DemoContext {
  trigger: string;
  role_responsibilities: string[];
  typical_duration: string;
  dependencies: string[];
}

export interface SkillDemo {
  skill_id: string;
  inputs: DemoInput[];
  outputs: DemoOutput[];
  context: DemoContext;
}

export interface SkillDemosIndex {
  demos: Record<string, string>;
  total: number;
  lastUpdated: string;
}
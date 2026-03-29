export interface CommandData {
  name: string;
  description: string;
  inputs: string[];
  outputs: string[];
}

export interface CommandsCollection {
  commands: CommandData[];
  total: number;
}
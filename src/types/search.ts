export interface SearchResult {
  type: 'skill' | 'role' | 'contract' | 'command';
  id: string;
  name: string;
  description: string;
  href: string;
  score: number;
  metadata?: {
    role?: string;
    category?: string;
    emoji?: string;
    contractId?: string;
    producer?: string;
  };
}

export interface SearchResultGroup {
  skills: SearchResult[];
  roles: SearchResult[];
  contracts: SearchResult[];
  commands: SearchResult[];
}

export function groupByType(results: SearchResult[]): SearchResultGroup {
  return {
    skills: results.filter(r => r.type === 'skill'),
    roles: results.filter(r => r.type === 'role'),
    contracts: results.filter(r => r.type === 'contract'),
    commands: results.filter(r => r.type === 'command'),
  };
}
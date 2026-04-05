// src/hooks/useSearch.ts
// Global Search Hook for Feature 006

import { useState, useMemo } from 'react';
import skillsData from '../data/skills.json';
import rolesData from '../data/roles.json';
import contractsData from '../data/contracts.json';
import commandsData from '../data/commands.json';
import type { SearchResult, SearchResultGroup } from '../types/search';
import { groupByType } from '../types/search';

const ROLE_EMOJIS: Record<string, string> = {
  architect: '🏛️',
  developer: '💻',
  tester: '🔍',
  reviewer: '✅',
  docs: '📝',
  security: '🔐',
  common: '🔧',
};

export interface UseSearchResult {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
  groupedResults: SearchResultGroup;
}

export function useSearch(): UseSearchResult {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search skills
    skillsData.skills.forEach(skill => {
      const score = calculateScore(
        q,
        [skill.name, skill.id],
        skill.description,
        [skill.role, skill.category]
      );
      if (score > 0) {
        results.push({
          type: 'skill',
          id: skill.id,
          name: skill.name,
          description: skill.description,
          href: `/skills/${encodeURIComponent(skill.id)}`,
          score,
          metadata: { role: skill.role, category: skill.category },
        });
      }
    });

    // Search roles
    rolesData.roles.forEach(role => {
      const score = calculateScore(
        q,
        [role.name],
        role.mission,
        [...role.inScope, ...role.outOfScope]
      );
      if (score > 0) {
        const emoji = ROLE_EMOJIS[role.name] || '🎭';
        results.push({
          type: 'role',
          id: role.name,
          name: role.name,
          description: role.mission,
          href: `/roles/${role.name}`,
          score,
          metadata: { emoji },
        });
      }
    });

    // Search contracts
    contractsData.contracts.forEach(contract => {
      const score = calculateScore(
        q,
        [contract.contract_name, contract.contract_id],
        contract.description,
        [contract.producer_role, ...contract.consumer_roles]
      );
      if (score > 0) {
        results.push({
          type: 'contract',
          id: contract.contract_id,
          name: contract.contract_name,
          description: contract.description,
          href: `/contracts/${contract.contract_id}`,
          score,
          metadata: { contractId: contract.contract_id, producer: contract.producer_role },
        });
      }
    });

    // Search commands
    commandsData.commands.forEach(command => {
      const score = calculateScore(
        q,
        [command.name],
        command.description,
        [...command.inputs, ...command.outputs]
      );
      if (score > 0) {
        results.push({
          type: 'command',
          id: command.name,
          name: `/${command.name}`,
          description: command.description,
          href: `/commands/${command.name}`,
          score,
        });
      }
    });

    // Sort by score (descending), then limit per type
    return sortAndLimit(results, 5);
  }, [query]);

  const groupedResults = useMemo(() => groupByType(results), [results]);

  return { query, setQuery, results, groupedResults };
}

/**
 * Calculate match score for a search query
 * Higher score = better match
 */
function calculateScore(
  query: string,
  primaryFields: string[],
  description: string,
  secondaryFields: string[]
): number {
  // Check primary fields (name, id)
  for (const field of primaryFields) {
    const fieldLower = field.toLowerCase();

    // Exact match: highest priority
    if (fieldLower === query) return 100;

    // Starts with query: high priority
    if (fieldLower.startsWith(query)) return 80;

    // Contains query: medium priority
    if (fieldLower.includes(query)) return 60;
  }

  // Check description
  if (description.toLowerCase().includes(query)) return 40;

  // Check secondary fields
  for (const field of secondaryFields) {
    if (field.toLowerCase().includes(query)) return 20;
  }

  return 0;
}

/**
 * Sort results by score and limit per type
 */
function sortAndLimit(results: SearchResult[], limitPerType: number): SearchResult[] {
  // Sort by score descending
  const sorted = [...results].sort((a, b) => b.score - a.score);

  // Count per type
  const typeCounts: Record<string, number> = {
    skill: 0,
    role: 0,
    contract: 0,
    command: 0,
  };

  // Filter to limit per type
  return sorted.filter(result => {
    if (typeCounts[result.type] < limitPerType) {
      typeCounts[result.type]++;
      return true;
    }
    return false;
  });
}
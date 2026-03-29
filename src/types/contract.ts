/**
 * Contract Data Type - Public API for contract component consumption
 */
export type ContractRole = 'architect' | 'developer' | 'tester' | 'reviewer' | 'docs' | 'security';

export interface ContractData {
  contract_id: string;   // Format: "AC-XXX" or "DC-XXX" etc.
  contract_name: string;
  producer_role: ContractRole;
  consumer_roles: ContractRole[];
  description: string;
}

export interface ContractsCollection {
  contracts: ContractData[];
  total: number;
}
export type RoleName = 'architect' | 'developer' | 'tester' | 'reviewer' | 'docs' | 'security';

export interface RoleData {
  name: RoleName;
  mission: string;
  inScope: string[];
  outOfScope: string[];
  triggerConditions: string[];
  skills: string[];
}

export interface RolesCollection {
  roles: RoleData[];
  total: number;
}
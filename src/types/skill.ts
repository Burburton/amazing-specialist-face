export type SkillCategory = 'MVP' | 'M4';

export interface SkillData {
  id: string;
  name: string;
  role: string;
  category: SkillCategory;
  description: string;
  path: string;
}

export interface SkillsCollection {
  skills: SkillData[];
  total: number;
  mvpCount: number;
  m4Count: number;
}
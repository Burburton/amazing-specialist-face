import { lazy } from 'react';

export const HomePage = lazy(() => import('./HomePage'));
export const TutorialPage = lazy(() => import('./TutorialPage'));
export const CasesPage = lazy(() => import('./CasesPage'));
export const SkillsPage = lazy(() => import('./SkillsPage'));
export const RolesPage = lazy(() => import('./RolesPage'));
export const ContractsPage = lazy(() => import('./ContractsPage'));
export const CommandsPage = lazy(() => import('./CommandsPage'));
export const ExecutionPage = lazy(() => import('./ExecutionPage'));
export const NotFoundPage = lazy(() => import('./NotFoundPage'));

export const SkillDetailPage = lazy(() => import('./SkillDetailPage'));
export const RoleDetailPage = lazy(() => import('./RoleDetailPage'));
export const ContractDetailPage = lazy(() => import('./ContractDetailPage'));
export const CommandDetailPage = lazy(() => import('./CommandDetailPage'));
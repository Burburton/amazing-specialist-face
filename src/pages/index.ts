import { lazy } from 'react';

export const HomePage = lazy(() => import('./HomePage'));
export const SkillsPage = lazy(() => import('./SkillsPage'));
export const RolesPage = lazy(() => import('./RolesPage'));
export const ContractsPage = lazy(() => import('./ContractsPage'));
export const CommandsPage = lazy(() => import('./CommandsPage'));
export const NotFoundPage = lazy(() => import('./NotFoundPage'));
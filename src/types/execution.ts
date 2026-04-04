import type { DispatchPayload, ExecutionResult } from './dispatch';

export type TaskStatus = 'pending' | 'in-progress' | 'success' | 'failed' | 'blocked';

export type Role = 'architect' | 'developer' | 'tester' | 'reviewer' | 'docs' | 'security';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type ExecutionStatus =
  | 'SUCCESS'
  | 'SUCCESS_WITH_WARNINGS'
  | 'PARTIAL'
  | 'BLOCKED'
  | 'FAILED_RETRYABLE'
  | 'FAILED_ESCALATE';

export type Recommendation =
  | 'CONTINUE'
  | 'SEND_TO_TEST'
  | 'SEND_TO_REVIEW'
  | 'REWORK'
  | 'REPLAN'
  | 'ESCALATE';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  metadata?: Record<string, unknown>;
}

export interface ExecutionPhase {
  role: Role;
  status: TaskStatus;
  duration?: number;
  started_at?: string;
  completed_at?: string;
}

export interface TaskFilter {
  status?: TaskStatus;
  role?: Role;
  risk_level?: RiskLevel;
  milestone?: string;
  search?: string;
}

export interface Task {
  id: string;
  task_id: string;
  title: string;
  status: TaskStatus;
  role: Role;
  command: string;
  risk_level: RiskLevel;
  milestone: string;
  created_at: string;
  updated_at: string;
  issue_url: string;
  issue_number: number;
  dispatch_payload?: DispatchPayload;
  execution_result?: ExecutionResult;
  logs: LogEntry[];
  phases: ExecutionPhase[];
}

export interface ExecutionState {
  tasks: Task[];
  selectedTask: Task | null;
  filter: TaskFilter;
  loading: boolean;
  error: Error | null;
}

export interface ExecutionStats {
  total: number;
  pending: number;
  inProgress: number;
  success: number;
  failed: number;
  blocked: number;
}

export interface ParsedLabels {
  role: Role;
  risk_level: RiskLevel;
  task_id?: string;
  milestone?: string;
  status?: TaskStatus;
}
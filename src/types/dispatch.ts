import type { Role, RiskLevel, ExecutionStatus, Recommendation } from './execution';

export type ArtifactType =
  | 'spec'
  | 'design_note'
  | 'implementation_summary'
  | 'test_report'
  | 'review_report'
  | 'docs_sync_report'
  | 'changelog_entry'
  | 'security_report'
  | 'code_diff_summary'
  | 'doc_update_report'
  | 'performance_report';

export type ArtifactFormat = 'markdown' | 'yaml' | 'json' | 'code' | 'txt';

export type ChangeType = 'added' | 'modified' | 'deleted' | 'renamed';

export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low';

export type EscalationReasonType =
  | 'MISSING_CONTEXT'
  | 'CONFLICTING_CONSTRAINTS'
  | 'HIGH_RISK_CHANGE'
  | 'REPEATED_FAILURE'
  | 'OUT_OF_SCOPE_REQUEST'
  | 'TOOLING_BLOCKER';

export interface ArtifactReference {
  artifact_id: string;
  artifact_type: ArtifactType;
  path: string;
  summary: string;
}

export interface DispatchContext {
  project_goal?: string;
  milestone_goal?: string;
  task_scope: string;
  related_spec_sections?: string[];
  code_context_summary?: string;
}

export interface RetryContext {
  retry_count: number;
  previous_failure_reason: string;
  previous_output_summary?: string;
  required_fixes: string[];
}

export interface UpstreamDependency {
  task_id: string;
  status: 'completed' | 'failed' | 'blocked';
}

export interface DispatchMetadata {
  domain?: string;
  created_at?: string;
  created_by?: string;
}

export interface DispatchPayload {
  dispatch_id: string;
  project_id: string;
  milestone_id: string;
  task_id: string;
  role: Role;
  command: string;
  title: string;
  goal: string;
  description: string;
  context: DispatchContext;
  constraints: string[];
  inputs: ArtifactReference[];
  expected_outputs: string[];
  verification_steps: string[];
  risk_level: RiskLevel;
  retry_context?: RetryContext;
  upstream_dependencies?: UpstreamDependency[];
  downstream_expectations?: string;
  metadata?: DispatchMetadata;
}

export interface Artifact {
  artifact_id: string;
  artifact_type: ArtifactType;
  title: string;
  path: string;
  format: ArtifactFormat;
  summary: string;
  created_by_role: string;
  related_task_id?: string;
  created_at: string;
}

export interface FileChange {
  path: string;
  change_type: ChangeType;
  diff_summary?: string;
}

export interface IssueFound {
  issue_id: string;
  severity: IssueSeverity;
  description: string;
  recommendation?: string;
}

export interface Risk {
  risk_id: string;
  level: 'high' | 'medium' | 'low';
  description: string;
  mitigation?: string;
}

export interface Escalation {
  escalation_id: string;
  reason_type: EscalationReasonType;
  summary: string;
  blocking_points: string[];
  attempted_actions?: string[];
  recommended_next_steps?: string[];
  requires_user_decision: boolean;
}

export interface ExecutionResult {
  dispatch_id: string;
  project_id: string;
  milestone_id: string;
  task_id: string;
  role: Role;
  command: string;
  status: ExecutionStatus;
  summary: string;
  artifacts: Artifact[];
  changed_files: FileChange[];
  checks_performed: string[];
  issues_found: IssueFound[];
  risks: Risk[];
  recommendation: Recommendation;
  needs_followup: boolean;
  followup_suggestions?: string[];
  escalation?: Escalation;
  created_at: string;
  metadata?: {
    execution_time_ms?: number;
    model_version?: string;
  };
}
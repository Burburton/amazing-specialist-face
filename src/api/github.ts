import type {
  Task,
  TaskStatus,
  Role,
  RiskLevel,
  ParsedLabels,
  DispatchPayload,
} from '../types';
import type { ArtifactReference, ArtifactType } from '../types/dispatch';

const GITHUB_API_BASE = 'https://api.github.com';

interface GitHubLabel {
  id: number;
  name: string;
  color: string;
  description?: string;
}

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
}

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body?: string;
  state: 'open' | 'closed';
  html_url: string;
  labels: GitHubLabel[];
  user: GitHubUser;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  milestone?: {
    number: number;
    title: string;
  } | null;
}

interface FetchIssuesOptions {
  state?: 'open' | 'closed' | 'all';
  labels?: string[];
  per_page?: number;
  page?: number;
}

interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
}

const DEFAULT_ROLE: Role = 'developer';
const DEFAULT_RISK_LEVEL: RiskLevel = 'medium';

const ROLE_PRIORITY: Role[] = ['architect', 'developer', 'tester', 'reviewer', 'docs', 'security'];

const VALID_ROLES: Set<string> = new Set(ROLE_PRIORITY);

const VALID_RISK_LEVELS: Set<string> = new Set(['low', 'medium', 'high', 'critical']);

const VALID_STATUSES: Set<string> = new Set(['pending', 'in-progress', 'success', 'failed', 'blocked']);

function getEnvToken(): string | undefined {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_GITHUB_TOKEN;
  }
  return undefined;
}

export async function githubFetch<T>(
  endpoint: string,
  token?: string
): Promise<{ data: T; rateLimit: RateLimitInfo }> {
  const authToken = token || getEnvToken();

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'amazing-specialist-face/1.0',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, { headers });

  const rateLimit: RateLimitInfo = {
    limit: parseInt(response.headers.get('x-ratelimit-limit') || '60', 10),
    remaining: parseInt(response.headers.get('x-ratelimit-remaining') || '60', 10),
    reset: parseInt(response.headers.get('x-ratelimit-reset') || '0', 10),
    used: parseInt(response.headers.get('x-ratelimit-used') || '0', 10),
  };

  if (!response.ok) {
    const errorBody = await response.text();
    const error = new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    (error as Error & { status: number; body: string; rateLimit: RateLimitInfo }).status = response.status;
    (error as Error & { status: number; body: string; rateLimit: RateLimitInfo }).body = errorBody;
    (error as Error & { status: number; body: string; rateLimit: RateLimitInfo }).rateLimit = rateLimit;
    throw error;
  }

  const data = await response.json();
  return { data, rateLimit };
}

export function parseIssueLabels(labels: GitHubLabel[]): ParsedLabels {
  const result: ParsedLabels = {
    role: DEFAULT_ROLE,
    risk_level: DEFAULT_RISK_LEVEL,
    task_id: undefined,
    milestone: undefined,
    status: undefined,
  };

  const foundRoles: Role[] = [];

  for (const label of labels) {
    const name = label.name.toLowerCase();

    if (name.startsWith('role:')) {
      const roleValue = name.replace('role:', '');
      if (VALID_ROLES.has(roleValue)) {
        foundRoles.push(roleValue as Role);
      }
    }

    if (name.startsWith('risk:')) {
      const riskValue = name.replace('risk:', '');
      if (VALID_RISK_LEVELS.has(riskValue)) {
        result.risk_level = riskValue as RiskLevel;
      }
    }

    if (name.startsWith('task:t-') || name.startsWith('task:')) {
      result.task_id = label.name.replace('task:', '');
    }

    if (name.startsWith('milestone:m') || name.startsWith('milestone:')) {
      result.milestone = label.name.replace('milestone:', '');
    }

    if (name.startsWith('status:')) {
      const statusValue = name.replace('status:', '');
      if (VALID_STATUSES.has(statusValue)) {
        result.status = statusValue as TaskStatus;
      }
    }
  }

  if (foundRoles.length > 0) {
    for (const priorityRole of ROLE_PRIORITY) {
      if (foundRoles.includes(priorityRole)) {
        result.role = priorityRole;
        break;
      }
    }
  }

  return result;
}

function extractSection(body: string, title: string): string | undefined {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`##\\s*${escapedTitle}[\\s\\n]*([\\s\\S]*?)(?=\\n##\\s|$)`, 'i');
  const match = body.match(regex);
  return match?.[1]?.trim();
}

function extractListSection(body: string, title: string): string[] {
  const section = extractSection(body, title);
  if (!section) return [];

  const lines = section.split('\n');
  const items: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      items.push(trimmed.substring(2).trim());
    } else if (trimmed.startsWith('- [ ]') || trimmed.startsWith('- [x]')) {
      items.push(trimmed.substring(6).trim());
    }
  }

  return items;
}

export function extractChecklist(body: string, title: string): { checked: string[]; unchecked: string[] } {
  const section = extractSection(body, title);
  if (!section) return { checked: [], unchecked: [] };

  const lines = section.split('\n');
  const checked: string[] = [];
  const unchecked: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- [x]')) {
      checked.push(trimmed.substring(5).trim());
    } else if (trimmed.startsWith('- [ ]')) {
      unchecked.push(trimmed.substring(5).trim());
    }
  }

  return { checked, unchecked };
}

export function parseIssueBody(body: string | undefined): Partial<DispatchPayload> {
  if (!body) {
    return {
      goal: undefined,
      constraints: [],
      inputs: [],
      expected_outputs: [],
    };
  }

  const goal = extractSection(body, 'Goal') || extractSection(body, '目标');
  const constraints = extractListSection(body, 'Constraints') || extractListSection(body, '约束');
  const inputs = extractListSection(body, 'Inputs') || extractListSection(body, '输入');
  const expectedOutputs = extractListSection(body, 'Expected Outputs') || extractListSection(body, '期望输出');

  return {
    goal,
    constraints,
    inputs: inputs.map((input) => ({
      artifact_id: input,
      artifact_type: 'spec' as ArtifactType,
      path: '',
      summary: input,
    })) as ArtifactReference[],
    expected_outputs: expectedOutputs,
  };
}

export function mapIssueToTask(issue: GitHubIssue): Task {
  const parsedLabels = parseIssueLabels(issue.labels);
  const parsedBody = parseIssueBody(issue.body);

  const status: TaskStatus = parsedLabels.status || (issue.state === 'closed' ? 'success' : 'pending');

  return {
    id: `task-${issue.number}`,
    task_id: parsedLabels.task_id || `T-${issue.number}`,
    title: issue.title,
    status,
    role: parsedLabels.role,
    command: 'implement-task',
    risk_level: parsedLabels.risk_level,
    milestone: parsedLabels.milestone || issue.milestone?.title?.replace('M', 'M') || 'M000',
    created_at: issue.created_at,
    updated_at: issue.updated_at,
    issue_url: issue.html_url,
    issue_number: issue.number,
    dispatch_payload: parsedBody.goal
      ? {
          dispatch_id: `dispatch-${issue.number}`,
          project_id: 'amazing-specialist-face',
          milestone_id: parsedLabels.milestone || 'M000',
          task_id: parsedLabels.task_id || `T-${issue.number}`,
          role: parsedLabels.role,
          command: 'implement-task',
          title: issue.title,
          goal: parsedBody.goal,
          description: issue.body || '',
          context: {
            task_scope: parsedBody.goal,
          },
          constraints: parsedBody.constraints || [],
          inputs: parsedBody.inputs || [],
          expected_outputs: parsedBody.expected_outputs || [],
          verification_steps: [],
          risk_level: parsedLabels.risk_level,
        }
      : undefined,
    logs: [],
    phases: [],
  };
}

export async function fetchIssues(
  owner: string,
  repo: string,
  options: FetchIssuesOptions = {},
  token?: string
): Promise<{ tasks: Task[]; rateLimit: RateLimitInfo }> {
  const params = new URLSearchParams();

  params.set('state', options.state || 'all');

  if (options.labels && options.labels.length > 0) {
    params.set('labels', options.labels.join(','));
  }

  params.set('per_page', String(options.per_page || 100));
  params.set('page', String(options.page || 1));

  const { data, rateLimit } = await githubFetch<GitHubIssue[]>(
    `/repos/${owner}/${repo}/issues?${params.toString()}`,
    token
  );

  const tasks = data.map(mapIssueToTask);

  return { tasks, rateLimit };
}

export async function fetchIssue(
  owner: string,
  repo: string,
  issueNumber: number,
  token?: string
): Promise<{ task: Task; rateLimit: RateLimitInfo }> {
  const { data, rateLimit } = await githubFetch<GitHubIssue>(
    `/repos/${owner}/${repo}/issues/${issueNumber}`,
    token
  );

  const task = mapIssueToTask(data);

  return { task, rateLimit };
}

export function getRateLimitStatus(rateLimit: RateLimitInfo): {
  isLimited: boolean;
  remainingPercent: number;
  resetDate: Date;
} {
  return {
    isLimited: rateLimit.remaining === 0,
    remainingPercent: (rateLimit.remaining / rateLimit.limit) * 100,
    resetDate: new Date(rateLimit.reset * 1000),
  };
}

export const GitHubClient = {
  fetchIssues,
  fetchIssue,
  parseIssueLabels,
  parseIssueBody,
  mapIssueToTask,
  getRateLimitStatus,
};

export default GitHubClient;
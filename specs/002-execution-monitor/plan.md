# Implementation Plan: Phase B - Execution Monitor

## Plan ID
002-execution-monitor

## Feature
002-execution-monitor

## Version
1.0.0

## Created
2026-04-04

---

## Architecture Overview

### Component Structure

```
src/
├── pages/
│   └── ExecutionPage.tsx          # 执行监控主页面
├── components/
│   ├── execution/
│   │   ├── Dashboard.tsx          # 执行仪表板
│   │   ├── TaskCard.tsx           # 任务状态卡片
│   │   ├── Timeline.tsx           # 执行时间线
│   │   ├── LogViewer.tsx          # 日志查看器
│   │   ├── PayloadViewer.tsx      # Payload 可视化
│   │   └── StatsOverview.tsx      # 统计概览
│   └── common/                    # 复用 Phase A 组件
├── hooks/
│   ├── useGitHubIssues.ts         # GitHub Issues 数据获取
│   ├── useExecutionState.ts       # 执行状态管理
│   └── useTaskFilter.ts           # 任务筛选逻辑
├── types/
│   ├── execution.ts               # 执行相关类型
│   └── dispatch.ts                # Dispatch Payload 类型
├── data/
│   └── mock-executions.json       # 模拟执行数据
└── api/
    └── github.ts                  # GitHub API 客户端
```

### Data Flow

```
GitHub Issues API
       │
       ▼
  useGitHubIssues
       │
       ├── Issue Parser (labels → task metadata)
       │
       ▼
  ExecutionState
       │
       ├── TaskCard (individual task)
       ├── Timeline (execution flow)
       └── LogViewer (execution logs)
```

### State Management

```typescript
interface ExecutionState {
  tasks: Task[];
  selectedTask: Task | null;
  filter: TaskFilter;
  loading: boolean;
  error: Error | null;
}

interface Task {
  id: string;                    // Issue number
  task_id: string;               // T-XXX
  title: string;
  status: TaskStatus;
  role: Role;
  command: string;
  risk_level: RiskLevel;
  milestone: string;
  created_at: string;
  updated_at: string;
  issue_url: string;
  dispatch_payload?: DispatchPayload;
  execution_result?: ExecutionResult;
  logs: LogEntry[];
}

type TaskStatus = 'pending' | 'in-progress' | 'success' | 'failed' | 'blocked';
type Role = 'architect' | 'developer' | 'tester' | 'reviewer' | 'docs' | 'security';
type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
```

---

## Implementation Phases

### Phase 1: Foundation (M1)

#### 1.1 Type Definitions
- `src/types/execution.ts` - Task, ExecutionState 类型
- `src/types/dispatch.ts` - DispatchPayload 类型（从 io-contract.md 映射）

#### 1.2 API Client
- `src/api/github.ts` - GitHub REST API 封装
  - `fetchIssues()` - 获取任务 Issues
  - `parseIssueLabels()` - 解析 labels 为任务元数据
  - `parseIssueBody()` - 解析 Issue body 为 dispatch payload

#### 1.3 Route Configuration
- 添加 `/execution` 路由
- 配置导航链接

### Phase 2: Core Components (M2)

#### 2.1 Execution Dashboard
- 统计概览（活跃/完成/失败任务数）
- 任务列表网格
- 筛选器（状态、角色、里程碑）

#### 2.2 Task Card
- 状态指示器（颜色编码）
- 任务元数据显示
- GitHub Issue 链接
- 点击展开详情

#### 2.3 Execution Timeline
- 6-role 流程可视化
- 当前阶段高亮
- 阶段耗时显示

### Phase 3: Advanced Features (M3)

#### 3.1 Log Viewer
- 日志列表展示
- 级别过滤（info/warning/error）
- 关键词搜索
- 自动滚动到底部

#### 3.2 Payload Viewer
- 结构化视图
- JSON 原始视图
- 字段高亮

#### 3.3 GitHub Integration
- 刷新任务状态
- 错误处理
- Rate limit 处理

### Phase 4: Polish (M4)

#### 4.1 Performance
- React.lazy 懒加载
- 虚拟滚动（长列表）
- 缓存策略

#### 4.2 Responsiveness
- 移动端适配
- 平板布局

#### 4.3 Testing
- 组件测试
- 集成测试

---

## Component Specifications

### 1. ExecutionPage

```tsx
interface ExecutionPageProps {
  // 可选：初始筛选条件
  initialFilter?: Partial<TaskFilter>;
}

// 布局
// ┌─────────────────────────────────────┐
// │ StatsOverview                        │
// ├─────────────────────────────────────┤
// │ Filter Bar                           │
// ├─────────────────────────────────────┤
// │ Task Grid                            │
// │  ┌──────┐ ┌──────┐ ┌──────┐         │
// │  │Task 1│ │Task 2│ │Task 3│         │
// │  └──────┘ └──────┘ └──────┘         │
// └─────────────────────────────────────┘
```

### 2. TaskCard

```tsx
interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  expanded?: boolean;
}

// 布局
// ┌─────────────────────────────────┐
// │ [Status] T-XXX: Task Title       │
// │ Role: developer | Risk: low      │
// │ Milestone: M001 | Command: impl  │
// │ ─────────────────────────────── │
// │ Timeline (when expanded)         │
// │ Logs (when expanded)             │
// └─────────────────────────────────┘
```

### 3. Timeline

```tsx
interface TimelineProps {
  phases: ExecutionPhase[];
  currentPhase?: string;
}

interface ExecutionPhase {
  role: Role;
  status: TaskStatus;
  duration?: number;
  started_at?: string;
  completed_at?: string;
}

// 布局
// ┌─────────────────────────────────────┐
// │ architect ── developer ── tester    │
// │    ✓           🔄           ○       │
// │  2.3s       1m 20s                 │
// └─────────────────────────────────────┘
```

---

## GitHub Issue Parser

### Label Parsing Logic

```typescript
function parseIssueLabels(labels: Label[]): ParsedLabels {
  const result: ParsedLabels = {
    role: 'developer',  // default
    risk_level: 'medium',  // default
    task_id: undefined,
    milestone: undefined,
    status: undefined
  };

  for (const label of labels) {
    if (label.name.startsWith('role:')) {
      result.role = label.name.replace('role:', '') as Role;
    }
    if (label.name.startsWith('risk:')) {
      result.risk_level = label.name.replace('risk:', '') as RiskLevel;
    }
    if (label.name.startsWith('task:T')) {
      result.task_id = label.name.replace('task:', '');
    }
    if (label.name.startsWith('milestone:M')) {
      result.milestone = label.name.replace('milestone:', '');
    }
    if (label.name.startsWith('status:')) {
      result.status = label.name.replace('status:', '') as TaskStatus;
    }
  }

  return result;
}
```

### Body Parsing Logic

```typescript
function parseIssueBody(body: string): Partial<DispatchPayload> {
  const sections = {
    goal: extractSection(body, 'Goal'),
    constraints: extractListSection(body, 'Constraints'),
    inputs: extractListSection(body, 'Inputs'),
    expected_outputs: extractListSection(body, 'Expected Outputs'),
    acceptance_criteria: extractChecklist(body, 'Acceptance Criteria')
  };

  return sections;
}

function extractSection(body: string, title: string): string | undefined {
  const regex = new RegExp(`## ${title}\\n([\\s\\S]*?)(?=\\n## |$)`, 'i');
  const match = body.match(regex);
  return match?.[1]?.trim();
}
```

---

## Styling Guidelines

### Status Colors

```css
--status-pending: #9CA3AF;     /* gray */
--status-in-progress: #3B82F6; /* blue */
--status-success: #10B981;     /* green */
--status-failed: #EF4444;      /* red */
--status-blocked: #F59E0B;     /* amber */
```

### Role Colors

```css
--role-architect: #8B5CF6;     /* purple */
--role-developer: #3B82F6;     /* blue */
--role-tester: #10B981;        /* green */
--role-reviewer: #F59E0B;      /* amber */
--role-docs: #6366F1;          /* indigo */
--role-security: #EF4444;      /* red */
```

---

## Testing Strategy

### Unit Tests
- Label parser 测试
- Body parser 测试
- 状态计算测试

### Integration Tests
- GitHub API 集成测试（使用 mock）
- 页面渲染测试

### E2E Tests
- 任务列表加载
- 筛选功能
- 任务详情展开

---

## Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| GitHub API rate limit | Medium | High | Implement caching, reduce API calls |
| Large issue list | Medium | Medium | Pagination, virtual scrolling |
| Complex body parsing | Low | Low | Fallback to raw display |

---

## Timeline

| Phase | Duration | Tasks |
|-------|----------|-------|
| M1 | 1 day | Types, API, Routes |
| M2 | 2 days | Dashboard, Card, Timeline |
| M3 | 2 days | Log, Payload, Integration |
| M4 | 1 day | Performance, Polish |

**Total Estimated: 6 days**
# Tasks: Phase B - Execution Monitor

## Feature
002-execution-monitor

## Milestone
M002

---

## Task List

| Task ID | Task Name | Role | Status | Dependencies |
|---------|-----------|------|--------|--------------|
| T-B001 | 类型定义 | developer | ✅ completed | - |
| T-B002 | GitHub API 客户端 | developer | ✅ completed | T-B001 |
| T-B003 | 路由配置 | developer | ✅ completed | - |
| T-B004 | StatsOverview 组件 | developer | ✅ completed | T-B001 |
| T-B005 | TaskCard 组件 | developer | ✅ completed | T-B001, T-B002 |
| T-B006 | Timeline 组件 | developer | ✅ completed | T-B001 |
| T-B007 | LogViewer 组件 | developer | ✅ completed | T-B001 |
| T-B008 | PayloadViewer 组件 | developer | ✅ completed | T-B001 |
| T-B009 | ExecutionPage 页面 | developer | ✅ completed | T-B004~T-B008 |
| T-B010 | 导航更新 | developer | ✅ completed | T-B009 |
| T-B011 | 模拟数据 | developer | ✅ completed | T-B001 |
| T-B012 | 构建验证 | developer | ✅ completed | T-B009, T-B010 |

---

## Detailed Tasks

### T-B001: 类型定义

**Phase**: M1 - Foundation
**Status**: pending
**Priority**: high
**Dependencies**: -

**Goal**:
定义 Execution Monitor 所需的所有 TypeScript 类型。

**Scope**:
- `src/types/execution.ts`
  - Task interface
  - ExecutionState interface
  - TaskStatus, Role, RiskLevel types
  - LogEntry interface
  - TaskFilter interface

- `src/types/dispatch.ts`
  - DispatchPayload interface (from io-contract.md)
  - ExecutionResult interface
  - ArtifactReference interface

**Acceptance Criteria**:
- [ ] 所有类型定义完成
- [ ] 无 TypeScript 编译错误
- [ ] 类型与 io-contract.md 一致

**Estimated Effort**: 1 hour

---

### T-B002: GitHub API 客户端

**Phase**: M1 - Foundation
**Status**: pending
**Priority**: high
**Dependencies**: T-B001

**Goal**:
实现 GitHub REST API 封装，支持获取 Issues 和解析任务元数据。

**Scope**:
- `src/api/github.ts`
  - `fetchIssues(owner, repo, options)` - 获取任务 Issues
  - `parseIssueLabels(labels)` - 解析 labels
  - `parseIssueBody(body)` - 解析 Issue body
  - `mapIssueToTask(issue)` - Issue → Task 转换

**Acceptance Criteria**:
- [ ] API 客户端可正常调用
- [ ] Label 解析正确（role, risk, task, milestone, status）
- [ ] Body 解析正确（Goal, Constraints, Inputs, Outputs）
- [ ] 错误处理完善

**Estimated Effort**: 2 hours

---

### T-B003: 路由配置

**Phase**: M1 - Foundation
**Status**: pending
**Priority**: high
**Dependencies**: -

**Goal**:
添加 `/execution` 路由到应用。

**Scope**:
- 更新 `src/App.tsx`
  - 添加 `/execution` 路由
  - 添加 lazy loading

**Acceptance Criteria**:
- [ ] `/execution` 路由可访问
- [ ] 404 页面正常显示
- [ ] 导航链接正确

**Estimated Effort**: 0.5 hour

---

### T-B004: StatsOverview 组件

**Phase**: M2 - Core Components
**Status**: pending
**Priority**: high
**Dependencies**: T-B001

**Goal**:
创建执行统计概览组件，显示任务统计信息。

**Scope**:
- `src/components/execution/StatsOverview.tsx`
- `src/components/execution/StatsOverview.module.css`

**Props**:
```typescript
interface StatsOverviewProps {
  total: number;
  pending: number;
  inProgress: number;
  success: number;
  failed: number;
  blocked: number;
}
```

**Acceptance Criteria**:
- [ ] 正确显示统计数字
- [ ] 状态颜色编码正确
- [ ] 响应式布局

**Estimated Effort**: 1 hour

---

### T-B005: TaskCard 组件

**Phase**: M2 - Core Components
**Status**: pending
**Priority**: high
**Dependencies**: T-B001, T-B002

**Goal**:
创建任务状态卡片组件，展示单个任务详情。

**Scope**:
- `src/components/execution/TaskCard.tsx`
- `src/components/execution/TaskCard.module.css`

**Props**:
```typescript
interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  expanded?: boolean;
}
```

**Acceptance Criteria**:
- [ ] 显示任务 ID、标题、状态
- [ ] 显示角色、风险等级、里程碑
- [ ] 状态颜色正确
- [ ] GitHub Issue 链接可用
- [ ] 支持展开/收起

**Estimated Effort**: 2 hours

---

### T-B006: Timeline 组件

**Phase**: M2 - Core Components
**Status**: pending
**Priority**: medium
**Dependencies**: T-B001

**Goal**:
创建执行时间线组件，可视化 6-role 执行流程。

**Scope**:
- `src/components/execution/Timeline.tsx`
- `src/components/execution/Timeline.module.css`

**Props**:
```typescript
interface TimelineProps {
  phases: ExecutionPhase[];
  currentPhase?: string;
}
```

**Acceptance Criteria**:
- [ ] 正确显示 6 个角色阶段
- [ ] 当前阶段高亮
- [ ] 各阶段状态正确
- [ ] 耗时显示正确

**Estimated Effort**: 2 hours

---

### T-B007: LogViewer 组件

**Phase**: M3 - Advanced Features
**Status**: pending
**Priority**: medium
**Dependencies**: T-B001

**Goal**:
创建日志查看器组件，展示执行日志。

**Scope**:
- `src/components/execution/LogViewer.tsx`
- `src/components/execution/LogViewer.module.css`

**Props**:
```typescript
interface LogViewerProps {
  logs: LogEntry[];
  maxHeight?: string;
}
```

**Acceptance Criteria**:
- [ ] 正确显示日志列表
- [ ] 支持级别过滤（info/warning/error）
- [ ] 支持关键词搜索
- [ ] 自动滚动到底部

**Estimated Effort**: 1.5 hours

---

### T-B008: PayloadViewer 组件

**Phase**: M3 - Advanced Features
**Status**: pending
**Priority**: medium
**Dependencies**: T-B001

**Goal**:
创建 Dispatch Payload 可视化组件。

**Scope**:
- `src/components/execution/PayloadViewer.tsx`
- `src/components/execution/PayloadViewer.module.css`

**Props**:
```typescript
interface PayloadViewerProps {
  payload: DispatchPayload;
  view?: 'structured' | 'json';
}
```

**Acceptance Criteria**:
- [ ] 结构化视图正确
- [ ] JSON 视图正确
- [ ] 支持视图切换
- [ ] 关键字段高亮

**Estimated Effort**: 1 hour

---

### T-B009: ExecutionPage 页面

**Phase**: M3 - Advanced Features
**Status**: pending
**Priority**: high
**Dependencies**: T-B004~T-B008

**Goal**:
创建执行监控主页面，整合所有组件。

**Scope**:
- `src/pages/ExecutionPage.tsx`
- `src/pages/ExecutionPage.module.css`
- `src/hooks/useGitHubIssues.ts`
- `src/hooks/useExecutionState.ts`
- `src/hooks/useTaskFilter.ts`

**Acceptance Criteria**:
- [ ] 页面布局正确
- [ ] 数据加载正确
- [ ] 筛选功能正常
- [ ] 任务列表正确显示
- [ ] 错误处理完善

**Estimated Effort**: 3 hours

---

### T-B010: 导航更新

**Phase**: M3 - Advanced Features
**Status**: pending
**Priority**: medium
**Dependencies**: T-B009

**Goal**:
更新导航菜单，添加 Execution 入口。

**Scope**:
- 更新 `src/components/common/Header.tsx`
- 添加 Execution 导航链接
- 更新 `src/data/` 统计数据

**Acceptance Criteria**:
- [ ] 导航链接可见
- [ ] 当前页面高亮
- [ ] 移动端菜单正确

**Estimated Effort**: 0.5 hour

---

### T-B011: 模拟数据

**Phase**: M2 - Core Components
**Status**: pending
**Priority**: medium
**Dependencies**: T-B001

**Goal**:
创建模拟执行数据，用于开发和测试。

**Scope**:
- `src/data/mock-executions.json`
  - 10+ 个模拟任务
  - 各种状态（pending, in-progress, success, failed, blocked）
  - 各种角色（architect, developer, tester, reviewer, docs, security）

**Acceptance Criteria**:
- [ ] 数据结构正确
- [ ] 覆盖所有状态类型
- [ ] 覆盖所有角色类型

**Estimated Effort**: 0.5 hour

---

### T-B012: 构建验证

**Phase**: M4 - Polish
**Status**: pending
**Priority**: high
**Dependencies**: T-B009, T-B010

**Goal**:
确保所有代码通过构建和 lint 检查。

**Scope**:
- 运行 `npm run build`
- 运行 `npm run lint`
- 修复所有错误和警告

**Acceptance Criteria**:
- [ ] `npm run build` 成功
- [ ] `npm run lint` 无错误
- [ ] 所有页面可访问
- [ ] 所有组件正常渲染

**Estimated Effort**: 1 hour

---

## Parallel Execution

以下任务可以并行执行：

**Phase 1 并行组**:
- T-B001 (类型定义) + T-B003 (路由配置)

**Phase 2 并行组**:
- T-B004 (StatsOverview) + T-B005 (TaskCard) + T-B006 (Timeline)

**Phase 3 并行组**:
- T-B007 (LogViewer) + T-B008 (PayloadViewer) + T-B011 (模拟数据)

---

## Notes

- 每个任务完成后更新此文件的状态
- 如果发现需求变更，需要同步更新 spec.md 和 plan.md
- 所有代码变更需关联到对应的 task ID
- GitHub Issue 创建时需添加正确的 labels
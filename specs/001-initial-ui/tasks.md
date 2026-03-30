# Tasks: Initial UI - 文档展示型界面

## Feature Reference
`specs/001-initial-ui/spec.md` | `specs/001-initial-ui/plan.md`

## Version
`1.0.0`

## Created
2026-03-29

---

## Task Summary

| Task ID | Task Name | Phase | Status | Assignee | Dependencies |
|---------|-----------|-------|--------|----------|--------------|
| T-001 | 目录结构与类型定义 | Phase 1 | ✅ completed | developer | - |
| T-002 | 数据文件准备 | Phase 1 | ✅ completed | developer | T-001 |
| T-003 | 路由配置 | Phase 1 | ✅ completed | developer | T-001 |
| T-004 | Header 组件 | Phase 2 | ✅ completed | developer | T-001 |
| T-005 | Layout 组件 | Phase 2 | pending | developer | T-004 |
| T-006 | 全局样式 | Phase 2 | pending | developer | - |
| T-007 | HomePage 实现 | Phase 3 | pending | developer | T-002, T-005, T-006 |
| T-008 | SkillsPage 实现 | Phase 3 | pending | developer | T-002, T-005, T-006 |
| T-009 | RolesPage 实现 | Phase 3 | pending | developer | T-002, T-005, T-006 |
| T-010 | ContractsPage 实现 | Phase 4 | pending | developer | T-002, T-005, T-006 |
| T-011 | CommandsPage 实现 | Phase 4 | pending | developer | T-002, T-005, T-006 |
| T-012 | 优化与构建验证 | Phase 4 | pending | developer | T-007~T-011 |

---

## Detailed Tasks

### T-001: 目录结构与类型定义

**Phase**: Phase 1  
**Status**: ✅ completed  
**Priority**: high  
**Completed**: 2026-03-30  

**Goal**: 建立项目目录结构和 TypeScript 类型定义

**Scope**:
- 创建目录结构:
  ```
  src/
  ├── components/
  │   ├── common/
  │   ├── cards/
  │   └── diagrams/
  ├── pages/
  ├── hooks/
  ├── data/
  ├── types/
  └── styles/
  ```
- 创建类型定义文件:
  - `src/types/skill.ts`
  - `src/types/role.ts`
  - `src/types/contract.ts`
  - `src/types/command.ts`
  - `src/types/index.ts`

**Acceptance Criteria**:
- [x] 目录结构创建完成
- [x] TypeScript 类型定义完整
- [x] 无 TypeScript 编译错误

**Estimated Effort**: 1 hour

---

### T-002: 数据文件准备

**Phase**: Phase 1  
**Status**: ✅ completed  
**Priority**: high  
**Dependencies**: T-001
**Completed**: 2026-03-30

**Goal**: 从专家包 repo 提取数据，创建 JSON 数据文件

**Scope**:
- 创建数据文件:
  - `src/data/skills.json` - 37 个 skills 的元数据
  - `src/data/roles.json` - 6 个 roles 的定义摘要
  - `src/data/contracts.json` - 17 个 contracts 的元数据
  - `src/data/commands.json` - 5 个 commands 的定义
  - `src/data/stats.json` - 统计数据

**Data Schema**:

```typescript
// skills.json
interface SkillData {
  id: string;           // e.g., "architect/requirement-to-design"
  name: string;         // e.g., "requirement-to-design"
  role: string;         // e.g., "architect"
  category: 'MVP' | 'M4';
  description: string;
  path: string;         // Path to SKILL.md in expert pack
}

// roles.json
interface RoleData {
  name: string;
  mission: string;
  inScope: string[];
  outOfScope: string[];
  triggerConditions: string[];
  skills: string[];     // Associated skill IDs
}

// contracts.json
interface ContractData {
  contract_id: string;  // e.g., "AC-001"
  contract_name: string;
  producer_role: string;
  consumer_roles: string[];
  description: string;
}

// commands.json
interface CommandData {
  name: string;         // e.g., "spec-start"
  description: string;
  inputs: string[];
  outputs: string[];
}

// stats.json
interface StatsData {
  totalSkills: number;
  mvpSkills: number;
  m4Skills: number;
  totalRoles: number;
  totalContracts: number;
  totalCommands: number;
}
```

**Acceptance Criteria**:
- [x] 所有数据文件创建完成
- [x] 数据与专家包内容一致
- [x] JSON 格式正确

**Estimated Effort**: 2 hours

---

### T-003: 路由配置

**Phase**: Phase 1  
**Status**: ✅ completed  
**Priority**: high  
**Dependencies**: T-001
**Completed**: 2026-03-30

**PR**: #13 (https://github.com/Burburton/amazing-specialist-face/pull/13)
**Issue**: #3 (https://github.com/Burburton/amazing-specialist-face/issues/3)

**Goal**: 配置 React Router 路由

**Scope**:
- 安装 react-router-dom
- 创建路由配置:
  - `/` → HomePage
  - `/skills` → SkillsPage
  - `/roles` → RolesPage
  - `/contracts` → ContractsPage
  - `/commands` → CommandsPage

**Files**:
- `src/App.tsx` - 路由配置
- `src/main.tsx` - 应用入口

**Acceptance Criteria**:
- [x] 路由配置完成
- [x] 所有路由可访问
- [x] 404 页面处理

**Estimated Effort**: 0.5 hours

---

### T-004: Header 组件

**Phase**: Phase 2  
**Status**: ✅ completed  
**Priority**: high  
**Dependencies**: T-001
**Completed**: 2026-03-30

**PR**: #15 (https://github.com/Burburton/amazing-specialist-face/pull/15)
**Issue**: #6 (https://github.com/Burburton/amazing-specialist-face/issues/6)

**Goal**: 创建导航栏组件

**Scope**:
- Logo 和标题
- 导航链接 (Home, Skills, Roles, Contracts, Commands)
- 响应式设计 (移动端汉堡菜单)

**Files**:
- `src/components/common/Header.tsx`
- `src/components/common/Header.module.css`

**Acceptance Criteria**:
- [x] 导航链接正确
- [x] 移动端适配
- [x] 当前页面高亮

**Estimated Effort**: 1 hour

---

### T-005: Layout 组件

**Phase**: Phase 2  
**Status**: pending  
**Priority**: high  
**Dependencies**: T-004

**Goal**: 创建页面布局组件

**Scope**:
- 包含 Header
- 页面内容区域 (Outlet)
- 响应式布局

**Files**:
- `src/components/common/Layout.tsx`
- `src/components/common/Layout.module.css`

**Acceptance Criteria**:
- [ ] 布局正确
- [ ] Header 显示
- [ ] 页面内容正常渲染

**Estimated Effort**: 0.5 hours

---

### T-006: 全局样式

**Phase**: Phase 2  
**Status**: pending  
**Priority**: medium

**Goal**: 建立全局样式系统

**Scope**:
- CSS Variables (颜色、字体、间距)
- CSS Reset
- 通用样式类

**Files**:
- `src/styles/variables.css`
- `src/styles/reset.css`
- `src/styles/global.css`

**Acceptance Criteria**:
- [ ] CSS Variables 定义完整
- [ ] 样式一致性

**Estimated Effort**: 0.5 hours

---

### T-007: HomePage 实现

**Phase**: Phase 3  
**Status**: pending  
**Priority**: high  
**Dependencies**: T-002, T-005, T-006

**Goal**: 实现首页

**Scope**:
- Hero Section: 专家包概述
- Stats Section: 核心统计
- Workflow Section: 角色协作流程图

**Files**:
- `src/pages/HomePage.tsx`
- `src/pages/HomePage.module.css`
- `src/components/diagrams/WorkflowDiagram.tsx`

**Acceptance Criteria**:
- [ ] 概述内容正确
- [ ] 统计数据准确
- [ ] 流程图清晰

**Estimated Effort**: 2 hours

---

### T-008: SkillsPage 实现

**Phase**: Phase 3  
**Status**: pending  
**Priority**: high  
**Dependencies**: T-002, T-005, T-006

**Goal**: 实现 Skills 页面

**Scope**:
- Skills 列表展示 (按角色分组)
- SkillCard 组件
- 角色筛选功能
- 搜索功能

**Files**:
- `src/pages/SkillsPage.tsx`
- `src/pages/SkillsPage.module.css`
- `src/components/cards/SkillCard.tsx`
- `src/hooks/useSkillsFilter.ts`

**Acceptance Criteria**:
- [ ] 所有 37 个 skills 展示
- [ ] 按角色正确分组
- [ ] 筛选和搜索功能正常

**Estimated Effort**: 2 hours

---

### T-009: RolesPage 实现

**Phase**: Phase 3  
**Status**: pending  
**Priority**: high  
**Dependencies**: T-002, T-005, T-006

**Goal**: 实现 Roles 页面

**Scope**:
- Roles 列表展示
- RoleCard 组件
- 角色协作关系图

**Files**:
- `src/pages/RolesPage.tsx`
- `src/pages/RolesPage.module.css`
- `src/components/cards/RoleCard.tsx`
- `src/components/diagrams/RoleCollaborationDiagram.tsx`

**Acceptance Criteria**:
- [ ] 所有 6 个 roles 展示
- [ ] 角色定义完整
- [ ] 协作关系图清晰

**Estimated Effort**: 1.5 hours

---

### T-010: ContractsPage 实现

**Phase**: Phase 4  
**Status**: pending  
**Priority**: medium  
**Dependencies**: T-002, T-005, T-006

**Goal**: 实现 Contracts 页面

**Scope**:
- Contracts 列表展示
- ContractCard 组件
- 按 Producer Role 分组

**Files**:
- `src/pages/ContractsPage.tsx`
- `src/pages/ContractsPage.module.css`
- `src/components/cards/ContractCard.tsx`

**Acceptance Criteria**:
- [ ] 所有 17 个 contracts 展示
- [ ] 分组正确

**Estimated Effort**: 1 hour

---

### T-011: CommandsPage 实现

**Phase**: Phase 4  
**Status**: pending  
**Priority**: medium  
**Dependencies**: T-002, T-005, T-006

**Goal**: 实现 Commands 页面

**Scope**:
- Commands 列表展示
- CommandCard 组件

**Files**:
- `src/pages/CommandsPage.tsx`
- `src/pages/CommandsPage.module.css`
- `src/components/cards/CommandCard.tsx`

**Acceptance Criteria**:
- [ ] 所有 5 个 commands 展示
- [ ] 输入输出清晰

**Estimated Effort**: 0.5 hours

---

### T-012: 优化与构建验证

**Phase**: Phase 4  
**Status**: pending  
**Priority**: high  
**Dependencies**: T-007~T-011

**Goal**: 性能优化和构建验证

**Scope**:
- 性能优化 (懒加载、代码分割)
- 响应式适配测试
- 构建验证
- 部署配置

**Tasks**:
- [ ] 添加 React.lazy 懒加载
- [ ] 测试移动端响应式
- [ ] `npm run build` 成功
- [ ] 创建 Vercel/GitHub Pages 部署配置

**Acceptance Criteria**:
- [ ] 首屏加载 < 2s
- [ ] 移动端正常显示
- [ ] 构建产物可部署

**Estimated Effort**: 1 hour

---

## Parallel Execution Opportunities

以下任务可以并行执行：

**Phase 2 并行组**:
- T-004 (Header) + T-006 (全局样式) 可并行

**Phase 3 并行组**:
- T-007 (HomePage) + T-008 (SkillsPage) + T-009 (RolesPage) 可并行（无依赖）

**Phase 4 并行组**:
- T-010 (ContractsPage) + T-011 (CommandsPage) 可并行

---

## Notes

- 每个任务完成后需要更新 status
- 如果发现需求变更，需要同步更新 spec.md 和 plan.md
- 构建验证应该在所有功能完成后进行
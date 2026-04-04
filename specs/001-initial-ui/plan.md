# Plan: Initial UI - 文档展示型界面

## Plan ID
`001-initial-ui`

## Feature Reference
`specs/001-initial-ui/spec.md`

## Version
`1.0.0`

## Created
2026-03-29

---

## Design Note

### Background
专家包 (amazing-specialists) 是一个 AI 辅助研发的执行层，包含 37 个 skills、6 个角色、17 个 artifact contracts。目前仅通过 markdown 文档呈现，用户需要阅读大量文件才能理解其能力。

本 feature 为专家包创建一个 Web UI，作为"门面"展示其核心内容，降低理解门槛，提供更好的导航体验。

### Feature Goal
创建一个静态文档展示型 Web UI，展示专家包的 README、Skills、Roles、Contracts、Commands、Workflow，支持基础的筛选和搜索功能。

### Input Sources
- `amazing-specialists/README.md` - 概述内容
- `amazing-specialists/role-definition.md` - 角色定义
- `amazing-specialists/contracts/pack/registry.json` - Contract 元数据
- `amazing-specialists/.opencode/skills/**/SKILL.md` - Skills 定义
- 专家包 repo 的 AGENTS.md - 命令定义

### Requirement-to-Design Mapping

| Requirement | Design Decision | Rationale |
|-------------|-----------------|-----------|
| FR-001: Home Page | 单页组件 HomePage，包含 Hero、Stats、WorkflowDiagram 三个 section | 分离关注点，便于独立开发和测试 |
| FR-002: Skills Page | SkillsPage 组件 + SkillCard 子组件 + useSkillsFilter hook | 数据驱动渲染，筛选逻辑封装在 hook 中 |
| FR-003: Roles Page | RolesPage 组件 + RoleCard 子组件 + RoleWorkflowDiagram 组件 | 卡片式展示便于扩展，流程图独立便于复用 |
| FR-004: Contracts Page | ContractsPage 组件 + ContractCard 子组件，按 producer_role 分组 | 分组展示更清晰，符合角色协作视角 |
| FR-005: Commands Page | CommandsPage 组件 + CommandCard 子组件 | 简单列表展示 |
| FR-006: Navigation | Layout 组件包含 Header + Outlet，React Router 路由 | 标准 SPA 路由模式 |
| NFR-001: Performance | 静态数据预加载，无运行时 API 调用 | 避免网络延迟，首屏快 |
| TC-001: 技术栈 | Vite + React 18 + TypeScript + CSS Modules | 简单可靠，无额外依赖 |

### Design Summary

**架构模式**: 单页应用 (SPA)，客户端路由

**组件层次**:
```
App
├── Layout
│   ├── Header (Navigation)
│   └── Outlet
│       ├── HomePage
│       │   ├── Hero
│       │   ├── Stats
│       │   └── WorkflowDiagram
│       ├── SkillsPage
│       │   ├── SearchBar
│       │   ├── RoleFilter
│       │   └── SkillCard[]
│       ├── RolesPage
│       │   ├── RoleCard[]
│       │   └── RoleWorkflowDiagram
│       ├── ContractsPage
│       │   └── ContractCard[] (grouped)
│       └── CommandsPage
│           └── CommandCard[]
```

**数据流**:
```
data/*.json → import → Component → Render
```

**目录结构**:
```
src/
├── components/       # 可复用 UI 组件
│   ├── common/       # 通用组件 (Header, Footer)
│   ├── cards/        # 卡片组件 (SkillCard, RoleCard, etc.)
│   └── diagrams/     # 图表组件 (WorkflowDiagram)
├── pages/            # 页面组件
├── hooks/            # 自定义 hooks
├── data/             # 静态数据 (JSON)
├── types/            # TypeScript 类型定义
└── styles/           # 全局样式
```

### Constraints

1. **静态数据**: 所有数据预置于 `src/data/` 目录，无运行时 API
2. **无后端**: 纯前端应用，可部署到任何静态托管
3. **TypeScript 严格模式**: 确保类型安全
4. **Scope 限制**: 仅文档展示，不包含交互执行功能

### Non-Goals

1. **实时执行监控** - 属于 Phase B，不在本 feature 范围
2. **交互式操作** - 属于 Phase C，不在本 feature 范围
3. **用户认证** - 静态站点，无用户系统
4. **数据自动同步** - 手动维护数据文件，自动同步后续考虑
5. **国际化 (i18n)** - 暂不支持，后续可扩展

### Assumptions

1. 用户通过浏览器访问，不需要考虑 SSR
2. 数据量小（37 skills, 6 roles, 17 contracts），客户端渲染性能足够
3. 专家包的数据结构相对稳定，不会频繁变更
4. 用户主要使用现代浏览器，不需要支持 IE

### Open Questions

| Question | Why It Matters | Temporary Assumption | Impact Surface | Recommended Next Step | Blocker |
|----------|----------------|---------------------|----------------|----------------------|---------|
| 是否需要暗色主题？ | 用户体验偏好 | 默认亮色，后续可扩展 | 样式系统 | 调研用户需求 | false |
| Workflow 图用 SVG 还是 Canvas？ | 实现复杂度 | 使用 SVG（简单、可交互） | WorkflowDiagram 组件 | 评估 react-flow 库 | false |
| 是否需要代码高亮？ | Contract 中的代码片段展示 | 暂不实现，使用 `<pre>` 标签 | ContractCard 组件 | 评估需求优先级 | false |

### Status
`COMPLETE`

---

## Implementation Phases

### Phase 1: 项目骨架与数据准备
**目标**: 建立项目基础结构和数据文件

**交付物**:
- [x] Vite + React 项目初始化
- [ ] 目录结构 (components, pages, hooks, data, types, styles)
- [ ] TypeScript 类型定义
- [ ] 数据文件 (skills.json, roles.json, contracts.json, commands.json)
- [ ] 路由配置

**预计工作量**: 0.5 天

### Phase 2: 通用组件与布局
**目标**: 实现通用 UI 组件和页面布局

**交付物**:
- [ ] Header 组件 (导航栏)
- [ ] Layout 组件 (页面布局)
- [ ] 全局样式 (CSS Variables, Reset)
- [ ] 响应式布局

**预计工作量**: 0.5 天

### Phase 3: 核心页面实现
**目标**: 实现主要页面功能

**交付物**:
- [ ] HomePage (Hero, Stats, WorkflowDiagram)
- [ ] SkillsPage (SkillCard, Filter, Search)
- [ ] RolesPage (RoleCard, WorkflowDiagram)

**预计工作量**: 1 天

### Phase 4: 完整功能与优化
**目标**: 完成剩余页面并优化

**交付物**:
- [ ] ContractsPage
- [ ] CommandsPage
- [ ] 性能优化 (懒加载、代码分割)
- [ ] 响应式适配测试
- [ ] 构建验证

**预计工作量**: 0.5 天

---

## Module Boundaries

### 模块定义

| Module | Responsibility | Depends On |
|--------|----------------|------------|
| `data` | 静态数据存储 | - |
| `types` | TypeScript 类型定义 | - |
| `components/common` | 通用 UI 组件 | `types` |
| `components/cards` | 卡片组件 | `types`, `data` |
| `components/diagrams` | 图表组件 | `types` |
| `pages` | 页面组件 | `components/*` |
| `hooks` | 自定义 hooks | `types`, `data` |
| `styles` | 全局样式 | - |

### 接口契约

**SkillCard Props**:
```typescript
interface SkillCardProps {
  skill: {
    id: string;
    name: string;
    description: string;
    role: Role;
    category: 'MVP' | 'M4';
    path: string;
  };
}
```

**RoleCard Props**:
```typescript
interface RoleCardProps {
  role: {
    name: string;
    mission: string;
    inScope: string[];
    outOfScope: string[];
    triggerConditions: string[];
  };
}
```

---

## Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| 数据文件过大 | Low | Medium | 压缩 JSON，按需加载 |
| 组件样式冲突 | Medium | Low | CSS Modules 隔离 |
| Scope Creep | Medium | High | 严格遵守 non-goals，B/C 功能单独规划 |
| 专家包数据变更 | Low | Medium | 版本化数据文件，明确对应关系 |

---

## Quality Gates

### Gate 1: 代码质量
- [ ] TypeScript 无编译错误
- [ ] ESLint 无错误
- [ ] 组件有明确的 props 类型

### Gate 2: 功能完整
- [ ] 所有页面可访问
- [ ] 筛选/搜索功能正常
- [ ] 导航正常

### Gate 3: 性能
- [ ] 首屏加载 < 2s
- [ ] 无明显的渲染卡顿

### Gate 4: 构建成功
- [ ] `npm run build` 成功
- [ ] 构建产物可部署

---

## References

- `specs/001-initial-ui/spec.md` - 需求规格
- `amazing-specialists/README.md` - 专家包概述
- `amazing-specialists/role-definition.md` - 角色定义
- `amazing-specialists/contracts/pack/registry.json` - Contract 元数据
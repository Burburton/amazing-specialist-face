# Tasks: Design System Refactor

## Metadata
```yaml
feature_id: 002-design-system-refactor
status: in_progress
created: 2026-04-04
based_on: plan.md
```

## Task Summary

| Phase | Task ID | Task Name | Role | Priority | Status |
|-------|---------|-----------|------|----------|--------|
| 1 | T-001 | Create design tokens CSS | developer | high | pending |
| 1 | T-002 | Create animation presets | developer | high | pending |
| 1 | T-003 | Update global styles | developer | medium | pending |
| 2 | T-004 | Refactor Header component | developer | high | pending |
| 2 | T-005 | Refactor Layout component | developer | medium | pending |
| 2 | T-006 | Create skeleton components | developer | high | pending |
| 3 | T-007 | Refactor SkillCard component | developer | high | pending |
| 3 | T-008 | Refactor RoleCard component | developer | high | pending |
| 3 | T-009 | Refactor ContractCard component | developer | medium | pending |
| 3 | T-010 | Refactor CommandCard component | developer | medium | pending |
| 4 | T-011 | Refactor HomePage | developer | high | pending |
| 4 | T-012 | Refactor SkillsPage | developer | high | pending |
| 4 | T-013 | Refactor RolesPage | developer | medium | pending |
| 4 | T-014 | Refactor ContractsPage | developer | medium | pending |
| 4 | T-015 | Refactor CommandsPage | developer | medium | pending |
| 5 | T-016 | Run design review | reviewer | high | pending |
| 5 | T-017 | Fix review findings | developer | high | pending |
| 5 | T-018 | Performance validation | tester | medium | pending |

---

## Phase 1: Design Tokens

### T-001: Create design tokens CSS

**Role**: developer

**Priority**: high

**Skill**: `design-tokens-setup`

**Description**: 创建新的设计令牌文件，替换现有 variables.css

**Acceptance Criteria**:
- [ ] 主色为 Violet (`#8b5cf6`)，非 Blue/Indigo
- [ ] 间距基于 8pt 网格
- [ ] 包含完整暗色模式变量
- [ ] 包含字体配对定义

**Deliverables**:
- `src/styles/tokens.css`

**Implementation**:
```css
/* 品牌色 - Violet */
--color-primary: #8b5cf6;
--color-primary-hover: #7c3aed;

/* 8pt 网格 */
--space-1: 8px;
--space-2: 16px;
--space-3: 24px;

/* 字体配对 */
--font-display: "Space Grotesk", sans-serif;
--font-sans: "Inter", system-ui, sans-serif;
--font-mono: "JetBrains Mono", monospace;
```

---

### T-002: Create animation presets

**Role**: developer

**Priority**: high

**Skill**: `micro-interactions`

**Description**: 创建动画预设文件，定义语义化动画曲线

**Acceptance Criteria**:
- [ ] 包含语义化曲线常量
- [ ] 包含时长常量
- [ ] 包含交互预设对象
- [ ] 导出 TypeScript 类型

**Deliverables**:
- `src/lib/animations.ts`

---

### T-003: Update global styles

**Role**: developer

**Priority**: medium

**Description**: 更新全局样式，导入新设计令牌

**Acceptance Criteria**:
- [ ] 导入 tokens.css
- [ ] 字体正确加载
- [ ] 全局背景设置

**Deliverables**:
- 更新 `src/styles/global.css`

**Dependencies**: T-001

---

## Phase 2: Base Components

### T-004: Refactor Header component

**Role**: developer

**Priority**: high

**Skill**: `micro-interactions`, `design-state-coverage`

**Description**: 重构 Header 组件，添加品牌化和状态

**Acceptance Criteria**:
- [ ] 使用品牌主色
- [ ] Hover 状态有动画
- [ ] Focus-visible 状态清晰
- [ ] Sticky 效果带阴影

**Deliverables**:
- 更新 `src/components/common/Header.tsx`
- 更新 `src/components/common/Header.module.css`

**Dependencies**: T-001

---

### T-005: Refactor Layout component

**Role**: developer

**Priority**: medium

**Description**: 重构 Layout 组件，优化背景和过渡

**Acceptance Criteria**:
- [ ] 暗色背景
- [ ] 页面过渡动画
- [ ] 响应式布局

**Deliverables**:
- 更新 `src/components/common/Layout.tsx`
- 更新 `src/components/common/Layout.module.css`

**Dependencies**: T-001

---

### T-006: Create skeleton components

**Role**: developer

**Priority**: high

**Skill**: `design-state-coverage`

**Description**: 创建骨架屏组件用于 Loading 状态

**Acceptance Criteria**:
- [ ] CardSkeleton 通用骨架屏
- [ ] SkillCardSkeleton 专用骨架屏
- [ ] 动画效果流畅

**Deliverables**:
- `src/components/skeletons/CardSkeleton.tsx`
- `src/components/skeletons/SkillCardSkeleton.tsx`
- `src/components/skeletons/skeletons.module.css`

**Dependencies**: T-001

---

## Phase 3: Card Components

### T-007: Refactor SkillCard component

**Role**: developer

**Priority**: high

**Skill**: `micro-interactions`, `design-state-coverage`

**Description**: 重构 SkillCard 组件，完善状态和动画

**Acceptance Criteria**:
- [ ] Hover 状态：微抬起 + 阴影
- [ ] Focus-visible 状态清晰
- [ ] Loading 状态使用骨架屏
- [ ] 使用语义化动画曲线

**Deliverables**:
- 更新 `src/components/cards/SkillCard.tsx`
- 更新 `src/components/cards/SkillCard.module.css`

**Dependencies**: T-001, T-006

---

### T-008: Refactor RoleCard component

**Role**: developer

**Priority**: high

**Description**: 重构 RoleCard 组件，添加角色色彩编码

**Acceptance Criteria**:
- [ ] 每个角色有独特的颜色标识
- [ ] Hover 动画
- [ ] 状态覆盖完整

**Deliverables**:
- 更新 `src/components/cards/RoleCard.tsx`
- 更新 `src/components/cards/RoleCard.module.css`

**Dependencies**: T-001, T-006

---

### T-009: Refactor ContractCard component

**Role**: developer

**Priority**: medium

**Description**: 重构 ContractCard 组件，优化代码展示风格

**Acceptance Criteria**:
- [ ] 代码块样式优化
- [ ] 展开/收起动画
- [ ] Hover 状态

**Deliverables**:
- 更新 `src/components/cards/ContractCard.tsx`
- 更新 `src/components/cards/ContractCard.module.css`

**Dependencies**: T-001

---

### T-010: Refactor CommandCard component

**Role**: developer

**Priority**: medium

**Description**: 重构 CommandCard 组件，终端风格设计

**Acceptance Criteria**:
- [ ] 终端风格外观
- [ ] 复制按钮交互
- [ ] Hover 状态

**Deliverables**:
- 更新 `src/components/cards/CommandCard.tsx`
- 更新 `src/components/cards/CommandCard.module.css`

**Dependencies**: T-001

---

## Phase 4: Pages

### T-011: Refactor HomePage

**Role**: developer

**Priority**: high

**Description**: 重构首页，重新设计 Hero 区域

**Acceptance Criteria**:
- [ ] Hero 区域品牌感强
- [ ] 数据统计卡片使用新样式
- [ ] 页面动画流畅

**Deliverables**:
- 更新 `src/pages/HomePage.tsx`
- 更新 `src/pages/HomePage.module.css`

**Dependencies**: T-004, T-007

---

### T-012: Refactor SkillsPage

**Role**: developer

**Priority**: high

**Description**: 重构技能页面，优化网格布局

**Acceptance Criteria**:
- [ ] 网格布局优化
- [ ] 卡片动画统一
- [ ] Loading 状态使用骨架屏

**Deliverables**:
- 更新 `src/pages/SkillsPage.tsx`
- 更新 `src/pages/SkillsPage.module.css`

**Dependencies**: T-007

---

### T-013: Refactor RolesPage

**Role**: developer

**Priority**: medium

**Description**: 重构角色页面，优化展示

**Acceptance Criteria**:
- [ ] 角色卡片使用新样式
- [ ] 协作图优化

**Deliverables**:
- 更新 `src/pages/RolesPage.tsx`
- 更新 `src/pages/RolesPage.module.css`

**Dependencies**: T-008

---

### T-014: Refactor ContractsPage

**Role**: developer

**Priority**: medium

**Description**: 重构契约页面，文档风格

**Acceptance Criteria**:
- [ ] 文档风格布局
- [ ] 代码展示优化

**Deliverables**:
- 更新 `src/pages/ContractsPage.tsx`
- 更新 `src/pages/ContractsPage.module.css`

**Dependencies**: T-009

---

### T-015: Refactor CommandsPage

**Role**: developer

**Priority**: medium

**Description**: 重构命令页面，终端风格

**Acceptance Criteria**:
- [ ] 终端风格设计
- [ ] 命令卡片使用新样式

**Deliverables**:
- 更新 `src/pages/CommandsPage.tsx`
- 更新 `src/pages/CommandsPage.module.css`

**Dependencies**: T-010

---

## Phase 5: Validation

### T-016: Run design review

**Role**: reviewer

**Priority**: high

**Skill**: `design-review-checklist`

**Description**: 运行设计审查，检查重构结果

**Acceptance Criteria**:
- [ ] 颜色审查通过
- [ ] 排版审查通过
- [ ] 间距审查通过
- [ ] 动画审查通过
- [ ] 状态审查通过

**Deliverables**:
- 设计审查报告

**Dependencies**: T-001 ~ T-015

---

### T-017: Fix review findings

**Role**: developer

**Priority**: high

**Description**: 修复设计审查发现的问题

**Acceptance Criteria**:
- [ ] 所有 blocker 问题修复
- [ ] major 问题不超过 2 个

**Deliverables**:
- 修复的组件文件

**Dependencies**: T-016

---

### T-018: Performance validation

**Role**: tester

**Priority**: medium

**Description**: 验证性能指标

**Acceptance Criteria**:
- [ ] CSS 文件大小增加不超过 20%
- [ ] 首次加载时间无明显增加

**Deliverables**:
- 性能验证报告

**Dependencies**: T-017

---

## Dependency Graph

```
T-001 ─→ T-003
    │
    ├─→ T-004
    │
    ├─→ T-005
    │
    ├─→ T-006 ─→ T-007 ─→ T-011, T-012
    │       │
    │       └─→ T-008 ─→ T-013
    │
    ├─→ T-009 ─→ T-014
    │
    └─→ T-010 ─→ T-015

T-001~T-015 ─→ T-016 ─→ T-017 ─→ T-018
```

## Parallel Execution

**Batch 1**: T-001, T-002 (并行)

**Batch 2**: T-003, T-004, T-005, T-006 (并行)

**Batch 3**: T-007, T-008, T-009, T-010 (并行)

**Batch 4**: T-011, T-012, T-013, T-014, T-015 (并行)

**Batch 5**: T-016

**Batch 6**: T-017

**Batch 7**: T-018
# Implementation Plan: UI Redesign

## Metadata
```yaml
feature_id: 003-ui-redesign
status: planning-complete
created: 2026-04-04
author: architect
based_on:
  - spec.md (design-consultation-report)
  - wireframe.md (homepage-layout)
  - component-spec.md (skillcard-design)
governance_refs:
  - package-spec.md
  - role-definition.md
```

## 1. Architecture Summary

本 feature 对现有界面进行视觉重设计，聚焦于：

| 维度 | 变更范围 | 架构影响 |
|------|----------|----------|
| **首页 Hero** | 信息架构简化 | 组件结构调整，无数据层变更 |
| **SkillCard 组件** | 视觉差异强化 | CSS Module 更新，新增变体样式 |
| **筛选体验** | Tab 式筛选 | 状态管理优化，无架构变更 |
| **角色颜色** | 500→400 系列 | tokens.css 变量更新 |

**核心原则**: 纯视觉层重构，不涉及数据层、路由层、状态管理层。

---

## 2. Inputs from Spec

### R1-01: 首页 Hero 简化
- **输入**: `wireframe.md` Hero 区域布局
- **要求**: 减少信息密度，聚焦核心价值主张
- **交付**: 价值主张三栏展示 + CTA 按钮引导

### R1-02: 视觉层次强化
- **输入**: `spec.md` Typography 方案
- **要求**: 区分标题/正文/辅助信息三级
- **交付**: Hero 标题 3rem，描述 0.875rem，标签 0.75rem

### R2-01: SkillCard 视觉差异
- **输入**: `component-spec.md` 变体定义
- **要求**: MVP/M4 强对比，角色颜色调亮
- **交付**: MVP solid accent badge，M4 outline muted badge，400 系颜色

### R2-02: 筛选体验优化
- **输入**: `wireframe.md` 智能筛选区
- **要求**: Tab 式角色筛选 + 即时反馈
- **交付**: Tab 栏组件 + 搜索结果计数

### R3-01: 交互流程图
- **输入**: `wireframe.md` WorkflowDiagram 交互
- **要求**: 流程图增加点击交互
- **交付**: 点击角色节点展开详情面板

### R3-02: 快速入口导航
- **输入**: `wireframe.md` EntryCards 布局
- **要求**: 首页增加导航入口卡片
- **交付**: 技能库/角色/契约入口卡片组件

---

## 3. Technical Constraints

### 设计令牌约束
- 所有颜色、间距、字体必须使用 `tokens.css` CSS 变量
- 禁止硬编码颜色值 (如 `#8b5cf6`)
- 禁止固定 px 值 (如 `padding: 16px`)

### CSS 约束
- 禁止 `transition: all`
- 使用 CSS Modules，不引入 CSS-in-JS
- 支持 `prefers-reduced-motion`

### 组件约束
- 语义化 HTML (`article`, `h3`, `p`)
- ARIA 属性支持
- 键盘导航 (Tab, Enter, Space)

### 响应式约束
| 断点 | Hero 高度 | Stats 列数 | Entry 列数 |
|------|-----------|------------|------------|
| Desktop (≥1280px) | 320px | 4 | 3 |
| Tablet (768-1024px) | 280px | 2 | 3 |
| Mobile (<768px) | 240px | 1 | 1 |

### 可访问性约束
- WCAG AA 级别
- 标题 vs 背景: 4.5:1 对比度
- 正文 vs 背景: 3:1 对比度
- Focus 状态可见

---

## 4. Module Decomposition

### 4.1 CSS Tokens Update

**文件**: `src/styles/tokens.css`

**变更内容**:
```yaml
changes:
  - type: "add"
    content: "Role Colors 400 Series"
    lines: "add after line 54"
    details:
      - "--color-role-architect-400: #a78bfa"
      - "--color-role-developer-400: #60a5fa"
      - "--color-role-tester-400: #4ade80"
      - "--color-role-reviewer-400: #fbbf24"
      - "--color-role-docs-400: #22d3ee"
      - "--color-role-security-400: #f87171"
      - "--color-role-common-400: #94a3b8"
```

**影响范围**: 全局角色颜色引用

---

### 4.2 SkillCard Component Update

**文件**:
- `src/components/cards/SkillCard.tsx`
- `src/components/cards/SkillCard.module.css`

**变更内容**:

| 变更点 | 当前实现 | 目标实现 | spec 引用 |
|--------|----------|----------|-----------|
| DOM 结构 | `<div>` | `<article role="article">` | component-spec.md §2 |
| 标题元素 | `<span>` | `<h3>` | component-spec.md §2 |
| MVP Badge | `var(--color-success)` | `var(--color-accent)` | component-spec.md §3 |
| M4 Badge | `var(--color-primary)` | outline muted | component-spec.md §3 |
| Hover 动画 | translateY(-4px) | translateY(-4px) + glow | component-spec.md §6 |
| 角色颜色 | 500 系列 | 400 系列 | component-spec.md §5 |
| ARIA 属性 | 无 | labelledby, describedby | component-spec.md §8 |
| 键盘支持 | 无 | Tab, Enter, Space | component-spec.md §8 |
| Reduced Motion | 无 | 支持 | component-spec.md §10 |

---

### 4.3 HomePage Component Update

**文件**:
- `src/pages/HomePage.tsx`
- `src/pages/HomePage.module.css`

**变更内容**:

| 变更点 | 当前实现 | 目标实现 | wireframe 引用 |
|--------|----------|----------|----------------|
| Hero 信息 | 标题 + 统计堆砌 | 标题 + 价值主张 + CTA | wireframe.md §4 |
| 统计展示 | 4 列网格 | 大号数字突出 | wireframe.md §4 |
| 流程图 | 静态 | 点击交互 | wireframe.md §5 |
| 入口卡片 | 无 | 3 列入口卡片 | wireframe.md §4 |

**新增组件**:
- `HeroSection` - Hero 区域子组件
- `ValueProposition` - 价值主张三栏
- `CTAButtons` - CTA 按钮组
- `EntryCards` - 快速入口卡片

---

### 4.4 SkillsPage Component Update

**文件**:
- `src/pages/SkillsPage.tsx`
- `src/pages/SkillsPage.module.css`

**变更内容**:

| 变更点 | 当前实现 | 目标实现 | wireframe 引用 |
|--------|----------|----------|----------------|
| 角色筛选 | 按钮组 | Tab 栏样式 | wireframe.md 智能筛选 |
| 搜索反馈 | 无 | 实时结果计数 | wireframe.md 搜索框 |
| 角色颜色 | ROLE_COLORS map | tokens.css 变量 | component-spec.md §5 |

---

### 4.5 WorkflowDiagram Component Update

**文件**:
- `src/components/diagrams/WorkflowDiagram.tsx`
- `src/components/diagrams/WorkflowDiagram.module.css`

**变更内容**:

| 变更点 | 当前实现 | 目标实现 | wireframe 引用 |
|--------|----------|----------|----------------|
| 角色节点 | 静态显示 | 点击展开详情 | wireframe.md §5 |
| Hover 效果 | 无 | scale + shadow | wireframe.md §6 |
| 连线动画 | 无 | hover 高亮 | wireframe.md §6 |

---

## 5. Data Flow

### 5.1 首页数据流

```
stats.json ──────────────────────────────→ HomePage
                                               │
                                               ├── HeroSection (静态文案)
                                               ├── StatsOverview (stats data)
                                               ├── WorkflowDiagram (roles data)
                                               └── EntryCards (静态链接)
```

**无数据层变更**: 所有数据来源保持不变。

### 5.2 技能页数据流

```
skills.json ──────→ SkillsPage
                        │
                        ├── FilterState (selectedRole, searchQuery)
                        │       │
                        │       └── filteredSkills (useMemo)
                        │               │
                        │               └── groupedSkills (按角色分组)
                        │                       │
                        │                       └── SkillCard (skill prop)
                        │
                        └── SkillDependencyDiagram (skills data)
```

**状态管理**: 保持现有 useState + useMemo 模式，仅更新 UI 层。

---

## 6. Failure Handling

### 6.1 CSS 变量缺失

**场景**: tokens.css 变量未定义
**处理**: 组件 fallback 到默认值
**实现**:
```css
color: var(--color-role-architect-400, var(--color-role-architect));
```

### 6.2 响应式断点失效

**场景**: 媒体查询不支持
**处理**: 默认桌面布局
**验证**: 跨浏览器测试 (Chrome, Firefox, Safari)

### 6.3 交互组件降级

**场景**: WorkflowDiagram 点击交互失败
**处理**: 静态显示 fallback
**实现**: 点击事件错误边界包裹

### 6.4 Reduced Motion 支持

**场景**: 用户偏好减少动画
**处理**: 禁用 transform 和 transition
**实现**:
```css
@media (prefers-reduced-motion: reduce) {
  .skillCard:hover {
    transform: none;
  }
}
```

---

## 7. Validation Strategy

### 7.1 视觉验证

| 检查项 | 方法 | 验收标准 |
|--------|------|----------|
| MVP/M4 视觉差异 | 肉眼对比 | MVP accent solid, M4 outline muted |
| 角色颜色亮度 | 色值对比 | 400 系比 500 系亮 20%+ |
| Hero 信息层次 | 屏幕截图 | 标题 3rem > 描述 0.875rem > 标签 0.75rem |
| 卡片悬停动画 | 视频录制 | translateY(-4px) + shadow-lg |

### 7.2 可访问性验证

| 检查项 | 工具 | 验收标准 |
|--------|------|----------|
| 颜色对比度 | Chrome DevTools | WCAG AA (4.5:1 标题, 3:1 正文) |
| 键盘导航 | 手动测试 | Tab 聚焦, Enter/Space 激活 |
| ARIA 属性 | axe DevTools | role, labelledby, describedby 正确 |
| Focus 可见 | 手动测试 | focus-visible ring 显示 |

### 7.3 响应式验证

| 断点 | 测试方法 | 验收标准 |
|------|----------|----------|
| Desktop | Chrome DevTools 1280px | Hero 320px, Stats 4 列 |
| Tablet | Chrome DevTools 768px | Hero 280px, Stats 2 列 |
| Mobile | Chrome DevTools 480px | Hero 240px, Stats 1 列 |

### 7.4 代码验证

| 检查项 | 命令 | 验收标准 |
|--------|------|----------|
| TypeScript 类型 | `npm run typecheck` | 无错误 |
| ESLint 规则 | `npm run lint` | 无错误 |
| 构建成功 | `npm run build` | 无错误 |
| 测试通过 | `npm test` | 无失败 |

---

## 8. Risks / Tradeoffs

### 8.1 Risks

| ID | 风险 | 影响 | 缓解措施 |
|----|------|------|----------|
| R-001 | tokens.css 变量更新影响全局 | 全站颜色变化 | 先更新变量，再逐组件验证 |
| R-002 | WorkflowDiagram 交互复杂度 | 开发时间延长 | 降级方案：静态 fallback |
| R-003 | 响应式布局测试覆盖 | 移动端体验差异 | 跨设备真机测试 |
| R-004 | ARIA 属性正确性 | 可访问性合规 | axe DevTools 自动检测 |

### 8.2 Tradeoffs

| 决策 | 收益 | 代价 |
|------|------|------|
| **400 系颜色** | 更亮更清晰 | 与现有 500 系并存，增加变量数量 |
| **Tab 式筛选** | 视觉统一 | 复用现有按钮逻辑，样式重构 |
| **静态入口卡片** | 导航清晰 | 无数据驱动，需手动维护 |
| **不新增数据层** | 风险可控 | 交互丰富度受限 |

---

## 9. Requirement Traceability

### 9.1 Spec → Plan → Task 映射

| Spec Requirement | Plan Section | Task ID |
|-------------------|--------------|---------|
| R1-01 首页 Hero 简化 | §4.3 HomePage Update | T-001 |
| R1-02 视觉层次强化 | §4.3 HomePage Update | T-002 |
| R2-01 SkillCard 视觉差异 | §4.2 SkillCard Update | T-003 |
| R2-02 筛选体验优化 | §4.4 SkillsPage Update | T-004 |
| R3-01 交互流程图 | §4.5 WorkflowDiagram Update | T-005 |
| R3-02 快速入口导航 | §4.3 HomePage Update | T-006 |

### 9.2 Governance Alignment

| 治理文档 | 相关章节 | 一致性检查 |
|----------|----------|------------|
| `package-spec.md` | UI Layer Definition | ✅ 纯视觉层，无架构变更 |
| `role-definition.md` | 6-role 颜色定义 | ✅ 400 系颜色保留角色语义 |
| `quality-gate.md` | 可访问性要求 | ✅ WCAG AA 级别 |

---

## 10. Implementation Sequence

### Phase 1: Tokens Update (优先级最高)
```
T-000: 更新 tokens.css 添加 400 系角色颜色
  ├── 输入: spec.md §Phase 4 颜色方案
  ├── 输出: tokens.css 新增 7 个变量
  └── 验证: CSS 变量可引用
```

### Phase 2: SkillCard Update
```
T-003: SkillCard 视觉差异强化
  ├── 输入: component-spec.md §3, §5, §6, §8
  ├── 输出: SkillCard.tsx + SkillCard.module.css 更新
  └── 验证: MVP/M4 对比，角色颜色，ARIA 属性
```

### Phase 3: HomePage Update
```
T-001: Hero 区域简化
  ├── 输入: wireframe.md §4 HeroSection
  ├── 输出: HomePage Hero 结构重构
  └── 验证: 信息层次，CTA 按钮
  
T-002: 视觉层次强化
  ├── 输入: spec.md §Typography 方案
  ├── 输出: 字号调整
  └── 验证: 标题 > 描述 > 标签

T-006: 快速入口卡片
  ├── 输入: wireframe.md §4 EntryCards
  ├── 输出: EntryCards 组件
  └── 验证: 响应式布局
```

### Phase 4: SkillsPage Update
```
T-004: Tab 式筛选优化
  ├── 输入: wireframe.md 智能筛选
  ├── 输出: SkillsPage 筛选样式更新
  └── 验证: Tab 栏样式，搜索反馈
```

### Phase 5: WorkflowDiagram Update (可选)
```
T-005: 流程图交互
  ├── 输入: wireframe.md §5, §6
  ├── 输出: WorkflowDiagram 点击交互
  └── 验证: 点击展开详情
```

---

## 11. Out of Scope

以下内容明确不在本次 feature 范围内：

| 项目 | 原因 | 后续处理 |
|------|------|----------|
| 数据层重构 | spec.md §Out of Scope 明确排除 | 不处理 |
| 新增页面 | 仅重构现有页面 | 不处理 |
| 后端集成 | 纯前端 feature | 不处理 |
| 其他组件 | 本次聚焦 SkillCard | 后续迭代 |
| 技能详情展开交互 | OQ-001 建议后续迭代 | 不处理 |

---

## 12. Assumptions

1. **设计令牌系统已建立**: `tokens.css` 已包含 500 系角色颜色
2. **用户偏好暗色模式**: 默认主题为 dark mode
3. **CSS Modules 不迁移**: 保持现有 CSS Modules 方案
4. **不支持 IE11**: 现代浏览器仅 (Chrome, Firefox, Safari, Edge)
5. **React 19 兼容**: 组件 API 与 React 19 兼容

---

## 13. Open Questions

| ID | 问题 | 建议 | 状态 |
|----|------|------|------|
| OQ-001 | 是否需要技能详情展开交互？ | 后续迭代 | 记录 |
| OQ-002 | 流程图交互复杂度如何定义？ | 点击展开角色详情 | 已定义 |

---

## 14. Next Steps

1. **生成 `tasks.md`**: 基于 plan 映射创建任务清单
2. **执行 T-000**: 更新 tokens.css (优先级最高)
3. **执行 T-003**: 更新 SkillCard 组件
4. **执行 T-001, T-002, T-006**: 更新 HomePage
5. **执行 T-004**: 更新 SkillsPage 筛选
6. **验证**: 运行 lint, typecheck, test
7. **审查**: 使用 `design-review-checklist` skill

**推荐命令**: `/spec-tasks` 生成任务清单
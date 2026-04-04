# Feature: Design System Refactor

## Metadata
```yaml
feature_id: 002-design-system-refactor
status: completed
created: 2026-04-04
completed: 2026-04-04
author: amazing-specialist-face
skills_used:
  - design-tokens-setup
  - typography-system
  - spacing-grid-system
  - micro-interactions
  - design-state-coverage
  - design-review-checklist
```

## Background

### Problem Statement

当前项目界面存在明显的"AI 风格"问题，不符合专业设计标准：

| 维度 | 当前问题 | 专业标准 |
|------|----------|----------|
| **颜色** | `#2563eb` (Blue-600) 是 AI 默认色 | 非 Blue/Indigo 的品牌色 |
| **字体** | 仅系统字体，无层次 | 字体配对 + 层级化排版 |
| **间距** | 4px 基础单位，非标准 | 8pt 网格系统 |
| **动画** | `transition: transform ease` 通用过渡 | 语义化曲线 + 属性特定时长 |
| **状态** | 仅 Hover 状态 | 6 状态覆盖 (Default/Hover/Focus/Loading/Error/Empty) |
| **阴影** | 标准灰度阴影 | 品牌色阴影点缀 |

### Existing Context

- 项目使用 React 19 + TypeScript + Vite
- 样式方案：CSS Modules + CSS 变量
- 现有 `src/styles/variables.css` 定义了基础设计令牌
- 已有 `frontend-design-system` Plugin 提供 7 个设计 Skills

### Target Style Direction

**设计风格**: Developer Tool / Technical Documentation 风格

参考：
- Linear (dark mode, clean, technical)
- Vercel Dashboard (minimal, monospace accents)
- Stripe Docs (clear hierarchy, subtle animations)

## Goal

使用 `frontend-design-system` Plugin 的 Skills 重构项目设计系统，消除"AI 风格"，建立专业的前端视觉体验。

### Success Criteria

1. **设计令牌系统重构** - 非 Blue/Indigo 主色，语义化颜色命名
2. **排版系统建立** - 字体配对，4 级以上层次
3. **间距网格规范化** - 8pt 网格，语义化间距
4. **微交互完善** - 语义化动画曲线，Hover/Focus/Loading 状态
5. **状态覆盖完整** - 所有组件覆盖 6 种状态
6. **暗色模式支持** - 完整的 dark mode 变量

## Scope

### In Scope

#### 1. 设计令牌重构 (`design-tokens-setup`)

**交付物**: `src/styles/tokens.css`

- 颜色令牌：品牌主色（非 Blue/Indigo）、语义色、表面色
- 间距令牌：8pt 网格系统
- 排版令牌：字体配对、字号层次、行高层次
- 阴影令牌：品牌色阴影、层次阴影
- 暗色模式：完整的 dark mode 变量

#### 2. 排版系统 (`typography-system`)

**交付物**: 
- 字体配对方案
- 排版层次 CSS 类
- 代码块样式

- 展示字体：Geist / Cal Sans / Space Grotesk
- 正文字体：Inter / Geist Sans
- 等宽字体：JetBrains Mono / Fira Code

#### 3. 组件重构

**影响的组件**:

| 组件 | 重构内容 |
|------|----------|
| `Header` | 品牌色、Hover/Focus 状态、sticky 效果 |
| `Layout` | 背景纹理、页面过渡 |
| `SkillCard` | 状态覆盖、Hover 动画、骨架屏 |
| `RoleCard` | 角色色彩编码、图标动画 |
| `ContractCard` | 代码高亮、展开/收起动画 |
| `CommandCard` | 终端风格、复制交互 |

#### 4. 页面重构

| 页面 | 重构内容 |
|------|----------|
| `HomePage` | Hero 区域重新设计、数据可视化增强 |
| `SkillsPage` | 网格布局、筛选交互、卡片动画 |
| `RolesPage` | 角色协作图、角色详情展开 |
| `ContractsPage` | 文档风格、代码展示 |
| `CommandsPage` | 终端风格、命令行美学 |

#### 5. 微交互 (`micro-interactions`)

**交付物**: `src/lib/animations.ts`

- 语义化动画曲线
- 交互预设（卡片悬停、按钮按压）
- 入场动画（淡入上移、缩放）
- 列表交错动画
- `prefers-reduced-motion` 支持

#### 6. 状态覆盖 (`design-state-coverage`)

每个交互组件必须覆盖：
- Default ✅
- Hover ✅
- Focus (focus-visible) ✅
- Loading (骨架屏)
- Error (错误状态)
- Empty (空状态)

### Out of Scope

1. **数据层重构** - 不修改数据获取逻辑
2. **路由重构** - 不修改路由结构
3. **新增功能** - 仅重构现有组件和页面
4. **后端集成** - 不涉及后端 API

## Actors

### Primary Actor
- **developer** - 执行重构任务

### Secondary Actors
- **reviewer** - 使用 `design-review-checklist` 审查设计

## Core Workflows

### Workflow 1: 设计令牌创建

```
developer 调用 design-tokens-setup skill
  → 定义品牌主色（非 Blue/Indigo）
  → 创建 8pt 网格间距
  → 建立排版层次
  → 添加暗色模式变量
  → 生成 src/styles/tokens.css
```

### Workflow 2: 组件重构

```
developer 选择组件
  → 调用 micro-interactions skill
  → 添加 Hover/Focus/Loading 状态
  → 调用 design-state-coverage skill
  → 检查 6 状态覆盖
  → 完成 CSS Module 重构
```

### Workflow 3: 设计审查

```
reviewer 调用 design-review-checklist skill
  → 检查颜色（非 Blue-500）
  → 检查排版层次
  → 检查间距一致性
  → 检查动画语义化
  → 检查状态覆盖
  → 输出审查报告
```

## Business Rules

### BR-001: 品牌色选择

禁止使用以下颜色作为主色：
- `#3b82f6` (Blue-500)
- `#2563eb` (Blue-600)
- `#6366f1` (Indigo-500)
- `#4f46e5` (Indigo-600)

推荐品牌色方向：
- **Technical**: `#10b981` (Emerald), `#06b6d4` (Cyan)
- **Developer Tool**: `#8b5cf6` (Violet), `#ec4899` (Pink)
- **Documentation**: `#f59e0b` (Amber), `#84cc16` (Lime)

### BR-002: 8pt 网格强制

所有间距必须是 8 的倍数：
- 4px (0.5 units)
- 8px (1 unit)
- 16px (2 units)
- 24px (3 units)
- 32px (4 units)
- 48px (6 units)
- 64px (8 units)

### BR-003: 动画语义化

禁止使用：
```css
transition: all 0.3s ease;
```

必须使用：
```css
transition: opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1),
            transform 0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
```

### BR-004: 暗色模式默认

项目默认使用暗色模式，亮色模式作为备选。

## Non-functional Requirements

### NFR-001: 性能保持

重构后不应增加首次加载时间。CSS 文件大小增加不超过 20%。

### NFR-002: 可访问性

所有颜色对比度满足 WCAG AA 标准 (4.5:1)。

### NFR-003: 响应式

支持 375px 到 1440px 宽度的响应式布局。

### NFR-004: 无障碍

- 所有交互元素可通过键盘访问
- Focus 状态清晰可见
- 支持 `prefers-reduced-motion`

## Acceptance Criteria

### AC-001: 设计令牌文件

`src/styles/tokens.css` 包含：
- [ ] 颜色令牌（主色非 Blue/Indigo）
- [ ] 8pt 网格间距令牌
- [ ] 排版层次令牌
- [ ] 阴影令牌
- [ ] 暗色模式变量

### AC-002: 组件状态覆盖

每个卡片组件包含：
- [ ] Default 状态
- [ ] Hover 状态（带动画）
- [ ] Focus-visible 状态
- [ ] Loading 状态（骨架屏）

### AC-003: 页面视觉效果

- [ ] Hero 区域品牌感强
- [ ] 卡片悬停有微交互
- [ ] 页面过渡流畅
- [ ] 暗色模式完整

### AC-004: 动画预设

`src/lib/animations.ts` 包含：
- [ ] 语义化曲线常量
- [ ] 时长常量
- [ ] 交互预设对象

### AC-005: 设计审查通过

调用 `design-review-checklist` skill，输出：
- [ ] 无 blocker 级别问题
- [ ] major 级别问题不超过 2 个

## Assumptions

1. 项目使用 CSS Modules，不需要 CSS-in-JS 迁移
2. 用户偏好暗色模式作为默认主题
3. 不需要支持 IE11

## Open Questions

1. **OQ-001**: 品牌主色选择哪个方向？
   - 建议：Developer Tool 风格 - Violet (`#8b5cf6`)

2. **OQ-002**: 是否需要展示字体？
   - 建议：使用 Space Grotesk 作为展示字体

## References

- `.opencode/plugins/frontend-design-system/` - 设计 Skills
- `amazing-specialists/` - 专家包核心
- Linear Design System
- Vercel Design System
- Stripe Documentation Style
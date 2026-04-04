# Frontend Design System Plugin

Professional UI design skills for creating human-crafted, polished interfaces.

## Purpose

解决 AI 生成界面的"AI 风格"问题：
- 颜色：默认 Blue-500 → 语义化令牌
- 排版：Inter 万能 → 字体配对、层级化行高
- 间距：随意间距 → 8pt 网格系统
- 动画：transition-all 滥用 → 语义化曲线
- 状态：只有 happy path → 完整状态覆盖

## Skills

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| `design-tokens-setup` | 创建设计令牌系统 | 新项目初始化、设计系统基础 |
| `shadcn-integration` | 集成 shadcn/ui | 使用 shadcn/ui 组件库 |
| `typography-system` | 建立排版层次 | 字体、字号、行高规范 |
| `spacing-grid-system` | 8pt 网格间距 | 间距规范、视觉节奏 |
| `micro-interactions` | 微交互与动画 | 交互反馈、过渡动画 |
| `design-state-coverage` | 状态覆盖检查 | 组件开发完成后 |
| `design-review-checklist` | 设计审查清单 | 设计评审、代码审查 |

## Quick Start

### 1. 使用设计令牌 Skill

```
调用 design-tokens-setup skill
→ 生成 src/styles/tokens/colors.css
→ 生成 src/styles/tokens/spacing.css
→ 更新 tailwind.config.ts
```

### 2. 添加微交互

```
调用 micro-interactions skill
→ 获取 animation-presets.ts
→ 为组件添加 Hover/Focus/Loading 状态
```

### 3. 检查状态覆盖

```
调用 design-state-coverage skill
→ 检查 Default/Hover/Focus/Loading/Error/Empty
→ 生成缺失状态清单
```

## Templates

| Template | Description |
|----------|-------------|
| `design-tokens.css` | CSS 变量模板（颜色、间距、排版、阴影） |
| `animation-presets.ts` | 动画预设（曲线、时长、交互预设） |
| `accessibility-checklist.md` | WCAG AA 可访问性检查清单 |

## Platform Mapping

- **developer**: design-tokens-setup, shadcn-integration, typography-system, spacing-grid-system, micro-interactions, design-state-coverage
- **reviewer**: design-review-checklist, design-state-coverage
- **docs**: design-tokens-setup

## Key Principles

### BR-001: 设计令牌强制使用
```css
/* ❌ 禁止 */
color: #3b82f6;

/* ✅ 正确 */
color: var(--color-primary);
```

### BR-002: 状态覆盖强制
每个交互组件必须覆盖 Default, Hover, Focus 状态。

### BR-003: 动画语义化
```css
/* ❌ 禁止 */
transition: all 0.3s ease;

/* ✅ 正确 */
transition: opacity 0.2s ease-out, transform 0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
```

### BR-004: 可访问性默认
- WCAG AA 对比度 (4.5:1)
- 44pt 最小触摸目标
- prefers-reduced-motion 支持
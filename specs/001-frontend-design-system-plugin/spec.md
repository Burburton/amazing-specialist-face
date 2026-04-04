# Feature: frontend-design-system Plugin

## Metadata
```yaml
feature_id: 001-frontend-design-system-plugin
status: completed
created: 2026-04-04
completed: 2026-04-04
author: amazing-specialist-face
```

## Background

### Problem Statement

AI 辅助前端开发中存在一个普遍问题：生成的界面具有明显的"AI 风格"，表现为：

| 维度 | AI 默认行为 | 专业设计标准 |
|------|-------------|--------------|
| **颜色** | Blue-500/Indigo-600，纯 #fff/#000 | 暖色调中性色，语义化令牌 |
| **排版** | 仅 Inter 字体，line-height 1.5 万能应用 | 字体配对，层级化行高 |
| **间距** | 严格 4px 网格，缺乏变化 | 8pt 网格，有视觉节奏 |
| **动画** | `transition-all 300ms ease-in-out` 滥用 | 语义化曲线，属性特定时长 |
| **组件** | 未修改的 shadcn/ui 默认样式 | 品牌定制，圆角/字重/阴影 |
| **状态** | 只设计 happy path | Empty/Loading/Error 完整覆盖 |

这些问题导致界面看起来"通用"、"缺乏个性"、"机器生成感强"。

### Research Findings

基于前期调研发现：

1. **shadcn/ui 已成为行业标准** (75K+ GitHub Stars, 2026年默认选择)
2. **Base UI (MUI) 提供更好的原语层** - 更好的 TypeScript，更好的 Combobox API
3. **"AI Slop" 7 维度问题** 已被系统化识别
4. **专业设计的核心差异** 在于：设计令牌系统、排版层次、微交互、状态覆盖

### Existing Context

- 本项目使用 React 19 + TypeScript + Vite + Tailwind CSS
- 已有 `.opencode/skills/` 目录结构（从专家包同步）
- 需要创建项目级 Plugin 来扩展设计能力

## Goal

创建 `frontend-design-system` Plugin，提供一套专业的前端设计技能，帮助 AI 生成具有"人类设计感"的界面，消除"AI 风格"问题。

### Success Criteria

1. **7 个 Plugin Skills** 全部实现并可独立使用
2. **模板文件** 提供设计令牌、动画预设、可访问性检查清单
3. **Platform Mapping** 正确配置 developer/reviewer/docs 角色扩展
4. **与专家包 Plugin 架构兼容** - 遵循 PLUGIN-SPEC.md 规范

## Scope

### In Scope

1. **Plugin 目录结构创建**
   - `.opencode/plugins/frontend-design-system/`
   - `plugin.json`, `README.md`

2. **7 个 Plugin Skills**
   | Skill | Purpose |
   |-------|---------|
   | `design-tokens-setup` | 设计令牌系统（颜色、间距、排版、阴影） |
   | `shadcn-integration` | shadcn/ui 集成（2026 新特性支持） |
   | `typography-system` | 排版层次系统 |
   | `spacing-grid-system` | 8pt 间距网格系统 |
   | `micro-interactions` | 微交互与动画 |
   | `design-state-coverage` | 状态覆盖设计 |
   | `design-review-checklist` | 设计审查清单 |

3. **模板文件**
   - `design-tokens.css` - CSS 变量模板
   - `animation-presets.ts` - 动画预设
   - `accessibility-checklist.md` - 可访问性检查

4. **Platform Mapping 配置**
   - developer 角色扩展
   - reviewer 角色扩展

### Out of Scope

1. **核心层 Skills** - 不修改专家包核心 skills
2. **UI 组件实现** - 不提供具体组件代码，只提供设计指导
3. **设计工具集成** - 不集成 Figma/Sketch 等设计工具
4. **其他框架** - 仅支持 React，不支持 Vue/Svelte

## Actors

### Primary Actor
- **developer** - 使用设计 skills 进行前端开发

### Secondary Actors
- **reviewer** - 使用 design-review-checklist 进行设计审查

## Core Workflows

### Workflow 1: 设计令牌初始化

```
developer 调用 design-tokens-setup skill
  → 分析项目技术栈
  → 生成 design-tokens.css
  → 更新 Tailwind 配置
  → 输出验证报告
```

### Workflow 2: 组件状态覆盖检查

```
developer 完成组件开发
  → 调用 design-state-coverage skill
  → 检查 6 种状态覆盖情况
  → 生成缺失状态清单
  → developer 补充缺失状态
```

### Workflow 3: 设计审查

```
reviewer 收到代码审查请求
  → 调用 design-review-checklist skill
  → 检查颜色/排版/间距/动画/状态
  → 生成审查报告
  → 提供可执行反馈
```

## Business Rules

### BR-001: 设计令牌强制使用

所有颜色、间距、排版值必须使用 CSS 变量，禁止硬编码。

```css
/* ❌ 禁止 */
color: #3b82f6;
padding: 16px;

/* ✅ 正确 */
color: var(--color-primary);
padding: var(--space-4);
```

### BR-002: 状态覆盖强制

每个交互组件必须覆盖：
- Default, Hover, Focus (必须)
- Loading, Error, Empty (推荐)

### BR-003: 动画语义化

禁止使用 `transition-all`，必须指定具体属性：

```css
/* ❌ 禁止 */
transition: all 0.3s ease;

/* ✅ 正确 */
transition: opacity 0.2s ease-out, transform 0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
```

### BR-004: 可访问性默认

所有设计必须满足：
- WCAG AA 对比度 (4.5:1)
- 44pt 最小触摸目标
- prefers-reduced-motion 支持

## Non-functional Requirements

### NFR-001: Skill 独立性

每个 skill 可独立使用，不依赖其他 plugin skills。

### NFR-002: Platform Compatibility

Plugin 必须与 Platform Adapter 兼容，正确配置 platform_mapping。

### NFR-003: Template 可定制

所有模板文件可被用户覆盖和定制。

## Acceptance Criteria

### AC-001: Plugin 目录结构

```
.opencode/plugins/frontend-design-system/
├── plugin.json                    ✅
├── README.md                      ✅
├── skills/
│   ├── design-tokens-setup/SKILL.md    ✅
│   ├── shadcn-integration/SKILL.md      ✅
│   ├── typography-system/SKILL.md       ✅
│   ├── spacing-grid-system/SKILL.md     ✅
│   ├── micro-interactions/SKILL.md      ✅
│   ├── design-state-coverage/SKILL.md   ✅
│   └── design-review-checklist/SKILL.md ✅
└── templates/
    ├── design-tokens.css          ✅
    ├── animation-presets.ts       ✅
    └── accessibility-checklist.md ✅
```

### AC-002: plugin.json 配置

包含正确的 platform_mapping 配置。

### AC-003: Skills 可用

每个 SKILL.md 包含完整的 Purpose, When to Use, Implementation Process, Output Requirements, Checklists。

## Assumptions

1. **技术栈**: React + TypeScript + Tailwind CSS
2. **组件库**: 可能使用 shadcn/ui
3. **动画库**: Framer Motion
4. **项目结构**: 标准 `src/` 目录结构

## Open Questions

1. **OQ-001**: 是否需要支持 CSS-in-JS?
   - 当前假设: 仅支持 Tailwind CSS

2. **OQ-002**: 设计令牌是否需要支持 Style Dictionary 格式?
   - 当前假设: 仅支持 CSS 变量格式

## References

- `amazing-specialists/plugins/PLUGIN-SPEC.md` - Plugin 规格定义
- `amazing-specialists/plugins/vite-react-ts/` - 现有 Plugin 参考实现
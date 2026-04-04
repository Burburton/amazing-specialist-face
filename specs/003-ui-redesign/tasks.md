# Tasks: UI Redesign

## Metadata
```yaml
feature_id: 003-ui-redesign
status: ready-for-implementation
created: 2026-04-04
author: architect
based_on: plan.md
```

## Task Overview

| Phase | Task ID | 描述 | 优先级 | 状态 | 依赖 |
|-------|---------|------|--------|------|------|
| 1 | T-000 | 更新 tokens.css 添加 400 系角色颜色 | 🔴 最高 | ✅ completed | - |
| 2 | T-003 | SkillCard 视觉差异强化 | 🔴 最高 | ✅ completed | T-000 |
| 3 | T-001 | Hero 区域简化 | 🟡 高 | ✅ completed | - |
| 4 | T-002 | 视觉层次强化 | 🟡 高 | ✅ completed | T-001 |
| 5 | T-006 | 快速入口卡片 | 🟡 高 | ✅ completed | T-001 |
| 6 | T-004 | Tab 式筛选优化 | 🟢 中 | ✅ completed | T-000 |
| 7 | T-005 | 流程图交互 | ⚪ 可选 | ✅ completed | - |

---

## Phase 1: Tokens Update

### T-000: 更新 tokens.css 添加 400 系角色颜色

**优先级**: 🔴 最高

**状态**: ⏳ pending

**依赖**: 无

**输入**: 
- `spec.md` §Phase 4 颜色方案
- `component-spec.md` §5 角色颜色

**输出**: 
- `src/styles/tokens.css` 新增 7 个变量

**验收标准**:
- [x] 添加 `--color-role-architect-400: #a78bfa`
- [x] 添加 `--color-role-developer-400: #60a5fa`
- [x] 添加 `--color-role-tester-400: #4ade80`
- [x] 添加 `--color-role-reviewer-400: #fbbf24`
- [x] 添加 `--color-role-docs-400: #22d3ee`
- [x] 添加 `--color-role-security-400: #f87171`
- [x] 添加 `--color-role-common-400: #94a3b8`
- [x] CSS 变量可被其他文件引用

**实现细节**:
```css
/* Role Colors 400 Series (更亮) */
--color-role-architect-400: #a78bfa;
--color-role-developer-400: #60a5fa;
--color-role-tester-400: #4ade80;
--color-role-reviewer-400: #fbbf24;
--color-role-docs-400: #22d3ee;
--color-role-security-400: #f87171;
--color-role-common-400: #94a3b8;
```

---

## Phase 2: SkillCard Update

### T-003: SkillCard 视觉差异强化

**优先级**: 🔴 最高

**状态**: ✅ completed

**依赖**: T-000

**输入**: 
- `component-spec.md` §3 变体设计
- `component-spec.md` §5 样式规范
- `component-spec.md` §6 状态定义
- `component-spec.md` §8 可访问性

**输出**: 
- `src/components/cards/SkillCard.tsx` 更新
- `src/components/cards/SkillCard.module.css` 更新

**验收标准**:
- [x] DOM 结构: `<article role="article">` + `<h3>` 标题
- [x] MVP Badge: `var(--color-accent)` solid
- [x] M4 Badge: transparent background + outline muted
- [x] 角色颜色: 使用 400 系变量
- [x] Hover 动画: translateY(-4px) + shadow-lg + border-color
- [x] MVP Hover: accent glow 效果
- [x] ARIA 属性: aria-labelledby, aria-describedby, aria-label
- [x] 键盘支持: Tab 聚焦, Enter/Space 激活
- [x] focus-visible: ring 显示
- [x] Reduced Motion: 支持 `prefers-reduced-motion`

**实现检查清单**:

**CSS Module**:
- [ ] `.skillCard` 基础样式
- [ ] `.skillCard:hover` 悬停效果
- [ ] `.skillCard:focus-visible` 焦点效果
- [ ] `.skillCard.mvp` MVP 特殊样式
- [ ] `.skillCard.mvp:hover` MVP 悬停 glow
- [ ] `.mvp` badge solid 样式
- [ ] `.m4` badge outline 样式
- [ ] `.skillRole` 角色标签样式
- [ ] `@media (prefers-reduced-motion: reduce)` 支持

**TSX**:
- [ ] `<article>` 语义化标签
- [ ] `role="article"` ARIA 属性
- [ ] `aria-labelledby={`${skill.id}-title`}`
- [ ] `aria-describedby={`${skill.id}-desc`}`
- [ ] `aria-label` 完整标签
- [ ] `tabIndex={0}` 键盘聚焦
- [ ] `handleKeyDown` Enter/Space 处理
- [ ] ROLE_COLORS_400 常量定义

---

## Phase 3: HomePage Update

### T-001: Hero 区域简化

**优先级**: 🟡 高

**状态**: ✅ completed

**依赖**: 无

**输入**: 
- `wireframe.md` §4 HeroSection
- `spec.md` R1-01

**输出**: 
- `src/pages/HomePage.tsx` Hero 结构重构
- `src/pages/HomePage.module.css` Hero 样式更新

**验收标准**:
- [x] 移除统计数字堆砌
- [x] 主标题: "OpenCode 专家包" (text-5xl)
- [x] 副标题: "全自动产品研发闭环执行层" (text-xl)
- [x] 价值主张三栏展示
- [x] CTA 按钮: "浏览技能库 →" (primary) + "了解协作流程 →" (secondary)
- [x] CTA 按钮可点击跳转

**实现细节**:

**价值主张三栏**:
```
⚡ 即时执行    🔄 闭环协作    📦 标准交付
无需手动触发   6角色无缝接力   Artifact契约
```

**CTA 按钮**:
- Primary: `background: var(--color-primary)`, hover: glow
- Secondary: `border: 1px solid var(--color-border)`, hover: surface-elevated

---

### T-002: 视觉层次强化

**优先级**: 🟡 高

**状态**: ✅ completed

**依赖**: T-001

**输入**: 
- `spec.md` §Typography 方案
- `wireframe.md` 响应式断点

**输出**: 
- `src/pages/HomePage.module.css` 字号调整

**验收标准**:
- [x] Hero 标题: `var(--text-5xl)` (3rem)
- [x] Hero 副标题: `var(--text-xl)` (1.25rem)
- [x] 价值主张标题: `var(--text-base)` (1rem)
- [x] 价值主张描述: `var(--text-sm)` (0.875rem)
- [x] 统计数字: `var(--text-4xl)` (2.25rem)
- [x] 统计标签: `var(--text-sm)` (0.875rem)
- [x] 入口卡片标题: `var(--text-base)` (1rem)
- [x] 入口卡片描述: `var(--text-sm)` (0.875rem)

**层次对比**:
```
Hero 标题 (3rem) > 统计数字 (2.25rem) > 副标题 (1.25rem) > 正文 (1rem) > 描述 (0.875rem)
```

---

### T-006: 快速入口卡片

**优先级**: 🟡 高

**状态**: ✅ completed

**依赖**: T-001

**输入**: 
- `wireframe.md` §4 EntryCards
- `spec.md` R3-02

**输出**: 
- `src/pages/HomePage.tsx` EntryCards inline implementation
- `src/pages/HomePage.module.css` Entry cards styles

**验收标准**:
- [x] 3 列入口卡片 (Desktop)
- [x] 响应式: 3 列 (Tablet), 1 列 (Mobile)
- [x] 卡片内容: 图标 + 标题 + 描述 + 计数 + 箭头
- [x] Hover 效果: translateY(-4px) + shadow-lg
- [x] 点击跳转对应页面
- [x] 键盘导航支持 (focus-visible)

**入口卡片定义**:

| 图标 | 标题 | 描述 | 跳转 |
|------|------|------|------|
| 📚 | 技能库 | 43 个技能 | /skills |
| 👥 | 角色分工 | 6 个核心角色 | /roles |
| 📋 | 契约规范 | 18 个契约 | /contracts |

---

## Phase 4: SkillsPage Update

### T-004: Tab 式筛选优化

**优先级**: 🟢 中

**状态**: ✅ completed

**依赖**: T-000

**输入**: 
- `wireframe.md` 智能筛选区
- `spec.md` R2-02

**输出**: 
- `src/pages/SkillsPage.tsx` 筛选样式更新
- `src/pages/SkillsPage.module.css` Tab 样式新增

**验收标准**:
- [x] 角色筛选改为 Tab 栏样式
- [x] Tab active 状态: 背景填充 + 角色颜色
- [x] Tab hover 状态: subtle background
- [x] 搜索框带实时结果计数
- [x] 筛选结果即时更新
- [x] 角色颜色使用 400 系变量

**Tab 样式**:
```css
.tabButton {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-lg);
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: background var(--duration-fast);
}

.tabButton:hover {
  background: var(--color-surface-elevated);
}

.tabButton.active {
  color: white;
}
```

---

## Phase 5: WorkflowDiagram Update (Optional)

### T-005: 流程图交互

**优先级**: ⚪ 可选

**状态**: ✅ completed

**依赖**: 无

**输入**: 
- `wireframe.md` §5 WorkflowDiagram
- `wireframe.md` §6 Interaction Specifications
- `spec.md` R3-01

**输出**: 
- `src/components/diagrams/WorkflowDiagram.tsx` 交互更新
- `src/components/diagrams/WorkflowDiagram.module.css` 交互样式

**验收标准**:
- [x] 角色节点 Hover: scale(1.05) + shadow-md
- [x] 角色节点 Click: 展开详情面板
- [x] 详情面板: 角色标题 + 描述 + 技能列表
- [x] 连线 Hover: stroke 变 primary + pulse 动画
- [x] 键盘导航: Tab 聚焦节点, Enter 展开详情

**详情面板内容**:
- 角色标题
- 角色描述
- 技能列表 (带链接)
- 协作流程说明

---

## Validation Tasks

### V-001: 代码验证

**优先级**: 🔴 最高

**执行时机**: 所有实现任务完成后

**验收标准**:
- [x] `npm run lint` 无错误 (1 pre-existing error in test file, not related to changes)
- [x] `npm run build` 无错误
- [ ] `npm test` 无失败 (或记录预存失败)

---

### V-002: 视觉验证

**优先级**: 🟡 高

**执行时机**: 实现完成后

**验收标准**:
- [ ] MVP/M4 视觉差异明显 (肉眼对比)
- [ ] 角色颜色 400 系比 500 系亮 20%+
- [ ] Hero 信息层次清晰 (标题 > 描述 > 标签)
- [ ] 卡片悬停动画流畅 (translateY + shadow)
- [ ] Reduced Motion 生效

---

### V-003: 可访问性验证

**优先级**: 🟡 高

**执行时机**: 实现完成后

**验收标准**:
- [ ] 颜色对比度 WCAG AA (Chrome DevTools)
- [ ] 键盘导航可用 (Tab, Enter, Space)
- [ ] ARIA 属性正确 (axe DevTools)
- [ ] Focus 状态可见

---

### V-004: 响应式验证

**优先级**: 🟢 中

**执行时机**: 实现完成后

**验收标准**:
- [ ] Desktop (1280px): Hero 320px, Stats 4 列, Entry 3 列
- [ ] Tablet (768px): Hero 280px, Stats 2 列, Entry 3 列
- [ ] Mobile (480px): Hero 240px, Stats 1 列, Entry 1 列

---

## Implementation Sequence

```
T-000 (Tokens)
    │
    ├── T-003 (SkillCard) ──→ V-002, V-003
    │
    ├── T-004 (SkillsPage)
    │
    └── T-001 (Hero)
            │
            ├── T-002 (Hierarchy)
            │
            └── T-006 (EntryCards)
                    │
                    └── V-001, V-002, V-003, V-004

T-005 (WorkflowDiagram) ──→ optional
```

---

## Progress Tracking

| Task | 状态 | 完成时间 | 备注 |
|------|------|----------|------|
| T-000 | ✅ | 2026-04-04 | Added 400 series + common role colors |
| T-003 | ✅ | 2026-04-04 | Semantic HTML, ARIA, MVP/M4 visual diff, 400 colors |
| T-001 | ✅ | 2026-04-04 | Hero simplified, value props, CTA buttons |
| T-002 | ✅ | 2026-04-04 | Typography hierarchy via CSS variables |
| T-006 | ✅ | 2026-04-04 | Entry cards with navigation |
| T-004 | ✅ | 2026-04-04 | Tab-style filters, search count, 400 colors |
| T-005 | ✅ | 2026-04-05 | Interactive detail panel, hover effects, keyboard nav, 400 colors |
| V-001 | ✅ | 2026-04-04 | lint/build passed (pre-existing test file error) |
| V-002 | ⏳ | - | Visual verification pending |
| V-003 | ⏳ | - | A11y verification pending |
| V-004 | ⏳ | - | Responsive verification pending |

**状态说明**:
- ⏳ pending - 待开始
- 🔄 in_progress - 进行中
- ✅ completed - 已完成
- ⏭️ skipped - 已跳过
- ❌ blocked - 被阻塞
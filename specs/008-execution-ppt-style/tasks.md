# Tasks: Execution Page PPT Manual Style

## Metadata
```yaml
feature_id: 008-execution-ppt-style
status: completed
created: 2026-04-05
author: architect
based_on: plan.md
```

## Task Overview

| Phase | Task ID | 描述 | 优先级 | 状态 | 依赖 |
|-------|---------|------|--------|------|------|
| 1 | T-001 | 重构 ExecutionPage 为 section 布局 | 🔴 最高 | ⏳ pending | - |
| 1 | T-002 | 添加 scroll-snap 行为 | 🟡 高 | ⏳ pending | T-001 |
| 1 | T-003 | 更新页面 CSS 为 PPT Manual Style | 🔴 最高 | ⏳ pending | T-001 |
| 2 | T-004 | 更新 StatsOverview 组件样式 | 🔴 最高 | ⏳ pending | T-003 |
| 2 | T-005 | 更新 TaskCard 组件样式 | 🔴 最高 | ⏳ pending | T-003 |
| 2 | T-006 | 更新 filter bar 样式 | 🟡 高 | ⏳ pending | T-003 |
| 2 | T-007 | 更新 detail section 样式 | 🟡 高 | ⏳ pending | T-003 |
| 3 | T-008 | 响应式适配 | 🟡 高 | ⏳ pending | T-007 |
| 3 | T-009 | 构建验证 | 🔴 最高 | ⏳ pending | T-008 |

---

## Phase 1: Layout Refactor

### T-001: 重构 ExecutionPage 为 section 布局

**优先级**: 🔴 最高

**状态**: ⏳ pending

**输出**: `src/pages/ExecutionPage.tsx` (modified)

**验收标准**:
- [ ] 页面分为 overview、tasks、detail 三个 section
- [ ] 每个 section 独立滚动区域
- [ ] 保留现有功能逻辑

---

### T-002: 添加 scroll-snap 行为

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: T-001

**输出**: `src/pages/ExecutionPage.module.css` (modified)

**验收标准**:
- [ ] scroll-snap-type: y mandatory
- [ ] 每个 section scroll-snap-align: start
- [ ] 平滑滚动

---

### T-003: 更新页面 CSS 为 PPT Manual Style

**优先级**: 🔴 最高

**状态**: ⏳ pending

**依赖**: T-001

**输出**: `src/pages/ExecutionPage.module.css` (modified)

**验收标准**:
- [ ] .pageTitle 使用 var(--font-display) 大字体
- [ ] .subtitle 使用 var(--font-mono) 大写字母间距
- [ ] 居中布局
- [ ] 遵循 tokens.css 设计令牌

---

## Phase 2: Component Updates

### T-004: 更新 StatsOverview 组件样式

**优先级**: 🔴 最高

**状态**: ⏳ pending

**依赖**: T-003

**输出**: 
- `src/components/execution/StatsOverview.tsx` (modified)
- `src/components/execution/StatsOverview.module.css` (modified)

**验收标准**:
- [ ] 统计数字大字体居中显示
- [ ] 使用 PPT Manual Style 卡片布局
- [ ] hover 效果

---

### T-005: 更新 TaskCard 组件样式

**优先级**: 🔴 最高

**状态**: ⏳ pending

**依赖**: T-003

**输出**: 
- `src/components/execution/TaskCard.tsx` (modified)
- `src/components/execution/TaskCard.module.css` (modified)

**验收标准**:
- [ ] 卡片样式与 PPT Manual Style 统一
- [ ] 背景使用 var(--color-surface)
- [ ] 边框使用 var(--color-border)
- [ ] hover 效果

---

### T-006: 更新 filter bar 样式

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: T-003

**输出**: `src/pages/ExecutionPage.module.css` (modified)

**验收标准**:
- [ ] 筛选按钮样式统一
- [ ] 搜索框样式统一
- [ ] 响应式布局

---

### T-007: 更新 detail section 样式

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: T-003

**输出**: `src/pages/ExecutionPage.module.css` (modified)

**验收标准**:
- [ ] 详情面板样式统一
- [ ] Timeline/Payload/Logs 保持功能
- [ ] 关闭按钮样式

---

## Phase 3: Polish

### T-008: 响应式适配

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: T-007

**验收标准**:
- [ ] 移动端布局适配
- [ ] 平板端布局适配
- [ ] 字体大小响应式

---

### T-009: 构建验证

**优先级**: 🔴 最高

**状态**: ⏳ pending

**依赖**: T-008

**验收标准**:
- [ ] `npm run build` 无错误
- [ ] TypeScript 类型正确
- [ ] 所有功能正常工作

---

## Progress Tracking

| Task | 状态 | 完成时间 | 备注 |
|------|------|----------|------|
| T-001 | ✅ | 2026-04-05 | Section layout |
| T-002 | ✅ | 2026-04-05 | Scroll-snap |
| T-003 | ✅ | 2026-04-05 | PPT Manual Style CSS |
| T-004 | ✅ | 2026-04-05 | StatsOverview |
| T-005 | ✅ | 2026-04-05 | TaskCard |
| T-006 | ✅ | 2026-04-05 | Filter bar |
| T-007 | ✅ | 2026-04-05 | Detail section |
| T-008 | ✅ | 2026-04-05 | Responsive |
| T-009 | ✅ | 2026-04-05 | Build passed (1.28s) |
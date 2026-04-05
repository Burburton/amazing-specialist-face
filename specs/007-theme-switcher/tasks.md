# Tasks: Theme Switcher

## Metadata
```yaml
feature_id: 007-theme-switcher
status: completed
created: 2026-04-05
author: architect
based_on: plan.md
```

## Task Overview

| Phase | Task ID | 描述 | 优先级 | 状态 | 依赖 |
|-------|---------|------|--------|------|------|
| 1 | T-001 | 更新 tokens.css 添加 data-theme 选择器 | 🔴 最高 | ✅ completed | - |
| 1 | T-002 | 创建 useTheme Hook | 🔴 最高 | ✅ completed | - |
| 2 | T-003 | 创建 ThemeToggle CSS | 🟡 高 | ✅ completed | - |
| 2 | T-004 | 创建 ThemeToggle Component | 🔴 最高 | ✅ completed | T-002, T-003 |
| 2 | T-005 | 更新 Header 添加 ThemeToggle | 🔴 最高 | ✅ completed | T-004 |
| 3 | T-006 | 添加无闪烁初始化脚本 | 🟡 高 | ✅ completed | - |
| 3 | T-007 | 构建验证 | 🔴 最高 | ✅ completed | T-005, T-006 |

---

## Phase 1: Foundation

### T-001: 更新 tokens.css

**优先级**: 🔴 最高

**状态**: ✅ completed

**输出**: `src/styles/tokens.css` (modified)

**验收标准**:
- [x] `[data-theme="light"]` 选择器定义 light mode 变量
- [x] `[data-theme="dark"]` 选择器定义 dark mode 变量
- [x] 保留 `@media (prefers-color-scheme: light)` 作为 system fallback

---

### T-002: 创建 useTheme Hook

**优先级**: 🔴 最高

**状态**: ✅ completed

**输出**: `src/hooks/useTheme.ts`

**验收标准**:
- [x] 返回 theme, setTheme, resolvedTheme
- [x] localStorage 持久化
- [x] system 模式监听 prefers-color-scheme 变化
- [x] 设置 data-theme 属性到 document.documentElement

---

## Phase 2: Components

### T-003: 创建 ThemeToggle CSS

**优先级**: 🟡 高

**状态**: ✅ completed

**输出**: `src/components/common/ThemeToggle.module.css`

**验收标准**:
- [x] .trigger 样式 (圆形按钮，hover 效果)
- [x] .menu 下拉菜单样式
- [x] .option 选项样式 (active 状态)
- [x] 遵循 PPT Manual Style

---

### T-004: 创建 ThemeToggle Component

**优先级**: 🔴 最高

**状态**: ✅ completed

**依赖**: T-002, T-003

**输出**: `src/components/common/ThemeToggle.tsx`

**验收标准**:
- [x] 显示当前主题图标
- [x] 点击展开下拉菜单
- [x] 三种选项: Light / Dark / System
- [x] 点击外部关闭菜单

---

### T-005: 更新 Header 添加 ThemeToggle

**优先级**: 🔴 最高

**状态**: ✅ completed

**依赖**: T-004

**输出**: `src/components/common/Header.tsx` (modified)

**验收标准**:
- [x] ThemeToggle 显示在 Header 右侧
- [x] 移动端适配

---

## Phase 3: Integration

### T-006: 添加无闪烁初始化脚本

**优先级**: 🟡 高

**状态**: ✅ completed

**输出**: `index.html` (modified)

**验收标准**:
- [x] 在 `<head>` 中添加 inline script
- [x] 读取 localStorage 中的 theme
- [x] 立即设置 data-theme 属性

---

### T-007: 构建验证

**优先级**: 🔴 最高

**状态**: ✅ completed

**依赖**: T-005, T-006

**验收标准**:
- [x] `npm run build` 无错误
- [x] TypeScript 类型正确
- [x] 主题切换正常工作

---

## Progress Tracking

| Task | 状态 | 完成时间 | 备注 |
|------|------|----------|------|
| T-001 | ✅ | 2026-04-05 | tokens.css data-theme selectors |
| T-002 | ✅ | 2026-04-05 | useTheme Hook |
| T-003 | ✅ | 2026-04-05 | ThemeToggle CSS |
| T-004 | ✅ | 2026-04-05 | ThemeToggle Component |
| T-005 | ✅ | 2026-04-05 | Header update |
| T-006 | ✅ | 2026-04-05 | Anti-flash script |
| T-007 | ✅ | 2026-04-05 | Build passed (1.68s) |
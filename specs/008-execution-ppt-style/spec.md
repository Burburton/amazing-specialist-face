# Feature: Execution Page PPT Manual Style

## Metadata
```yaml
feature_id: 008-execution-ppt-style
status: completed
created: 2026-04-05
author: architect
based_on: 007-theme-switcher, 005-unified-design-system
```

## 1. Problem Statement

### Current State

ExecutionPage 使用传统仪表盘布局：
- 紧凑的任务卡片网格
- 技术感较强的筛选栏
- 左右分栏的任务列表和详情
- 与首页 PPT Manual Style 设计语言不一致

### User Impact

1. **视觉不一致**：首页和其他页面风格不统一
2. **品牌识别度低**：缺乏统一的视觉语言
3. **用户体验断层**：从首页跳转到 ExecutionPage 有明显割裂感

---

## 2. Goal

### Primary Goal

将 ExecutionPage 改造为 PPT Manual Style 设计语言：
- 全屏 section 布局
- 居中、大字体、简洁设计
- 与首页视觉风格统一

### Success Criteria

1. **视觉一致性**：ExecutionPage 使用与首页相同的设计令牌和布局模式
2. **功能保留**：所有现有功能正常工作（筛选、任务详情、时间线等）
3. **响应式设计**：适配移动端和桌面端

---

## 3. Design Approach

### Layout Transformation

**Before (Current)**:
```
┌─────────────────────────────────────┐
│ Execution Monitor                    │
├─────────────────────────────────────┤
│ [Filter] [Search]                    │
├─────────────────┬───────────────────┤
│ Task Grid       │ Task Detail       │
│ ┌───┐ ┌───┐     │ Timeline          │
│ │   │ │   │     │ Payload           │
│ └───┘ └───┘     │ Logs              │
└─────────────────┴───────────────────┘
```

**After (PPT Manual Style)**:
```
┌─────────────────────────────────────┐
│ Section 1: Overview                 │
│ ┌─────────────────────────────────┐ │
│ │         ⚡ EXECUTION             │ │
│ │    Real-time Task Monitor       │ │
│ │                                  │ │
│ │   12 Tasks    5 In Progress     │ │
│ │   3 Success   2 Blocked         │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Section 2: Task List                │
│ ┌─────────────────────────────────┐ │
│ │  TASKS                           │ │
│ │  ┌─────────┐ ┌─────────┐        │ │
│ │  │ Task 1  │ │ Task 2  │        │ │
│ │  └─────────┘ └─────────┘        │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Section 3: Task Detail (selected)   │
│ ┌─────────────────────────────────┐ │
│ │  TASK-001: Feature Design       │ │
│ │  Timeline    Payload    Logs    │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 4. Section Specifications

### 4.1 Overview Section

**Purpose**: 展示执行统计概览

**Layout**:
- 全屏高度 (min-height: 100vh)
- 居中布局
- 大标题 + 统计数字

**Content**:
```
        ⚡ EXECUTION
   Real-time Task Monitor

   ┌────────┐  ┌────────┐  ┌────────┐
   │   12   │  │    5   │  │    3   │
   │ Tasks  │  │ Active │  │ Done   │
   └────────┘  └────────┘  └────────┘
```

### 4.2 Task List Section

**Purpose**: 展示任务列表和筛选

**Layout**:
- 全屏高度
- 标题 + 筛选 + 任务网格
- 任务卡片使用 PPT Manual Style 卡片设计

### 4.3 Task Detail Section (Optional)

**Purpose**: 展示选中任务的详情

**Layout**:
- 条件渲染（选中任务时显示）
- 使用 Modal 或 Slide-in 面板
- 保持 PPT Manual Style 设计

---

## 5. Component Changes

### 5.1 ExecutionPage.tsx

**Changes**:
- 重构为全屏 section 布局
- 添加 scroll-snap 行为
- 使用 PPT Manual Style 标题样式

### 5.2 ExecutionPage.module.css

**Changes**:
- 添加 `.section` 全屏布局样式
- 添加 `.sectionTitle` PPT Manual Style 标题
- 更新 `.taskGrid` 间距和样式

### 5.3 StatsOverview.tsx

**Changes**:
- 改为居中大数字展示
- 使用 PPT Manual Style 排版

### 5.4 TaskCard.tsx

**Changes**:
- 更新卡片样式，与 PPT Manual Style 统一
- 使用新的背景、边框、hover 效果

---

## 6. Acceptance Criteria

### AC-001: Overview Section
- [ ] 全屏高度布局
- [ ] 居中显示统计数字
- [ ] PPT Manual Style 标题

### AC-002: Task List Section
- [ ] 筛选栏样式统一
- [ ] 任务卡片使用 PPT Manual Style
- [ ] 滚动 snap 行为

### AC-003: Task Detail
- [ ] 选中任务时显示详情
- [ ] 详情面板样式统一
- [ ] Timeline/Payload/Logs 样式更新

### AC-004: 响应式设计
- [ ] 移动端适配
- [ ] 平板端适配

### AC-005: 构建验证
- [ ] `npm run build` 无错误
- [ ] 所有功能正常工作

---

## 7. Technical Constraints

### TC-001: 保持功能
- 所有现有功能必须正常工作
- 筛选、搜索、选择任务等交互不变

### TC-002: 性能
- 页面加载速度不下降
- 滚动流畅

### TC-003: 样式一致性
- 使用现有 tokens.css 设计令牌
- 与 HomePage 和其他页面风格统一

---

## 8. Risks / Tradeoffs

| ID | Risk | Mitigation |
|----|------|------------|
| R-001 | 全屏布局在小屏幕上可能拥挤 | 响应式设计，移动端简化布局 |
| R-002 | 改动较大可能引入 bug | 逐步改造，保持功能测试 |

---

## 9. References

- `specs/005-unified-design-system/spec.md` - 设计系统规范
- `src/pages/HomePage.tsx` - 首页 PPT Manual Style 参考
- `src/components/slides/*.tsx` - Slide 组件参考
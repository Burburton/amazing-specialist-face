# Feature 013: Beginner's Tutorial - Implementation Plan

## Overview

**Goal**: 创建新手入门教程页面，让编程小白能在 5 分钟内理解专家包并开始使用。

**Approach**: 采用 PPT Manual Style 的 slide 结构，复用现有组件模式。

---

## Implementation Tasks

### Phase 1: Infrastructure (基础设施)

#### Task 1.1: Create Page Route
**File**: `src/App.tsx`
**Action**: 
- Add `/tutorial` route
- Import TutorialPage component

```tsx
<Route path="/tutorial" element={<TutorialPage />} />
```

#### Task 1.2: Create TutorialPage Component
**File**: `src/pages/TutorialPage.tsx`
**Action**: Create page with slide container

#### Task 1.3: Create TutorialPage Styles
**File**: `src/pages/TutorialPage.module.css`
**Action**: Create slide container styles (copy from HomePage.module.css)

---

### Phase 2: Slide Components (6 slides)

#### Task 2.1: TutorialIntroSlide
**Files**:
- `src/components/tutorial/TutorialIntroSlide.tsx`
- `src/components/tutorial/TutorialIntroSlide.module.css`

**Content**:
- Title: "什么是 OpenCode 专家包？"
- Analogy with 6 roles visualization
- Animation: roles helping user

#### Task 2.2: TutorialWhySlide
**Files**:
- `src/components/tutorial/TutorialWhySlide.tsx`
- `src/components/tutorial/TutorialWhySlide.module.css`

**Content**:
- Title: "它能帮你做什么？"
- Before/After comparison cards
- Data: time saved, bugs reduced

#### Task 2.3: TutorialExampleSlide
**Files**:
- `src/components/tutorial/TutorialExampleSlide.tsx`
- `src/components/tutorial/TutorialExampleSlide.module.css`

**Content**:
- Title: "实战案例：开发用户登录功能"
- 6-step flow visualization
- Links to skill demos

#### Task 2.4: TutorialStepsSlide
**Files**:
- `src/components/tutorial/TutorialStepsSlide.tsx`
- `src/components/tutorial/TutorialStepsSlide.module.css`

**Content**:
- Title: "如何开始使用？"
- 5 steps with screenshots
- Links to skills

#### Task 2.5: TutorialTrySlide
**Files**:
- `src/components/tutorial/TutorialTrySlide.tsx`
- `src/components/tutorial/TutorialTrySlide.module.css`

**Content**:
- Title: "现在就试试！"
- Interactive feature selector
- Recommended skills display

#### Task 2.6: TutorialNextSlide
**Files**:
- `src/components/tutorial/TutorialNextSlide.tsx`
- `src/components/tutorial/TutorialNextSlide.module.css`

**Content**:
- Title: "下一步学什么？"
- 4 learning path cards
- Links to pages

---

### Phase 3: Navigation & Entry Points

#### Task 3.1: Add Header Navigation Link
**File**: `src/components/common/Layout.tsx`
**Action**: Add "教程" link to navigation

#### Task 3.2: Add Home Page Entry Card
**File**: `src/components/slides/GetStartedSlide.tsx`
**Action**: Add tutorial entry card

#### Task 3.3: Add Tutorial Icon
**File**: `src/components/common/Icon.tsx`
**Action**: Add 'tutorial' icon path

---

### Phase 4: Data & Content

#### Task 4.1: Create Tutorial Data
**File**: `src/data/tutorial.json`
**Content**: Example feature, recommended skills, categories

---

### Phase 5: Final Polish

#### Task 5.1: Responsive Design
**Action**: Test and fix on mobile, tablet, desktop

#### Task 5.2: Accessibility
**Action**: Add aria-labels, keyboard navigation

#### Task 5.3: Build & Deploy
**Action**: Build, test, commit, push

---

## Execution Order

```
Phase 1 (Infrastructure)
  1.1 → 1.2 → 1.3

Phase 2 (Slides) - Parallel possible
  2.1, 2.2, 2.3, 2.4, 2.5, 2.6 (independent)

Phase 3 (Navigation)
  3.1 → 3.2 → 3.3

Phase 4 (Data)
  4.1 (independent)

Phase 5 (Polish)
  5.1 → 5.2 → 5.3
```

---

## Estimated Time

| Phase | Tasks | Time |
|-------|-------|------|
| Phase 1 | 3 tasks | 30 min |
| Phase 2 | 6 tasks | 3 hours |
| Phase 3 | 3 tasks | 30 min |
| Phase 4 | 1 task | 15 min |
| Phase 5 | 3 tasks | 45 min |
| **Total** | **16 tasks** | **~5 hours** |

---

## Dependencies

- Existing slide components for reference
- Icon component
- CSS design tokens
- React Router setup

---

## Success Metrics

1. Tutorial page loads correctly
2. All 6 slides render properly
3. Interactive selector works
4. Links navigate to correct pages
5. Mobile responsive
6. Build passes
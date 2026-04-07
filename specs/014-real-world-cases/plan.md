# Feature 014: Real-World Case Studies - Implementation Plan

## Overview

**Goal**: 创建真实案例展示页面，展示 4 个真实项目案例的完整 skill 调用链。

**Approach**: 复用 TutorialExampleSlide 的流程可视化模式，创建独立的案例展示页面。

---

## Implementation Tasks

### Phase 1: Infrastructure

#### Task 1.1: Create Case Data
**File**: `src/data/cases.json`
**Action**: Create 4 cases with complete skill chains

#### Task 1.2: Create Page Route
**Files**: 
- `src/pages/index.ts` - Add export
- `src/App.tsx` - Add route

#### Task 1.3: Create CasesPage Skeleton
**Files**:
- `src/pages/CasesPage.tsx`
- `src/pages/CasesPage.module.css`

---

### Phase 2: Components

#### Task 2.1: Create CategoryFilter Component
**Files**:
- `src/components/cases/CategoryFilter.tsx`
- `src/components/cases/CategoryFilter.module.css`

#### Task 2.2: Create SkillFlowItem Component
**Files**:
- `src/components/cases/SkillFlowItem.tsx`
- `src/components/cases/SkillFlowItem.module.css`

#### Task 2.3: Create CaseCard Component
**Files**:
- `src/components/cases/CaseCard.tsx`
- `src/components/cases/CaseCard.module.css`

#### Task 2.4: Complete CasesPage Implementation
**Action**: Integrate all components with filtering logic

---

### Phase 3: Navigation

#### Task 3.1: Add Header Navigation
**File**: `src/components/common/Header.tsx`
**Action**: Add "案例" link

#### Task 3.2: Add Home Page Entry
**File**: `src/components/slides/GetStartedSlide.tsx`
**Action**: Add "真实案例" card

#### Task 3.3: Add Tutorial Page Link
**File**: `src/components/tutorial/TutorialNextSlide.tsx`
**Action**: Add cases to learning paths

#### Task 3.4: Add Icon
**File**: `src/components/common/Icon.tsx`
**Action**: Add 'cases' icon

---

### Phase 4: Final Polish

#### Task 4.1: Responsive Testing
**Action**: Test on mobile, tablet, desktop

#### Task 4.2: Build & Deploy
**Action**: Build, commit, push, verify deployment

---

## Execution Order

```
Phase 1 (Infrastructure)
  1.1 → 1.2 → 1.3

Phase 2 (Components)
  2.1, 2.2 (parallel) → 2.3 → 2.4

Phase 3 (Navigation)
  3.1 → 3.2 → 3.3 → 3.4

Phase 4 (Polish)
  4.1 → 4.2
```

---

## Estimated Time

| Phase | Tasks | Time |
|-------|-------|------|
| Phase 1 | 3 tasks | 30 min |
| Phase 2 | 4 tasks | 1.5 hours |
| Phase 3 | 4 tasks | 30 min |
| Phase 4 | 2 tasks | 30 min |
| **Total** | **13 tasks** | **~3 hours** |
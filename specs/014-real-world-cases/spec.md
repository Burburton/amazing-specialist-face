# Feature: Real-World Case Studies (真实案例展示)

## Metadata
```yaml
feature_id: 014-real-world-cases
status: draft
created: 2026-04-07
author: architect
design: specs/014-real-world-cases/design.md
based_on: 013-beginner-tutorial
```

## 1. Problem Statement

### Current State

用户完成新手教程后，仍然不清楚：
- 具体在什么场景下使用哪些 skills
- 一个完整的项目需要调用哪些 skills
- skills 之间的执行顺序是什么

### User Impact

1. **场景理解困难**：用户不知道"我想做 X"该用哪些 skills
2. **流程认知缺失**：不理解 skills 如何串联完成一个完整任务
3. **学习曲线陡峭**：需要大量试错才能理解使用场景

---

## 2. Goal

### Primary Goal

创建真实案例展示页面，让用户：
- 看到 4 个真实项目案例的完整开发流程
- 理解每个案例涉及哪些 skills 及其执行顺序
- 点击技能卡片跳转到对应 skill 详情页体验

### Success Criteria

1. **案例展示**：4 个真实案例，每个包含完整 skill 调用链
2. **分类筛选**：按场景类型筛选案例
3. **交互跳转**：点击技能卡片跳转到 skill 详情页
4. **数据驱动**：案例数据存储在 JSON 文件中

---

## 3. User Stories

### US-001: 浏览案例列表
> 作为用户，我想看到所有真实案例，了解专家包能解决什么问题

**Acceptance Criteria**:
- 显示 4 个案例卡片
- 每个卡片显示标题、描述、分类标签
- 卡片布局响应式适配

### US-002: 查看案例详情
> 作为用户，我想看到一个案例涉及的所有 skills 及其执行顺序

**Acceptance Criteria**:
- 显示 skill 调用流程图
- 每个步骤显示：序号、skill 名称、角色、操作
- 流程图支持横向/纵向布局切换

### US-003: 跳转到 Skill 详情
> 作为用户，我想点击某个 skill 了解更多信息

**Acceptance Criteria**:
- 点击技能卡片跳转到 `/skills/:id`
- 支持键盘导航
- Hover 显示交互提示

### US-004: 按分类筛选
> 作为用户，我想只看某个类别的案例

**Acceptance Criteria**:
- 点击分类标签筛选案例
- 当前选中状态高亮
- 支持重置到"全部"

---

## 4. Data Model

### 4.1 Case Data Structure

```typescript
interface CaseSkill {
  step: number;
  skillId: string;
  skillName: string;
  role: string;
  action: string;
}

interface Case {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: CaseSkill[];
  estimatedTime: string;
  timeSaved: string;
}

interface CaseCategory {
  id: string;
  label: string;
}

interface CasesData {
  cases: Case[];
  categories: CaseCategory[];
}
```

### 4.2 Data File

**Location**: `src/data/cases.json`

**Initial Cases**:
1. 用户登录系统 (auth)
2. 电商订单系统 (data)
3. RESTful API 开发 (api)
4. 代码重构优化 (optimization)

---

## 5. Component Specifications

### 5.1 CasesPage

**File**: `src/pages/CasesPage.tsx`

**Responsibilities**:
- 渲染页面布局
- 管理分类筛选状态
- 渲染案例卡片网格

**Props**: None (route component)

### 5.2 CaseCard

**File**: `src/components/cases/CaseCard.tsx`

**Props**:
```typescript
interface CaseCardProps {
  case: Case;
}
```

**Responsibilities**:
- 渲染案例标题、描述、分类
- 渲染 skill 流程图
- 处理技能卡片点击事件

### 5.3 SkillFlowItem

**File**: `src/components/cases/SkillFlowItem.tsx`

**Props**:
```typescript
interface SkillFlowItemProps {
  step: number;
  skillId: string;
  skillName: string;
  role: string;
  action: string;
}
```

**Responsibilities**:
- 渲染单个技能卡片
- 处理跳转逻辑
- 显示角色标签

### 5.4 CategoryFilter

**File**: `src/components/cases/CategoryFilter.tsx`

**Props**:
```typescript
interface CategoryFilterProps {
  categories: CaseCategory[];
  selected: string;
  onSelect: (id: string) => void;
}
```

**Responsibilities**:
- 渲染分类标签
- 管理选中状态

---

## 6. Route Configuration

**Add to** `src/App.tsx`:
```tsx
<Route path="/cases" element={<CasesPage />} />
```

**Add to** `src/pages/index.ts`:
```tsx
export const CasesPage = lazy(() => import('./CasesPage'));
```

---

## 7. Navigation Integration

### 7.1 Header Navigation
Add "案例" link to `src/components/common/Header.tsx`:
```tsx
const PAGE_NAVS = [
  { id: 'tutorial', label: '教程', path: '/tutorial' },
  { id: 'cases', label: '案例', path: '/cases' },
  { id: 'skills', label: '技能', path: '/skills' },
];
```

### 7.2 Home Page Entry
Update `src/components/slides/GetStartedSlide.tsx`:
```tsx
const ENTRY_CARDS = [
  { icon: 'tutorial', title: '新手教程', count: '5 分钟入门', path: '/tutorial' },
  { icon: 'cases', title: '真实案例', count: '4 个案例', path: '/cases' },
  { icon: 'skills', title: '技能库', count: `${stats.totalSkills} 个技能`, path: '/skills' },
  { icon: 'roles', title: '角色分工', count: `${stats.totalRoles} 个角色`, path: '/roles' },
];
```

### 7.3 Tutorial Page Entry
Update `src/components/tutorial/TutorialNextSlide.tsx` to add cases link.

---

## 8. Acceptance Criteria

### AC-001: Page Route
- [ ] `/cases` route configured
- [ ] CasesPage component created
- [ ] Lazy loading enabled

### AC-002: Case Data
- [ ] `src/data/cases.json` created
- [ ] 4 cases with complete skill chains
- [ ] Category data included

### AC-003: CasesPage
- [ ] Page header with title and description
- [ ] Category filter functional
- [ ] Case cards displayed in grid

### AC-004: CaseCard
- [ ] Title, description, category displayed
- [ ] Skill flow rendered correctly
- [ ] Click navigation to skill detail works

### AC-005: Navigation Integration
- [ ] Header link added
- [ ] Home page entry added
- [ ] Tutorial page link added

### AC-006: Build Verification
- [ ] `npm run build` passes
- [ ] No TypeScript errors
- [ ] Responsive design works

---

## 9. Technical Constraints

### TC-001: Design Consistency
- Follow PPT Manual Style
- Reuse existing CSS variables
- Match existing component patterns

### TC-002: Accessibility
- All interactive elements focusable
- aria-labels for icons
- Keyboard navigation support

### TC-003: Performance
- Lazy load page component
- No external dependencies
- Minimal re-renders

---

## 10. Risks / Tradeoffs

| ID | Risk | Impact | Mitigation |
|----|------|--------|------------|
| R-001 | 案例数据维护成本 | 数据过时 | 建立案例更新流程 |
| R-002 | Skill ID 变更 | 链接失效 | 使用稳定 skill ID |
| R-003 | 案例数量少 | 用户需求不匹配 | 后续添加更多案例 |

---

## 11. Implementation Plan

### Phase 1: Infrastructure (30 min)
1. Create route and page component
2. Create cases.json data file

### Phase 2: Components (2 hours)
1. Implement CasesPage
2. Implement CaseCard
3. Implement SkillFlowItem
4. Implement CategoryFilter

### Phase 3: Integration (30 min)
1. Add header navigation
2. Add home page entry
3. Add tutorial page link

### Phase 4: Polish (30 min)
1. Responsive testing
2. Accessibility check
3. Build and deploy

---

## 12. References

- Design Document: `specs/014-real-world-cases/design.md`
- Similar Feature: `specs/013-beginner-tutorial/spec.md`
- Component Patterns: `src/components/tutorial/TutorialExampleSlide.tsx`
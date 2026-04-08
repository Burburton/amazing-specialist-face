# Feature 016: Full Editorial Redesign

## Overview

将项目中所有前端界面重新设计为 **Editorial/Magazine + Japanese Minimal** 风格，遵循 `docs/editorial-design-standard.md` 规范。

## Background

Feature 015 已成功完成 CasesPage 和 TutorialExampleSlide 的 editorial 重设计，用户反馈设计风格非常合适。现需要将此风格统一应用到所有前端界面。

## Scope

### 已完成 (Feature 015)

| 页面/组件 | 状态 |
|-----------|------|
| CasesPage | ✅ 完成 |
| CaseCard | ✅ 完成 |
| CategoryFilter | ✅ 完成 |
| TutorialExampleSlide | ✅ 完成 |

### 待重新设计

#### Pages (10 个)

| Page | 优先级 | 复杂度 | 说明 |
|------|--------|--------|------|
| HomePage | P0 | 高 | 首页，5个Slide组件 |
| SkillsPage | P0 | 中 | 技能列表 |
| SkillDetailPage | P1 | 中 | 技能详情 |
| RolesPage | P1 | 低 | 角色列表 |
| RoleDetailPage | P1 | 中 | 角色详情 |
| ContractsPage | P2 | 低 | 契约列表 |
| ContractDetailPage | P2 | 中 | 契约详情 |
| CommandsPage | P2 | 低 | 命令列表 |
| CommandDetailPage | P2 | 中 | 命令详情 |
| ExecutionPage | P2 | 高 | 执行监控 |
| TutorialPage (其他Slides) | P1 | 中 | 5个其他Slide |
| NotFoundPage | P3 | 低 | 404页面 |

#### Components (按类型分组)

**Cards (4 个)**
- SkillCard
- RoleCard
- ContractCard
- CommandCard

**Slides (5 个)**
- CoverSlide
- WhatIsSlide
- HowItWorksSlide
- CapabilitiesSlide
- GetStartedSlide

**Tutorial (4 个)**
- TutorialIntroSlide
- TutorialWhySlide
- TutorialStepsSlide
- TutorialTrySlide
- TutorialNextSlide

**Shared/Common (3 个)**
- PageHeader
- BackButton
- Layout
- Header

**Search (3 个)**
- SearchModal
- SearchTrigger
- SearchResultItem

**Execution (4 个)**
- Timeline
- TaskCard
- LogViewer
- PayloadViewer
- StatsOverview

**Diagrams (3 个)**
- SkillDependencyDiagram
- WorkflowDiagram
- RoleCollaborationDiagram

**Skills Demo (3 个)**
- SkillDemoPanel
- DemoInputField
- DemoOutputPreview

## Design Principles

### 必须遵循

1. **Typography**
   - Display: Playfair Display (72px-120px hero)
   - Body: Source Sans 3 (16px-18px)
   - Mono: JetBrains Mono (13px-14px)

2. **Color**
   - 主墨色: `#0f0f0f`
   - 金色强调: `#c9a227`
   - 米白背景: `#faf9f6`
   - ❌ 禁止紫色渐变

3. **Elements (至少3项)**
   - 大编号 (01, 02, 03...)
   - 装饰线 (金色横线/双线)
   - 英文标签 (DESIGN, CODE, TEST...)
   - 引用块 (金色左边框)
   - 时间线 (垂直/横向)
   - 统计装饰 (TIME, SAVED, SKILLS)

4. **Spacing**
   - 页面 padding ≥ 64px
   - 卡片 padding ≥ 32px
   - 元素间距 ≥ 16px

## Implementation Phases

### Phase 1: Core Pages (P0)

**目标**: 完成核心入口页面重设计

| Task | 页面/组件 | 依赖 |
|------|-----------|------|
| 1.1 | HomePage + 5 Slides | 无 |
| 1.2 | SkillsPage | PageHeader, SkillCard |
| 1.3 | SkillDetailPage | BackButton, SkillDemoPanel |

### Phase 2: Detail Pages (P1)

**目标**: 完成详情页和教程页重设计

| Task | 页面/组件 | 依赖 |
|------|-----------|------|
| 2.1 | RolesPage | RoleCard |
| 2.2 | RoleDetailPage | BackButton, SkillCard |
| 2.3 | TutorialPage (其他Slides) | 无 |

### Phase 3: Secondary Pages (P2)

**目标**: 完成次要页面重设计

| Task | 页面/组件 | 依赖 |
|------|-----------|------|
| 3.1 | ContractsPage | ContractCard |
| 3.2 | ContractDetailPage | BackButton |
| 3.3 | CommandsPage | CommandCard |
| 3.4 | CommandDetailPage | BackButton |
| 3.5 | ExecutionPage | Timeline, TaskCard |

### Phase 4: Components & Polish (P3)

**目标**: 完成共享组件和细节优化

| Task | 组件 | 说明 |
|------|------|------|
| 4.1 | PageHeader, BackButton | 共享导航组件 |
| 4.2 | SearchModal, SearchResultItem | 搜索组件 |
| 4.3 | NotFoundPage | 404页面 |
| 4.4 | Diagrams | 图表组件 |
| 4.5 | Dark Mode 验证 | 深色模式兼容 |

## Acceptance Criteria

### Each Page/Component

- [ ] 使用 Playfair Display 作为 Display 字体
- [ ] 使用 Source Sans 3 作为 Body 字体
- [ ] 金色 (#c9a227) 作为唯一强调色
- [ ] 无紫色渐变背景
- [ ] 包含至少 3 个 editorial 元素
- [ ] 留白充足 (padding ≥ 32px)
- [ ] 深色模式正常
- [ ] 响应式布局正常

### Overall

- [ ] 所有页面风格一致
- [ ] 设计稿已创建并评审
- [ ] 代码已实现并部署
- [ ] Playwright 测试通过

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| 工作量大，耗时 | 高 | 分阶段执行，优先核心页面 |
| 设计一致性难保证 | 中 | 遵循 design.md 模板，复用组件 |
| 深色模式兼容 | 中 | 每个页面完成后立即验证 |
| 响应式适配 | 中 | 使用 CSS 变量，测试断点 |

## Dependencies

- Feature 015 (已完成): CasesPage, TutorialExampleSlide editorial 设计
- `docs/editorial-design-standard.md`: 设计规范
- Google Fonts: Playfair Display, Source Sans 3

## Timeline Estimate

| Phase | 工作量 | 估计时间 |
|-------|--------|----------|
| Phase 1 | 3 个页面 + 8 个组件 | 2-3 天 |
| Phase 2 | 3 个页面 + 5 个组件 | 1-2 天 |
| Phase 3 | 5 个页面 + 4 个组件 | 2 天 |
| Phase 4 | 组件 + 验证 | 1 天 |

**总计**: 约 6-8 天

## References

- `docs/editorial-design-standard.md` - 设计规范
- `specs/015-editorial-redesign/design.md` - 参考设计
- `specs/015-editorial-redesign/spec.md` - 参考实现
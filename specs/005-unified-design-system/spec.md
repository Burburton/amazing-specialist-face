# Feature: Unified Design System

## Metadata
```yaml
feature_id: 005-unified-design-system
status: complete
created: 2026-04-05
author: ui-ux-designer
based_on: 004-ppt-manual-style
```

## 1. Problem Statement

### Current State

首页已完成 PPT Manual Style 重构，但其他页面仍使用旧的 Dashboard 风格：

| 页面 | 当前风格 | 问题 |
|------|----------|------|
| **SkillsPage** | Dashboard | 信息密集，筛选体验差，卡片点击无跳转 |
| **RolesPage** | Dashboard | 列表布局，与首页风格断裂 |
| **ContractsPage** | Dashboard | 网格堆砌，缺少叙事感 |
| **CommandsPage** | Dashboard | 流程展示不清晰 |

### User Impact

1. **视觉断裂**：从首页跳转后风格突变，体验不连贯
2. **功能缺失**：卡片无法点击跳转详情，无法深入了解
3. **品牌不一致**：极客、专业、可靠的设计语言未贯穿全站

---

## 2. Goal

### Primary Goal

将 PPT Manual Style 设计语言扩展到所有页面，实现全站统一的设计体验。

### Success Criteria

1. **风格统一**：所有页面遵循 PPT Manual Style
2. **导航完整**：所有卡片可点击跳转详情页
3. **交互一致**：Hover、Focus、动画效果统一
4. **品牌连贯**：极客、专业、可靠贯穿全站

---

## 3. Design Identity

### 3.1 继承自 004-ppt-manual-style

```yaml
personality:
  archetype: "极客"
  traits:
    - 专业
    - 可靠
    - 技术驱动
    
visual_language:
  layout: "Slide + Section 混合"
  typography:
    display: "Space Grotesk"
    body: "Inter"
    code: "JetBrains Mono"
  color:
    background: "#09090b"
    primary: "#8b5cf6"
    accent: "#10b981"
```

### 3.2 页面类型定义

| 类型 | 布局 | 适用页面 |
|------|------|----------|
| **Slide-based** | 全屏 Slide + Scroll Snap | 首页 |
| **Section-based** | 垂直 Sections + 自然滚动 | 列表页（Skills/Roles/Contracts/Commands） |
| **Detail Page** | 单列内容 + 返回导航 | 详情页（新增） |

### 3.3 Section-based 布局规范

```yaml
section_layout:
  container:
    max_width: "1200px"
    padding: "var(--space-6)"
    margin: "0 auto"
    
  section:
    padding: "var(--space-12) 0"
    border_bottom: "1px solid var(--color-border)"
    
  section:last-child:
    border_bottom: "none"
    
  header:
    text_align: "center"
    margin_bottom: "var(--space-8)"
    
  title:
    font: "Space Grotesk"
    size: "2rem"
    weight: "600"
    color: "var(--color-text-primary)"
    
  subtitle:
    font: "JetBrains Mono"
    size: "0.875rem"
    color: "var(--color-text-muted)"
    margin_top: "var(--space-2)"
```

---

## 4. Page Specifications

### 4.1 SkillsPage Redesign

**布局**: Section-based

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (固定，继承 PPT Manual Style)                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SECTION 1: Hero Header                                     │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │              技能库                                      ││
│  │              38 个技能 · MVP 核心 · M4 扩展              ││
│  │                                                          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  SECTION 2: Filter Bar                                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  [全部] [架构师] [开发者] [测试员] [审查员] [文档员]    ││
│  │                                                          ││
│  │  [🔍 搜索技能...]              [全部 ▼] [搜索结果: 38]   ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  SECTION 3: Skill Grid                                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ SkillCard   │ │ SkillCard   │ │ SkillCard   │           │
│  │ (可点击)    │ │ (可点击)    │ │ (可点击)    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ SkillCard   │ │ SkillCard   │ │ SkillCard   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**交互**:
- 点击 SkillCard → 跳转 `/skills/:id`
- Tab 切换角色筛选
- 搜索即时过滤

---

### 4.2 RolesPage Redesign

**布局**: Section-based

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SECTION 1: Hero Header                                     │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │              核心角色                                    ││
│  │              6 个专业角色 · 完整协作闭环                  ││
│  │                                                          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  SECTION 2: Role Overview Grid                              │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│  │ 🏛️ 架构师  │ │ 💻 开发者  │ │ 🔍 测试员  │              │
│  │ 8 技能     │ │ 12 技能    │ │ 6 技能     │              │
│  │ [查看 →]   │ │ [查看 →]   │ │ [查看 →]   │              │
│  └────────────┘ └────────────┘ └────────────┘              │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│  │ ✅ 审查员  │ │ 📝 文档员  │ │ 🔐 安全员  │              │
│  │ 5 技能     │ │ 4 技能     │ │ 3 技能     │              │
│  │ [查看 →]   │ │ [查看 →]   │ │ [查看 →]   │              │
│  └────────────┘ └────────────┘ └────────────┘              │
│                                                              │
│  SECTION 3: Collaboration Diagram                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  [角色协作关系图]                                        ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**交互**:
- 点击角色卡片 → 跳转 `/roles/:name`（显示该角色的技能列表）

---

### 4.3 ContractsPage Redesign

**布局**: Section-based

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SECTION 1: Hero Header                                     │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │              Artifact Contracts                          ││
│  │              18 个契约 · 角色间交付物规范                 ││
│  │                                                          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  SECTION 2: Contract Grid                                   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ ContractCard │ │ ContractCard │ │ ContractCard │        │
│  │ (可点击)     │ │ (可点击)     │ │ (可点击)     │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**交互**:
- 点击 ContractCard → 跳转 `/contracts/:id`

---

### 4.4 CommandsPage Redesign

**布局**: Section-based

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SECTION 1: Hero Header                                     │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │              核心命令                                    ││
│  │              5 个命令 · 完整开发流程                      ││
│  │                                                          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  SECTION 2: Workflow Timeline                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  1 → 2 → 3 → 4 → 5                                     ││
│  │  Spec  Plan  Tasks  Implement  Audit                    ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  SECTION 3: Command Grid                                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ CommandCard  │ │ CommandCard  │ │ CommandCard  │        │
│  │ (可点击)     │ │ (可点击)     │ │ (可点击)     │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**交互**:
- 点击 CommandCard → 跳转 `/commands/:name`

---

## 5. Detail Pages (New)

### 5.1 SkillDetailPage (`/skills/:id`)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│  [← 返回技能库]                                              │
│                                                              │
│  SECTION 1: Skill Header                                    │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  architect/requirement-to-design                         ││
│  │                                                          ││
│  │  Requirement to Design                                   ││
│  │  架构师 · MVP · 8 技能                                   ││
│  │                                                          ││
│  │  需求分析 → 设计方案的转化能力                            ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  SECTION 2: Skill Details                                   │
│  - 描述                                                      │
│  - 使用场景                                                  │
│  - 输入输出                                                  │
│  - 相关技能                                                  │
│                                                              │
│  SECTION 3: Related Skills                                  │
│  [相关技能卡片列表]                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

### 5.2 RoleDetailPage (`/roles/:name`)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│  [← 返回角色]                                                │
│                                                              │
│  SECTION 1: Role Header                                     │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  🏛️ 架构师                                              ││
│  │                                                          ││
│  │  规划与设计                                              ││
│  │  8 个技能                                                ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  SECTION 2: Role Details                                    │
│  - Mission                                                   │
│  - In Scope                                                  │
│  - Out of Scope                                              │
│  - Trigger Conditions                                        │
│                                                              │
│  SECTION 3: Skills List                                     │
│  [该角色的所有技能卡片]                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

### 5.3 ContractDetailPage (`/contracts/:id`)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│  [← 返回契约]                                                │
│                                                              │
│  SECTION 1: Contract Header                                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  spec.md                                                 ││
│  │                                                          ││
│  │  Feature Specification                                  ││
│  │  Producer: 架构师 | Consumers: 开发者, 测试员            ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  SECTION 2: Contract Details                                │
│  - Description                                               │
│  - Producer Role                                             │
│  - Consumer Roles                                            │
│  - Schema (if any)                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

### 5.4 CommandDetailPage (`/commands/:name`)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│  [← 返回命令]                                                │
│                                                              │
│  SECTION 1: Command Header                                  │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  /spec-start                                             ││
│  │                                                          ││
│  │  Start Feature Specification                           ││
│  │  Step 1 of 5                                            ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  SECTION 2: Command Details                                 │
│  - Description                                               │
│  - Usage                                                     │
│  - Inputs                                                    │
│  - Outputs                                                   │
│  - Examples                                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Component Specifications

### 6.1 PageHeader Component (Shared)

```tsx
interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon?: string;
}
```

```css
.pageHeader {
  text-align: center;
  padding: var(--space-12) var(--space-6);
  background: linear-gradient(180deg, var(--color-background) 0%, var(--color-surface) 100%);
}

.pageTitle {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.pageSubtitle {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}
```

---

### 6.2 SkillCard (Enhanced)

```tsx
interface SkillCardProps {
  skill: Skill;
  onClick?: (skill: Skill) => void;  // 已有
  // 新增：跳转行为
  href?: string;  // 如果提供，渲染为 Link
}
```

**交互**:
- 点击 → 导航到 `/skills/:id`
- Hover → translateY(-4px) + border-color
- Focus → ring

---

### 6.3 RoleCard (Enhanced)

```tsx
interface RoleCardProps {
  role: Role;
  color: string;
  href?: string;  // 新增：跳转链接
}
```

**交互**:
- 点击 → 导航到 `/roles/:name`
- Hover → scale(1.02) + shadow
- Focus → ring

---

### 6.4 ContractCard (Enhanced)

```tsx
interface ContractCardProps {
  contract: Contract;
  producerColor: string;
  href?: string;  // 新增
}
```

**交互**:
- 点击 → 导航到 `/contracts/:id`
- Hover → translateY(-2px) + border-color

---

### 6.5 CommandCard (Enhanced)

```tsx
interface CommandCardProps {
  command: Command;
  index: number;
  href?: string;  // 新增
}
```

**交互**:
- 点击 → 导航到 `/commands/:name`
- Hover → translateY(-2px) + border-color

---

### 6.6 BackButton Component (New)

```tsx
interface BackButtonProps {
  to: string;
  label?: string;
}
```

```css
.backButton {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: color var(--duration-fast), background var(--duration-fast);
}

.backButton:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-elevated);
}
```

---

## 7. Routing Updates

### Current Routes

```tsx
/               → HomePage
/skills         → SkillsPage
/roles          → RolesPage
/contracts      → ContractsPage
/commands       → CommandsPage
/execution      → ExecutionPage
```

### New Routes

```tsx
/skills/:id     → SkillDetailPage      // 新增
/roles/:name    → RoleDetailPage       // 新增
/contracts/:id  → ContractDetailPage   // 新增
/commands/:name → CommandDetailPage    // 新增
```

---

## 8. Implementation Scope

### In Scope

1. **Pages Redesign** (4 pages)
   - SkillsPage
   - RolesPage
   - ContractsPage
   - CommandsPage

2. **Detail Pages** (4 new pages)
   - SkillDetailPage
   - RoleDetailPage
   - ContractDetailPage
   - CommandDetailPage

3. **Components Enhanced** (4 components)
   - SkillCard (add href prop)
   - RoleCard (add href prop)
   - ContractCard (add href prop)
   - CommandCard (add href prop)

4. **New Components** (2 components)
   - PageHeader (shared)
   - BackButton

5. **Routing Updates**
   - Add 4 new routes

### Out of Scope

1. **ExecutionPage** - 保持现状（功能型页面）
2. **NotFoundPage** - 保持现状
3. **首页** - 已完成，不改动
4. **数据层** - 不修改数据结构
5. **其他页面样式** - 仅重构上述 4 个列表页

---

## 9. Success Criteria

### Visual Criteria

- [ ] 所有列表页使用 Section-based 布局
- [ ] 页面 Header 风格统一
- [ ] 卡片 Hover/Focus 效果一致
- [ ] 颜色、字体遵循 PPT Manual Style

### Interaction Criteria

- [ ] 所有卡片可点击跳转
- [ ] 详情页可返回列表页
- [ ] 导航体验流畅

### Technical Criteria

- [ ] 新增 4 个详情页路由
- [ ] 组件支持 href prop
- [ ] Build 通过
- [ ] Deploy 成功

---

## 10. Risks / Tradeoffs

### Risks

| ID | 风险 | 影响 | 缓解措施 |
|----|------|------|----------|
| R-001 | 详情页内容单薄 | 用户体验差 | 使用现有数据扩展展示 |
| R-002 | 路由变更影响导航 | 断链检查 | 更新所有内部链接 |
| R-003 | 工作量大 | 时间延长 | 分阶段实施 |

### Tradeoffs

| 决策 | 收益 | 代价 |
|------|------|------|
| **不重构 ExecutionPage** | 范围可控 | 风格不完全统一 |
| **详情页无新增数据** | 快速实现 | 内容可能不够丰富 |

---

## 11. Open Questions

| ID | Question | Suggestion | Status |
|----|----------|------------|--------|
| OQ-001 | 详情页需要哪些额外数据？ | 使用现有数据 | ✅ 已确认 |
| OQ-002 | ExecutionPage 是否统一风格？ | 保持现状 | ✅ 已确认 |
| OQ-003 | 是否需要面包屑导航？ | 仅 BackButton | ✅ 已确认 |

---

## 12. References

- `specs/004-ppt-manual-style/spec.md` - PPT Manual Style 设计规范
- `src/styles/tokens.css` - Design Tokens
- `src/components/slides/*.tsx` - Slide 组件示例
- Linear / Vercel / Stripe Docs - 设计参考
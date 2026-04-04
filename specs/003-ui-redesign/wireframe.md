# Wireframe Design: HomePage Redesign

## Metadata
```yaml
feature_id: 003-ui-redesign
artifact_type: wireframe-design
skill: wireframe-design
plugin: ui-ux-designer
created: 2026-04-04
based_on: spec.md (design-consultation-report)
```

## Overview

本文档定义首页重设计的线框图，包括：
- 页面布局框架
- 组件网格配置
- 响应式布局 (Desktop/Tablet/Mobile)
- 用户流程图

---

## 1. Desktop Layout (1280px+)

### ASCII 线框图

```
┌──────────────────────────────────────────────────────────────────────────┐
│  HEADER (64px fixed)                                                       │
│  ┌────────────┐  ┌──────────────────────────────────┐  ┌───────────────┐ │
│  │ 📚 Logo    │  │ 首页  技能库  角色  契约  命令     │  │ GitHub [⚙️]   │ │
│  │ 专家包     │  └──────────────────────────────────┘  └───────────────┘ │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ╔══════════════════════════════════════════════════════════════════════╗ │
│  ║                         HERO 区域 (320px)                            ║ │
│  ║                                                                       ║ │
│  ║          ████████████████████████████████████████████               ║ │
│  ║          ██  OpenCode 专家包                                  ████  ║ │
│  ║          ████████████████████████████████████████████               ║ │
│  ║                                                                       ║ │
│  ║                 全自动产品研发闭环执行层                              ║ │
│  ║                                                                       ║ │
│  ║     ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     ║ │
│  ║     │  ⚡ 即时执行    │  │  🔄 闭环协作   │  │  📦 标准交付   │     ║ │
│  ║     │  无需手动触发  │  │  6角色无缝接力│  │  Artifact契约  │     ║ │
│  ║     └────────────────┘  └────────────────┘  └────────────────┘     ║ │
│  ║                                                                       ║ │
│  ║     ┌──────────────────────┐  ┌──────────────────────┐             ║ │
│  ║     │   浏览技能库 →       │  │   了解协作流程 →     │             ║ │
│  ║     └──────────────────────┘  └──────────────────────┘             ║ │
│  ║                                                                       ║ │
│  ╚══════════════════════════════════════════════════════════════════════╝ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  能力概览 (200px)                                                    │ │
│  │                                                                       │ │
│  │  ┌────────────────────────────────────────────────────────────────┐ │ │
│  │  │  ████████████████████    ████████████████████                  │ │ │
│  │  │  ██    43            █   ██    6              █                │ │ │
│  │  │  ██  专业技能        █   ██  核心角色          █                │ │ │
│  │  │  ████████████████████    ████████████████████                  │ │ │
│  │  │                                                                    │ │ │
│  │  │  ████████████████████    ████████████████████                  │ │ │
│  │  │  ██    18            █   ██    5              █                │ │ │
│  │  │  ██  Artifact契约    █   ██  核心命令          █                │ │ │
│  │  │  ████████████████████    ████████████████████                  │ │ │
│  │  └────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │  ┌──────────────────────────────────────────────────────────────┐   │ │
│  │  │  角色分布: Architect(8) Developer(12) Tester(6) ...          │   │ │
│  │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │   │ │
│  │  └──────────────────────────────────────────────────────────────┘   │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  六角色协作流程 (300px)                                              │ │
│  │                                                                       │ │
│  │      ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐      │ │
│  │      │Architect │───→│Developer│───→│ Tester  │───→│Reviewer │      │ │
│  │      │  🏛️     │    │  💻     │    │  🔍     │    │  ✅     │      │ │
│  │      └─────────┘    └─────────┘    └─────────┘    └─────────┘      │ │
│  │           │              │              │              │           │ │
│  │           ↓              ↓              ↓              ↓           │ │
│  │      ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐      │ │
│  │      │  Docs   │    │Security │    │         │    │         │      │ │
│  │      │  📝     │    │  🔐     │    │         │    │         │      │ │
│  │      └─────────┘    └─────────┘    └─────────┘    └─────────┘      │ │
│  │                                                                       │ │
│  │  [点击角色节点展开详情]                                               │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐        │
│  │  快速入口        │  │  快速入口        │  │  快速入口        │        │
│  │  ┌────────────┐ │  │  ┌────────────┐ │  │  ┌────────────┐ │        │
│  │  │    📚      │ │  │  │    👥      │ │  │  │    📋      │ │        │
│  │  └────────────┘ │  │  └────────────┘ │  │  └────────────┘ │        │
│  │  技能库          │  │  角色分工        │  │  契约规范        │        │
│  │  43 个技能       │  │  6 个核心角色   │  │  18 个契约       │        │
│  │  [进入 →]       │  │  [进入 →]       │  │  [进入 →]       │        │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘        │
│                                                                             │
└──────────────────────────────────────────────────────────────────────────┘
```

### Grid Configuration

```yaml
layout:
  type: "single-column"
  max_width: "var(--container-xl)"  # 1280px
  padding: "var(--space-4)"         # 32px
  margin: "0 auto"

sections:
  hero:
    max_width: "960px"
    margin: "0 auto"
    padding: "var(--space-8) var(--space-4)"  # 64px 32px
    height: "320px"
    
  stats:
    grid: "4 columns"
    gap: "var(--space-3)"  # 24px
    min_width: "200px"
    margin_bottom: "var(--space-4)"
    
  workflow:
    padding: "var(--space-6) var(--space-4)"  # 48px 32px
    min_height: "300px"
    margin_bottom: "var(--space-4)"
    
  entry_cards:
    grid: "3 columns"
    gap: "var(--space-4)"  # 32px
    min_width: "280px"
    margin_bottom: "var(--space-8)"
```

---

## 2. Tablet Layout (768px-1024px)

### ASCII 线框图

```
┌────────────────────────────────────────────────────┐
│  HEADER (64px)                                     │
│  [📚]  首页  技能  角色  契约          [GitHub]   │
├────────────────────────────────────────────────────┤
│                                                     │
│  ╔══════════════════════════════════════════════╗ │
│  ║                 HERO (280px)                 ║ │
│  ║                                               ║ │
│  ║       OpenCode 专家包                         ║ │
│  ║       全自动产品研发闭环执行层                 ║ │
│  ║                                               ║ │
│  ║   ┌──────────┐  ┌──────────┐  ┌──────────┐  ║ │
│  ║   │ ⚡ 即时  │  │ 🔄 闭环 │  │ 📦 标准 │  ║ │
│  ║   └──────────┘  └──────────┘  └──────────┘  ║ │
│  ║                                               ║ │
│  ║   [浏览技能库 →]    [了解流程 →]             ║ │
│  ╚══════════════════════════════════════════════╝ │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐               │
│  │    43        │  │    6         │               │
│  │  专业技能    │  │  核心角色    │               │
│  └──────────────┘  └──────────────┘               │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐               │
│  │    18        │  │    5         │               │
│  │  Artifact    │  │  核心命令    │               │
│  └──────────────┘  └──────────────┘               │
│                                                     │
│  ┌────────────────────────────────────────────┐   │
│  │  六角色协作流程                             │   │
│  │  Architect → Developer → Tester → Reviewer │   │
│  │       ↓           ↓          ↓          ↓   │   │
│  │      Docs       Security                   │   │
│  └────────────────────────────────────────────┘   │
│                                                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│  │ 📚 技能库  │  │ 👥 角色    │  │ 📋 契约    │ │
│  │ [进入 →]   │  │ [进入 →]   │  │ [进入 →]   │ │
│  └────────────┐  └────────────┐  └────────────┐ │
│                                                     │
└────────────────────────────────────────────────────┘
```

### Grid Configuration

```yaml
layout:
  max_width: "100%"
  padding: "var(--space-3)"  # 24px

sections:
  hero:
    height: "280px"
    padding: "var(--space-6) var(--space-3)"
    
  stats:
    grid: "2 columns"
    gap: "var(--space-2)"  # 16px
    
  workflow:
    min_height: "240px"
    padding: "var(--space-4) var(--space-3)"
    
  entry_cards:
    grid: "3 columns"
    gap: "var(--space-2)"  # 16px
    min_width: "200px"
```

---

## 3. Mobile Layout (< 768px)

### ASCII 线框图

```
┌──────────────────────────────┐
│  HEADER (56px)               │
│  [📚]  [☰ Menu]              │
├──────────────────────────────┤
│                               │
│  ╔════════════════════════╗ │
│  ║        HERO (240px)     ║ │
│  ║                         ║ │
│  ║   OpenCode 专家包       ║ │
│  ║   全自动研发执行层       ║ │
│  ║                         ║ │
│  ║   ┌──────────────────┐ ║ │
│  ║   │ ⚡ 🔄 📦         │ ║ │
│  ║   │ 即时·闭环·标准   │ ║ │
│  ║   └──────────────────┘ ║ │
│  ║                         ║ │
│  ║   [浏览技能库 →]       ║ │
│  ╚════════════════════════╝ │
│                               │
│  ┌──────────────────────────┐│
│  │      43                  ││
│  │    专业技能              ││
│  └──────────────────────────┘│
│                               │
│  ┌──────────────────────────┐│
│  │      6                   ││
│  │    核心角色              ││
│  └──────────────────────────┘│
│                               │
│  ┌──────────────────────────┐│
│  │  六角色协作流程          ││
│  │  Architect → Developer   ││
│  │       ↓         ↓        ││
│  │  Tester → Reviewer       ││
│  └──────────────────────────┘│
│                               │
│  ┌──────────────────────────┐│
│  │  📚 技能库               ││
│  │  43 个技能 · [进入 →]   ││
│  └──────────────────────────┘│
│                               │
│  ┌──────────────────────────┐│
│  │  👥 角色分工             ││
│  │  6 个角色 · [进入 →]     ││
│  └──────────────────────────┘│
│                               │
└──────────────────────────────┘
```

### Grid Configuration

```yaml
layout:
  max_width: "100%"
  padding: "var(--space-2)"  # 16px

sections:
  hero:
    height: "240px"
    padding: "var(--space-4) var(--space-2)"
    
  stats:
    grid: "1 column"
    gap: "var(--space-2)"
    
  workflow:
    min_height: "180px"
    padding: "var(--space-3) var(--space-2)"
    
  entry_cards:
    grid: "1 column"
    gap: "var(--space-2)"
```

---

## 4. Component Layouts

### HeroSection

```yaml
component: HeroSection
location: HomePage, top
layout:
  height: "320px desktop, 280px tablet, 240px mobile"
  max_width: "960px"
  padding: "var(--space-8) var(--space-4)"
  text_align: "center"
  
elements:
  - type: "title"
    content: "OpenCode 专家包"
    font: "var(--font-display)"
    size: "var(--text-5xl) desktop, var(--text-3xl) mobile"
    weight: "var(--font-bold)"
    color: "gradient (primary → accent)"
    
  - type: "subtitle"
    content: "全自动产品研发闭环执行层"
    font: "var(--font-sans)"
    size: "var(--text-xl)"
    color: "var(--color-text-secondary)"
    
  - type: "value_props"
    layout: "3 columns"
    gap: "var(--space-4)"
    items:
      - icon: "⚡"
        title: "即时执行"
        desc: "无需手动触发"
      - icon: "🔄"
        title: "闭环协作"
        desc: "6角色无缝接力"
      - icon: "📦"
        title: "标准交付"
        desc: "Artifact契约"
        
  - type: "cta_buttons"
    layout: "flex center"
    gap: "var(--space-3)"
    items:
      - text: "浏览技能库 →"
        style: "primary"
        action: "navigate /skills"
      - text: "了解协作流程 →"
        style: "secondary"
        action: "scroll to workflow"
```

### StatsOverview

```yaml
component: StatsOverview
location: HomePage, below Hero
layout:
  grid: "4 columns desktop, 2 tablet, 1 mobile"
  gap: "var(--space-3)"
  
elements:
  - type: "stat_card"
    repeat: 4
    layout:
      padding: "var(--space-4)"
      border_radius: "var(--radius-lg)"
      text_align: "center"
    items:
      - number: "43"
        label: "专业技能"
      - number: "6"
        label: "核心角色"
      - number: "18"
        label: "Artifact契约"
      - number: "5"
        label: "核心命令"
```

### WorkflowDiagram

```yaml
component: WorkflowDiagram
location: HomePage, center
layout:
  padding: "var(--space-6) var(--space-4)"
  min_height: "300px"
  
interactions:
  - trigger: "click role node"
    action: "expand role detail panel"
    animation: "fade in, 200ms"
  - trigger: "hover connection"
    action: "highlight connection line"
```

### EntryCards

```yaml
component: EntryCards
location: HomePage, bottom
layout:
  grid: "3 columns desktop, 3 tablet, 1 mobile"
  gap: "var(--space-4)"
  
elements:
  - type: "entry_card"
    repeat: 3
    layout:
      padding: "var(--space-4)"
      border_radius: "var(--radius-xl)"
    items:
      - icon: "📚"
        title: "技能库"
        count: "43 个技能"
        action: "navigate /skills"
      - icon: "👥"
        title: "角色分工"
        count: "6 个核心角色"
        action: "navigate /roles"
      - icon: "📋"
        title: "契约规范"
        count: "18 个契约"
        action: "navigate /contracts"
```

---

## 5. User Flow

### Flow Diagram

```
Start → [HomePage]
         │
         ├── View Hero ──→ Understand Value Proposition
         │        │
         │        ├── Click "浏览技能库" ──→ [SkillsPage]
         │        │
         │        └── Click "了解流程" ──→ Scroll to Workflow
         │                                    │
         │                                    ├── Click Role Node ──→ [Role Detail Panel]
         │                                    │
         └── View Entry Cards ──→ Click Card ──→ [Target Page]
                                                      │
                                                      ├── Skills → [SkillsPage]
                                                      ├── Roles → [RolesPage]
                                                      └── Contracts → [ContractsPage]
```

### Flow Steps

| 步骤 | 操作 | 期望 | 时间目标 |
|------|------|------|----------|
| 1 | 用户进入首页 | 看到 Hero，理解产品定位 | < 3s |
| 2 | 浏览价值主张 | 理解 3 个核心卖点 | < 5s |
| 3 | 点击 CTA 或入口卡片 | 导航到目标页面 | < 1s |
| 4 | 探索流程图 | 点击角色节点，展开详情 | < 10s |

---

## 6. Interaction Specifications

### Hero CTA Buttons

```yaml
primary_button:
  text: "浏览技能库 →"
  style:
    background: "var(--color-primary)"
    color: "white"
    padding: "var(--space-2) var(--space-4)"
    border_radius: "var(--radius-lg)"
    font_weight: "var(--font-medium)"
  hover:
    background: "var(--color-primary-hover)"
    transform: "translateY(-2px)"
    box_shadow: "var(--glow-primary)"
  action: "navigate /skills"
  
secondary_button:
  text: "了解协作流程 →"
  style:
    background: "transparent"
    color: "var(--color-text-secondary)"
    border: "1px solid var(--color-border)"
    padding: "var(--space-2) var(--space-4)"
    border_radius: "var(--radius-lg)"
  hover:
    background: "var(--color-surface-elevated)"
    border_color: "var(--color-primary)"
  action: "scroll to #workflow"
```

### Workflow Diagram Interactions

```yaml
role_node:
  default:
    background: "role-color (400 series)"
    border_radius: "var(--radius-lg)"
    padding: "var(--space-2)"
    cursor: "pointer"
    
  hover:
    transform: "scale(1.05)"
    box_shadow: "var(--shadow-md)"
    
  click:
    action: "expand detail panel"
    detail_panel:
      position: "right sidebar"
      width: "320px"
      content:
        - role_title
        - role_description
        - skill_list
        - collaboration_flow
        
connection_line:
  default:
    stroke: "var(--color-border)"
    stroke_width: "2px"
    
  hover:
    stroke: "var(--color-primary)"
    stroke_width: "3px"
    animation: "pulse 1s infinite"
```

### Entry Cards Interactions

```yaml
entry_card:
  default:
    background: "var(--color-surface)"
    border: "1px solid var(--color-border)"
    border_radius: "var(--radius-xl)"
    padding: "var(--space-4)"
    
  hover:
    transform: "translateY(-4px)"
    box_shadow: "var(--shadow-lg)"
    border_color: "role-color"
    
  click:
    action: "navigate to target page"
```

---

## 7. Accessibility Requirements

### Hero Section

```yaml
a11y:
  title:
    - role: "heading"
    - level: "1"
    - aria_label: "OpenCode 专家包 - 全自动产品研发闭环执行层"
    
  value_props:
    - role: "list"
    - aria_label: "核心价值主张"
    
  cta_buttons:
    - role: "button"
    - aria_label: "{button-text}"
    - tabindex: "0"
```

### Workflow Diagram

```yaml
a11y:
  role_nodes:
    - role: "button"
    - aria_label: "{role-name} 角色 - 点击展开详情"
    - tabindex: "0"
    
  connection_lines:
    - aria_hidden: "true"  # decorative
    
  detail_panel:
    - role: "dialog"
    - aria_label: "{role-name} 角色详情"
    - aria_modal: "true"
```

### Entry Cards

```yaml
a11y:
  card:
    - role: "button"
    - aria_label: "{title} - {count}"
    - tabindex: "0"
    
  icon:
    - aria_hidden: "true"  # decorative
```

---

## 8. Responsive Breakpoints

| 断点 | 宽度范围 | Hero 高度 | Stats 列数 | Entry 列数 |
|------|----------|-----------|------------|------------|
| Desktop | ≥ 1280px | 320px | 4 | 3 |
| Tablet | 768-1024px | 280px | 2 | 3 |
| Mobile | < 768px | 240px | 1 | 1 |

---

## 9. Design Tokens Reference

所有样式使用 `src/styles/tokens.css` 中定义的 CSS 变量：

```css
/* 颜色 */
--color-primary: #8b5cf6;
--color-accent: #10b981;
--color-background: #09090b;
--color-surface: #18181b;

/* 间距 */
--space-2: 16px;
--space-3: 24px;
--space-4: 32px;
--space-8: 64px;

/* 字体 */
--font-display: "Space Grotesk";
--font-sans: "Inter";
--text-5xl: 3rem;
--text-xl: 1.25rem;

/* 圆角 */
--radius-lg: 0.75rem;
--radius-xl: 1rem;

/* 阴影 */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
--glow-primary: 0 0 20px rgba(139, 92, 246, 0.3);
```

---

## 10. Checklists

### 布局设计
- [x] 页面结构清晰
- [x] Hero 区域简化
- [x] 组件位置合理
- [x] 响应式断点定义

### 组件设计
- [x] Hero 组件定义
- [x] Stats 组件定义
- [x] Workflow 组件定义
- [x] Entry Cards 定义
- [x] 交互定义明确

### 响应式
- [x] Desktop 布局 (1280px+)
- [x] Tablet 布局 (768-1024px)
- [x] Mobile 布局 (< 768px)

### 可访问性
- [x] ARIA 角色定义
- [x] 键盘导航支持
- [x] Focus 状态可见

### 交互
- [x] Hover 状态定义
- [x] Click 动作定义
- [x] 动画时序定义
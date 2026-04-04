# Skill: wireframe-design

## Metadata
```yaml
plugin_id: ui-ux-designer
plugin_version: 1.0.0
role: UI/UX Designer
phase: design
```

## Purpose

输出页面的线框图设计，包括布局、组件位置、交互流程。这是设计稿的骨架，在设计规范确定后使用。

## When to Use

**必须使用时：**
- 设计咨询完成后
- 页面布局设计
- 交互流程设计

**推荐使用时：**
- 组件设计前
- 响应式适配规划

## When Not to Use

**不适用场景：**
- 小型样式调整
- 单个组件修改
- 文案修改

## Wireframe Format

### ASCII 线框图格式

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
│  ┌─────────┐  ┌─────────────────────────┐  ┌──────────────┐ │
│  │ Logo    │  │ Nav: Home | Skills | ...│  │ [Menu]       │ │
│  └─────────┘  └─────────────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                      │    │
│  │   ████████████████████████████████                  │    │
│  │   ██ HERO TITLE                              ████  │    │
│  │   ██ Subtitle text goes here                 ████  │    │
│  │   ████████████████████████████████                  │    │
│  │                                                      │    │
│  │   ┌──────────┐  ┌──────────┐                       │    │
│  │   │  CTA 1   │  │  CTA 2   │                       │    │
│  │   └──────────┘  └──────────┘                       │    │
│  │                                                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ ┌──────────┐ │  │ ┌──────────┐ │  │ ┌──────────┐ │      │
│  │ │  Icon    │ │  │ │  Icon    │ │  │ │  Icon    │ │      │
│  │ └──────────┘ │  │ └──────────┘ │  │ └──────────┘ │      │
│  │ Title        │  │ Title        │  │ Title        │      │
│  │ Description  │  │ Description  │  │ Description  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
│  © 2024 Expert Pack                                          │
└─────────────────────────────────────────────────────────────┘
```

### 组件标注格式

```yaml
component: SkillCard
location: SkillsPage, Grid Cell 1
size: 280px x 180px

layout:
  - type: header
    height: 48px
    children:
      - type: icon
        size: 24x24
        position: left
      - type: title
        size: 1-2 lines
        weight: semibold
      - type: badge
        size: 24x20
        position: right
        content: "MVP" | "M4"
        
  - type: body
    height: auto
    children:
      - type: description
        lines: 2-3
        color: secondary
        
  - type: footer
    height: 32px
    children:
      - type: role-tag
        size: auto
      - type: id
        size: auto
        position: right
        font: mono

states:
  default:
    border: 1px solid border-color
    background: surface
  hover:
    transform: translateY(-4px)
    shadow: lg
    border-color: primary
  focus:
    ring: focus-ring
    
interactions:
  - trigger: click
    action: navigate to skill detail
  - trigger: keyboard Enter
    action: navigate to skill detail
```

## Wireframe Design Process

### Step 1: 页面布局框架

定义页面的大结构：

```
Page Layout Template:

┌─────────────────────────────────────────┐
│ HEADER (固定高度: 64px)                  │
├─────────────────────────────────────────┤
│ SIDEBAR  │  MAIN CONTENT                │
│ (可选)   │  (flex: 1)                   │
│          │                              │
│          │                              │
├─────────────────────────────────────────┤
│ FOOTER (可选)                           │
└─────────────────────────────────────────┘
```

### Step 2: 组件网格

定义组件的排列方式：

```yaml
grid:
  type: auto-fill
  min_width: 280px
  gap: 16px
  columns: auto
  
responsive:
  desktop: 4 columns
  tablet: 2 columns
  mobile: 1 column
```

### Step 3: 组件内部布局

定义每个组件的内部结构：

```
Card Component Template:

┌───────────────────────────┐
│ ┌─────┐                   │
│ │Icon │  Title       [Tag]│
│ └─────┘                   │
├───────────────────────────┤
│ Description text that     │
│ spans 2-3 lines max       │
├───────────────────────────┤
│ [Tag] [Tag]      metadata │
└───────────────────────────┘
```

### Step 4: 交互流程

定义用户操作流程：

```
User Flow: Browse Skills

Start → [Skills Page]
         │
         ├── Filter by Role ──→ [Filtered Grid]
         │                            │
         ├── Search ──→ [Search Results]
         │                      │
         └── Click Card ──→ [Skill Detail]
                               │
                               ├── View Examples
                               └── View Related
```

## Output Requirements

```yaml
wireframe_design:
  page: string
  
  layout:
    ascii_diagram: string
    grid_config: {...}
    
  components:
    - name: string
      position: string
      layout: {...}
      states: {...}
      interactions: [...]
      
  responsive:
    desktop: {...}
    tablet: {...}
    mobile: {...}
    
  user_flow:
    diagram: string
    steps: [...]
```

## Example Output

### 首页线框图

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
│  [📚 Expert Pack]  [Home] [Skills] [Roles] [Commands]       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║                                                        ║  │
│  ║     OpenCode 专家包                                    ║  │
│  ║     全自动产品研发闭环执行层                           ║  │
│  ║                                                        ║  │
│  ║     6 个核心角色 · 43 个专业技能 · 18 个 Contracts    ║  │
│  ║                                                        ║  │
│  ║     [MVP: 23] [M4: 16] [Commands: 5]                  ║  │
│  ║                                                        ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                              │
│  核心能力统计                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │   43     │ │    6     │ │   18     │ │    5     │        │
│  │ 专业技能 │ │ 核心角色 │ │ Contracts│ │ 核心命令 │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│                                                              │
│  六角色协作流程                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  [Workflow Diagram]                                  │    │
│  │  Architect → Developer → Tester → Reviewer          │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### SkillCard 组件设计

```yaml
component: SkillCard
location: SkillsPage Grid

layout:
  width: 280px
  padding: 16px
  border_radius: 12px
  
  header:
    height: 32px
    layout: flex-between
    elements:
      - title:
          font: semibold, 18px
          max_lines: 1
      - badge:
          size: 40x20
          variants: [MVP, M4]
          
  body:
    margin_top: 8px
    elements:
      - description:
          font: regular, 14px
          color: secondary
          max_lines: 3
          
  footer:
    margin_top: 12px
    layout: flex-between
    elements:
      - role_tag:
          background: role-color
          padding: 4px 8px
      - skill_id:
          font: mono, 12px
          color: muted

states:
  default:
    background: var(--color-surface)
    border: 1px solid var(--color-border)
    
  hover:
    transform: translateY(-4px)
    box-shadow: var(--shadow-lg)
    border_color: var(--color-primary)
    cursor: pointer
    
  focus:
    outline: none
    box_shadow: var(--ring-focus)

interactions:
  - trigger: hover
    animation: spring, 200ms
  - trigger: click
    action: navigate to /skills/:id
```

## Checklists

### 布局设计
- [ ] 页面结构清晰
- [ ] 组件位置合理
- [ ] 响应式考虑

### 组件设计
- [ ] 每个组件有布局定义
- [ ] 状态覆盖完整
- [ ] 交互定义明确

### 响应式
- [ ] 桌面布局
- [ ] 平板布局
- [ ] 手机布局

## Common Failure Modes

| 失败模式 | 表现 | 处理建议 |
|----------|------|----------|
| 布局过于复杂 | 信息过载 | 拆分为多个区域 |
| 缺少响应式 | 移动端不可用 | 必须输出 3 个尺寸 |
| 状态未定义 | 开发随意发挥 | 强制填写状态表 |
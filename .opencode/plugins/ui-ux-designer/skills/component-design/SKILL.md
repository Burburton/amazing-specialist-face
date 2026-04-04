# Skill: component-design

## Metadata
```yaml
plugin_id: ui-ux-designer
plugin_version: 1.0.0
role: UI/UX Designer
phase: design
```

## Purpose

输出具体的组件设计规范，包括样式、状态、动画、可访问性要求。这是开发实现的直接依据。

## When to Use

**必须使用时：**
- 线框图完成后
- 新组件设计
- 组件样式重构

**推荐使用时：**
- 设计系统更新
- 组件库扩展

## When Not to Use

**不适用场景：**
- 布局设计
- 页面级设计
- 纯逻辑组件

## Component Design Template

### 完整组件规范

```yaml
component:
  name: SkillCard
  category: Display
  version: 1.0.0
  
  description: |
    展示单个技能的卡片组件，包含名称、描述、分类标签、角色标签。
    支持悬停交互和键盘导航。
    
  anatomy:
    - name: container
      type: article
      role: presentation
    - name: header
      type: div
      contains: [icon, title, badge]
    - name: icon
      type: div
      role: decorative
    - name: title
      type: h3
      role: heading
    - name: badge
      type: span
      role: status
    - name: description
      type: p
      role: contentinfo
    - name: footer
      type: div
      contains: [role-tag, skill-id]
    - name: role-tag
      type: span
      role: status
    - name: skill-id
      type: span
      role: identifier

  variants:
    - name: default
      description: 标准卡片样式
      usage: 列表网格中的卡片
      
    - name: featured
      description: 强调卡片
      usage: 推荐技能展示
      differences:
        border_color: primary
        shadow: lg
        
    - name: compact
      description: 紧凑卡片
      usage: 侧边栏或小空间
      differences:
        padding: 12px
        font_size: sm

  props:
    - name: id
      type: string
      required: true
      description: 技能唯一标识
      
    - name: name
      type: string
      required: true
      description: 技能名称
      max_length: 30
      
    - name: description
      type: string
      required: false
      default: ""
      description: 技能描述
      max_length: 150
      
    - name: category
      type: enum
      values: [MVP, M4, Plugin]
      required: true
      
    - name: role
      type: enum
      values: [architect, developer, tester, reviewer, docs, security]
      required: true
      
    - name: onClick
      type: function
      required: false
      description: 点击回调

  styling:
    container:
      background: var(--color-surface)
      border: 1px solid var(--color-border)
      border_radius: var(--radius-lg)
      padding: var(--space-4)
      min_height: 180px
      cursor: pointer
      
    title:
      font_family: var(--font-display)
      font_size: var(--text-lg)
      font_weight: var(--font-semibold)
      color: var(--color-text-primary)
      
    description:
      font_size: var(--text-sm)
      color: var(--color-text-secondary)
      line_height: var(--leading-relaxed)
      
    badge:
      mvp:
        background: var(--color-success)
        color: white
        padding: 2px 8px
        border_radius: var(--radius-sm)
        font_size: var(--text-xs)
        font_weight: var(--font-bold)
        
      m4:
        background: var(--color-primary)
        color: white
        padding: 2px 8px
        border_radius: var(--radius-sm)
        font_size: var(--text-xs)
        font_weight: var(--font-bold)
        
    role_tag:
      background: var(--role-color)
      color: white
      padding: 2px 8px
      border_radius: var(--radius-sm)
      font_size: var(--text-xs)
      font_weight: var(--font-medium)

  states:
    default:
      transform: none
      box_shadow: none
      border_color: var(--color-border)
      
    hover:
      transform: translateY(-4px)
      box_shadow: var(--shadow-lg)
      border_color: var(--color-primary)
      transition:
        duration: 200ms
        easing: var(--ease-spring)
        
    focus:
      outline: none
      box_shadow: var(--ring-focus)
      
    focus_visible:
      outline: none
      box_shadow: var(--ring-focus)
      
    active:
      transform: translateY(-2px)
      box_shadow: var(--shadow-md)
      
    disabled:
      opacity: 0.5
      cursor: not-allowed
      transform: none

  animations:
    hover_in:
      property: [transform, box-shadow, border-color]
      duration: 200ms
      easing: cubic-bezier(0.12, 0.4, 0.29, 1.46)
      
    hover_out:
      property: [transform, box-shadow, border-color]
      duration: 150ms
      easing: cubic-bezier(0.23, 1, 0.32, 1)

  accessibility:
    keyboard:
      - key: Tab
        action: Move focus to card
      - key: Enter
        action: Activate card (navigate to detail)
      - key: Space
        action: Activate card (navigate to detail)
        
    aria:
      - attribute: role
        value: article
      - attribute: aria-labelledby
        value: "{id}-title"
      - attribute: aria-describedby
        value: "{id}-desc"
        
    focus_visible:
      requirement: Must show visible focus indicator
      implementation: box-shadow ring

  responsive:
    desktop:
      width: 280px
      min_height: 180px
      
    tablet:
      width: 240px
      min_height: 160px
      
    mobile:
      width: 100%
      min_height: 140px

  implementation_notes: |
    1. Use CSS variables from tokens.css for all colors and spacing
    2. Apply transition only to animated properties, not 'all'
    3. Ensure focus-visible works for keyboard navigation
    4. Support prefers-reduced-motion media query
    5. Use semantic HTML (article, h3, etc.)
```

## Component Design Process

### Step 1: 解剖结构

定义组件的 DOM 结构：

```
SkillCard
├── container (article)
│   ├── header (div)
│   │   ├── icon (div, decorative)
│   │   ├── title (h3)
│   │   └── badge (span)
│   ├── description (p)
│   └── footer (div)
│       ├── role-tag (span)
│       └── skill-id (span)
```

### Step 2: 变体设计

定义组件的不同变体：

| 变体 | 用途 | 差异 |
|------|------|------|
| default | 标准展示 | 基础样式 |
| featured | 推荐强调 | 主色边框 + 大阴影 |
| compact | 紧凑空间 | 减少内边距 + 小字体 |

### Step 3: 状态定义

使用 `design-state-coverage` 确保状态完整：

| 状态 | 触发 | 样式变化 |
|------|------|----------|
| default | 初始 | 基础样式 |
| hover | 鼠标悬停 | 上移 + 阴影 + 边框色 |
| focus | 键盘聚焦 | focus ring |
| active | 鼠标按下 | 轻微上移 |
| disabled | 禁用 | 半透明 + 禁止光标 |

### Step 4: 可访问性

定义键盘和 ARIA 支持：

```yaml
keyboard:
  Tab: 聚焦卡片
  Enter: 激活（跳转详情）
  Space: 激活（跳转详情）
  
aria:
  role: article
  aria-labelledby: "{id}-title"
  aria-describedby: "{id}-desc"
```

## Output Requirements

```yaml
component_design:
  name: string
  category: string
  
  anatomy: [...]
  variants: [...]
  props: [...]
  styling: {...}
  states: {...}
  animations: {...}
  accessibility: {...}
  responsive: {...}
  implementation_notes: string
```

## Example Output

### Button 组件设计

```yaml
component:
  name: Button
  category: Interactive
  
  anatomy:
    - name: container
      type: button
      role: button
      contains: [prefix-icon, label, suffix-icon]
    - name: prefix-icon
      type: span
      role: decorative
      optional: true
    - name: label
      type: span
      role: text
    - name: suffix-icon
      type: span
      role: decorative
      optional: true

  variants:
    - name: primary
      usage: 主要操作
      styling:
        background: var(--color-primary)
        color: white
        border: none
        
    - name: secondary
      usage: 次要操作
      styling:
        background: var(--color-surface)
        color: var(--color-text-primary)
        border: 1px solid var(--color-border)
        
    - name: ghost
      usage: 低优先级操作
      styling:
        background: transparent
        color: var(--color-text-secondary)
        border: none

  sizes:
    sm:
      height: 32px
      padding: 8px 12px
      font_size: var(--text-sm)
      
    md:
      height: 40px
      padding: 8px 16px
      font_size: var(--text-base)
      
    lg:
      height: 48px
      padding: 12px 24px
      font_size: var(--text-lg)

  states:
    hover:
      primary:
        background: var(--color-primary-hover)
        transform: translateY(-1px)
      secondary:
        background: var(--color-surface-elevated)
        
    focus_visible:
      box_shadow: var(--ring-focus)
      
    active:
      transform: translateY(0)
      
    disabled:
      opacity: 0.5
      cursor: not-allowed

  accessibility:
    aria:
      - attribute: type
        values: [button, submit, reset]
      - attribute: disabled
        value: boolean
    keyboard:
      - key: Enter
        action: Activate button
      - key: Space
        action: Activate button
```

## Checklists

### 结构设计
- [ ] DOM 结构清晰
- [ ] 语义化标签
- [ ] 可访问性角色

### 变体设计
- [ ] 变体场景明确
- [ ] 样式差异清晰
- [ ] 命名一致

### 状态设计
- [ ] default 状态
- [ ] hover 状态
- [ ] focus-visible 状态
- [ ] disabled 状态

### 可访问性
- [ ] 键盘支持
- [ ] ARIA 属性
- [ ] 焦点可见

## Common Failure Modes

| 失败模式 | 表现 | 处理建议 |
|----------|------|----------|
| 缺少变体 | 组件单一 | 至少定义 2-3 个变体 |
| 状态不完整 | 交互异常 | 使用 design-state-coverage |
| 无障碍缺失 | 不符合 WCAG | 强制填写 accessibility 节 |
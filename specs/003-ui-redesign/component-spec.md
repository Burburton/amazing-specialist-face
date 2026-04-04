# Component Design: SkillCard

## Metadata
```yaml
feature_id: 003-ui-redesign
artifact_type: component-design
skill: component-design
plugin: ui-ux-designer
created: 2026-04-04
priority: highest
based_on: spec.md (design-consultation-report)
```

## Overview

本文档定义 SkillCard 组件的完整设计规范，包括：
- 解剖结构
- 变体设计
- 状态定义
- 可访问性规范
- 响应式尺寸
- CSS Module 实现示例

---

## 1. Description

展示单个技能的卡片组件，包含名称、描述、分类标签(MVP/M4)、角色标签。

**重设计目标**:
1. 强化 MVP/M4 视觉差异
2. 角色颜色更亮 (400系列)
3. 增强悬停交互反馈
4. 支持键盘导航和可访问性

---

## 2. Anatomy

### DOM 结构

```
SkillCard (article)
├── header (div.flex-between)
│   ├── title (h3)           # 技能名称
│   └── badge (span)         # MVP | M4 标签
├── body (div)
│   └── description (p)      # 技能描述 (2-3行)
└── footer (div.flex-between)
    ├── role-tag (span)      # 角色标签
    └── skill-id (span.mono) # 技能 ID
```

### Anatomy Definition

```yaml
anatomy:
  - name: "container"
    type: "article"
    role: "presentation"
    attributes:
      - "tabindex: 0"
      - "role: article"
      
  - name: "header"
    type: "div"
    contains: ["title", "badge"]
    layout: "flex-between"
    
  - name: "title"
    type: "h3"
    role: "heading"
    attributes:
      - "id: {skill-id}-title"
      
  - name: "badge"
    type: "span"
    role: "status"
    variants: ["mvp", "m4"]
      
  - name: "body"
    type: "div"
    contains: ["description"]
      
  - name: "description"
    type: "p"
    role: "contentinfo"
    attributes:
      - "id: {skill-id}-desc"
      
  - name: "footer"
    type: "div"
    contains: ["role-tag", "skill-id"]
    layout: "flex-between"
      
  - name: "role-tag"
    type: "span"
    role: "status"
      
  - name: "skill-id"
    type: "span"
    role: "identifier"
    font: "mono"
```

---

## 3. Variants

### Variant Definitions

| 变体 | 描述 | 用途 | 差异 |
|------|------|------|------|
| **default** | 标准卡片样式 | 技能网格中的默认展示 | 基础样式 |
| **mvp** | MVP 核心技能卡片 | MVP 类别技能展示 | Badge solid accent, Hover glow |
| **m4** | M4 扩展技能卡片 | M4 类别技能展示 | Badge outline muted |
| **featured** | 推荐技能强调卡片 | 首页推荐、搜索结果置顶 | Border primary, Shadow lg |

### Variant Styling

```yaml
variants:
  - name: "default"
    description: "标准卡片样式"
    usage: "技能网格中的默认展示"
    styling:
      background: "var(--color-surface)"
      border: "1px solid var(--color-border)"
      border_radius: "var(--radius-xl)"
      
  - name: "mvp"
    description: "MVP 核心技能卡片"
    usage: "MVP 类别技能展示"
    differences:
      badge:
        background: "var(--color-accent)"  # Emerald-500
        color: "white"
        style: "solid"
      hover:
        border_color: "var(--color-accent)"
        glow: "var(--glow-accent)"
          
  - name: "m4"
    description: "M4 扩展技能卡片"
    usage: "M4 类别技能展示"
    differences:
      badge:
        background: "transparent"
        color: "var(--color-text-muted)"
        style: "outline"
        border: "1px solid var(--color-border-subtle)"
      hover:
        border_color: "var(--color-primary)"
          
  - name: "featured"
    description: "推荐技能强调卡片"
    usage: "首页推荐、搜索结果置顶"
    differences:
      border_color: "var(--color-primary)"
      shadow: "var(--shadow-lg)"
      badge:
        glow: "true"
```

---

## 4. Props

### Props Definition

```yaml
props:
  - name: "id"
    type: "string"
    required: true
    description: "技能唯一标识"
    example: "architect/requirement-to-design"
      
  - name: "name"
    type: "string"
    required: true
    description: "技能名称"
    max_length: 30
    truncate: "ellipsis"
      
  - name: "description"
    type: "string"
    required: false
    default: ""
    description: "技能描述"
    max_length: 150
    max_lines: 3
      
  - name: "category"
    type: "enum"
    values: ["MVP", "M4", "Plugin"]
    required: true
    description: "技能类别"
      
  - name: "role"
    type: "enum"
    values: ["architect", "developer", "tester", "reviewer", "docs", "security", "common"]
    required: true
    description: "所属角色"
      
  - name: "roleColor"
    type: "string"
    required: false
    description: "角色颜色 (覆盖默认)"
      
  - name: "onClick"
    type: "function"
    required: false
    description: "点击回调"
    signature: "(skill: Skill) => void"
      
  - name: "featured"
    type: "boolean"
    required: false
    default: false
    description: "是否为推荐技能"
```

---

## 5. Styling

### Container Styling

```yaml
styling:
  container:
    background: "var(--color-surface)"
    border: "1px solid var(--color-border)"
    border_radius: "var(--radius-xl)"  # 12px
    padding: "var(--space-3)"  # 24px
    min_height: "160px"
    cursor: "pointer"
    transition_property: "transform, box-shadow, border-color"
    transition_duration: "var(--duration-normal)"
    transition_easing: "var(--ease-spring)"
```

### Header Styling

```yaml
  header:
    layout: "flex"
    justify_content: "space-between"
    align_items: "center"
    gap: "var(--space-2)"
    margin_bottom: "var(--space-2)"
    
  title:
    font_family: "var(--font-display)"
    font_size: "var(--text-base)"  # 16px
    font_weight: "var(--font-semibold)"
    color: "var(--color-text-primary)"
    max_width: "200px"
    overflow: "hidden"
    text_overflow: "ellipsis"
    white_space: "nowrap"
```

### Badge Styling

```yaml
  badge:
    base:
      padding: "2px 8px"
      border_radius: "var(--radius-sm)"
      font_size: "var(--text-xs)"
      font_weight: "var(--font-bold)"
      min_width: "32px"
      text_align: "center"
      
    mvp:
      background: "var(--color-accent)"  # #10b981
      color: "white"
      border: "none"
      
    m4:
      background: "transparent"
      color: "var(--color-text-muted)"
      border: "1px solid var(--color-border-subtle)"
```

### Description Styling

```yaml
  description:
    font_size: "var(--text-sm)"  # 14px
    color: "var(--color-text-secondary)"
    line_height: "var(--leading-relaxed)"
    max_lines: 3
    overflow: "hidden"
    margin_bottom: "var(--space-2)"
```

### Footer Styling

```yaml
  footer:
    layout: "flex"
    justify_content: "space-between"
    align_items: "center"
    gap: "var(--space-2)"
    
  role_tag:
    padding: "2px 8px"
    border_radius: "var(--radius-sm)"
    font_size: "var(--text-xs)"
    font_weight: "var(--font-medium)"
    color: "white"
    
  skill_id:
    font_family: "var(--font-mono)"
    font_size: "var(--text-xs)"
    color: "var(--color-text-muted)"
    max_width: "150px"
    overflow: "hidden"
    text_overflow: "ellipsis"
```

### Role Colors (400 Series - 更亮)

```yaml
  role_colors:
    architect: "#a78bfa"  # Violet-400
    developer: "#60a5fa"  # Blue-400
    tester: "#4ade80"     # Green-400
    reviewer: "#fbbf24"   # Amber-400
    docs: "#22d3ee"       # Cyan-400
    security: "#f87171"   # Red-400
    common: "#94a3b8"     # Slate-400
```

---

## 6. States

### State Definitions

```yaml
states:
  default:
    transform: "none"
    box_shadow: "none"
    border_color: "var(--color-border)"
      
  hover:
    transform: "translateY(-4px)"
    box_shadow: "var(--shadow-lg)"
    border_color: "var(--color-primary)"
    cursor: "pointer"
    transition:
      duration: "var(--duration-normal)"  # 200ms
      easing: "var(--ease-spring)"
        
    # MVP 卡片悬停特殊效果
    mvp_hover:
      border_color: "var(--color-accent)"
      box_shadow: "var(--shadow-lg), var(--glow-accent)"
        
    # M4 卡片悬停效果
    m4_hover:
      border_color: "var(--color-border-subtle)"
      box_shadow: "var(--shadow-md)"
        
  focus:
    outline: "none"
    box_shadow: "var(--ring-focus)"
      
  focus_visible:
    outline: "none"
    box_shadow: "var(--ring-focus)"
    border_color: "var(--color-border-focus)"
      
  active:
    transform: "translateY(-2px)"
    box_shadow: "var(--shadow-md)"
    transition:
      duration: "var(--duration-fast)"
        
  disabled:
    opacity: "0.5"
    cursor: "not-allowed"
    transform: "none"
    box_shadow: "none"
```

### State Table

| 状态 | 触发 | 样式变化 |
|------|------|----------|
| default | 初始 | 基础样式 |
| hover | 鼠标悬停 | 上移 4px + 阴影 + 边框色 |
| focus | 键盘聚焦 | focus ring |
| focus-visible | 键盘聚焦 (visible) | focus ring + 边框色 |
| active | 鼠标按下 | 轻微上移 2px |
| disabled | 禁用属性 | 半透明 + 禁止光标 |

---

## 7. Animations

### Animation Definitions

```yaml
animations:
  hover_enter:
    name: "skillCardHoverIn"
    properties: ["transform", "box-shadow", "border-color"]
    duration: "200ms"
    easing: "cubic-bezier(0.12, 0.4, 0.29, 1.46)"  # spring
    from:
      transform: "translateY(0)"
      box_shadow: "none"
      border_color: "var(--color-border)"
    to:
      transform: "translateY(-4px)"
      box_shadow: "var(--shadow-lg)"
      border_color: "var(--color-primary)"
        
  hover_exit:
    name: "skillCardHoverOut"
    properties: ["transform", "box-shadow", "border-color"]
    duration: "150ms"
    easing: "cubic-bezier(0.23, 1, 0.32, 1)"
      
  click_feedback:
    name: "skillCardClick"
    properties: ["transform"]
    duration: "100ms"
    easing: "ease-out"
    from: "translateY(-4px)"
    to: "translateY(-2px)"
```

---

## 8. Accessibility

### Keyboard Support

```yaml
keyboard:
  - key: "Tab"
    action: "Move focus to next/previous card"
    behavior: "Focus moves through grid"
        
  - key: "Enter"
    action: "Activate card - navigate to skill detail"
    behavior: "Same as click"
        
  - key: "Space"
    action: "Activate card - navigate to skill detail"
    behavior: "Same as click"
        
  - key: "ArrowDown / ArrowUp"
    action: "Optional: Navigate within grid"
    behavior: "Move to adjacent card in same column"
```

### ARIA Attributes

```yaml
aria:
  - attribute: "role"
    value: "article"
        
  - attribute: "aria-labelledby"
    value: "{skill-id}-title"
    description: "关联标题元素"
        
  - attribute: "aria-describedby"
    value: "{skill-id}-desc"
    description: "关联描述元素"
        
  - attribute: "aria-label"
    value: "技能: {name}, 类别: {category}, 角色: {role}"
    description: "完整标签，用于屏幕阅读器"
        
  - attribute: "tabindex"
    value: "0"
    description: "使卡片可聚焦"
```

### Focus Visible

```yaml
focus_visible:
  requirement: "必须显示可见的焦点指示器"
  implementation: "box-shadow: var(--ring-focus)"
  wcag_level: "AA"
```

### Color Contrast

```yaml
color_contrast:
  title_vs_background: "WCAG AA (4.5:1)"
  description_vs_background: "WCAG AA (3:1)"
  badge_text_vs_background: "WCAG AA (4.5:1)"
```

---

## 9. Responsive

### Responsive Sizes

```yaml
responsive:
  desktop:
    width: "280px"
    min_height: "160px"
    padding: "var(--space-3)"
    title_font_size: "var(--text-base)"
      
  tablet:
    width: "240px"
    min_height: "140px"
    padding: "var(--space-2)"
    title_font_size: "var(--text-sm)"
    description_max_lines: 2
      
  mobile:
    width: "100%"
    min_height: "120px"
    padding: "var(--space-2)"
    title_font_size: "var(--text-sm)"
    description_max_lines: 2
    layout: "horizontal (可选)"
```

### Responsive Table

| 断点 | 宽度 | 最小高度 | 内边距 | 标题字号 | 描述行数 |
|------|------|----------|--------|----------|----------|
| Desktop | 280px | 160px | 24px | 16px | 3 |
| Tablet | 240px | 140px | 16px | 14px | 2 |
| Mobile | 100% | 120px | 16px | 14px | 2 |

---

## 10. CSS Module Implementation

### SkillCard.module.css

```css
/* SkillCard.module.css */

.skillCard {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-3);
  min-height: 160px;
  cursor: pointer;
  transition: 
    transform var(--duration-normal) var(--ease-spring),
    box-shadow var(--duration-normal) var(--ease-spring),
    border-color var(--duration-normal) var(--ease-spring);
}

.skillCard:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.skillCard:focus-visible {
  outline: none;
  box-shadow: var(--ring-focus);
}

/* MVP 卡片特殊效果 */
.skillCard.mvp:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-lg), var(--glow-accent);
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .skillCard {
    transition: none;
  }
  .skillCard:hover {
    transform: none;
  }
}

/* Header */
.skillHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.skillName {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Badge */
.skillCategory {
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  min-width: 32px;
  text-align: center;
}

.mvp {
  background: var(--color-accent);
  color: white;
  border: none;
}

.m4 {
  background: transparent;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border-subtle);
}

/* Description */
.skillDescription {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-2);
  /* 限制3行 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Footer */
.skillMeta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
}

.skillRole {
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: white;
}

.skillId {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive */
@media (max-width: 1024px) {
  .skillCard {
    padding: var(--space-2);
    min-height: 140px;
  }
  
  .skillName {
    font-size: var(--text-sm);
  }
  
  .skillDescription {
    -webkit-line-clamp: 2;
  }
}

@media (max-width: 768px) {
  .skillCard {
    width: 100%;
    min-height: 120px;
  }
}
```

---

## 11. TSX Implementation

### SkillCard.tsx

```tsx
// SkillCard.tsx
import styles from './SkillCard.module.css';

interface Skill {
  id: string;
  name: string;
  role: string;
  category: 'MVP' | 'M4' | 'Plugin';
  description: string;
  path: string;
}

interface SkillCardProps {
  skill: Skill;
  roleColor: string;
  onClick?: (skill: Skill) => void;
}

// 角色颜色 (400系列 - 更亮)
const ROLE_COLORS_400: Record<string, string> = {
  architect: '#a78bfa',
  developer: '#60a5fa',
  tester: '#4ade80',
  reviewer: '#fbbf24',
  docs: '#22d3ee',
  security: '#f87171',
  common: '#94a3b8',
};

export default function SkillCard({ skill, roleColor, onClick }: SkillCardProps) {
  const isMvp = skill.category === 'MVP';
  
  const cardClassName = [
    styles.skillCard,
    isMvp ? styles.mvp : '',
  ].filter(Boolean).join(' ');
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(skill);
    }
  };
  
  return (
    <article
      className={cardClassName}
      onClick={() => onClick?.(skill)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="article"
      aria-labelledby={`${skill.id}-title`}
      aria-describedby={`${skill.id}-desc`}
      aria-label={`技能: ${skill.name}, 类别: ${skill.category}, 角色: ${skill.role}`}
      style={{ borderColor: roleColor }}  // 保持角色颜色边框
    >
      <div className={styles.skillHeader}>
        <h3 
          id={`${skill.id}-title`}
          className={styles.skillName}
        >
          {skill.name}
        </h3>
        <span className={`${styles.skillCategory} ${isMvp ? styles.mvp : styles.m4}`}>
          {skill.category}
        </span>
      </div>
      
      <p 
        id={`${skill.id}-desc`}
        className={styles.skillDescription}
      >
        {skill.description}
      </p>
      
      <div className={styles.skillMeta}>
        <span 
          className={styles.skillRole}
          style={{ backgroundColor: ROLE_COLORS_400[skill.role] || roleColor }}
        >
          {skill.role}
        </span>
        <span className={styles.skillId}>
          {skill.id}
        </span>
      </div>
    </article>
  );
}
```

---

## 12. Implementation Notes

### 必须遵循

1. **CSS Variables**: 所有颜色、间距、字体使用 `tokens.css` 变量
   ```css
   background: var(--color-surface);
   border-radius: var(--radius-xl);
   ```

2. **Transition 优化**: 只动画化需要变化的属性，禁止 `transition: all`
   ```css
   transition: transform 200ms, box-shadow 200ms, border-color 200ms;
   ```

3. **Focus-Visible**: 使用 `:focus-visible` 伪类，只对键盘聚焦显示 ring
   ```css
   .skillCard:focus-visible {
     box-shadow: var(--ring-focus);
   }
   ```

4. **Reduced Motion**: 支持 `prefers-reduced-motion`
   ```css
   @media (prefers-reduced-motion: reduce) {
     .skillCard {
       transition: none;
     }
     .skillCard:hover {
       transform: none;
     }
   }
   ```

5. **Semantic HTML**: 使用语义化标签
   ```tsx
   <article role="article" aria-labelledby={`${skill.id}-title`}>
     <h3 id={`${skill.id}-title`}>{skill.name}</h3>
     <p id={`${skill.id}-desc`}>{skill.description}</p>
   </article>
   ```

6. **MVP/M4 视觉差异**: 通过 CSS 类名控制
   ```tsx
   <span className={styles.badgeMVP}>MVP</span>  // solid, accent color
   <span className={styles.badgeM4}>M4</span>    // outline, muted
   ```

7. **角色颜色**: 使用 400 系列 (更亮)
   ```css
   --color-role-architect: #a78bfa;  /* Violet-400, not Violet-500 */
   ```

### 禁止

- 禁止 `transition: all`
- 禁止 `as any` 类型断言
- 禁止 `@ts-ignore`
- 禁止硬编码颜色值 (如 `#8b5cf6`)
- 禁止固定 px 值 (如 `padding: 16px`)

---

## 13. Checklists

### Anatomy
- [x] DOM 结构清晰
- [x] 语义化标签 (article, h3, p)
- [x] ARIA 角色

### Variants
- [x] default 变体
- [x] MVP 变体 (accent color, glow)
- [x] M4 变体 (outline, muted)
- [x] featured 变体

### States
- [x] default 状态
- [x] hover 状态
- [x] focus-visible 状态
- [x] active 状态
- [x] disabled 状态

### Accessibility
- [x] 键盘支持 (Tab, Enter, Space)
- [x] ARIA 属性 (role, labelledby, describedby)
- [x] 焦点可见 (focus-visible)
- [x] 颜色对比度 (WCAG AA)

### Responsive
- [x] Desktop 尺寸 (280px)
- [x] Tablet 尺寸 (240px)
- [x] Mobile 尺寸 (100%)

### Animation
- [x] hover_enter 动画 (spring 200ms)
- [x] hover_exit 动画 (ease-out 150ms)
- [x] reduced-motion 支持
# Editorial Design Standard

本项目所有前端界面的设计规范 - **Editorial/Magazine + Japanese Minimal** 风格。

---

## 1. Design Philosophy

### Aesthetic Direction

**Editorial Magazine + Japanese Minimal Design**

- 大胆的字号层级（Bold typography hierarchy）
- 不对称布局（Asymmetric layout）
- 时间线叙事（Timeline narrative）
- 装饰性元素（Decorative elements: lines, borders, numbers）
- 极致的留白（Generous whitespace）

### Key Principles

1. **Typography First** - 字号层级是视觉焦点
2. **Gold Accent** - 金色是唯一强调色
3. **No Purple Gradients** - 禁止紫色渐变背景
4. **Editorial Elements** - 大编号、装饰线、英文标签
5. **Whitespace Generous** - 留白充足，避免拥挤

---

## 2. Color Palette

### Primary Colors

```css
:root {
  /* Primary */
  --editorial-ink: #0f0f0f;      /* 主墨色 - 标题、编号 */
  --editorial-gold: #c9a227;     /* 金色强调 - 唯一强调色 */
  
  /* Neutrals */
  --editorial-cream: #faf9f6;    /* 米白背景 */
  --editorial-paper: #f5f4f0;    /* 纸色 */
  --editorial-stone: #e8e6e1;    /* 石灰 */
  
  /* Text */
  --editorial-text: #1a1a1a;     /* 正文 */
  --editorial-muted: #6b6b6b;    /* 淡化文字 */
}
```

### Usage Rules

| 元素 | 颜色 | 用途 |
|------|------|------|
| Hero 标题 | `#0f0f0f` | 大标题、编号 |
| 金色强调 | `#c9a227` | 装饰线、编号、标签 |
| 正文 | `#1a1a1a` | 文字内容 |
| 淡化文字 | `#6b6b6b` | 辅助信息、统计 |
| 背景 | `#faf9f6` | 页面背景 |

### Forbidden Colors

- ❌ 紫色渐变 (`purple-gradient`)
- ❌ 多彩渐变 (`rainbow-gradient`)
- ❌ 过度饱和的颜色

---

## 3. Typography

### Font Families

| 用途 | 字体 | Google Fonts |
|------|------|--------------|
| **Display 标题** | Playfair Display | `Playfair Display:wght@400;700;900` |
| **正文** | Source Sans 3 | `Source Sans+3:wght@300;400;600` |
| **代码/ID** | JetBrains Mono | `JetBrains+Mono:wght@400;500` |

### Font Loading

```html
<!-- index.html -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
```

### Typography Scale

```css
/* Hero Title */
.editorial-hero {
  font-family: 'Playfair Display', serif;
  font-size: 72px - 120px;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 0.9;
}

/* Section Title */
.editorial-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Large Number */
.editorial-number {
  font-family: 'Playfair Display', serif;
  font-size: 72px;
  font-weight: 900;
  color: #c9a227;
}

/* Body Text */
.editorial-body {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 16px - 18px;
  font-weight: 400;
  line-height: 1.6;
}

/* Label */
.editorial-label {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Mono */
.editorial-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px - 14px;
}
```

---

## 4. Design Elements

### Required Elements (至少 3 项)

所有新界面必须包含以下元素：

#### 1. Large Numbers (大编号)

```css
/* 使用方式 */
.number {
  font-family: 'Playfair Display', serif;
  font-size: 72px;
  font-weight: 900;
  color: #c9a227;  /* 或 #0f0f0f */
}
```

示例：`01`, `02`, `03`, `04`

#### 2. Decorative Lines (装饰线)

```css
/* Single Line */
.line {
  height: 2px;
  background: #c9a227;
  width: 100%;
}

/* Double Line */
.line-double {
  border-top: 3px double #c9a227;
}

/* Vertical Line */
.line-vertical {
  width: 2px;
  background: #c9a227;
  height: 100%;
}
```

#### 3. English Labels (英文标签)

```css
.label {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6b6b6b;
}
```

示例：`DESIGN`, `CODE`, `TEST`, `REVIEW`, `SECURITY`, `DOCS`

#### 4. Quote Block (引用块)

```css
.quote {
  border-left: 4px solid #c9a227;
  padding-left: 24px;
  font-style: italic;
  color: #1a1a1a;
}
```

#### 5. Timeline (时间线)

**Vertical Timeline:**
```css
.timeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-connector {
  width: 2px;
  height: 24px;
  background: #c9a227;
}

.timeline-arrow {
  color: #c9a227;
  font-size: 20px;
}
```

**Horizontal Timeline:**
```css
.workflow-step {
  display: flex;
  align-items: center;
  gap: 8px;
}

.workflow-arrow {
  color: #c9a227;
}
```

#### 6. Stats Decoration (统计装饰)

```css
.stats {
  display: flex;
  gap: 24px;
  font-size: 14px;
}

.stat-label {
  font-weight: 600;
  text-transform: uppercase;
  color: #6b6b6b;
}

.stat-value {
  font-weight: 700;
  color: #0f0f0f;
}
```

示例：`TIME: 2-3 hours`, `SAVED: 40%`, `SKILLS: 6`

---

## 5. Layout Patterns

### Hero Section

```css
.hero {
  padding: 64px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-title {
  font-size: 72px;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 18px;
  color: #6b6b6b;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

### Card Layout

```css
.card {
  display: flex;
  gap: 32px;
  padding: 32px;
  border: 1px solid #e8e6e1;
}

.card-number-section {
  flex-shrink: 0;
  width: 120px;
}

.card-content-section {
  flex-grow: 1;
}
```

### Timeline Layout

```css
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-step {
  position: relative;
  padding: 16px 0;
}

.timeline-connector {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

---

## 6. Spacing

### Spacing Scale

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 32px;
  --space-xl: 64px;
  --space-2xl: 96px;
}
```

### Minimum Requirements

- **页面 padding**: ≥ `--space-xl` (64px)
- **卡片 padding**: ≥ `--space-lg` (32px)
- **元素间距**: ≥ `--space-md` (16px)

---

## 7. Animation

### Entrance Animation

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.6s ease-out;
  animation-delay: calc(var(--index) * 0.1s);
}
```

### Hover States

```css
.interactive:hover {
  border-color: #c9a227;
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
```

### Click Feedback

```css
.interactive:active {
  transform: translateY(0);
}
```

---

## 8. Accessibility

### Color Contrast

- 标题 (#0f0f0f) on 背景 (#faf9f6): ✓ 15.3:1
- 正文 (#1a1a1a) on 背景 (#faf9f6): ✓ 14.5:1
- 金色 (#c9a227) on 背景 (#faf9f6): ⚠ 3.2:1 (仅用于装饰，非关键信息)

### Font Size

- 最小字号: 16px (正文)
- 最小交互元素字号: 14px (标签)

### Focus States

```css
:focus-visible {
  outline: 2px solid #c9a227;
  outline-offset: 2px;
}
```

---

## 9. Dark Mode

### Dark Mode Colors

```css
[data-theme="dark"] {
  --editorial-ink: #ffffff;
  --editorial-gold: #c9a227;
  --editorial-cream: #0f0f0f;
  --editorial-paper: #1a1a1a;
  --editorial-stone: #2a2a2a;
  --editorial-text: #faf9f6;
  --editorial-muted: #8b8b8b;
}
```

### Dark Mode Rules

- 保持金色强调色不变
- 增加对比度
- 确保文字可读性

---

## 10. Implementation Checklist

### Before Implementation

- [ ] 设计稿已创建 (`specs/<feature>/design.md`)
- [ ] 设计稿已评审确认
- [ ] 字体已加载
- [ ] CSS 变量已配置

### Design Review Checklist

- [ ] 使用 Playfair Display 作为 Display 字体
- [ ] 使用 Source Sans 3 作为 Body 字体
- [ ] 金色 (#c9a227) 作为唯一强调色
- [ ] 无紫色渐变背景
- [ ] 包含大编号（01-XX）
- [ ] 包含装饰线元素
- [ ] 英文标签全大写
- [ ] 留白充足（padding ≥ 32px）
- [ ] 深色模式兼容

### After Implementation

- [ ] 字体正确加载
- [ ] 颜色正确显示
- [ ] 响应式布局正常
- [ ] 深色模式正常
- [ ] 无障碍合规

---

## 11. Reference Implementations

### CasesPage

- Hero: "CASE STUDIES" 分行标题 + "4 CASES" 统计
- CaseCard: 左侧 01-04 编号 + 英文类别标签 + WORKFLOW 流程

### TutorialExampleSlide

- Header: "━EXAMPLE━" 装饰标题
- Timeline: 垂直时间线 + 01-06 步骤编号
- StepCard: 英文标签 (DESIGN REQUIREMENT) + 角色 + 中文描述

---

## 12. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-08 | Initial standard based on 015-editorial-redesign |

---

## References

- `AGENTS.md` - Frontend Development Rules
- `specs/015-editorial-redesign/design.md` - Design Document
- `specs/015-editorial-redesign/spec.md` - Feature Specification
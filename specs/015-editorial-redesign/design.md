# Editorial/Magazine Style Redesign - Design Document

## Design Philosophy

### Aesthetic Direction
**Editorial Magazine + Japanese Minimal Design**

- 大胆的字号层级
- 不对称布局
- 时间线叙事
- 装饰性元素（竖线、边框、编号）
- 极致的留白

### Color Palette

```css
:root {
  /* Primary */
  --editorial-ink: #0f0f0f;
  --editorial-gold: #c9a227;
  
  /* Neutrals */
  --editorial-cream: #faf9f6;
  --editorial-paper: #f5f4f0;
  --editorial-stone: #e8e6e1;
  
  /* Text */
  --editorial-text: #1a1a1a;
  --editorial-muted: #6b6b6b;
  
  /* Accents */
  --editorial-accent-1: #2563eb;  /* Electric Blue */
  --editorial-accent-2: #dc2626;  /* Crimson */
  --editorial-accent-3: #059669;  /* Emerald */
}
```

### Typography

```
Display Font (Headlines):
  - Ultra bold, condensed
  - 72px - 120px for hero
  - Letter-spacing: -0.02em

Body Font:
  - Clean sans-serif
  - 16px - 18px base
  - Line-height: 1.6

Mono Font (Technical):
  - For skill IDs, code
  - 13px - 14px
```

---

## Page 1: CasesPage - Editorial Redesign

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                                  │
│  CASE                                                            │
│  STUDIES                                    ○ 4 CASES           │
│                                                                  │
│  真实项目案例                               [Auth] [Data]        │
│                                            [API] [Optim]        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                                                              ││
│  │  01 ──────────────────────────────────────────────────────  ││
│  │                                                              ││
│  │  USER AUTHENTICATION                                        ││
│  │  ─────────────────                                          ││
│  │                                                              ││
│  │  你的网站需要添加用户登录功能，                             ││
│  │  支持邮箱和手机号登录。                                     ││
│  │                                                              ││
│  │  ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐     ││
│  │  │ 01     │───→│ 02     │───→│ 03     │───→│ 04     │     ││
│  │  │ DESIGN │    │ CODE   │    │ TEST   │    │ REVIEW │     ││
│  │  │        │    │        │    │        │    │        │     ││
│  │  │ 需求   │    │ 实现   │    │ 测试   │    │ 审查   │     ││
│  │  └────────┘    └────────┘    └────────┘    └────────┘     ││
│  │       │             │             │             │           ││
│  │       ↓             ↓             ↓             ↓           ││
│  │  ┌────────┐    ┌────────┐    ┌────────┐                    ││
│  │  │ 05     │───→│ 06     │───→│ DONE   │                    ││
│  │  │ SECURE │    │ DOCS   │    │ ✓      │                    ││
│  │  └────────┘    └────────┘    └────────┘                    ││
│  │                                                              ││
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ││
│  │                                                              ││
│  │  TIME  2-3 hours    SAVED  40%    SKILLS  6                 ││
│  │                                                              ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  02 ──────────────────────────────────────────────────────  ││
│  │  E-COMMERCE ORDER SYSTEM                                    ││
│  │  ...                                                         ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Key Design Elements

#### Hero Section
- 巨大的 "CASE STUDIES" 标题 (120px)
- 金色装饰横线
- 极简的副标题
- 分类标签使用 pill 样式，而非按钮

#### Case Card
- 左侧大编号 (01, 02, 03, 04)
- 英文标题全大写，金色下划线
- 中文描述使用引号样式
- 时间线使用横向连接线
- 底部统计用横线分隔

#### Skill Flow
- 方块设计，像杂志的步骤图
- 连接线使用细实线
- 箭头使用 → 符号
- 完成标记使用 ✓

#### Typography Hierarchy
```
编号:     120px, ultra bold, #0f0f0f
标题:     32px, bold, uppercase
副标题:   18px, normal
描述:     16px, light, italic
步骤:     14px, medium
统计:     14px, medium, muted
```

---

## Page 2: TutorialExampleSlide - Editorial Redesign

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                                  │
│  EXAMPLE                                                         │
│  ═══════                                                         │
│                                                                  │
│  用户登录系统                                                    │
│  User Authentication System                                      │
│                                                                  │
│  "你的网站需要添加用户登录功能，                                 │
│   支持邮箱和手机号登录"                                          │
│                                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                                  │
│  WORKFLOW                                                        │
│  ────────                                                        │
│                                                                  │
│      ┌──────────┐                                                │
│      │    01    │  REQUIREMENT                                   │
│      │   ────   │  ────────────                                  │
│      │  DESIGN  │  architect                                     │
│      └────┬─────┘  设计方案                                      │
│           │                                                      │
│           ▼                                                      │
│      ┌──────────┐                                                │
│      │    02    │  DEVELOPMENT                                   │
│      │   ────   │  ────────────                                  │
│      │  CODE    │  developer                                     │
│      └────┬─────┘  实现代码                                      │
│           │                                                      │
│           ▼                                                      │
│      ┌──────────┐                                                │
│      │    03    │  TESTING                                       │
│      │   ────   │  ────────────                                  │
│      │  TEST    │  tester                                        │
│      └────┬─────┘  编写测试                                      │
│           │                                                      │
│           ▼                                                      │
│      ┌──────────┐                                                │
│      │    04    │  CODE REVIEW                                   │
│      │   ────   │  ────────────                                  │
│      │ REVIEW   │  reviewer                                      │
│      └────┬─────┘  检查代码                                      │
│           │                                                      │
│           ▼                                                      │
│      ┌──────────┐                                                │
│      │    05    │  SECURITY                                      │
│      │   ────   │  ────────────                                  │
│      │ AUDIT    │  security                                      │
│      └────┬─────┘  安全审计                                      │
│           │                                                      │
│           ▼                                                      │
│      ┌──────────┐                                                │
│      │    06    │  DOCUMENTATION                                 │
│      │   ────   │  ────────────                                  │
│      │  DOCS    │  docs                                          │
│      └──────────┘  编写文档                                      │
│                                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                                  │
│  💡 点击任意步骤查看详情                                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Key Design Elements

#### Header
- "EXAMPLE" 大标题，金色双横线装饰
- 中英文标题分层显示
- 引用块样式显示描述

#### Vertical Timeline
- 垂直时间线，从上到下
- 每个步骤是一个卡片
- 大编号在卡片内
- 英文标题 + 中文描述
- 角色用小标签显示

#### Step Card Design
```
┌──────────┐
│    01    │  ← 大编号，金色
│   ────   │  ← 分隔线
│  DESIGN  │  ← 英文关键词
└──────────┘

下方：
REQUIREMENT     ← 英文标题，大写
────────────    ← 金色下划线
architect       ← 角色
设计方案        ← 中文描述
```

#### Connection
- 垂直连接线
- 箭头使用 ▼ 符号
- 细线条，不抢视觉焦点

---

## Implementation Details

### CSS Variables

```css
:root {
  /* Editorial Colors */
  --ink: #0f0f0f;
  --gold: #c9a227;
  --cream: #faf9f6;
  --paper: #f5f4f0;
  --stone: #e8e6e1;
  --text: #1a1a1a;
  --muted: #6b6b6b;
  
  /* Editorial Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 32px;
  --space-xl: 64px;
  --space-2xl: 96px;
  
  /* Editorial Typography */
  --font-display: 'Playfair Display', serif;
  --font-body: 'Source Sans Pro', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Typography Scale

```css
.editorial-hero {
  font-family: var(--font-display);
  font-size: 120px;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 0.9;
}

.editorial-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.editorial-number {
  font-family: var(--font-display);
  font-size: 72px;
  font-weight: 900;
  color: var(--gold);
}
```

### Decorative Elements

```css
/* Gold Line */
.editorial-line {
  height: 2px;
  background: var(--gold);
  width: 100%;
}

/* Double Line */
.editorial-line-double {
  border-top: 3px double var(--gold);
}

/* Quote Block */
.editorial-quote {
  border-left: 4px solid var(--gold);
  padding-left: var(--space-lg);
  font-style: italic;
}

/* Number Badge */
.editorial-number-badge {
  font-size: 14px;
  font-weight: 700;
  padding: 4px 12px;
  background: var(--gold);
  color: var(--ink);
}
```

---

## Animation & Interaction

### Page Load
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

.case-card {
  animation: fadeInUp 0.6s ease-out;
  animation-delay: calc(var(--index) * 0.1s);
}
```

### Hover States
```css
.step-card:hover {
  border-color: var(--gold);
  transform: translateX(8px);
  transition: all 0.3s ease;
}
```

### Click Feedback
```css
.step-card:active {
  transform: translateX(4px);
}
```

---

## File Changes

### Files to Update

1. `src/pages/CasesPage.tsx` - Update structure
2. `src/pages/CasesPage.module.css` - New editorial styles
3. `src/components/cases/CaseCard.tsx` - New card layout
4. `src/components/cases/CaseCard.module.css` - New card styles
5. `src/components/tutorial/TutorialExampleSlide.tsx` - New timeline layout
6. `src/components/tutorial/TutorialExampleSlide.module.css` - New timeline styles

### New Dependencies

```html
<!-- Add to index.html -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Sans+Pro:wght@300;400;600&display=swap" rel="stylesheet">
```

---

## Design Checklist

- [x] Bold typography hierarchy
- [x] Gold accent color (no purple gradients)
- [x] Decorative lines and borders
- [x] Large number badges
- [x] Quote block styling
- [x] Vertical timeline design
- [x] Magazine-style layout
- [x] Hover animations
- [x] Click feedback
- [ ] Implementation
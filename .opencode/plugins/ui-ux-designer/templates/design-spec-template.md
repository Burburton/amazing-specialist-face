# Design Spec Template

## Project Information

- **Project Name**: [项目名称]
- **Version**: 1.0.0
- **Date**: [日期]
- **Designer**: [设计师]

---

## 1. Executive Summary

[一句话描述设计目标]

---

## 2. User Analysis

### 2.1 User Personas

| Persona | Goals | Pain Points |
|---------|-------|--------------|
| [用户类型1] | [目标] | [痛点] |
| [用户类型2] | [目标] | [痛点] |

### 2.2 Core Tasks

1. [任务1]
2. [任务2]
3. [任务3]

### 2.3 Key Scenarios

- **Scenario 1**: [场景描述]
- **Scenario 2**: [场景描述]
- **Scenario 3**: [场景描述]

---

## 3. Information Architecture

### 3.1 Site Map

```
[站点地图 ASCII 图]
```

### 3.2 Page Inventory

| Page | Purpose | Key Content |
|------|---------|-------------|
| [页面1] | [目的] | [内容] |
| [页面2] | [目的] | [内容] |

---

## 4. Design Direction

### 4.1 Style Keywords

- **风格**: [Technical / Minimal / Playful]
- **基调**: [Professional / Friendly / Premium]
- **氛围**: [Modern / Classic / Industrial]

### 4.2 Design References

| Reference | What to Learn |
|-----------|---------------|
| [Linear](https://linear.app) | 暗色模式、简洁界面 |
| [Vercel](https://vercel.com) | 等宽字体点缀、开发者工具风格 |
| [Stripe](https://stripe.com) | 清晰层次、代码展示 |

---

## 5. Visual Design System

### 5.1 Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Violet | `#8b5cf6` | 品牌主色、CTA |
| Accent | Emerald | `#10b981` | 强调、成功状态 |
| Background | Near Black | `#09090b` | 页面背景 |
| Surface | Zinc 900 | `#18181b` | 卡片背景 |
| Text Primary | Zinc 50 | `#fafafa` | 主要文字 |
| Text Secondary | Zinc 400 | `#a1a1aa` | 次要文字 |

### 5.2 Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display | Space Grotesk | Bold | 30-48px |
| Heading | Space Grotesk | Semibold | 20-30px |
| Body | Inter | Regular | 14-16px |
| Code | JetBrains Mono | Regular | 12-14px |

### 5.3 Spacing

- **Grid**: 8pt
- **Section Gap**: 64px
- **Element Gap**: 16px
- **Content Padding**: 24px

### 5.4 Border Radius

| Size | Value | Usage |
|------|-------|-------|
| sm | 6px | Tags, badges |
| md | 8px | Buttons, inputs |
| lg | 12px | Cards |
| xl | 16px | Modals, large cards |

---

## 6. Component Inventory

| Component | Variant | Location |
|-----------|---------|----------|
| Button | primary, secondary, ghost | Global |
| Card | default, featured, compact | List pages |
| Badge | MVP, M4, Plugin | Cards |
| Tag | role, category | Cards, filters |

---

## 7. Responsive Breakpoints

| Breakpoint | Width | Columns |
|------------|-------|---------|
| Mobile | < 640px | 1 |
| Tablet | 640-1024px | 2-3 |
| Desktop | > 1024px | 4+ |

---

## 8. Accessibility Requirements

- [ ] WCAG AA contrast (4.5:1)
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] Screen reader support
- [ ] Reduced motion support

---

## 9. Deliverables

- [ ] Wireframes (all pages)
- [ ] Component specs (all components)
- [ ] Design tokens (CSS variables)
- [ ] Style guide
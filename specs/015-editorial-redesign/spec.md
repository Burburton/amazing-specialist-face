# Feature: Editorial/Magazine Style Redesign

## Metadata
```yaml
feature_id: 015-editorial-redesign
status: draft
created: 2026-04-07
author: architect
design: specs/015-editorial-redesign/design.md
```

## 1. Problem Statement

### Current State

现有 CasesPage 和 TutorialExampleSlide 设计：
- 复用了 TutorialExampleSlide 的流程卡片模式
- 使用了常见的紫色渐变配色
- 标准的卡片网格布局
- 缺乏独特的视觉语言

### User Impact

1. **缺乏记忆点** - 界面与其他 AI 生成页面相似
2. **视觉层次弱** - 信息层级不够清晰
3. **专业感不足** - 没有传达专家包的专业性

---

## 2. Goal

### Primary Goal

重新设计 CasesPage 和 TutorialExampleSlide，使用大胆的杂志编辑风格。

### Success Criteria

1. **独特的视觉语言** - 金色装饰、大编号、时间线
2. **极端的字号层级** - 120px 标题 vs 14px 正文
3. **杂志感布局** - 不对称、留白、装饰线
4. **统一的风格** - 两个页面风格一致

---

## 3. Design Specifications

### 3.1 Color Palette

```css
--editorial-ink: #0f0f0f;      /* 主色：墨黑 */
--editorial-gold: #c9a227;      /* 强调：金黄 */
--editorial-cream: #faf9f6;     /* 背景：米白 */
--editorial-paper: #f5f4f0;     /* 卡片背景 */
--editorial-text: #1a1a1a;      /* 文字：纯黑 */
--editorial-muted: #6b6b6b;     /* 灰色文字 */
```

### 3.2 Typography

```
Display Font: Playfair Display (serif)
Body Font: Source Sans Pro (sans-serif)
Mono Font: JetBrains Mono

字号层级:
- 编号: 72px, bold, gold
- 标题: 32px, bold, uppercase
- 正文: 16px, normal
- 步骤: 14px, medium
```

### 3.3 Layout Patterns

#### CasesPage
- Hero: 大标题 + 金色横线
- 分类: Pill 标签
- CaseCard: 左侧大编号 + 英文标题 + 时间线
- 统计: 底部横线分隔

#### TutorialExampleSlide
- Header: EXAMPLE + 双横线装饰
- 时间线: 垂直布局，卡片式步骤
- 步骤卡片: 编号 + 英文关键词 + 角色标签

---

## 4. Acceptance Criteria

### AC-001: CasesPage Redesign
- [ ] Hero section with 120px title
- [ ] Gold decorative lines
- [ ] CaseCard with left-aligned large number
- [ ] Horizontal skill flow
- [ ] Quote block styling

### AC-002: TutorialExampleSlide Redesign
- [ ] Vertical timeline layout
- [ ] Step cards with numbers
- [ ] English keywords + Chinese descriptions
- [ ] Gold accent color
- [ ] Quote block for description

### AC-003: Typography
- [ ] Playfair Display font loaded
- [ ] Source Sans Pro font loaded
- [ ] Extreme size contrast
- [ ] Uppercase English titles

### AC-004: Visual Consistency
- [ ] Same color palette across pages
- [ ] Same decorative elements
- [ ] Same hover animations

### AC-005: Build Verification
- [ ] `npm run build` passes
- [ ] Fonts load correctly
- [ ] Responsive design works

---

## 5. Implementation Plan

### Phase 1: Typography Setup
1. Add Google Fonts to index.html
2. Update CSS variables

### Phase 2: CasesPage Redesign
1. Update CasesPage.module.css
2. Update CaseCard.tsx layout
3. Update CaseCard.module.css

### Phase 3: TutorialExampleSlide Redesign
1. Update TutorialExampleSlide.tsx layout
2. Update TutorialExampleSlide.module.css

### Phase 4: Polish
1. Responsive adjustments
2. Animation testing
3. Build and deploy

---

## 6. Files to Update

```
src/
├── pages/
│   ├── CasesPage.module.css      ← Redesign
│   └── CasesPage.tsx             ← Minor updates
├── components/
│   ├── cases/
│   │   ├── CaseCard.tsx          ← New layout
│   │   └── CaseCard.module.css   ← Redesign
│   └── tutorial/
│       ├── TutorialExampleSlide.tsx     ← New layout
│       └── TutorialExampleSlide.module.css ← Redesign
└── index.html                    ← Add Google Fonts
```
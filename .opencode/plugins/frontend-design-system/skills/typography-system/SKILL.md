# Skill: typography-system

## Metadata
```yaml
plugin_id: frontend-design-system
plugin_version: 1.0.0
core_compatibility: >=1.7.0
```

## Purpose

建立排版层次系统，确保字体、字号、行高一致。

解决的核心问题：
- Inter 字体万能使用
- line-height 1.5 一把梭
- 无排版层次

## When to Use

**必须使用时：**
- 设计系统初始化
- 品牌字体定义
- 排版层次建立

**推荐使用时：**
- 响应式字体调整
- 多语言支持

## When Not to Use

**不适用场景：**
- 无文字的纯图形界面
- 使用第三方主题的项目

## Implementation Process

### Step 1: 定义字体栈

```css
:root {
  --font-sans: "Inter", -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --font-display: "Cal Sans", var(--font-sans);
}
```

### Step 2: 定义字号层次

```css
:root {
  --text-display: 3rem;    /* 48px */
  --text-h1: 2.25rem;      /* 36px */
  --text-h2: 1.875rem;     /* 30px */
  --text-h3: 1.5rem;       /* 24px */
  --text-body: 1rem;       /* 16px */
  --text-caption: 0.75rem; /* 12px */
}
```

### Step 3: 层级化行高

```css
:root {
  /* 标题紧凑 */
  --leading-display: 1.1;
  --leading-h1: 1.2;
  
  /* 正文宽松 */
  --leading-body: 1.6;
}
```

## Output Requirements

```yaml
typography_summary:
  status: success | partial | failed
  
  font_families:
    sans: string
    mono: string
    display: string | null
    
  type_scale:
    levels: number  # 至少 4 级
    sizes: [string]
    
  line_heights:
    heading: number  # 1.1-1.3
    body: number     # 1.5-1.7
    
  integration:
    tailwind_extended: boolean
    css_classes_created: boolean
```

## Checklists

- [ ] 至少 4 级字号层次
- [ ] 行高随字号变化
- [ ] 不使用万能 line-height: 1.5

## Common Failure Modes

| 失败模式 | 处理建议 |
|----------|----------|
| Inter 万能 | 添加展示字体 |
| 行高单一 | 层级化行高 |
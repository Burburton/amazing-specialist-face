# Skill: spacing-grid-system

## Metadata
```yaml
plugin_id: frontend-design-system
plugin_version: 1.0.0
core_compatibility: >=1.7.0
```

## Purpose

建立 8pt 网格间距系统，确保界面间距一致。

解决的核心问题：
- 间距随意
- 无视觉节奏
- 硬编码间距值

## When to Use

**必须使用时：**
- 设计系统初始化
- 组件间距规范
- 布局间距定义

**推荐使用时：**
- 响应式间距调整
- 密集/宽松模式切换

## When Not to Use

**不适用场景：**
- 使用第三方设计系统的项目
- 已有间距规范的项目

## Implementation Process

### Step 1: 定义基础间距

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
}
```

### Step 2: 语义化映射

```css
:root {
  --padding-sm: var(--space-2);
  --padding-md: var(--space-4);
  --gap-sm: var(--space-2);
  --section-gap: var(--space-6);
}
```

## 使用规则

```css
/* ❌ 禁止 */
padding: 15px;

/* ✅ 正确 */
padding: var(--padding-md);
```

## Output Requirements

```yaml
spacing_summary:
  status: success | partial | failed
  
  base_unit: 8px
  
  standard_values:
    - 4px
    - 8px
    - 12px
    - 16px
    - 24px
    - 32px
    - 48px
    - 64px
    
  semantic_mappings:
    padding: [xs, sm, md, lg, xl]
    gap: [xs, sm, md, lg, xl]
    
  integration:
    tailwind_extended: boolean
```

## Checklists

- [ ] 基于 8pt 网格
- [ ] 无硬编码间距
- [ ] 区块间距 > 元素间距

## Common Failure Modes

| 失败模式 | 处理建议 |
|----------|----------|
| 随意间距 | 强制使用变量 |
| 无语义命名 | 使用场景命名 |
# Skill: design-tokens-setup

## Metadata
```yaml
plugin_id: frontend-design-system
plugin_version: 1.0.0
core_compatibility: >=1.7.0
```

## Purpose

建立设计令牌系统，确保颜色、间距、排版、阴影等设计决策一致且可维护。

解决的核心问题：
- AI 默认使用 Blue-500/Indigo-600
- 颜色硬编码，难以维护
- 间距随意，缺乏系统
- 无暗色模式支持

## When to Use

**必须使用时：**
- 新项目初始化阶段
- 建立设计系统基础
- 现有项目设计规范化

**推荐使用时：**
- 品牌颜色更新
- 添加深色模式支持
- 设计系统文档化

## When Not to Use

**不适用场景：**
- 纯后端项目
- 无 UI 的 CLI 工具
- 已有成熟设计系统的项目

## Implementation Process

### Step 1: 定义颜色令牌

创建 `src/styles/tokens/colors.css`：

```css
:root {
  /* Brand Colors - 非 Blue-500 默认 */
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-primary-pressed: #4338ca;
  
  /* Semantic Colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Surface Colors - 暖色调中性色 */
  --color-background: #fafafa;
  --color-surface: #ffffff;
  --color-surface-elevated: #ffffff;
  
  /* Text Colors - WCAG AA 合规 */
  --color-text-primary: #18181b;
  --color-text-secondary: #71717a;
  --color-text-muted: #a1a1aa;
  
  /* Border Colors */
  --color-border: #e4e4e7;
  --color-border-focus: #6366f1;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0a0a0a;
    --color-surface: #18181b;
    --color-surface-elevated: #27272a;
    --color-text-primary: #fafafa;
    --color-text-secondary: #a1a1aa;
    --color-border: #3f3f46;
  }
}
```

### Step 2: 定义间距令牌

创建 `src/styles/tokens/spacing.css`：

```css
:root {
  /* 8pt 网格 */
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}
```

### Step 3: 定义阴影令牌

创建 `src/styles/tokens/shadows.css`：

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  --ring-focus: 0 0 0 2px var(--color-background), 0 0 0 4px var(--color-primary);
}
```

### Step 4: Tailwind 集成

更新 `tailwind.config.ts`：

```typescript
const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        // ...
      },
    },
  },
};
```

## Output Requirements

```yaml
tokens_summary:
  status: success | partial | failed
  
  files_created:
    - path: src/styles/tokens/colors.css
    - path: src/styles/tokens/spacing.css
    - path: src/styles/tokens/shadows.css
      
  validation:
    contrast_ratio_check: pass | fail
    spacing_consistency: pass | fail
```

## Checklists

### 创建前
- [ ] 确定品牌主色（非 Blue-500）
- [ ] 确定是否需要深色模式
- [ ] 确定字体选择

### 创建后验证
- [ ] 所有颜色对比度 >= 4.5:1
- [ ] 间距令牌遵循 8pt 网格
- [ ] Tailwind 配置已扩展

## Common Failure Modes

| 失败模式 | 表现 | 处理建议 |
|----------|------|----------|
| 颜色对比度不足 | 文字难以辨认 | 使用对比度检查工具 |
| 硬编码颜色 | 维护困难 | 强制使用 CSS 变量 |
| 忘记深色模式 | 可访问性问题 | 添加 dark mode 变体 |
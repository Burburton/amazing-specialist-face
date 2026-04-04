# Skill: shadcn-integration

## Metadata
```yaml
plugin_id: frontend-design-system
plugin_version: 1.0.0
core_compatibility: >=1.7.0
```

## Purpose

指导正确集成 shadcn/ui 组件库，包括 2026 年新特性。

解决的核心问题：
- 未修改默认样式（AI 风格）
- 组件无品牌定制
- 不了解 Base UI 原语选项

## When to Use

**必须使用时：**
- 新建 React + TypeScript 项目
- 集成 shadcn/ui 组件库
- 定制组件主题

## When Not to Use

**不适用场景：**
- 非 React 项目
- 使用其他 UI 库

## Implementation Process

### Step 1: 初始化

```bash
# 2026 推荐：使用 Base UI 原语
npx shadcn@latest init --base-ui
```

### Step 2: 使用 Visual Builder

访问 https://ui.shadcn.com/builder 可视化配置组件。

### Step 3: 添加组件

```bash
npx shadcn@latest add button dialog dropdown-menu
```

### Step 4: 定制组件

```typescript
// ❌ AI 默认
const buttonVariants = cva("rounded-md font-medium");

// ✅ 品牌定制
const buttonVariants = cva("rounded-lg font-semibold transition-all duration-200", {
  variants: {
    variant: {
      default: "hover:shadow-md active:scale-[0.98]",
    },
  },
});
```

## Checklists

- [ ] 已安装 shadcn/ui
- [ ] 样式已定制（非默认）
- [ ] 设计令牌已集成
- [ ] 所有组件有 Hover/Focus 状态

## Output Requirements

```yaml
shadcn_integration_report:
  status: success | partial | failed
  
  components_added:
    - name: string
      customized: boolean
      
  theme_config:
    css_variables: boolean
    dark_mode: boolean
    
  integration:
    design_tokens_used: boolean
```

## Common Failure Modes

| 失败模式 | 处理建议 |
|----------|----------|
| 使用默认样式 | 定制圆角、字重、阴影 |
| 忘记定制 | 建立组件规范文档 |
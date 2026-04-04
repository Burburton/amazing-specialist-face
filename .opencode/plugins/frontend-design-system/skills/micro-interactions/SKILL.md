# Skill: micro-interactions

## Metadata
```yaml
plugin_id: frontend-design-system
plugin_version: 1.0.0
core_compatibility: >=1.7.0
```

## Purpose

为界面添加微交互，让设计感觉"活"起来。

解决的核心问题：
- AI 生成界面静态死板
- transition-all 滥用
- 无交互反馈
- 忽略 prefers-reduced-motion

## When to Use

**必须使用时：**
- 交互组件开发
- 用户反馈设计
- 动画效果实现

**推荐使用时：**
- 页面过渡
- 列表动画
- 表单反馈

## When Not to Use

**不适用场景：**
- 静态展示页面
- 需要减少动画的场景（无障碍）
- 性能敏感的列表渲染

## Implementation Process

### Step 1: 定义动画曲线

```typescript
// src/lib/animations.ts
export const curves = {
  snappy: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
  bouncy: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
  gentle: 'cubic-bezier(0.23, 1, 0.32, 1)',
  anticipate: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
};

export const durations = {
  instant: 100,
  fast: 150,
  base: 200,
  moderate: 300,
  slow: 500,
};

export const springs = {
  snappy: { stiffness: 400, damping: 30 },
  gentle: { stiffness: 200, damping: 20 },
  bouncy: { stiffness: 300, damping: 10 },
};
```

### Step 2: Hover 状态

```css
.button {
  transition: transform 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46),
              box-shadow 0.2s ease-out;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.button:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}
```

### Step 3: Focus 状态

```css
.button:focus-visible {
  outline: none;
  box-shadow: var(--ring-focus);
}
```

### Step 4: Loading 状态

```tsx
import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
}
```

### Step 5: prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Duration Guidelines

| Property | Duration |
|----------|----------|
| Color/opacity | 150-300ms |
| Transform | 200-400ms |
| Position | 300-500ms |
| Page transitions | 300-500ms |

## Output Requirements

每个交互组件必须包含：
- Default 状态
- Hover 状态
- Focus 状态
- Active/Pressed 状态
- Disabled 状态
- Loading 状态（如适用）

## Checklists

### 动画设计
- [ ] 使用语义化曲线名
- [ ] 动画时长 < 300ms
- [ ] 不使用 `transition-all`

### 可访问性
- [ ] 支持 prefers-reduced-motion
- [ ] Focus-visible 样式
- [ ] 动画不影响可读性

## Common Failure Modes

| 失败模式 | 表现 | 处理建议 |
|----------|------|----------|
| transition-all 滥用 | 性能差 | 指定具体属性 |
| 动画过长 | 用户焦虑 | 控制在 300ms 内 |
| 忽略无障碍 | 部分用户不适 | 添加 reduced-motion |
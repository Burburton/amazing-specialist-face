# Skill: design-state-coverage

## Metadata
```yaml
plugin_id: frontend-design-system
plugin_version: 1.0.0
core_compatibility: >=1.7.0
```

## Purpose

确保界面覆盖所有必要状态，避免只设计 happy path。

## When to Use

**必须使用时：**
- 组件开发完成后
- 设计审查阶段
- 用户体验优化

**推荐使用时：**
- 新组件设计
- 表单设计
- 数据展示设计

## When Not to Use

**不适用场景：**
- 静态展示页面
- 无交互的纯文本内容

## 状态矩阵

| 状态 | 必须性 | 描述 |
|------|--------|------|
| Default | 必须 | 正常显示 |
| Hover | 必须 | 鼠标悬停 |
| Focus | 必须 | 键盘聚焦 |
| Disabled | 必须 | 禁用状态 |
| Loading | 推荐 | 加载中 |
| Empty | 推荐 | 无数据 |
| Error | 推荐 | 错误状态 |

## Implementation Process

### Step 1: 检查状态覆盖

为每个组件创建状态矩阵。

### Step 2: 实现空状态

```tsx
function EmptyState() {
  return (
    <div className="flex flex-col items-center py-12">
      <Illustration name="empty" />
      <h3>暂无数据</h3>
      <p>点击下方按钮开始</p>
      <Button>添加项目</Button>
    </div>
  );
}
```

### Step 3: 实现加载状态

```tsx
function CardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
}
```

### Step 4: 实现错误状态

```tsx
function ErrorState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center py-12">
      <AlertCircle className="text-error" />
      <h3>加载失败</h3>
      <Button onClick={onRetry}>重新加载</Button>
    </div>
  );
}
```

## Output Requirements

```yaml
state_coverage_report:
  component: string
  
  states_implemented:
    - name: default
      status: implemented | missing
    - name: hover
      status: implemented | missing
    - name: focus
      status: implemented | missing
    - name: loading
      status: implemented | missing | not_applicable
    - name: empty
      status: implemented | missing | not_applicable
    - name: error
      status: implemented | missing | not_applicable
      
  coverage_score: number  # 实现状态 / 必须状态
  
  recommendations:
    - string
```

## Checklists

- [ ] Default 状态 ✓
- [ ] Hover 状态 ✓
- [ ] Focus 状态 ✓
- [ ] Loading 状态
- [ ] Empty 状态
- [ ] Error 状态

## Common Failure Modes

| 失败模式 | 处理建议 |
|----------|----------|
| 只有 happy path | 强制状态矩阵检查 |
| 空白空状态 | 添加友好提示 |
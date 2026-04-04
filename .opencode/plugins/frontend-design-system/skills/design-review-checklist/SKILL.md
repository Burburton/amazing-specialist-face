# Skill: design-review-checklist

## Metadata
```yaml
plugin_id: frontend-design-system
plugin_version: 1.0.0
core_compatibility: >=1.7.0
```

## Purpose

为 reviewer 提供系统化的设计审查框架。

## When to Use

**必须使用时：**
- 组件开发完成后
- 设计评审阶段
- 代码审查（涉及 UI 变更）

**推荐使用时：**
- 设计系统更新
- 品牌一致性检查

## When Not to Use

**不适用场景：**
- 纯后端代码审查
- 无 UI 变更的 PR

## 审查维度

### 颜色审查

| ID | Check | Severity |
|----|-------|----------|
| CR-001 | 主色非 Blue-500/Indigo-600 | major |
| CR-002 | 背景非纯 #fff/#000 | minor |
| CR-003 | 对比度 >= 4.5:1 | blocker |
| CR-004 | 使用设计令牌 | major |

### 排版审查

| ID | Check | Severity |
|----|-------|----------|
| TR-001 | 非单一字体 | minor |
| TR-002 | 至少 4 级字号 | major |
| TR-003 | 层级化行高 | major |

### 动画审查

| ID | Check | Severity |
|----|-------|----------|
| AR-001 | 无 transition-all | major |
| AR-002 | 时长 < 300ms | minor |
| AR-003 | 支持 reduced-motion | major |

### 状态审查

| ID | Check | Severity |
|----|-------|----------|
| ST-001 | Hover 状态 | major |
| ST-002 | Focus-visible 状态 | blocker |
| ST-003 | Loading 状态 | major |
| ST-004 | Empty 状态 | major |
| ST-005 | Error 状态 | major |

### 可访问性审查

| ID | Check | Severity |
|----|-------|----------|
| AC-001 | WCAG AA 对比度 | blocker |
| AC-002 | 44pt 触摸目标 | major |
| AC-003 | 键盘可访问 | blocker |

## Severity Levels

| 级别 | 处理要求 |
|------|----------|
| blocker | 立即修复 |
| major | 本次修复 |
| minor | 可后续修复 |

## Output Requirements

```yaml
design_review_report:
  component: string
  score: number  # 0-100
  
  findings:
    - id: string
      severity: blocker | major | minor
      description: string
      
  verdict: PASS | PASS_WITH_WARNINGS | FAIL
```

## Checklists

- [ ] 颜色审查完成
- [ ] 排版审查完成
- [ ] 动画审查完成
- [ ] 状态审查完成
- [ ] 可访问性审查完成

## Common Failure Modes

| 失败模式 | 表现 | 处理建议 |
|----------|------|----------|
| 跳过审查 | 小改动不执行审查 | 强制所有 UI 变更经过审查 |
| 清单未完成 | 部分检查项跳过 | 要求完整填写清单 |
| 级别误判 | blocker 降级为 minor | 参考 Severity Levels 定义 |
| 忽略可访问性 | 只关注外观 | 强制 AC 检查项 |
| 无文档记录 | 审查结果未记录 | 输出 design_review_report |
| 审查延迟 | 代码合并后才审查 | 在 PR 阶段执行审查 |
| 缺少上下文 | 不了解设计意图 | 要求提供设计说明文档 |
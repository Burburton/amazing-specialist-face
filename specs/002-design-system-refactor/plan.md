# Implementation Plan: Design System Refactor

## Metadata
```yaml
feature_id: 002-design-system-refactor
status: in_progress
created: 2026-04-04
based_on: spec.md
```

## Architecture Summary

```
src/styles/
├── tokens.css           # 新设计令牌（替换 variables.css）
├── global.css           # 全局样式
└── reset.css            # 重置样式

src/lib/
└── animations.ts        # 动画预设

src/components/
├── common/
│   ├── Header.tsx       # 重构：品牌色、状态
│   └── Layout.tsx       # 重构：背景、过渡
├── cards/
│   ├── SkillCard.tsx    # 重构：状态覆盖
│   ├── RoleCard.tsx     # 重构：颜色编码
│   ├── ContractCard.tsx # 重构：代码风格
│   └── CommandCard.tsx  # 重构：终端风格
└── skeletons/           # 新增：骨架屏组件
    ├── SkillCardSkeleton.tsx
    ├── RoleCardSkeleton.tsx
    └── CardSkeleton.tsx

src/pages/
├── HomePage.tsx         # 重构：Hero 设计
├── SkillsPage.tsx       # 重构：网格、筛选
├── RolesPage.tsx        # 重构：协作图
├── ContractsPage.tsx    # 重构：文档风格
└── CommandsPage.tsx     # 重构：终端风格
```

## Design Direction

### 品牌色方案：Developer Tool 风格

```css
/* 主色：Violet - 避开 Blue/Indigo AI 默认 */
--color-primary: #8b5cf6;        /* Violet-500 */
--color-primary-hover: #7c3aed;  /* Violet-600 */
--color-primary-pressed: #6d28d9; /* Violet-700 */

/* 强调色：Emerald - 活力点缀 */
--color-accent: #10b981;         /* Emerald-500 */

/* 背景：深色优先 */
--color-background: #0a0a0a;     /* Near black */
--color-surface: #18181b;        /* Zinc-900 */
```

### 字体配对

| 用途 | 字体 | 备选 |
|------|------|------|
| 展示标题 | Space Grotesk | Geist |
| 正文 | Inter | System UI |
| 代码 | JetBrains Mono | Fira Code |

### 设计参考

- **Linear**: Dark mode, clean borders, subtle gradients
- **Vercel**: Monospace accents, minimal UI
- **Stripe Docs**: Clear hierarchy, code highlighting

## Technical Constraints

### TC-001: CSS Modules 兼容

保持现有 CSS Modules 结构，只修改变量引用。

### TC-002: 渐进式重构

先创建新 tokens.css，再逐步更新组件。

### TC-003: 性能保持

CSS 文件大小增加不超过 20%。

## Module Decomposition

### Module 1: 设计令牌系统

**交付物**: `src/styles/tokens.css`, `src/lib/animations.ts`

**职责**:
- 定义品牌主色（Violet）
- 建立 8pt 网格间距
- 字体配对定义
- 语义化动画曲线

**依赖**: 无

### Module 2: 基础组件重构

**交付物**: Header, Layout 组件更新

**职责**:
- Header 品牌化
- Layout 背景处理
- 基础状态覆盖

**依赖**: Module 1

### Module 3: 卡片组件重构

**交付物**: SkillCard, RoleCard, ContractCard, CommandCard 更新

**职责**:
- Hover/Focus 状态
- 骨架屏 Loading 状态
- 微交互动画

**依赖**: Module 1

### Module 4: 页面重构

**交付物**: 所有页面更新

**职责**:
- HomePage Hero 重设计
- 列表页网格优化
- 页面过渡动画

**依赖**: Module 2, Module 3

### Module 5: 验证与审查

**交付物**: 设计审查报告

**职责**:
- 调用 design-review-checklist
- 修复发现的问题
- 性能验证

**依赖**: Module 1-4

## Data Flow

```
tokens.css
    ↓
CSS Modules (更新变量引用)
    ↓
React Components (使用新样式)
    ↓
animations.ts (动画预设)
    ↓
Framer Motion / CSS Transitions
```

## Validation Strategy

### Phase 1: 视觉验证

- 品牌色非 Blue/Indigo
- 间距遵循 8pt 网格
- 字体配对正确加载

### Phase 2: 交互验证

- Hover 状态流畅
- Focus 状态可见
- Loading 骨架屏正常

### Phase 3: 可访问性验证

- 颜色对比度 >= 4.5:1
- 键盘导航正常
- prefers-reduced-motion 生效

### Phase 4: 性能验证

- CSS 文件大小
- 首次加载时间
- 动画帧率

## Risks / Tradeoffs

### Risk 1: 字体加载延迟

**风险**: Space Grotesk / JetBrains Mono 加载慢

**缓解**: 使用 `font-display: swap`，定义系统字体回退

### Risk 2: 暗色模式对比度

**风险**: 深色背景上文字对比度不足

**缓解**: 使用对比度检查工具验证所有文字颜色

### Tradeoff 1: 不支持亮色模式优先

**取舍**: 暗色模式为默认，亮色模式后续添加

**理由**: 
- Developer Tool 产品通常暗色优先
- 减少初始工作量

## Requirement Traceability

| Spec ID | Requirement | Plan Module |
|---------|-------------|-------------|
| AC-001 | 设计令牌文件 | Module 1 |
| AC-002 | 组件状态覆盖 | Module 2, 3 |
| AC-003 | 页面视觉效果 | Module 4 |
| AC-004 | 动画预设 | Module 1 |
| AC-005 | 设计审查通过 | Module 5 |
| BR-001 | 品牌色选择 | Module 1 |
| BR-002 | 8pt 网格 | Module 1 |
| BR-003 | 动画语义化 | Module 1 |
| BR-004 | 暗色模式默认 | Module 1 |

## Implementation Phases

### Phase 1: 设计令牌 (Day 1)
- Module 1: tokens.css, animations.ts

### Phase 2: 基础组件 (Day 1)
- Module 2: Header, Layout

### Phase 3: 卡片组件 (Day 2)
- Module 3: 所有卡片组件

### Phase 4: 页面重构 (Day 2-3)
- Module 4: 所有页面

### Phase 5: 验证 (Day 3)
- Module 5: 设计审查、修复
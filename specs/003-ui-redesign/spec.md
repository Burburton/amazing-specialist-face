# Feature: UI Redesign - Design Consultation Report

## Metadata
```yaml
feature_id: 003-ui-redesign
status: design-phase
created: 2026-04-04
author: ui-ux-designer-plugin
skills_used:
  - design-consultant
  - wireframe-design
  - component-design
```

## Background

### Problem Statement

当前项目界面经过 `002-design-system-refactor` 已建立了设计令牌系统，但仍存在以下问题：

| 维度 | 当前问题 | 专业标准 |
|------|----------|----------|
| **信息架构** | Hero 区域信息堆砌，无层次 | 简化聚焦，CTA引导 |
| **视觉差异** | MVP/M4 卡片区分不明显 | 强对比，颜色差异化 |
| **角色颜色** | 500系列颜色偏暗 | 400系列更亮更清晰 |
| **交互反馈** | 筛选体验不流畅 | Tab式筛选，即时反馈 |
| **导航引导** | 缺少页面入口引导 | 快速入口卡片 |

### Existing Context

- 设计令牌已建立 (`src/styles/tokens.css`)
- 主色：`#8b5cf6` (Violet-500)
- 强调色：`#10b981` (Emerald-500)
- 字体：Space Grotesk + Inter + JetBrains Mono
- 间距：8pt 网格系统

### Target Design Direction

**设计风格**: Developer Tool Dashboard

**设计关键词**:
- 信息效率 - 快速找到需要的内容
- 视觉层次 - 标题/正文/辅助信息三级分明
- 交互反馈 - 悬停/点击/筛选都有即时反馈
- 专业可信 - 深色背景 + 技术字体 + 精确数据

**参考对象**:
- Linear (暗色模式, 简洁, 信息密度高)
- Vercel Dashboard (等宽字体点缀, 卡片阴影)
- Stripe Docs (侧边导航, 渐进式信息披露)

## Goal

使用 `ui-ux-designer` Plugin 的 Skills 进行完整的设计流程：
1. **design-consultant** - 分析需求，输出设计方案
2. **wireframe-design** - 输出页面线框图
3. **component-design** - 输出组件设计规范

### Success Criteria

1. **首页 Hero 简化** - 减少信息密度，聚焦核心价值主张
2. **视觉层次强化** - 区分标题/正文/辅助信息三级
3. **SkillCard 视觉差异** - MVP/M4 强对比，角色颜色调亮
4. **筛选体验优化** - Tab 式角色筛选 + 即时反馈
5. **快速入口导航** - 首页增加导航入口卡片

## Scope

### In Scope

#### 1. 首页重设计

**交付物**: `wireframe.md`

- Hero 区域简化
- 价值主张三栏展示
- CTA 按钮引导
- 能力概览重新设计
- 六角色流程可视化（交互式）
- 快速入口卡片

#### 2. SkillCard 组件重设计

**交付物**: `component-spec.md`

- MVP/M4 视觉差异强化
- 角色颜色调亮 (400系列)
- Hover 动画增强
- 键盘导航支持
- 可访问性完善

#### 3. 筛选体验优化

- Tab 式角色筛选
- 搜索框即时反馈
- 筛选结果动画

### Out of Scope

1. **数据层重构** - 不修改数据获取逻辑
2. **新增页面** - 不新增页面，仅重构现有页面
3. **后端集成** - 不涉及后端 API
4. **其他组件** - 本次聚焦 SkillCard，其他组件后续迭代

## Actors

### Primary Actor
- **architect** - 设计方案输出
- **developer** - 根据设计规范实现

### Secondary Actors
- **reviewer** - 使用 `design-review-checklist` 审查设计
- **tester** - 测试可访问性和键盘导航

## Core Workflows

### Workflow 1: 设计咨询

```
architect 调用 design-consultant skill
  → 分析用户画像
  → 定义信息架构
  → 确定设计方向
  → 输出设计规范
  → 生成 spec.md
```

### Workflow 2: 线框图设计

```
architect 调用 wireframe-design skill
  → 定义页面布局框架
  → 组件网格配置
  → 响应式布局 (Desktop/Tablet/Mobile)
  → 用户流程图
  → 生成 wireframe.md
```

### Workflow 3: 组件设计

```
architect 调用 component-design skill
  → 定义组件解剖结构
  → 变体设计 (default/mvp/m4/featured)
  → 状态定义 (default/hover/focus/active/disabled)
  → 可访问性规范
  → 响应式尺寸
  → 生成 component-spec.md
```

### Workflow 4: 实现与审查

```
developer 根据 component-spec.md 实现
  → 创建 CSS Module
  → 实现 TSX 组件
  → 添加可访问性支持
  
reviewer 调用 design-review-checklist
  → 检查视觉差异
  → 检查状态覆盖
  → 检查可访问性
  → 输出审查报告
```

## Design Consultation Report

### Phase 1: 需求分析

#### 用户画像

| 画像 | 目标 | 痛点 | 当前体验 |
|------|------|------|----------|
| **开发者用户** | 快速了解专家包能力，找到需要的技能，上手使用 | 页面信息密集，视觉层次不清晰；技能卡片缺乏视觉差异，难以快速识别；缺少引导，不知道从哪里开始 | 能找到信息，但浏览体验偏工具化，缺乏吸引力 |
| **架构评估者** | 评估专家包是否适合团队项目，了解设计理念 | 架构流程图不够直观；缺少案例或使用场景说明；无法快速理解 6-role 协作关系 | 能看到流程图，但理解成本较高 |
| **技术决策者** | 评估投入产出，快速了解专家包价值 | 首页缺少核心价值主张；统计数据展示不够突出；缺少成功案例或对比信息 | 有数据展示，但说服力不足 |

#### 核心任务优先级

| 优先级 | 任务 | 当前问题 |
|--------|------|----------|
| P1 | 首页浏览 - 快速理解专家包价值 | Hero 区域信息堆砌，缺乏视觉焦点 |
| P2 | 技能检索 - 按角色/类别筛选技能 | 筛选区与结果区视觉分离不够，筛选体验不流畅 |
| P3 | 理解协作流程 - 6-role 工作流 | 流程图展示存在，但交互性弱，理解成本高 |
| P4 | 查看技能详情 - 点击卡片展开 | 卡片信息密度高，缺少展开交互 |

#### 关键场景

| 场景 | 期望 | 当前差距 |
|------|------|----------|
| 首次访问 | 5秒内理解专家包是什么，有什么价值 | 标题 + 副标题 + 统计数字堆砌，无清晰叙事 |
| 技能搜索 | 快速筛选 + 即时反馈 + 结果可见 | 筛选器位置不突出，结果网格缺乏视觉引导 |
| 流程理解 | 可视化流程图 + 点击探索各角色职责 | 静态流程图，无交互探索 |

### Phase 2: 信息架构

#### 当前结构

```
首页
├── Hero 区域          # 信息堆砌，无层次
│   ├── 标题 + 副标题
│   ├── 统计数字
│   └── Highlights 标签
├── 统计卡片网格        # 4个卡片，样式统一
├── 工作流程图          # 静态图，无交互
└── 已交付功能          # 列表展示
```

```
技能页
├── 标题区             # 简洁
├── 筛选区             # 角色 + 搜索 + 类别
├── 统计条             # 当前显示/MVP/M4
├── 依赖图             # 全技能依赖图
└── 技能网格           # 按角色分组
```

#### 问题识别

1. 首页缺少导航引导，用户不知道还有其他页面
2. Hero 区域信息过载，无视觉焦点
3. 流程图与功能列表位置不突出
4. 技能页筛选器与结果区关联不直观

#### 建议结构

```
首页 (重新设计)
├── Hero 区域          # 简化，聚焦核心价值
│   ├── 主标题         # 一句话定位
│   ├── 价值主张       # 3个核心卖点
│   └── CTA 按钮        # "浏览技能库" / "了解流程"
├── 能力概览           # 重新设计的统计展示
│   ├── 核心数字       # 大号突出
│   └── 角色分布图     # 可视化分布
├── 流程可视化         # 交互式流程图
│   ├── 6-role 概览
│   └── 点击展开详情
└── 快速入口           # 导航卡片
    ├── 技能库入口
    ├── 角色页入口
    └── 契约页入口
```

```
技能页 (优化)
├── Hero 标题          # 简洁标题 + 总数
├── 智能筛选           # 改进筛选体验
│   ├── 角色筛选       # Tab 式切换
│   ├── 搜索框         # 带即时反馈
│   └── 类别切换       # MVP/M4 切换
├── 结果网格           # 视觉优化
│   ├── 分组标题       # 角色分组更清晰
│   └── 卡片           # 增强视觉差异
└── 技能详情           # 点击展开详情
```

### Phase 3: 设计方向

#### 风格定义

| 维度 | 方向 | 具体表现 |
|------|------|----------|
| **风格** | Developer Tool Dashboard | 专业开发者工具界面，强调信息效率与视觉层次 |
| **基调** | Technical, Professional | 技术专业，同时保持 Modern 和 Approachable |

#### 参考对象

| 参考 | 学习点 |
|------|--------|
| **Linear** | 暗色模式优先，深色背景 + 高对比文字；信息密度高但层次清晰；微交互增强操作反馈；紫色作为品牌色（巧合，已采用 Violet） |
| **Vercel Dashboard** | 等宽字体点缀代码/ID；卡片阴影与边框组合使用；状态标签清晰区分；简约但信息完整 |
| **Stripe Docs** | 侧边导航 + 内容区布局；代码块与文档混合排版；渐进式信息披露 |

### Phase 4: 设计规范

#### 颜色方案

```yaml
colors:
  primary: "#8b5cf6 (Violet-500)"
  accent: "#10b981 (Emerald-500)"
  background: "#09090b (Zinc-950)"
  surface: "#18181b (Zinc-900)"
  surface_elevated: "#27272a (Zinc-800)"
  
  role_colors:  # 400系列 - 更亮
    architect: "#a78bfa"    # Violet-400
    developer: "#60a5fa"    # Blue-400
    tester: "#4ade80"       # Green-400
    reviewer: "#fbbf24"     # Amber-400
    docs: "#22d3ee"         # Cyan-400
    security: "#f87171"     # Red-400
```

#### 字体方案

```yaml
typography:
  display: "Space Grotesk"
  usage: "标题、数字、强调文字"
  
  body: "Inter"
  usage: "正文、描述、标签"
  
  mono: "JetBrains Mono"
  usage: "技能 ID、代码、技术标识"
  
  hierarchy:
    hero_title: "3rem / bold / tight"
    section_title: "1.5rem / semibold / tight"
    card_title: "1rem / medium / normal"
    body_text: "0.875rem / normal / relaxed"
    label: "0.75rem / medium / normal"
```

#### 间距方案

```yaml
spacing:
  grid: "8pt"
  section_gap: "64px (space-8)"
  card_gap: "24px (space-3)"
  element_gap: "16px (space-2)"
  compact_gap: "8px (space-1)"
```

#### 组件规范

```yaml
components:
  cards:
    style: "elevated + border"
    border_radius: "12px (radius-xl)"
    shadow: "lg"
    hover_effect: "translateY(-4px) + shadow-xl"
    
  buttons:
    primary:
      style: "solid + rounded"
      color: "var(--color-primary)"
      hover: "opacity 0.9 + glow"
    secondary:
      style: "outline + rounded"
      color: "transparent"
      border: "1px var(--color-border)"
      
  tags:
    category:
      mvp: "accent color solid"
      m4: "neutral color outline"
    role:
      style: "pill shape"
      color: "role-specific color (400 series)"
      
  filters:
    style: "tab bar"
    active_state: "background fill + color"
    hover_state: "subtle background"
```

## Recommendations

### Priority 1 (核心体验)

| ID | 标题 | 描述 | 变更内容 |
|----|------|------|----------|
| R1-01 | 首页 Hero 简化 | 减少信息密度，聚焦核心价值主张 | 移除统计数字堆砌；增加 CTA 按钮引导；价值主张三栏展示 |
| R1-02 | 视觉层次强化 | 区分标题/正文/辅助信息三级 | Hero 标题加大至 3rem；描述文字缩小至 0.875rem；标签缩小至 0.75rem |

### Priority 2 (组件优化)

| ID | 标题 | 描述 | 变更内容 |
|----|------|------|----------|
| R2-01 | 技能卡片视觉差异 | 增强 MVP/M4 视觉区分，角色颜色更亮 | MVP 卡片：accent 背景 + solid 标签；M4 卡片：neutral 背景 + outline 标签；角色颜色调亮 (400 系而非 500 系) |
| R2-02 | 筛选体验优化 | Tab 式角色筛选 + 即时反馈 | 角色筛选改为 Tab 栏；搜索框带实时结果计数；筛选结果即时更新动画 |

### Priority 3 (交互增强)

| ID | 标题 | 描述 | 变更内容 |
|----|------|------|----------|
| R3-01 | 交互流程图 | 流程图增加点击交互 | 点击角色节点展开详情；hover 显示角色职责；连线动画展示协作流 |
| R3-02 | 快速入口导航 | 首页增加导航入口卡片 | 技能库、角色、契约入口卡片；带图标和简短描述；点击跳转对应页面 |

## Deliverables

| 文件 | 内容 | 状态 |
|------|------|------|
| `spec.md` | 设计咨询报告（本文档） | ✅ 完成 |
| `wireframe.md` | 首页线框图设计 | 📝 待创建 |
| `component-spec.md` | SkillCard 组件设计规范 | 📝 待创建 |
| `tasks.md` | 实现任务清单 | ⏳ 待创建 |
| `plan.md` | 实现计划 | ⏳ 待创建 |

## Assumptions

1. 设计令牌系统 (`tokens.css`) 已建立，无需重新定义
2. 用户偏好暗色模式作为默认主题
3. 项目使用 CSS Modules，不需要 CSS-in-JS 迁移
4. 不需要支持 IE11

## Open Questions

1. **OQ-001**: 是否需要增加技能详情展开交互？
   - 建议：后续迭代，本次聚焦卡片视觉差异

2. **OQ-002**: 流程图交互复杂度如何定义？
   - 建议：点击展开角色详情，hover 高亮连线

## References

- `.opencode/plugins/ui-ux-designer/` - UI/UX 设计 Skills
- `.opencode/plugins/frontend-design-system/` - 设计系统 Skills
- `specs/002-design-system-refactor/` - 设计系统重构 spec
- `src/styles/tokens.css` - 设计令牌
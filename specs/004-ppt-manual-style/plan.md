# Implementation Plan: PPT Manual Style

## Metadata
```yaml
feature_id: 004-ppt-manual-style
status: ready-for-implementation
created: 2026-04-05
author: architect
based_on: spec.md
```

## 1. Architecture Summary

将首页从 Dashboard 风格重构为 PPT 说明书风格：

| 变更范围 | 架构影响 |
|----------|----------|
| **首页结构** | 重构为 Slide 容器 + 5 个 Slide 组件 |
| **Header** | 重构为透明固定 + 滚动渐变 |
| **交互模式** | 添加 scroll snap + 点击展开详情 |
| **其他页面** | 保持不变，仅首页重构 |

**核心原则**: 纯视觉层重构，不涉及数据层、路由层。

---

## 2. Inputs from Spec

### 必须实现

| ID | 需求 | 来源 |
|----|------|------|
| R-001 | Header 透明固定 + 滚动渐变 | spec.md §10 |
| R-002 | Slide 1 封面（已完成） | spec.md §3.1 |
| R-003 | Slide 2 角色关系树 | spec.md §3.2 |
| R-004 | Slide 3 工作流程卡片 | spec.md §3.3 |
| R-005 | Slide 4 能力统计 | spec.md §3.4 |
| R-006 | Slide 5 快速入口 | spec.md §3.5 |
| R-007 | Scroll Snap 翻页 | spec.md §4.1 |
| R-008 | 角色详情面板 | spec.md §4.2 |

---

## 3. Technical Constraints

### 设计令牌约束
- 所有颜色、间距、字体使用 `tokens.css` CSS 变量
- 禁止硬编码颜色值
- 禁止固定 px 值

### CSS 约束
- 使用 CSS Modules
- 支持 `prefers-reduced-motion`
- Scroll Snap: `scroll-snap-type: y mandatory`

### 组件约束
- 语义化 HTML (`section`, `article`, `h1-h3`)
- ARIA 属性支持
- 键盘导航

---

## 4. Module Decomposition

### 4.1 Header Refactor

**文件**:
- `src/components/common/Header.tsx`
- `src/components/common/Header.module.css`

**变更**:

| 变更点 | 当前 | 目标 |
|--------|------|------|
| 背景 | 固定 surface | 透明 → 滚动时渐变 |
| 导航 | Home/Skills/Roles/etc | 关于/流程/团队/技能 |
| Logo | "📚 Expert Pack" | "OpenCode" |
| 字体 | Inter | Space Grotesk + JetBrains Mono |

---

### 4.2 Slide Components

**文件结构**:
```
src/components/slides/
├── CoverSlide.tsx           ✅ 已完成
├── CoverSlide.module.css    ✅ 已完成
├── WhatIsSlide.tsx          📝 待创建
├── WhatIsSlide.module.css   📝 待创建
├── HowItWorksSlide.tsx      📝 待创建
├── HowItWorksSlide.module.css 📝 待创建
├── CapabilitiesSlide.tsx    📝 待创建
├── CapabilitiesSlide.module.css 📝 待创建
├── GetStartedSlide.tsx      📝 待创建
└── GetStartedSlide.module.css 📝 待创建
```

---

### 4.3 Shared Components

**新增组件**:
- `RoleNode.tsx` - 可点击角色节点
- `RoleDetailPanel.tsx` - 角色详情侧边栏
- `FlowStepCard.tsx` - 流程步骤卡片
- `HeroStat.tsx` - 大号统计数字

---

### 4.4 HomePage Integration

**文件**:
- `src/pages/HomePage.tsx`
- `src/pages/HomePage.module.css`

**结构**:
```tsx
<div className={styles.slideContainer}>
  <CoverSlide />
  <WhatIsSlide />
  <HowItWorksSlide />
  <CapabilitiesSlide />
  <GetStartedSlide />
</div>
```

---

## 5. Implementation Sequence

### Phase 1: Header Refactor (优先)
```
T-001: 重构 Header 组件
  ├── 透明背景 + 滚动监听
  ├── 新导航项（关于/流程/团队/技能）
  ├── Logo 更新为 "OpenCode"
  └── GitHub 链接
```

### Phase 2: Slide 2-5 实现
```
T-002: WhatIsSlide（角色关系树）
  ├── 角色节点布局
  ├── 点击交互
  └── 详情面板

T-003: HowItWorksSlide（流程卡片）
  ├── 6 个流程卡片
  └── 点击展开详情

T-004: CapabilitiesSlide（能力统计）
  ├── Hero Stat (43)
  └── 3 个 Sub Stats

T-005: GetStartedSlide（快速入口）
  └── 3 个入口卡片
```

### Phase 3: 集成与验证
```
T-006: HomePage 集成
  ├── 导入所有 Slide
  └── Scroll Snap 配置

T-007: Header Slide 导航联动
  └── 点击导航项滚动到对应 Slide

V-001: 构建验证
V-002: 部署验证
```

---

## 6. Risks / Tradeoffs

### Risks

| ID | 风险 | 影响 | 缓解措施 |
|----|------|------|----------|
| R-001 | Header 滚动监听性能 | 轻微卡顿 | 使用 Intersection Observer |
| R-002 | 角色树布局复杂 | 开发时间延长 | 使用 CSS Grid 简化 |
| R-003 | 详情面板可访问性 | 可访问性合规 | 完整 ARIA + 键盘支持 |

### Tradeoffs

| 决策 | 收益 | 代价 |
|------|------|------|
| **仅首页重构** | 风险可控 | 其他页面风格不一致 |
| **不添加 Slide 转场动画** | 性能更好 | 视觉效果略简 |
| **固定 Header** | 导航便捷 | 占用垂直空间 |

---

## 7. Validation Strategy

### 视觉验证

| 检查项 | 方法 | 验收标准 |
|--------|------|----------|
| Header 透明→渐变 | 滚动测试 | 滚动后背景渐变显现 |
| Slide 布局 | 视觉检查 | 每屏一焦点，居中布局 |
| 角色树 | 视觉检查 | 节点对齐，连线清晰 |

### 交互验证

| 检查项 | 方法 | 验收标准 |
|--------|------|----------|
| Scroll Snap | 滚动测试 | 自动吸附到 Slide |
| Header 导航 | 点击测试 | 滚动到对应 Slide |
| 角色节点点击 | 点击测试 | 展开详情面板 |

### 可访问性验证

| 检查项 | 工具 | 验收标准 |
|--------|------|----------|
| ARIA 属性 | axe DevTools | 无错误 |
| 键盘导航 | 手动测试 | Tab/Enter/Escape 有效 |
| Reduced Motion | 系统设置 | 动画禁用 |

---

## 8. Requirement Traceability

| Spec Requirement | Plan Section | Task ID |
|-------------------|--------------|---------|
| R-001 Header 重构 | §4.1 | T-001 |
| R-002 Slide 1 封面 | - | ✅ 已完成 |
| R-003 Slide 2 角色树 | §4.2 | T-002 |
| R-004 Slide 3 流程 | §4.2 | T-003 |
| R-005 Slide 4 统计 | §4.2 | T-004 |
| R-006 Slide 5 入口 | §4.2 | T-005 |
| R-007 Scroll Snap | §4.4 | T-006 |
| R-008 详情面板 | §4.3 | T-002 |

---

## 9. Next Steps

1. **执行 T-001**: 重构 Header
2. **执行 T-002~T-005**: 实现 Slide 2-5
3. **执行 T-006**: HomePage 集成
4. **执行 T-007**: Header 联动
5. **验证**: 构建 + 部署 + 手动验证
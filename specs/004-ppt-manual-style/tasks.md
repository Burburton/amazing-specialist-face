# Tasks: PPT Manual Style

## Metadata
```yaml
feature_id: 004-ppt-manual-style
status: ready-for-implementation
created: 2026-04-05
author: architect
based_on: plan.md
```

## Task Overview

| Phase | Task ID | 描述 | 优先级 | 状态 | 依赖 |
|-------|---------|------|--------|------|------|
| 1 | T-001 | 重构 Header 为 PPT Manual Style | 🔴 最高 | ⏳ pending | - |
| 2 | T-002 | WhatIsSlide - 角色关系树 | 🔴 最高 | ⏳ pending | - |
| 3 | T-003 | HowItWorksSlide - 流程卡片 | 🟡 高 | ⏳ pending | - |
| 4 | T-004 | CapabilitiesSlide - 能力统计 | 🟡 高 | ⏳ pending | - |
| 5 | T-005 | GetStartedSlide - 快速入口 | 🟡 高 | ⏳ pending | - |
| 6 | T-006 | HomePage 集成所有 Slide | 🟡 高 | ⏳ pending | T-002~T-005 |
| 7 | T-007 | Header 导航联动 | 🟢 中 | ⏳ pending | T-001, T-006 |
| - | V-001 | 构建验证 | 🔴 最高 | ⏳ pending | T-006 |
| - | V-002 | 部署验证 | 🟡 高 | ⏳ pending | V-001 |

---

## Phase 1: Header Refactor

### T-001: 重构 Header 为 PPT Manual Style

**优先级**: 🔴 最高

**状态**: ⏳ pending

**依赖**: 无

**输入**: 
- `spec.md` §10 Header Design Specification

**输出**: 
- `src/components/common/Header.tsx` 重构
- `src/components/common/Header.module.css` 重构

**验收标准**:
- [ ] 默认背景透明
- [ ] 滚动后背景渐变显现 (`rgba(9, 9, 11, 0.9)`)
- [ ] Logo 更新为 "OpenCode" (Space Grotesk 字体)
- [ ] 导航项: 关于 / 流程 / 团队 / 技能
- [ ] 导航字体使用 JetBrains Mono
- [ ] 右侧 GitHub 链接
- [ ] 移动端汉堡菜单保留

**实现要点**:

```tsx
// 导航项定义
const SLIDE_NAVS = [
  { id: 'about', label: '关于', slideIndex: 1 },
  { id: 'process', label: '流程', slideIndex: 2 },
  { id: 'team', label: '团队', slideIndex: 3 },
];

const PAGE_NAVS = [
  { id: 'skills', label: '技能', path: '/skills' },
];
```

```css
/* 滚动状态 */
.header {
  background: transparent;
  transition: background-color 200ms, border-color 200ms;
}

.header.scrolled {
  background: rgba(9, 9, 11, 0.9);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
}
```

---

## Phase 2: Slide Components

### T-002: WhatIsSlide - 角色关系树

**优先级**: 🔴 最高

**状态**: ⏳ pending

**依赖**: 无

**输入**: 
- `spec.md` §3.2 SLIDE 2: 它是什么

**输出**: 
- `src/components/slides/WhatIsSlide.tsx`
- `src/components/slides/WhatIsSlide.module.css`
- `src/components/shared/RoleNode.tsx`
- `src/components/shared/RoleDetailPanel.tsx`

**验收标准**:
- [ ] 标题: "这是一个 6 角色协作的 AI 代理团队"
- [ ] 角色树布局（上下结构）
- [ ] 6 个角色节点可点击
- [ ] 点击节点展开详情面板（右侧 sidebar）
- [ ] 详情面板包含: emoji, 名称, 职责, 技能列表
- [ ] 键盘支持 (Tab/Enter/Escape)
- [ ] ARIA 属性

**角色树布局**:

```
              架构师 (8 技能)
                  │
                  ▼
    开发者 (12 技能) ──→ 测试员 (6 技能)
                  │
                  ▼
    审查员 (5 技能) ←── 文档员 (4 技能)
                  ↑
              安全员 (3 技能)
```

---

### T-003: HowItWorksSlide - 流程卡片

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: 无

**输入**: 
- `spec.md` §3.3 SLIDE 3: 它怎么工作

**输出**: 
- `src/components/slides/HowItWorksSlide.tsx`
- `src/components/slides/HowItWorksSlide.module.css`
- `src/components/shared/FlowStepCard.tsx`

**验收标准**:
- [ ] 标题: "它怎么工作"
- [ ] 6 个流程卡片横向排列
- [ ] 卡片内容: 标题 + 副标题
- [ ] 卡片使用 JetBrains Mono 字体
- [ ] Hover 效果: 上移 + 边框变色
- [ ] 点击卡片展开详情模态框
- [ ] 键盘支持

**流程卡片**:

| 标题 | 副标题 | 角色 |
|------|--------|------|
| Spec | 需求定义 | architect |
| Plan | 方案设计 | architect |
| Implement | 代码实现 | developer |
| Test | 验证测试 | tester |
| Review | 审查反馈 | reviewer |
| Deploy | 部署上线 | developer |

---

### T-004: CapabilitiesSlide - 能力统计

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: 无

**输入**: 
- `spec.md` §3.4 SLIDE 4: 能力统计

**输出**: 
- `src/components/slides/CapabilitiesSlide.tsx`
- `src/components/slides/CapabilitiesSlide.module.css`

**验收标准**:
- [ ] Hero Stat: "43" 专业技能（8rem 大号）
- [ ] Hero Stat 使用渐变色
- [ ] 3 个 Sub Stats 横向排列: 6 角色 / 18 契约 / 5 命令
- [ ] CTA 按钮: "浏览技能库 →"
- [ ] 居中布局

**数据来源**: `src/data/stats.json`

---

### T-005: GetStartedSlide - 快速入口

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: 无

**输入**: 
- `spec.md` §3.5 SLIDE 5: 快速入口

**输出**: 
- `src/components/slides/GetStartedSlide.tsx`
- `src/components/slides/GetStartedSlide.module.css`

**验收标准**:
- [ ] 标题: "开始使用"
- [ ] 3 个入口卡片横向排列
- [ ] 卡片内容: 图标 + 标题 + 数量 + 箭头
- [ ] Hover 效果: 上移 + 边框变色
- [ ] 点击跳转对应页面
- [ ] 键盘支持

**入口卡片**:

| 图标 | 标题 | 数量 | 跳转 |
|------|------|------|------|
| 📚 | 技能库 | 43 个技能 | /skills |
| 👥 | 角色分工 | 6 个角色 | /roles |
| 📋 | 契约规范 | 18 个契约 | /contracts |

---

## Phase 3: Integration

### T-006: HomePage 集成所有 Slide

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: T-002, T-003, T-004, T-005

**输入**: 
- `plan.md` §4.4 HomePage Integration

**输出**: 
- `src/pages/HomePage.tsx` 更新
- `src/pages/HomePage.module.css` 更新

**验收标准**:
- [ ] 导入所有 Slide 组件
- [ ] Scroll Snap 配置正确
- [ ] 每个 Slide 高度 100vh
- [ ] 滚动自动吸附到 Slide

**实现**:

```tsx
export default function HomePage() {
  return (
    <div className={styles.slideContainer}>
      <CoverSlide />
      <WhatIsSlide />
      <HowItWorksSlide />
      <CapabilitiesSlide />
      <GetStartedSlide />
    </div>
  );
}
```

```css
.slideContainer {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}
```

---

### T-007: Header 导航联动

**优先级**: 🟢 中

**状态**: ⏳ pending

**依赖**: T-001, T-006

**输入**: 
- `spec.md` §10.2 Header 导航映射

**输出**: 
- Header 与 Slide 滚动联动

**验收标准**:
- [ ] 点击 "关于" → 滚动到 WhatIsSlide
- [ ] 点击 "流程" → 滚动到 HowItWorksSlide
- [ ] 点击 "团队" → 滚动到 CapabilitiesSlide
- [ ] 点击 "技能" → 跳转 /skills
- [ ] 滚动时自动更新 Header 导航高亮

**实现要点**:

```tsx
// 使用 Intersection Observer 检测当前 Slide
// 或者使用 scroll 事件监听
const scrollToSlide = (index: number) => {
  const container = document.querySelector('.slideContainer');
  const slide = container.children[index];
  slide?.scrollIntoView({ behavior: 'smooth' });
};
```

---

## Validation Tasks

### V-001: 构建验证

**优先级**: 🔴 最高

**执行时机**: T-006 完成后

**验收标准**:
- [ ] `npm run build` 无错误
- [ ] TypeScript 类型检查通过
- [ ] 无 console 错误

---

### V-002: 部署验证

**优先级**: 🟡 高

**执行时机**: V-001 通过后

**验收标准**:
- [ ] GitHub Actions 部署成功
- [ ] GitHub Pages 可访问
- [ ] 所有 Slide 正常显示
- [ ] Header 滚动效果正常
- [ ] 导航联动正常

---

## Implementation Sequence

```
T-001 (Header)
    │
    ├── T-002 (WhatIsSlide) ──┐
    │                          │
    ├── T-003 (HowItWorks)  ──┼──→ T-006 (Integration) ──→ T-007 (Nav Link)
    │                          │           │
    ├── T-004 (Capabilities) ─┤           │
    │                          │           │
    └── T-005 (GetStarted)  ──┘           │
                                           │
                                           ▼
                                        V-001 ──→ V-002
```

---

## Progress Tracking

| Task | 状态 | 完成时间 | 备注 |
|------|------|----------|------|
| T-001 | ⏳ | - | - |
| T-002 | ⏳ | - | - |
| T-003 | ⏳ | - | - |
| T-004 | ⏳ | - | - |
| T-005 | ⏳ | - | - |
| T-006 | ⏳ | - | - |
| T-007 | ⏳ | - | - |
| V-001 | ⏳ | - | - |
| V-002 | ⏳ | - | - |

**状态说明**:
- ⏳ pending - 待开始
- 🔄 in_progress - 进行中
- ✅ completed - 已完成
- ⏭️ skipped - 已跳过
- ❌ blocked - 被阻塞
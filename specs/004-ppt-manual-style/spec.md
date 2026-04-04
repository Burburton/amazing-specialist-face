# Feature: PPT Manual Style Redesign

## Metadata
```yaml
feature_id: 004-ppt-manual-style
status: ready-for-implementation
created: 2026-04-05
updated: 2026-04-05
author: ui-ux-designer
design_direction: "PPT 说明书风格"
```

## 1. Design Identity

### 1.1 产品性格

```yaml
personality:
  archetype: "极客"
  traits:
    - 专业
    - 可靠
    - 技术驱动
    - 工程化思维
    
  visual_voice: "PPT 说明书"
  description: |
    界面像一份交互式的技术说明书，每个区域是一个"Slide"，
    用户通过滚动或点击逐页浏览，理解产品价值。
```

### 1.2 核心价值传达

| 价值 | 视觉表达 | 交互表达 |
|------|----------|----------|
| **专业** | 深色背景 + 技术字体 + 精确数据 | 代码风格展示，技术术语 |
| **可靠** | 清晰层次 + 稳定配色 + 标准组件 | 可预测的导航，明确的反馈 |
| **极客** | 终端美学 + 等宽字体点缀 | 键盘导航，CLI 风格交互 |
| **团队** | 角色分工图 + 协作流程 | 点击探索每个角色 |

### 1.3 视觉语言

```yaml
visual_language:
  metaphor: "交互式 PPT + 技术文档"
  
  layout:
    style: "全屏 Slide"
    behavior: "滚动翻页 / 点击跳转"
    rhythm: "一屏一焦点"
    
  typography:
    headings: "Space Grotesk (技术感)"
    body: "Inter (可读性)"
    code: "JetBrains Mono (极客感)"
    
  color:
    background: "#09090b (深黑)"
    primary: "#8b5cf6 (Violet - 技术紫)"
    accent: "#10b981 (Emerald - 成功绿)"
    text: "#fafafa / #a1a1aa / #71717a"
    
  spacing:
    principle: "呼吸感"
    slide_padding: "64px horizontal"
    section_gap: "100vh (一屏一页)"
    
  animation:
    principle: "演示过渡"
    slide_transition: "fade + slide"
    element_reveal: "stagger fade-in"
```

---

## 2. Page Structure (Slide by Slide)

### 2.1 首页结构总览

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (固定导航)                                           │
│  [Logo]  [关于] [流程] [团队] [技能]           [GitHub]     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  SLIDE 1: 封面 (100vh)                                 │ │
│  │                                                         │ │
│  │              OpenCode 专家包                            │ │
│  │              ───────────────                            │ │
│  │              全自动产品研发闭环执行层                    │ │
│  │                                                         │ │
│  │              [ 开始探索 ]                               │ │
│  │                                                         │ │
│  │              ↓ 滚动继续                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  SLIDE 2: 它是什么 (100vh)                              │ │
│  │                                                         │ │
│  │  这是一个 6 角色协作的 AI 代理团队                       │ │
│  │                                                         │ │
│  │       ┌──────────┐                                      │ │
│  │       │ 架构师   │  规划与设计                          │ │
│  │       │  8 技能  │                                      │ │
│  │       └────┬─────┘                                      │ │
│  │            │                                            │ │
│  │            ▼                                            │ │
│  │       ┌──────────┐      ┌──────────┐                   │ │
│  │       │ 开发者   │ ───→ │ 测试员   │                   │ │
│  │       │ 12 技能  │      │ 6 技能   │                   │ │
│  │       └────┬─────┘      └──────────┘                   │ │
│  │            │                                            │ │
│  │            ▼                                            │ │
│  │       ┌──────────┐      ┌──────────┐                   │ │
│  │       │ 审查员   │ ←─── │ 文档员   │                   │ │
│  │       │ 5 技能   │      │ 4 技能   │                   │ │
│  │       └──────────┘      └──────────┘                   │ │
│  │            ↑                                            │ │
│  │       ┌────┴─────┐                                      │ │
│  │       │ 安全员   │                                      │ │
│  │       │ 3 技能   │                                      │ │
│  │       └──────────┘                                      │ │
│  │                                                         │ │
│  │  [点击角色查看详情]                                     │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  SLIDE 3: 它怎么工作 (100vh)                            │ │
│  │                                                         │ │
│  │  Spec → Plan → Implement → Test → Review → Deploy      │ │
│  │                                                         │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐                │ │
│  │  │   Spec  │  │   Plan  │  │Implement│                │ │
│  │  │ 需求定义 │  │ 方案设计 │  │ 代码实现 │                │ │
│  │  │         │  │         │  │         │                │ │
│  │  │ 点击展开 │  │ 点击展开 │  │ 点击展开 │                │ │
│  │  └─────────┘  └─────────┘  └─────────┘                │ │
│  │                                                         │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐                │ │
│  │  │  Test   │  │ Review  │  │ Deploy  │                │ │
│  │  │ 验证测试 │  │ 审查反馈 │  │ 部署上线 │                │ │
│  │  └─────────┘  └─────────┘  └─────────┘                │ │
│  │                                                         │ │
│  │  [查看完整流程文档 →]                                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  SLIDE 4: 能力统计 (100vh)                              │ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │                                                   │ │ │
│  │  │              43                                   │ │ │
│  │  │           专业技能                                │ │ │
│  │  │                                                   │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                                                         │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐      │ │
│  │  │     6      │  │    18      │  │     5      │      │ │
│  │  │  核心角色  │  │ Artifact   │  │  核心命令  │      │ │
│  │  └────────────┘  └────────────┘  └────────────┘      │ │
│  │                                                         │ │
│  │  [浏览技能库 →]                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  SLIDE 5: 快速入口 (100vh)                              │ │
│  │                                                         │ │
│  │  开始使用                                               │ │
│  │                                                         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │              │  │              │  │              │ │ │
│  │  │   📚 技能库   │  │   👥 角色分工 │  │   📋 契约    │ │ │
│  │  │              │  │              │  │              │ │ │
│  │  │  43 个技能   │  │  6 个角色    │  │  18 个契约   │ │ │
│  │  │              │  │              │  │              │ │ │
│  │  │  [进入 →]    │  │  [进入 →]    │  │  [进入 →]    │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  FOOTER                                                      │
│  OpenCode Expert Pack · MIT License · GitHub               │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Slide Specifications

### 3.1 SLIDE 1: 封面

**目的**: 品牌印象 + 一句话定位

```yaml
slide_1:
  name: "Cover"
  height: "100vh"
  layout: "center-center"
  
  elements:
    - type: "logo"
      content: "OpenCode 专家包"
      style:
        font: "Space Grotesk"
        size: "4rem"
        weight: "700"
        color: "gradient (primary → accent)"
        
    - type: "divider"
      style:
        width: "120px"
        height: "2px"
        background: "var(--color-border)"
        margin: "var(--space-4) auto"
        
    - type: "tagline"
      content: "全自动产品研发闭环执行层"
      style:
        font: "Inter"
        size: "1.25rem"
        color: "var(--color-text-secondary)"
        
    - type: "cta"
      content: "开始探索"
      style:
        margin_top: "var(--space-8)"
        button:
          background: "var(--color-primary)"
          color: "white"
          padding: "16px 48px"
          border_radius: "var(--radius-lg)"
          font: "Space Grotesk"
          font_size: "1rem"
          hover:
            transform: "translateY(-2px)"
            box_shadow: "var(--glow-primary)"
            
    - type: "scroll_hint"
      content: "↓ 滚动继续"
      style:
        position: "absolute"
        bottom: "var(--space-8)"
        font: "Inter"
        size: "0.875rem"
        color: "var(--color-text-muted)"
        animation: "bounce 2s infinite"
```

**交互**:
- 点击"开始探索" → 滚动到 Slide 2
- 滚动 → 进入 Slide 2

---

### 3.2 SLIDE 2: 它是什么

**目的**: 产品概念 + 角色关系

```yaml
slide_2:
  name: "What Is It"
  height: "100vh"
  layout: "vertical-center"
  
  elements:
    - type: "title"
      content: "这是一个 6 角色协作的 AI 代理团队"
      style:
        font: "Space Grotesk"
        size: "2rem"
        weight: "600"
        color: "var(--color-text-primary)"
        text_align: "center"
        margin_bottom: "var(--space-8)"
        
    - type: "role_tree"
      layout: "interactive tree"
      description: "可点击的角色节点树"
      style:
        node:
          background: "var(--color-surface)"
          border: "2px solid var(--role-color-400)"
          border_radius: "var(--radius-xl)"
          padding: "var(--space-3) var(--space-4)"
          cursor: "pointer"
          transition: "all 200ms"
        node_hover:
          transform: "scale(1.05)"
          box_shadow: "var(--shadow-lg)"
        connection:
          stroke: "var(--color-border)"
          stroke_width: "2px"
          
    - type: "hint"
      content: "[点击角色查看详情]"
      style:
        font: "Inter"
        size: "0.875rem"
        color: "var(--color-text-muted)"
        text_align: "center"
        margin_top: "var(--space-4)"
```

**角色树结构**:

```
                    ┌──────────┐
                    │ 架构师   │
                    │  🏛️      │
                    │  8 技能  │
                    └────┬─────┘
                         │
                         ▼
         ┌──────────┐         ┌──────────┐
         │ 开发者   │ ──────→ │ 测试员   │
         │  💻      │         │  🔍      │
         │ 12 技能  │         │  6 技能  │
         └────┬─────┘         └──────────┘
              │
              ▼
         ┌──────────┐         ┌──────────┐
         │ 审查员   │ ←────── │ 文档员   │
         │  ✅      │         │  📝      │
         │  5 技能  │         │  4 技能  │
         └──────────┘         └──────────┘
              ↑
         ┌────┴─────┐
         │ 安全员   │
         │  🔐      │
         │  3 技能  │
         └──────────┘
```

**交互**:
- 点击角色节点 → 展开详情面板（技能列表 + 职责）
- 滚动 → 进入 Slide 3

---

### 3.3 SLIDE 3: 它怎么工作

**目的**: 工作流程可视化

```yaml
slide_3:
  name: "How It Works"
  height: "100vh"
  layout: "vertical-center"
  
  elements:
    - type: "title"
      content: "它怎么工作"
      style:
        font: "Space Grotesk"
        size: "2rem"
        weight: "600"
        margin_bottom: "var(--space-6)"
        
    - type: "flow_steps"
      layout: "horizontal cards"
      items:
        - id: "spec"
          title: "Spec"
          subtitle: "需求定义"
          role: "architect"
          description: "分析需求，定义规格"
          click_action: "expand detail"
          
        - id: "plan"
          title: "Plan"
          subtitle: "方案设计"
          role: "architect"
          description: "设计方案，规划任务"
          click_action: "expand detail"
          
        - id: "implement"
          title: "Implement"
          subtitle: "代码实现"
          role: "developer"
          description: "编写代码，实现功能"
          click_action: "expand detail"
          
        - id: "test"
          title: "Test"
          subtitle: "验证测试"
          role: "tester"
          description: "编写测试，验证质量"
          click_action: "expand detail"
          
        - id: "review"
          title: "Review"
          subtitle: "审查反馈"
          role: "reviewer"
          description: "代码审查，提供反馈"
          click_action: "expand detail"
          
        - id: "deploy"
          title: "Deploy"
          subtitle: "部署上线"
          role: "developer"
          description: "部署应用，监控运行"
          click_action: "expand detail"
          
      style:
        card:
          width: "180px"
          height: "160px"
          background: "var(--color-surface)"
          border: "1px solid var(--color-border)"
          border_radius: "var(--radius-xl)"
          padding: "var(--space-4)"
          cursor: "pointer"
        card_hover:
          border_color: "var(--color-primary)"
          transform: "translateY(-4px)"
          box_shadow: "var(--shadow-lg)"
        title:
          font: "JetBrains Mono"
          size: "1.25rem"
          color: "var(--color-primary)"
        subtitle:
          font: "Inter"
          size: "0.875rem"
          color: "var(--color-text-secondary)"
          
    - type: "link"
      content: "查看完整流程文档 →"
      href: "/docs/workflow"
      style:
        margin_top: "var(--space-8)"
        font: "Inter"
        size: "0.875rem"
        color: "var(--color-primary)"
```

**交互**:
- 点击流程卡片 → 展开该阶段详情（涉及角色 + 输入输出）
- 滚动 → 进入 Slide 4

---

### 3.4 SLIDE 4: 能力统计

**目的**: 核心数据展示

```yaml
slide_4:
  name: "Capabilities"
  height: "100vh"
  layout: "vertical-center"
  
  elements:
    - type: "hero_stat"
      value: "43"
      label: "专业技能"
      description: "覆盖开发、测试、安全等全流程"
      style:
        value_font: "Space Grotesk"
        value_size: "8rem"
        value_weight: "700"
        value_color: "gradient (primary → accent)"
        label_font: "Inter"
        label_size: "1.5rem"
        label_color: "var(--color-text-secondary)"
        
    - type: "sub_stats"
      layout: "horizontal"
      gap: "var(--space-8)"
      items:
        - value: "6"
          label: "核心角色"
        - value: "18"
          label: "Artifact 契约"
        - value: "5"
          label: "核心命令"
      style:
        value_font: "Space Grotesk"
        value_size: "2.5rem"
        value_weight: "600"
        value_color: "var(--color-text-primary)"
        label_font: "Inter"
        label_size: "1rem"
        label_color: "var(--color-text-muted)"
        
    - type: "cta"
      content: "浏览技能库 →"
      href: "/skills"
      style:
        margin_top: "var(--space-8)"
```

**交互**:
- 点击"浏览技能库" → 跳转技能页
- 滚动 → 进入 Slide 5

---

### 3.5 SLIDE 5: 快速入口

**目的**: 导航到具体页面

```yaml
slide_5:
  name: "Get Started"
  height: "100vh"
  layout: "vertical-center"
  
  elements:
    - type: "title"
      content: "开始使用"
      style:
        font: "Space Grotesk"
        size: "2rem"
        weight: "600"
        margin_bottom: "var(--space-8)"
        
    - type: "entry_cards"
      layout: "horizontal"
      gap: "var(--space-4)"
      items:
        - icon: "📚"
          title: "技能库"
          count: "43 个技能"
          href: "/skills"
          
        - icon: "👥"
          title: "角色分工"
          count: "6 个角色"
          href: "/roles"
          
        - icon: "📋"
          title: "契约规范"
          count: "18 个契约"
          href: "/contracts"
          
      style:
        card:
          width: "280px"
          height: "200px"
          background: "var(--color-surface)"
          border: "1px solid var(--color-border)"
          border_radius: "var(--radius-xl)"
          padding: "var(--space-6)"
          cursor: "pointer"
          transition: "all 200ms"
        card_hover:
          border_color: "var(--color-primary)"
          transform: "translateY(-4px)"
          box_shadow: "var(--shadow-lg)"
        icon:
          font_size: "3rem"
          margin_bottom: "var(--space-3)"
        title:
          font: "Space Grotesk"
          size: "1.25rem"
          weight: "600"
          color: "var(--color-text-primary)"
        count:
          font: "Inter"
          size: "0.875rem"
          color: "var(--color-text-muted)"
```

**交互**:
- 点击卡片 → 跳转对应页面
- 滚动 → 进入 Footer

---

## 4. Interaction Patterns

### 4.1 Slide Navigation

```yaml
navigation:
  methods:
    - type: "scroll"
      behavior: "snap to slide"
      animation: "smooth scroll"
      
    - type: "header_nav"
      items: ["关于", "流程", "团队", "技能"]
      click: "scroll to slide"
      
    - type: "cta_buttons"
      labels: ["开始探索", "浏览技能库", "进入"]
      click: "scroll or navigate"
      
    - type: "keyboard"
      keys:
        - "↓ / Space": "next slide"
        - "↑": "previous slide"
        - "Home": "first slide"
        - "End": "last slide"
```

### 4.2 Role Detail Panel

```yaml
role_panel:
  trigger: "click role node"
  
  layout: "right sidebar"
  width: "400px"
  
  content:
    - section: "role_header"
      elements:
        - emoji: "role emoji"
        - name: "role name"
        - mission: "role mission"
        
    - section: "responsibilities"
      title: "职责范围"
      elements: "inScope list"
      
    - section: "skills"
      title: "技能列表"
      elements: "skill cards"
      
    - section: "collaboration"
      title: "协作流程"
      elements: "workflow connections"
      
  close:
    methods:
      - "click X button"
      - "click overlay"
      - "press Escape"
```

### 4.3 Flow Step Detail

```yaml
flow_detail:
  trigger: "click flow step card"
  
  layout: "modal overlay"
  width: "600px"
  
  content:
    - section: "header"
      elements:
        - title: "step name"
        - subtitle: "step description"
        
    - section: "involved_roles"
      title: "涉及角色"
      elements: "role avatars with links"
      
    - section: "inputs"
      title: "输入"
      elements: "required artifacts list"
      
    - section: "outputs"
      title: "输出"
      elements: "produced artifacts list"
      
  close:
    methods:
      - "click X button"
      - "click overlay"
      - "press Escape"
```

---

## 5. Component Specifications

### 5.1 Slide Container

```tsx
interface SlideProps {
  id: string;
  height?: '100vh' | 'auto';
  backgroundColor?: string;
  children: React.ReactNode;
}

// Usage
<Slide id="cover" height="100vh">
  <CoverContent />
</Slide>
```

```css
.slide {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-8) var(--space-4);
  scroll-snap-align: start;
}

.slideContainer {
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  height: 100vh;
}
```

### 5.2 Role Node

```tsx
interface RoleNodeProps {
  id: string;
  name: string;
  emoji: string;
  skillCount: number;
  color: string;
  onClick: () => void;
}
```

```css
.roleNode {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-surface);
  border: 2px solid var(--node-color);
  border-radius: var(--radius-xl);
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  transition: 
    transform var(--duration-normal) var(--ease-spring),
    box-shadow var(--duration-normal) var(--ease-spring);
}

.roleNode:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-lg);
}

.roleNode:focus-visible {
  outline: none;
  box-shadow: var(--ring-focus);
}
```

### 5.3 Flow Step Card

```tsx
interface FlowStepCardProps {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  onClick: () => void;
}
```

```css
.flowStepCard {
  width: 180px;
  height: 160px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-4);
  cursor: pointer;
  transition: 
    transform var(--duration-normal) var(--ease-spring),
    border-color var(--duration-normal) var(--ease-spring),
    box-shadow var(--duration-normal) var(--ease-spring);
}

.flowStepCard:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

### 5.4 Hero Stat

```tsx
interface HeroStatProps {
  value: string | number;
  label: string;
  description?: string;
}
```

```css
.heroStat {
  text-align: center;
}

.heroStatValue {
  font-family: var(--font-display);
  font-size: 8rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.heroStatLabel {
  font-family: var(--font-sans);
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  margin-top: var(--space-2);
}
```

### 5.5 Entry Card

```tsx
interface EntryCardProps {
  icon: string;
  title: string;
  count: string;
  href: string;
}
```

```css
.entryCard {
  width: 280px;
  height: 200px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: 
    transform var(--duration-normal) var(--ease-spring),
    border-color var(--duration-normal) var(--ease-spring),
    box-shadow var(--duration-normal) var(--ease-spring);
}

.entryCard:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.entryCardIcon {
  font-size: 3rem;
  margin-bottom: var(--space-3);
}

.entryCardTitle {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.entryCardCount {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-top: var(--space-1);
}
```

---

## 6. Animation Specifications

### 6.1 Slide Transitions

```css
/* Scroll Snap */
.slideContainer {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.slide {
  scroll-snap-align: start;
}

/* Scroll Hint Bounce */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(8px);
  }
  60% {
    transform: translateY(4px);
  }
}

.scrollHint {
  animation: bounce 2s infinite;
}
```

### 6.2 Element Reveal

```css
/* Stagger Fade-in */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slideElement {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.slideElement:nth-child(1) { animation-delay: 0.1s; }
.slideElement:nth-child(2) { animation-delay: 0.2s; }
.slideElement:nth-child(3) { animation-delay: 0.3s; }
.slideElement:nth-child(4) { animation-delay: 0.4s; }

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .slideElement {
    animation: none;
    opacity: 1;
  }
  
  .scrollHint {
    animation: none;
  }
}
```

### 6.3 Interaction Feedback

```css
/* Hover Lift */
.interactiveElement {
  transition: 
    transform var(--duration-normal) var(--ease-spring),
    box-shadow var(--duration-normal) var(--ease-spring);
}

.interactiveElement:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Click Press */
.interactiveElement:active {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Focus Ring */
.interactiveElement:focus-visible {
  outline: none;
  box-shadow: var(--ring-focus);
}
```

---

## 7. Accessibility

### 7.1 Keyboard Navigation

```yaml
keyboard:
  global:
    - key: "↓ / Space"
      action: "Scroll to next slide"
    - key: "↑"
      action: "Scroll to previous slide"
    - key: "Home"
      action: "Go to first slide"
    - key: "End"
      action: "Go to last slide"
      
  interactive_elements:
    - element: "role_node"
      key: "Tab"
      action: "Focus next node"
    - element: "role_node"
      key: "Enter / Space"
      action: "Open detail panel"
    - element: "flow_step"
      key: "Enter / Space"
      action: "Open detail modal"
    - element: "modal"
      key: "Escape"
      action: "Close modal"
```

### 7.2 ARIA Attributes

```tsx
// Slide
<section
  role="region"
  aria-label={slideTitle}
  aria-roledescription="slide"
>

// Role Node
<button
  role="button"
  aria-label={`${roleName} - ${skillCount} 技能`}
  aria-expanded={isPanelOpen}
>

// Detail Panel
<aside
  role="dialog"
  aria-modal="true"
  aria-label={`${roleName} 详情`}
>

// Flow Step Card
<button
  role="button"
  aria-label={`${stepTitle} - ${stepSubtitle}`}
  aria-expanded={isModalOpen}
>
```

### 7.3 Focus Management

```yaml
focus_management:
  on_panel_open:
    action: "Move focus to panel"
    element: "panel container"
    
  on_panel_close:
    action: "Return focus to trigger"
    element: "role node or flow card"
    
  on_slide_change:
    action: "Announce slide title"
    element: "aria-live region"
```

---

## 8. Responsive Design

### 8.1 Breakpoints

```yaml
breakpoints:
  desktop:
    min: 1280px
    slide_height: 100vh
    flow_cards_per_row: 6
    entry_cards_per_row: 3
    
  tablet:
    min: 768px
    max: 1279px
    slide_height: auto (min 100vh)
    flow_cards_per_row: 3
    entry_cards_per_row: 3
    
  mobile:
    max: 767px
    slide_height: auto (min 100vh)
    flow_cards_per_row: 2
    entry_cards_per_row: 1
```

### 8.2 Layout Adjustments

```css
/* Desktop: Full slide layout */
@media (min-width: 1280px) {
  .slide {
    height: 100vh;
    padding: var(--space-8);
  }
  
  .flowStepsGrid {
    grid-template-columns: repeat(6, 1fr);
  }
  
  .entryCardsGrid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Tablet: Compact layout */
@media (min-width: 768px) and (max-width: 1279px) {
  .slide {
    min-height: 100vh;
    padding: var(--space-6);
  }
  
  .flowStepsGrid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .entryCardsGrid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Mobile: Stack layout */
@media (max-width: 767px) {
  .slide {
    min-height: 100vh;
    padding: var(--space-4);
  }
  
  .heroStatValue {
    font-size: 5rem;
  }
  
  .flowStepsGrid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .entryCardsGrid {
    grid-template-columns: 1fr;
  }
  
  .entryCard {
    width: 100%;
    max-width: 320px;
  }
}
```

---

## 9. Technical Implementation

### 9.1 File Structure

```
src/
├── pages/
│   └── HomePage.tsx              # Main slide container
│
├── components/
│   ├── slides/
│   │   ├── CoverSlide.tsx        # Slide 1: 封面
│   │   ├── WhatIsSlide.tsx       # Slide 2: 它是什么
│   │   ├── HowItWorksSlide.tsx   # Slide 3: 它怎么工作
│   │   ├── CapabilitiesSlide.tsx # Slide 4: 能力统计
│   │   └── GetStartedSlide.tsx   # Slide 5: 快速入口
│   │
│   ├── RoleNode.tsx              # 可点击的角色节点
│   ├── RoleDetailPanel.tsx       # 角色详情侧边栏
│   ├── FlowStepCard.tsx          # 流程步骤卡片
│   ├── FlowDetailModal.tsx       # 流程详情模态框
│   ├── HeroStat.tsx              # 大号统计数字
│   ├── EntryCard.tsx             # 入口卡片
│   └── ScrollHint.tsx            # 滚动提示
│
└── styles/
    ├── slides.module.css         # Slide 样式
    └── tokens.css                # Design tokens
```

### 9.2 Key Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-router-dom": "^7.0.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "typescript": "^5.0.0"
  }
}
```

### 9.3 CSS Scroll Snap

```css
/* Enable scroll snap */
.slideContainer {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.slide {
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

---

## 10. Header Design Specification

### 10.1 Header 视觉风格

**PPT Manual Style Header 特点**：
- 极简：只保留核心导航
- 透明：Slide 内容在下方可见
- 渐变消失：滚动时背景渐变显现
- 等宽字体点缀：极客感

```yaml
header:
  layout: "horizontal"
  height: "64px"
  position: "fixed"
  
  style:
    default:
      background: "transparent"
      border: "none"
    scrolled:
      background: "rgba(9, 9, 11, 0.9)"
      border_bottom: "1px solid var(--color-border)"
      backdrop_filter: "blur(12px)"
      
  elements:
    left:
      - type: "logo"
        content: "OpenCode"
        style:
          font: "Space Grotesk"
          size: "1.25rem"
          weight: "600"
          color: "var(--color-text-primary)"
          
    center:
      - type: "slide_nav"
        items: ["关于", "流程", "团队", "技能"]
        style:
          font: "JetBrains Mono"
          size: "0.875rem"
          color: "var(--color-text-muted)"
          active_color: "var(--color-primary)"
          
    right:
      - type: "github_link"
        icon: "GitHub"
        href: "https://github.com/Burburton/amazing-specialists"
```

### 10.2 Header 导航映射

| Nav Item | 点击行为 | 对应 Slide |
|----------|----------|-----------|
| **关于** | 滚动到 Slide 2 | WhatIsSlide |
| **流程** | 滚动到 Slide 3 | HowItWorksSlide |
| **团队** | 滚动到 Slide 4 | CapabilitiesSlide |
| **技能** | 跳转页面 | /skills |

### 10.3 Header 交互

```yaml
interactions:
  scroll_behavior:
    initial:
      background: "transparent"
      opacity: 1
    after_scroll:
      background: "rgba(9, 9, 11, 0.9)"
      backdrop_filter: "blur(12px)"
      border_bottom: "1px solid var(--color-border)"
      
  nav_click:
    slide_nav:
      action: "scroll to slide"
      animation: "smooth scroll"
    page_nav:
      action: "navigate to page"
      
  hover:
    nav_item:
      color: "var(--color-text-primary)"
      background: "var(--color-surface-elevated)"
      border_radius: "var(--radius-md)"
```

### 10.4 Header 组件规范

```tsx
interface HeaderProps {
  currentSlide: number;  // 当前可见的 slide index
}

// Nav Items
const SLIDE_NAVS = [
  { id: 'about', label: '关于', slideIndex: 1 },
  { id: 'process', label: '流程', slideIndex: 2 },
  { id: 'team', label: '团队', slideIndex: 3 },
];

const PAGE_NAVS = [
  { id: 'skills', label: '技能', path: '/skills' },
];
```

### 10.5 Header CSS

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-4);
  z-index: var(--z-sticky);
  transition: 
    background-color var(--duration-normal) var(--ease-default),
    border-color var(--duration-normal) var(--ease-default),
    backdrop-filter var(--duration-normal) var(--ease-default);
}

.header.scrolled {
  background-color: rgba(9, 9, 11, 0.9);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
}

.logo {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  text-decoration: none;
}

.slideNav {
  display: flex;
  gap: var(--space-1);
}

.slideNavItem {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--color-text-muted);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  text-decoration: none;
  cursor: pointer;
  transition: 
    color var(--duration-fast) var(--ease-default),
    background-color var(--duration-fast) var(--ease-default);
}

.slideNavItem:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface-elevated);
}

.slideNavItem.active {
  color: var(--color-primary);
}

.githubLink {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: 
    color var(--duration-fast) var(--ease-default),
    background-color var(--duration-fast) var(--ease-default);
}

.githubLink:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface-elevated);
}
```

---

## 11. Comparison: Before vs After

### 10.1 Visual Comparison

| 维度 | Before (Dashboard 风格) | After (PPT 说明书风格) |
|------|------------------------|----------------------|
| **布局** | 信息密集，多列网格 | 一屏一焦点，全屏 Slide |
| **导航** | 点击页面链接 | 滚动翻页 + 点击探索 |
| **信息层次** | 多层级并排 | 逐页展开，叙事感 |
| **Hero** | 标题 + 统计 + Highlights | 品牌 + 一句话 + CTA |
| **流程图** | 静态展示 | 可点击节点 + 详情面板 |
| **统计** | 4 列网格 | 1 个 Hero Stat + 3 个 Sub Stat |
| **入口** | 底部功能列表 | 独立 Slide，大卡片 |

### 10.2 Interaction Comparison

| 维度 | Before | After |
|------|--------|-------|
| **滚动** | 自然滚动 | Scroll Snap 翻页 |
| **点击** | 跳转页面 | 展开详情面板 |
| **键盘** | 部分 Tab | 完整导航 (↑↓ Space Escape) |
| **动画** | 卡片 hover | Slide transition + stagger reveal |
| **ARIA** | 部分 | 完整 (slide, dialog, modal) |

---

## 11. Implementation Roadmap

### Phase 1: Structure (1-2 hours)
- [ ] Create slide container with scroll snap
- [ ] Create individual slide components
- [ ] Update HomePage to use slide structure

### Phase 2: Components (2-3 hours)
- [ ] Implement RoleNode with click interaction
- [ ] Implement RoleDetailPanel sidebar
- [ ] Implement FlowStepCard with detail modal
- [ ] Implement HeroStat and EntryCard

### Phase 3: Animation (1-2 hours)
- [ ] Add scroll snap behavior
- [ ] Add stagger fade-in animations
- [ ] Add hover and click animations
- [ ] Add reduced motion support

### Phase 4: Accessibility (1 hour)
- [ ] Add ARIA attributes
- [ ] Implement keyboard navigation
- [ ] Implement focus management
- [ ] Test with screen reader

### Phase 5: Responsive (1 hour)
- [ ] Adjust layouts for tablet/mobile
- [ ] Test on multiple devices
- [ ] Ensure touch interactions work

---

## 12. Success Criteria

### 12.1 Visual Criteria
- [ ] Each slide has one clear focus
- [ ] Typography hierarchy is clear (title > subtitle > body)
- [ ] Color usage is intentional (primary for brand, accent for emphasis)
- [ ] Spacing creates breathing room

### 12.2 Interaction Criteria
- [ ] Scroll snap works smoothly
- [ ] Role nodes are clickable and show detail panel
- [ ] Flow cards are clickable and show detail modal
- [ ] Keyboard navigation works (↑↓ Space Escape)

### 12.3 Accessibility Criteria
- [ ] All interactive elements have ARIA labels
- [ ] Focus is visible on all interactive elements
- [ ] Screen reader can navigate slides
- [ ] Reduced motion is respected

### 12.4 Performance Criteria
- [ ] Initial load is fast (< 2s)
- [ ] Scroll is smooth (60fps)
- [ ] Animations don't cause layout thrashing

---

## 14. Open Questions

| ID | Question | Decision | Status |
|----|----------|----------|--------|
| OQ-001 | 是否需要 Slide 导航指示器？ | Header 导航即可 | ✅ 已确认 |
| OQ-002 | Header 是否需要固定？ | 固定 + 滚动时背景渐变 | ✅ 已确认 |
| OQ-003 | 移动端是否保持 scroll snap？ | 保持 | ✅ 已确认 |
| OQ-004 | 是否需要 Slide 转场动画？ | 暂不添加，保持简洁 | ✅ 已确认 |

---

## 14. References

- Linear (暗色模式 + 技术美学)
- Vercel (简洁 + 等宽字体点缀)
- Stripe Docs (叙事感 + 渐进式信息披露)
- Apple Keynote (全屏 Slide + 演示风格)
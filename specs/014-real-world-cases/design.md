# Feature 014: Real-World Case Studies - Design Document

## 设计概览

### 目标用户
- 编程小白，不知道何时使用哪个 skill
- 想了解专家包能帮他们解决什么实际问题

### 设计目标
- 展示真实项目案例，让用户理解 skill 的实际应用场景
- 清晰展示每个案例的完整开发流程链条
- 可交互，点击跳转到对应 skill 详情

---

## 设计方向

### Aesthetic Direction: Editorial/Magazine
- 清晰的信息层级
- 卡片式案例展示
- 时间线式流程可视化
- 强调阅读体验

### Color Strategy
- 保持现有设计系统
- 案例卡片使用微妙的渐变背景区分
- 状态标签使用语义化颜色（成功/进行中/完成）

---

## 页面结构

### Route
```
/cases → CasesPage
```

### 布局方案

```
┌─────────────────────────────────────────────────────────────────┐
│  Header (导航栏)                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  真实案例                                                    ││
│  │  看看专家包如何在真实项目中发挥作用                           ││
│  │                                                              ││
│  │  [全部] [用户认证] [数据处理] [API开发] [性能优化]           ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                                                              ││
│  │  Case Card 1: 用户登录系统                                   ││
│  │  ┌─────────────────────────────────────────────────────────┐││
│  │  │ 场景描述                                                │││
│  │  │ "你的网站需要添加用户登录功能，支持邮箱和手机号登录"    │││
│  │  │                                                         │││
│  │  │ 涉及技能 ───────────────────────────────────────────    │││
│  │  │                                                         │││
│  │  │  ① 需求设计 ──→ ② 代码实现 ──→ ③ 测试验证            │││
│  │  │  architect    developer     tester                      │││
│  │  │     ↓            ↓            ↓                         │││
│  │  │  [查看详情]   [查看详情]   [查看详情]                    │││
│  │  │                                                         │││
│  │  │  ④ 代码审查 ──→ ⑤ 安全审计 ──→ ⑥ 文档编写            │││
│  │  │  reviewer     security      docs                        │││
│  │  │     ↓            ↓            ↓                         │││
│  │  │  [查看详情]   [查看详情]   [查看详情]                    │││
│  │  │                                                         │││
│  │  │ 预计时间: 2-3 小时    节省时间: 40%                     │││
│  │  └─────────────────────────────────────────────────────────┘││
│  │                                                              ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Case Card 2: 电商订单系统                                   ││
│  │  ...                                                         ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 组件设计

### 1. CasesPage

**文件**: `src/pages/CasesPage.tsx`

**结构**:
```
CasesPage
├── PageHeader (标题 + 描述)
├── CategoryFilter (分类筛选)
└── CaseCardGrid (案例卡片网格)
    └── CaseCard[] (多个案例卡片)
```

### 2. CaseCard 组件

**文件**: `src/components/cases/CaseCard.tsx`

**Props**:
```typescript
interface CaseCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: {
    step: number;
    skillId: string;
    skillName: string;
    role: string;
    action: string;
  }[];
  estimatedTime: string;
  timeSaved: string;
}
```

**布局**:
```
┌───────────────────────────────────────────────────────────────┐
│  🏷️ category-badge              用户登录系统                  │
│                                                                │
│  "你的网站需要添加用户登录功能，支持邮箱和手机号登录"         │
│                                                                │
│  ────────────────────────────────────────────────────────────│
│  开发流程                                                      │
│                                                                │
│  ┌───────┐    ┌───────┐    ┌───────┐                         │
│  │ ①     │ →  │ ②     │ →  │ ③     │                         │
│  │需求   │    │开发   │    │测试   │                         │
│  │architect│  │developer│  │tester │                         │
│  │[详情] │    │[详情] │    │[详情] │                         │
│  └───────┘    └───────┘    └───────┘                         │
│       ↓            ↓            ↓                              │
│  ┌───────┐    ┌───────┐    ┌───────┐                         │
│  │ ④     │ →  │ ⑤     │ →  │ ⑥     │                         │
│  │审查   │    │安全   │    │文档   │                         │
│  │reviewer│   │security│   │docs   │                         │
│  │[详情] │    │[详情] │    │[详情] │                         │
│  └───────┘    └───────┘    └───────┘                         │
│                                                                │
│  ────────────────────────────────────────────────────────────│
│  ⏱️ 预计: 2-3 小时          💰 节省: 40%                      │
└───────────────────────────────────────────────────────────────┘
```

### 3. SkillFlowItem 组件

**文件**: `src/components/cases/SkillFlowItem.tsx`

**Props**:
```typescript
interface SkillFlowItemProps {
  step: number;
  skillId: string;
  skillName: string;
  role: string;
  action: string;
  isLast?: boolean;
}
```

**样式**:
- 圆角卡片
- 角色标签带颜色
- Hover 效果：阴影 + 边框变色
- 点击跳转到 skill 详情页

---

## 案例数据结构

```typescript
// src/data/cases.json
{
  "cases": [
    {
      "id": "user-auth",
      "title": "用户登录系统",
      "description": "你的网站需要添加用户登录功能，支持邮箱和手机号登录，需要记住登录状态",
      "category": "auth",
      "skills": [
        { "step": 1, "skillId": "architect/requirement-to-design", "skillName": "需求设计", "role": "architect", "action": "设计方案" },
        { "step": 2, "skillId": "developer/feature-implementation", "skillName": "功能实现", "role": "developer", "action": "编写代码" },
        { "step": 3, "skillId": "tester/unit-test-design", "skillName": "单元测试", "role": "tester", "action": "编写测试" },
        { "step": 4, "skillId": "reviewer/code-review-checklist", "skillName": "代码审查", "role": "reviewer", "action": "检查代码" },
        { "step": 5, "skillId": "security/auth-and-permission-review", "skillName": "安全审计", "role": "security", "action": "安全检查" },
        { "step": 6, "skillId": "docs/user-guide-update", "skillName": "文档编写", "role": "docs", "action": "编写文档" }
      ],
      "estimatedTime": "2-3 小时",
      "timeSaved": "40%"
    },
    {
      "id": "ecommerce-order",
      "title": "电商订单系统",
      "description": "实现商品下单、支付、发货、退款等完整订单流程",
      "category": "data",
      "skills": [
        { "step": 1, "skillId": "architect/module-boundary-design", "skillName": "模块设计", "role": "architect", "action": "定义边界" },
        { "step": 2, "skillId": "architect/interface-contract-design", "skillName": "接口设计", "role": "architect", "action": "设计契约" },
        { "step": 3, "skillId": "developer/feature-implementation", "skillName": "功能实现", "role": "developer", "action": "编写代码" },
        { "step": 4, "skillId": "tester/integration-test-design", "skillName": "集成测试", "role": "tester", "action": "测试流程" },
        { "step": 5, "skillId": "reviewer/code-review-checklist", "skillName": "代码审查", "role": "reviewer", "action": "检查代码" }
      ],
      "estimatedTime": "4-6 小时",
      "timeSaved": "35%"
    },
    {
      "id": "api-design",
      "title": "RESTful API 开发",
      "description": "设计并实现一套标准的 RESTful API 接口",
      "category": "api",
      "skills": [
        { "step": 1, "skillId": "architect/interface-contract-design", "skillName": "接口设计", "role": "architect", "action": "设计契约" },
        { "step": 2, "skillId": "developer/feature-implementation", "skillName": "功能实现", "role": "developer", "action": "编写代码" },
        { "step": 3, "skillId": "security/input-validation-review", "skillName": "输入验证", "role": "security", "action": "检查输入" },
        { "step": 4, "skillId": "tester/api-test-design", "skillName": "API 测试", "role": "tester", "action": "测试接口" },
        { "step": 5, "skillId": "docs/api-doc-update", "skillName": "API 文档", "role": "docs", "action": "编写文档" }
      ],
      "estimatedTime": "3-4 小时",
      "timeSaved": "45%"
    },
    {
      "id": "code-refactor",
      "title": "代码重构优化",
      "description": "重构老旧代码，提升代码质量和可维护性",
      "category": "optimization",
      "skills": [
        { "step": 1, "skillId": "reviewer/maintainability-review", "skillName": "可维护性评估", "role": "reviewer", "action": "评估现状" },
        { "step": 2, "skillId": "architect/tradeoff-analysis", "skillName": "权衡分析", "role": "architect", "action": "分析方案" },
        { "step": 3, "skillId": "developer/refactor-safely", "skillName": "安全重构", "role": "developer", "action": "重构代码" },
        { "step": 4, "skillId": "tester/regression-analysis", "skillName": "回归测试", "role": "tester", "action": "验证功能" }
      ],
      "estimatedTime": "2-4 小时",
      "timeSaved": "50%"
    }
  ],
  "categories": [
    { "id": "all", "label": "全部" },
    { "id": "auth", "label": "用户认证" },
    { "id": "data", "label": "数据处理" },
    { "id": "api", "label": "API开发" },
    { "id": "optimization", "label": "性能优化" }
  ]
}
```

---

## 交互设计

### 1. 分类筛选
- 点击分类标签筛选案例
- 当前选中状态高亮
- 平滑过渡动画

### 2. 技能卡片点击
- 点击技能卡片跳转到对应 skill 详情页
- Hover 时显示阴影效果
- 鼠标指针变为手型

### 3. 响应式布局
- 桌面端：2 列卡片网格
- 平板：单列卡片
- 移动端：流程图垂直排列

---

## 导航入口

### 1. Header 导航
```
关于 | 流程 | 团队 | 教程 | 案例 | 技能
```

### 2. 首页入口
在 GetStartedSlide 添加案例卡片：
```
新手教程 | 真实案例 | 技能库 | 角色分工
```

### 3. 教程页面入口
在 TutorialNextSlide 添加学习路径：
```
查看真实案例 → 了解专家包如何解决实际问题
```

---

## 样式规范

### 颜色
- 卡片背景: `var(--color-bg-secondary)`
- 边框: `var(--color-border-primary)`
- 角色标签: 各角色对应的颜色变量
- 链接: `var(--color-accent-primary)`

### 间距
- 卡片内边距: `var(--spacing-6)`
- 卡片间距: `var(--spacing-4)`
- 流程步骤间距: `var(--spacing-2)`

### 字体
- 标题: `var(--font-size-xl)` / `var(--font-weight-bold)`
- 描述: `var(--font-size-md)` / `var(--font-weight-normal)`
- 标签: `var(--font-size-sm)` / `var(--font-weight-medium)`

---

## 文件清单

```
src/
├── pages/
│   ├── CasesPage.tsx
│   └── CasesPage.module.css
├── components/
│   └── cases/
│       ├── CaseCard.tsx
│       ├── CaseCard.module.css
│       ├── SkillFlowItem.tsx
│       ├── SkillFlowItem.module.css
│       └── CategoryFilter.tsx
├── data/
│   └── cases.json
└── App.tsx (添加路由)
```

---

## 设计确认清单

请确认以下设计方向：

- [ ] 页面布局：卡片网格 + 流程可视化
- [ ] 交互方式：点击跳转 skill 详情
- [ ] 案例数量：4 个初始案例
- [ ] 导航入口：Header + 首页 + 教程页
- [ ] 响应式：移动端垂直布局
- [ ] 样式风格：与现有 PPT Manual Style 一致

---

## 下一步

确认设计后，我将：
1. 创建 spec.md 文件
2. 创建 plan.md 文件
3. 开始实现
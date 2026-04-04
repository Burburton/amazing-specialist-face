# Skill: design-consultant

## Metadata
```yaml
plugin_id: ui-ux-designer
plugin_version: 1.0.0
role: UI/UX Designer
phase: design
```

## Purpose

作为 UI/UX 设计顾问，分析产品需求并输出完整的设计方案。这是设计流程的第一步，在编码之前先做设计。

## When to Use

**必须使用时：**
- 新功能开发前
- 页面重构前
- 产品需求评审后
- 用户体验优化

**推荐使用时：**
- 设计评审
- 技术方案评审

## When Not to Use

**不适用场景：**
- 纯后端开发
- Bug 修复
- 小型样式调整

## Design Process

### Phase 1: 需求分析

**输入：**
- 产品需求文档
- 用户故事
- 功能清单

**输出：**
- 用户画像分析
- 核心用户任务
- 关键交互场景

### Phase 2: 信息架构

**输出：**
```
信息架构图

├── 首页
│   ├── Hero 区域
│   │   ├── 标题 + 副标题
│   │   ├── CTA 按钮
│   │   └── 背景视觉
│   ├── 功能展示
│   │   ├── 卡片 1
│   │   ├── 卡片 2
│   │   └── 卡片 3
│   └── 底部导航
│
├── 列表页
│   ├── 筛选区
│   ├── 列表区
│   └── 分页
│
└── 详情页
    ├── 头部信息
    ├── 内容区
    └── 操作区
```

### Phase 3: 设计方向

**输出设计关键词：**

| 维度 | 方向 | 具体表现 |
|------|------|----------|
| **风格** | Technical / Minimal / Playful | 简洁专业 / 极简主义 / 活泼有趣 |
| **基调** | Professional / Friendly / Premium | 专业可信 / 亲切友好 / 高端质感 |
| **参考** | Linear / Vercel / Stripe | 设计参考对象 |

### Phase 4: 设计规范

**输出：**

```yaml
design_spec:
  style: "Developer Tool"
  
  color_palette:
    primary: "#8b5cf6"
    accent: "#10b981"
    background: "#09090b"
    surface: "#18181b"
    
  typography:
    display: "Space Grotesk"
    body: "Inter"
    mono: "JetBrains Mono"
    
  spacing:
    grid: "8pt"
    section_gap: "64px"
    element_gap: "16px"
    
  components:
    cards:
      style: "elevated"
      border_radius: "12px"
      shadow: "lg"
    buttons:
      style: "rounded"
      primary: "solid"
      secondary: "outline"
```

## Output Requirements

```yaml
design_consultation_report:
  project: string
  date: string
  
  analysis:
    user_personas: [...]
    core_tasks: [...]
    key_scenarios: [...]
    
  information_architecture:
    diagram: string
    pages: [...]
    
  design_direction:
    style: string
    tone: string
    references: [...]
    
  design_spec:
    colors: {...}
    typography: {...}
    spacing: {...}
    components: {...}
    
  recommendations:
    - string
```

## Example Output

### 设计咨询报告：专家包展示界面

```yaml
design_consultation_report:
  project: "OpenCode 专家包展示界面"
  
  analysis:
    user_personas:
      - name: "开发者"
        goal: "了解专家包能力，快速上手"
        pain_points: ["文档分散", "找不到需要的技能"]
      - name: "架构师"
        goal: "评估专家包是否适合项目"
        pain_points: ["不了解设计理念", "不清楚扩展性"]
        
    core_tasks:
      - "浏览专家包概览"
      - "搜索特定技能"
      - "查看角色职责"
      - "了解工作流程"
      
  information_architecture:
    pages:
      - name: "首页"
        purpose: "整体概览，吸引注意"
        sections: ["Hero", "统计", "流程图", "功能列表"]
      - name: "技能页"
        purpose: "技能检索和详情"
        sections: ["筛选", "网格", "详情"]
      - name: "角色页"
        purpose: "角色分工说明"
        sections: ["角色卡片", "协作图"]
        
  design_direction:
    style: "Developer Tool"
    tone: "Professional, Technical"
    references: 
      - "Linear (暗色模式, 简洁)"
      - "Vercel Dashboard (等宽字体点缀)"
      
  design_spec:
    colors:
      primary: "#8b5cf6 (Violet)"
      accent: "#10b981 (Emerald)"
      background: "#09090b"
    typography:
      display: "Space Grotesk"
      body: "Inter"
```

## Checklists

### 需求分析
- [ ] 用户画像定义完成
- [ ] 核心任务列出
- [ ] 关键场景识别

### 信息架构
- [ ] 页面结构清晰
- [ ] 导航逻辑合理
- [ ] 层级不超过 3 层

### 设计规范
- [ ] 颜色方案确定
- [ ] 字体选择明确
- [ ] 间距系统定义

## Common Failure Modes

| 失败模式 | 表现 | 处理建议 |
|----------|------|----------|
| 跳过需求分析 | 设计脱离用户 | 强制填写用户画像 |
| 信息架构过深 | 用户迷失 | 限制层级不超过 3 层 |
| 设计规范模糊 | 开发随意发挥 | 输出具体数值 |
| 缺少参考 | 设计不专业 | 必须提供 1-2 个参考 |
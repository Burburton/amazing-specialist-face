# Feature: Beginner's Tutorial (新手入门教程)

## Metadata
```yaml
feature_id: 013-beginner-tutorial
status: draft
created: 2026-04-07
author: architect
based_on: 012-skill-demo-ux-enhancement
```

## 1. Problem Statement

### Current State

当前首页虽然介绍了专家包的基本信息，但对于编程小白来说：
- 不清楚专家包具体能帮他们做什么
- 不知道从哪里开始使用
- 缺乏实际的入门指引

### User Impact

1. **认知门槛高**：新手不知道专家包如何帮助他们完成开发任务
2. **无处下手**：看到 40 个技能不知道先用哪个
3. **缺乏信心**：不确定自己是否能使用这些工具

---

## 2. Goal

### Primary Goal

创建一个"快速开始"教程页面，让编程小白能够：
- 用 3 分钟理解专家包是什么、能做什么
- 知道如何使用专家包开发一个完整功能
- 有信心开始尝试使用

### Success Criteria

1. **3 分钟理解**：用户能在 3 分钟内理解专家包的核心价值
2. **清晰的步骤指引**：提供 step-by-step 的使用教程
3. **真实案例**：用"用户登录功能"作为完整案例展示流程
4. **行动召唤**：每一步都有明确的下一步行动

---

## 3. Target Users

### Primary Persona: 编程小白

- **背景**：刚入门编程，有基本的 HTML/CSS/JS 知识
- **需求**：想开发一个小功能，但不知道怎么开始
- **痛点**：
  - 不懂技术架构
  - 不会写测试
  - 不知道代码质量标准
  - 容易写出 bug

### What They Need

1. **简单语言**：不用专业术语，用日常比喻
2. **视觉引导**：图片、图标、动画辅助理解
3. **具体案例**：用"用户登录"这样的常见功能举例
4. **渐进式学习**：从简单到复杂，一步一步来

---

## 4. Page Structure

### 4.1 Route

```
/tutorial  →  TutorialPage
```

### 4.2 页面组成

```
TutorialPage
├── TutorialIntroSlide      # 什么是专家包？
├── TutorialWhySlide        # 为什么需要它？
├── TutorialExampleSlide    # 实战案例：用户登录功能
├── TutorialStepsSlide      # 开发流程 step-by-step
├── TutorialTrySlide        # 动手试试
└── TutorialNextSlide       # 下一步
```

---

## 5. Slide Specifications

### 5.1 TutorialIntroSlide - 什么是专家包？

**内容策略**：用比喻解释

```
标题：什么是 OpenCode 专家包？

比喻：
"想象你有一个经验丰富的开发团队，随时帮你：
 - 架构师帮你设计方案
 - 开发者帮你写代码
 - 测试员帮你写测试
 - 审查员帮你检查代码
 ...
 
 专家包就是这样一个 AI 团队！"

视觉：
- 6 个角色图标围成一圈
- 中间是用户（你）
- 动画：角色们向用户提供帮助
```

### 5.2 TutorialWhySlide - 为什么需要它？

**内容策略**：对比展示

```
标题：它能帮你做什么？

对比卡片：
┌─────────────────────────────────────────────────────┐
│  没有专家包                    │  有专家包            │
├─────────────────────────────────────────────────────┤
│  不知道从哪里开始              │  架构师帮你设计方案  │
│  写完不知道对不对              │  测试员帮你验证      │
│  不知道代码质量如何            │  审查员帮你检查      │
│  忘记写文档                    │  文档员帮你记录      │
│  担心安全漏洞                  │  安全员帮你把关      │
└─────────────────────────────────────────────────────┘

数据支撑：
- 节省 40% 开发时间
- 减少 60% 的 bug
- 100% 的代码经过审查
```

### 5.3 TutorialExampleSlide - 实战案例

**内容策略**：用一个完整案例展示

```
标题：实战案例：开发用户登录功能

场景描述：
"你想给网站添加用户登录功能，但不知道怎么开始..."

流程可视化：
1. 📝 需求 → architect/requirement-to-design
   输入："用户登录功能"
   输出："技术设计方案"

2. 💻 开发 → developer/feature-implementation
   输入："设计方案"
   输出："登录代码"

3. 🧪 测试 → tester/unit-test-design
   输入："登录代码"
   输出："测试用例"

4. ✅ 审查 → reviewer/code-review-checklist
   输入："代码 + 测试"
   输出："审查报告"

5. 🔒 安全 → security/auth-and-permission-review
   输入："认证代码"
   输出："安全报告"

6. 📚 文档 → docs/user-guide-update
   输入："功能说明"
   输出："用户文档"

每个步骤可点击查看详情，链接到对应的 Skill Demo
```

### 5.4 TutorialStepsSlide - Step by Step

**内容策略**：具体操作步骤

```
标题：如何开始使用？

步骤卡片：

Step 1: 选择一个技能
"根据你当前的任务，选择对应的技能"
→ 链接到技能库（已筛选入门级技能）

Step 2: 查看技能说明
"每个技能都有详细的说明和示例"
→ 链接到 requirement-to-design 详情页

Step 3: 填写输入参数
"在 Demo 区域填写你的需求"
→ 截图展示输入区域

Step 4: 查看输出结果
"专家包会生成专业的输出"
→ 截图展示输出区域

Step 5: 应用到项目
"将输出复制到你的项目中"
→ 复制按钮高亮

提示：
"💡 每个步骤都可以跳过，你可以从任意位置开始"
```

### 5.5 TutorialTrySlide - 动手试试

**内容策略**：立即行动

```
标题：现在就试试！

交互式演示：
┌─────────────────────────────────────────────────────┐
│  想开发什么功能？                                    │
│  ┌─────────────────────────────────────────────────┐│
│  │ [用户登录] [数据存储] [API开发] [文件上传]      ││
│  │ [页面布局] [表单验证] [其他...]                 ││
│  └─────────────────────────────────────────────────┘│
│                                                      │
│  选择后显示推荐技能：                                │
│  "用户登录" 推荐技能：                               │
│  1. architect/requirement-to-design                 │
│  2. security/auth-and-permission-review             │
│  3. tester/unit-test-design                         │
│                                                      │
│  [开始体验 →]                                        │
└─────────────────────────────────────────────────────┘
```

### 5.6 TutorialNextSlide - 下一步

**内容策略**：引导深入学习

```
标题：下一步学什么？

学习路径卡片：

📚 深入了解角色
"了解 6 个角色各自负责什么"
→ 链接到角色页面

🔧 浏览所有技能
"查看 40 个技能的完整列表"
→ 链接到技能库

📖 阅读开发文档
"了解专家包的设计理念"
→ 链接到 GitHub 文档

💬 加入社区
"和其他开发者交流"
→ 链接到 GitHub Issues
```

---

## 6. Component Specifications

### 6.1 TutorialPage Component

**文件**: `src/pages/TutorialPage.tsx`

```tsx
export default function TutorialPage() {
  return (
    <div className={styles.slideContainer} data-slide-container>
      <TutorialIntroSlide />
      <TutorialWhySlide />
      <TutorialExampleSlide />
      <TutorialStepsSlide />
      <TutorialTrySlide />
      <TutorialNextSlide />
    </div>
  );
}
```

### 6.2 TutorialSlide 组件

所有 slide 组件放在 `src/components/tutorial/` 目录。

每个 slide 组件包含：
- 独立的 CSS Module
- 语义化的 section 标签
- aria-label 属性
- Icon 组件引用

---

## 7. Navigation

### 7.1 Header 导航

在 Layout 的导航栏添加"教程"链接：

```
关于 | 流程 | 团队 | 教程 | 技能
```

### 7.2 Footer 链接

在首页底部添加快速链接：

```
快速开始 → 教程
```

### 7.3 首页入口

在 GetStartedSlide 添加教程入口卡片：

```tsx
const ENTRY_CARDS = [
  { icon: 'tutorial', title: '新手教程', count: '5 分钟入门', path: '/tutorial' }, // 新增
  { icon: 'skills', title: '技能库', count: `${stats.totalSkills} 个技能`, path: '/skills' },
  { icon: 'roles', title: '角色分工', count: `${stats.totalRoles} 个角色`, path: '/roles' },
  { icon: 'contracts', title: '契约规范', count: `${stats.totalContracts} 个契约`, path: '/contracts' },
];
```

---

## 8. Data Requirements

### 8.1 教程数据文件

创建 `src/data/tutorial.json`:

```json
{
  "exampleFeature": {
    "name": "用户登录功能",
    "description": "实现用户登录、注册、登出功能",
    "steps": [
      {
        "skill": "architect/requirement-to-design",
        "role": "架构师",
        "action": "设计方案",
        "duration": "5 分钟"
      },
      {
        "skill": "developer/feature-implementation",
        "role": "开发者",
        "action": "实现代码",
        "duration": "10 分钟"
      }
    ]
  },
  "recommendedSkills": {
    "beginner": [
      "architect/requirement-to-design",
      "developer/feature-implementation",
      "tester/unit-test-design",
      "reviewer/code-review-checklist"
    ]
  },
  "featureCategories": [
    { "id": "auth", "label": "用户登录", "skills": ["architect/requirement-to-design", "security/auth-and-permission-review"] },
    { "id": "data", "label": "数据存储", "skills": ["architect/module-boundary-design"] },
    { "id": "api", "label": "API开发", "skills": ["architect/interface-contract-design"] },
    { "id": "form", "label": "表单验证", "skills": ["security/input-validation-review"] }
  ]
}
```

---

## 9. Acceptance Criteria

### AC-001: 页面路由
- [ ] 创建 `/tutorial` 路由
- [ ] 创建 TutorialPage 组件
- [ ] 添加到 Layout 导航

### AC-002: Slide 组件
- [ ] 创建 TutorialIntroSlide
- [ ] 创建 TutorialWhySlide
- [ ] 创建 TutorialExampleSlide
- [ ] 创建 TutorialStepsSlide
- [ ] 创建 TutorialTrySlide
- [ ] 创建 TutorialNextSlide

### AC-003: 交互功能
- [ ] TutorialTrySlide 的功能选择器可交互
- [ ] 点击功能后显示推荐技能
- [ ] 链接到对应的 Skill 详情页

### AC-004: 导航入口
- [ ] Header 添加"教程"链接
- [ ] 首页 GetStartedSlide 添加教程卡片
- [ ] 404 页面建议访问教程

### AC-005: 构建验证
- [ ] `npm run build` 无错误
- [ ] TypeScript 类型正确
- [ ] 响应式设计正常

---

## 10. Technical Constraints

### TC-001: 样式规范
- 遵循 PPT Manual Style
- 使用 CSS Modules
- 复用现有的 Icon 组件
- 保持与现有 slides 风格一致

### TC-002: 无障碍
- 所有 slide 有 aria-label
- 支持键盘导航
- 足够的颜色对比度

### TC-003: 响应式
- 移动端友好
- 平板适配
- 桌面端优化

---

## 11. Risks / Tradeoffs

| ID | Risk | Impact | Mitigation |
|----|------|--------|------------|
| R-001 | 内容可能过于简单 | 高级用户觉得无聊 | 提供"跳过教程"选项 |
| R-002 | 案例可能不够真实 | 用户无法关联实际需求 | 后续添加更多案例 |
| R-003 | 教程需要维护 | 内容过时 | 建立更新机制 |

---

## 12. Implementation Plan

### Phase 1: 基础结构 (1 天)
1. 创建路由和页面结构
2. 实现 6 个 Slide 组件骨架
3. 添加导航入口

### Phase 2: 内容填充 (1 天)
1. 编写每个 Slide 的内容
2. 添加样式和图标
3. 实现交互功能

### Phase 3: 打磨优化 (0.5 天)
1. 响应式适配
2. 无障碍优化
3. 构建和部署

---

## 13. Future Enhancements

1. **视频教程**：添加录屏演示
2. **多语言**：支持英文版
3. **进度追踪**：记录用户学习进度
4. **互动练习**：添加小测验
5. **案例库**：添加更多实战案例
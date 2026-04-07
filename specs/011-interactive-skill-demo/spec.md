# Feature: Interactive Skill Demo

## Metadata
```yaml
feature_id: 011-interactive-skill-demo
status: draft
created: 2026-04-07
author: architect
based_on: 005-unified-design-system
```

## 1. Problem Statement

### Current State

用户查看 skill 详情页时只能看到：
- Skill ID、名称
- 角色标签、分类标签
- 文字描述
- 文件路径
- 相关技能列表

### User Impact

1. **难以理解实际效果**：用户不知道这个 skill 实际会做什么
2. **无法预判输出**：不知道输入什么会得到什么输出
3. **学习成本高**：需要去读源码或实际使用才能理解

---

## 2. Goal

### Primary Goal

为每个 skill 提供交互式 Demo 区域，让用户：
- 看到真实输入输出示例
- 修改参数观察效果变化
- 理解 skill 的实际用途

### Success Criteria

1. **示例数据**：每个 skill 有结构化的示例数据
2. **输入编辑**：用户可修改示例参数
3. **输出预览**：展示预期输出格式
4. **角色标识**：清晰展示哪个角色执行此 skill

---

## 3. Skill Demo Data Structure

### 3.1 Demo Data Schema

```typescript
interface SkillDemo {
  skill_id: string;
  
  // 输入参数示例
  inputs: {
    name: string;
    type: 'text' | 'textarea' | 'select' | 'json';
    label: string;
    description: string;
    default_value: string;
    options?: string[];  // for select type
    placeholder?: string;
  }[];
  
  // 输出示例
  outputs: {
    name: string;
    type: 'text' | 'json' | 'markdown' | 'file';
    label: string;
    description: string;
    example_value: string;
  }[];
  
  // 执行上下文
  context: {
    trigger: string;           // 触发条件描述
    role_responsibilities: string[];  // 角色职责
    typical_duration: string;  // 预估执行时间
    dependencies: string[];    // 依赖的其他 skills
  };
}
```

### 3.2 Example: requirement-to-design Demo

```json
{
  "skill_id": "architect/requirement-to-design",
  "inputs": [
    {
      "name": "feature_name",
      "type": "text",
      "label": "Feature 名称",
      "description": "要设计的功能名称",
      "default_value": "user-authentication",
      "placeholder": "例如: user-authentication"
    },
    {
      "name": "requirements",
      "type": "textarea",
      "label": "需求描述",
      "description": "功能需求的具体描述",
      "default_value": "实现用户登录、注册、登出功能，支持邮箱和手机号登录",
      "placeholder": "描述功能需求..."
    },
    {
      "name": "constraints",
      "type": "textarea",
      "label": "约束条件",
      "description": "技术约束、业务约束",
      "default_value": "- 必须支持 OAuth2.0\n- 密码需要加密存储\n- 支持多端登录",
      "placeholder": "列出约束条件..."
    }
  ],
  "outputs": [
    {
      "name": "design_note",
      "type": "markdown",
      "label": "设计文档",
      "description": "技术设计文档，包含模块边界、接口契约、实施路线",
      "example_value": "# Design Note: user-authentication\n\n## Module Boundaries\n- AuthModule: 处理认证逻辑\n- UserModule: 用户信息管理\n\n## Interface Contracts\n- POST /auth/login\n- POST /auth/register\n- POST /auth/logout\n\n## Implementation Roadmap\n1. 实现核心认证逻辑\n2. 集成 OAuth2.0\n3. 添加安全措施\n4. 编写测试"
    }
  ],
  "context": {
    "trigger": "新功能需要技术方案设计时",
    "role_responsibilities": [
      "将需求转化为技术方案",
      "定义模块边界和接口",
      "识别风险和依赖",
      "制定实施路线"
    ],
    "typical_duration": "30-60 分钟",
    "dependencies": ["architect/module-boundary-design", "architect/interface-contract-design"]
  }
}
```

---

## 4. Component Specifications

### 4.1 SkillDemoPanel Component

**位置**: SkillDetailPage 底部，相关技能之前

```tsx
interface SkillDemoPanelProps {
  skillId: string;
  demo: SkillDemo | null;
}
```

**UI Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  🎯 Try It - 交互式演示                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 📥 Input Parameters                                      ││
│  │                                                          ││
│  │ Feature 名称                                              ││
│  │ [user-authentication        ]                            ││
│  │                                                          ││
│  │ 需求描述                                                  ││
│  │ ┌──────────────────────────────────────────────────────┐ ││
│  │ │ 实现用户登录、注册、登出功能...                        │ ││
│  │ └──────────────────────────────────────────────────────┘ ││
│  │                                                          ││
│  │ 约束条件                                                  ││
│  │ ┌──────────────────────────────────────────────────────┐ ││
│  │ │ - 必须支持 OAuth2.0                                   │ ││
│  │ │ - 密码需要加密存储                                    │ ││
│  │ └──────────────────────────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 📤 Expected Output                                        ││
│  │                                                          ││
│  │ 设计文档                                                  ││
│  │ ┌──────────────────────────────────────────────────────┐ ││
│  │ │ # Design Note: user-authentication                   │ ││
│  │ │                                                      │ ││
│  │ │ ## Module Boundaries                                 │ ││
│  │ │ - AuthModule: 处理认证逻辑                           │ ││
│  │ │ ...                                                  │ ││
│  │ └──────────────────────────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ ⚡ Context                                                ││
│  │                                                          ││
│  │ 触发条件: 新功能需要技术方案设计时                        ││
│  │ 预估时间: 30-60 分钟                                     ││
│  │ 依赖技能: module-boundary-design, interface-contract-... ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 DemoInputField Component

```tsx
interface DemoInputFieldProps {
  input: SkillDemo['inputs'][0];
  value: string;
  onChange: (value: string) => void;
}
```

**支持的输入类型**:
- `text`: 单行文本输入
- `textarea`: 多行文本
- `select`: 下拉选择
- `json`: JSON 编辑器（带格式化）

### 4.3 DemoOutputPreview Component

```tsx
interface DemoOutputPreviewProps {
  output: SkillDemo['outputs'][0];
  value: string;
}
```

**支持的输出类型**:
- `text`: 纯文本展示
- `json`: JSON 格式化展示
- `markdown`: Markdown 渲染
- `file`: 文件路径/内容预览

---

## 5. Demo Data Files

### 5.1 File Structure

```
src/data/
├── skills.json           # 现有
├── skill-demos/          # 新增
│   ├── architect/
│   │   ├── requirement-to-design.json
│   │   ├── module-boundary-design.json
│   │   └── ...
│   ├── developer/
│   │   ├── bugfix-workflow.json
│   │   └── ...
│   ├── tester/
│   ├── reviewer/
│   ├── docs/
│   ├── security/
│   └── common/
└── skill-demos-index.json  # 索引文件
```

### 5.2 skill-demos-index.json

```json
{
  "demos": {
    "architect/requirement-to-design": "architect/requirement-to-design.json",
    "architect/module-boundary-design": "architect/module-boundary-design.json",
    "developer/bugfix-workflow": "developer/bugfix-workflow.json"
  },
  "total": 40,
  "lastUpdated": "2026-04-07"
}
```

---

## 6. MVP Scope

### Phase 1: Core Demo (5 skills)

选择 5 个代表性 skills 先实现 Demo：

| Skill | 原因 |
|-------|------|
| `architect/requirement-to-design` | 核心架构技能，展示完整流程 |
| `developer/bugfix-workflow` | 开发核心，用户最常接触 |
| `tester/unit-test-design` | 测试核心，展示输入输出清晰 |
| `reviewer/code-review-checklist` | 审查核心，展示结构化输出 |
| `common/artifact-reading` | 通用技能，展示跨角色使用 |

### Phase 2: Full Coverage (所有 40 skills)

完成剩余 35 个 skills 的 Demo 数据。

---

## 7. Acceptance Criteria

### AC-001: Demo 数据结构
- [ ] 创建 `SkillDemo` 类型定义
- [ ] 创建 `src/data/skill-demos/` 目录结构
- [ ] 创建 5 个 MVP skill 的 demo JSON 文件

### AC-002: SkillDemoPanel 组件
- [ ] 创建 `SkillDemoPanel` 组件
- [ ] 显示输入参数区域
- [ ] 显示输出预览区域
- [ ] 显示上下文信息
- [ ] 集成到 SkillDetailPage

### AC-003: 输入交互
- [ ] 用户可编辑文本输入
- [ ] 用户可选择下拉选项
- [ ] 输入变更触发输出更新（模拟）
- [ ] 重置按钮恢复默认值

### AC-004: 输出展示
- [ ] 文本输出正确显示
- [ ] JSON 输出格式化显示
- [ ] Markdown 输出渲染显示
- [ ] 复制输出按钮

### AC-005: 构建验证
- [ ] `npm run build` 无错误
- [ ] TypeScript 类型正确
- [ ] Demo 数据正确加载

---

## 8. Technical Constraints

### TC-001: 前端模拟
- Demo 输出是预设的示例，不是真实 AI 执行
- 用户修改输入时，输出不会真正变化（Phase 1）
- 未来可接入真实 AI API（Phase 3）

### TC-002: 样式规范
- 遵循 PPT Manual Style
- 使用 CSS Modules
- 响应式设计

### TC-003: 性能
- Demo 数据按需加载
- 使用动态 import

---

## 9. Risks / Tradeoffs

| ID | Risk | Impact | Mitigation |
|----|------|--------|------------|
| R-001 | Demo 数据维护成本高 | 数据过时 | 建立数据同步机制 |
| R-002 | 输出不真实可能误导用户 | 信任下降 | 明确标注"示例输出" |
| R-003 | 40 个 skill demo 工作量大 | 延期 | 分 Phase，先做核心 5 个 |

---

## 10. Implementation Plan

### Phase 1 (MVP): 1-2 天
1. 创建类型定义和数据结构
2. 实现 5 个核心 skill 的 demo 数据
3. 开发 SkillDemoPanel 组件
4. 集成到 SkillDetailPage

### Phase 2: 2-3 天
1. 完成剩余 35 个 skill demo 数据
2. 添加更多输入类型支持
3. 优化 UI 交互

### Phase 3 (未来)
1. 接入真实 AI API
2. 添加执行历史记录
3. 支持用户保存 Demo 配置

---

## 11. References

- `specs/006-global-search/spec.md` - 参考格式
- `src/pages/SkillDetailPage.tsx` - 集成位置
- `src/data/skills.json` - 现有数据结构
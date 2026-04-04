# Tasks: frontend-design-system Plugin

## Metadata
```yaml
feature_id: 001-frontend-design-system-plugin
status: completed
created: 2026-04-04
completed: 2026-04-04
based_on: plan.md
```

## Task Summary

| Phase | Task ID | Task Name | Role | Priority | Status |
|-------|---------|-----------|------|----------|--------|
| 1 | T-001 | Create plugin directory structure | developer | high | ✅ completed |
| 1 | T-002 | Create plugin.json | developer | high | ✅ completed |
| 1 | T-003 | Create README.md | docs | medium | ✅ completed |
| 2 | T-004 | Create design-tokens-setup skill | developer | high | ✅ completed |
| 2 | T-005 | Create design-tokens.css template | developer | high | ✅ completed |
| 2 | T-006 | Create micro-interactions skill | developer | high | ✅ completed |
| 2 | T-007 | Create animation-presets.ts template | developer | high | ✅ completed |
| 2 | T-008 | Create design-state-coverage skill | developer | high | ✅ completed |
| 3 | T-009 | Create shadcn-integration skill | developer | high | ✅ completed |
| 3 | T-010 | Create typography-system skill | developer | medium | ✅ completed |
| 3 | T-011 | Create spacing-grid-system skill | developer | medium | ✅ completed |
| 4 | T-012 | Create design-review-checklist skill | developer | high | ✅ completed |
| 4 | T-013 | Create accessibility-checklist.md template | developer | medium | ✅ completed |
| 5 | T-014 | Validate plugin structure | tester | high | ✅ completed |
| 5 | T-015 | Verify skill completeness | reviewer | high | ✅ completed |

---

## Phase 1: Plugin Infrastructure

### T-001: Create plugin directory structure

**Role**: developer

**Priority**: high

**Description**: 创建 Plugin 所需的目录结构

**Acceptance Criteria**:
- [ ] `.opencode/plugins/frontend-design-system/` 目录存在
- [ ] `.opencode/plugins/frontend-design-system/skills/` 目录存在
- [ ] `.opencode/plugins/frontend-design-system/templates/` 目录存在

**Deliverables**:
- 目录结构

**Dependencies**: 无

---

### T-002: Create plugin.json

**Role**: developer

**Priority**: high

**Description**: 创建 Plugin 元数据配置文件

**Acceptance Criteria**:
- [ ] 包含所有必需字段 (id, name, version, description, skills)
- [ ] platform_mapping 配置正确
- [ ] JSON 格式有效

**Deliverables**:
- `.opencode/plugins/frontend-design-system/plugin.json`

**Dependencies**: T-001

**Implementation Notes**:
```json
{
  "id": "frontend-design-system",
  "name": "Frontend Design System",
  "version": "1.0.0",
  "skills": [
    "design-tokens-setup",
    "shadcn-integration",
    "typography-system",
    "spacing-grid-system",
    "micro-interactions",
    "design-state-coverage",
    "design-review-checklist"
  ],
  "platform_mapping": {
    "opencode": {
      "developer": {
        "additional_skills": [...]
      }
    }
  }
}
```

---

### T-003: Create README.md

**Role**: docs

**Priority**: medium

**Description**: 创建 Plugin 使用文档

**Acceptance Criteria**:
- [ ] 包含 Plugin 简介
- [ ] 包含 Skills 列表和使用场景
- [ ] 包含快速开始指南

**Deliverables**:
- `.opencode/plugins/frontend-design-system/README.md`

**Dependencies**: T-001

---

## Phase 2: Core Skills

### T-004: Create design-tokens-setup skill

**Role**: developer

**Priority**: high

**Description**: 创建设计令牌设置 skill，指导创建颜色、间距、排版令牌

**Acceptance Criteria**:
- [ ] SKILL.md 包含必需章节 (Purpose, When to Use, Implementation Process, Checklists)
- [ ] 包含颜色令牌创建指导（非 Blue-500 默认）
- [ ] 包含间距令牌创建指导（8pt 网格）
- [ ] 包含排版令牌创建指导
- [ ] 包含 Tailwind 集成指导

**Deliverables**:
- `.opencode/plugins/frontend-design-system/skills/design-tokens-setup/SKILL.md`

**Dependencies**: T-001

---

### T-005: Create design-tokens.css template

**Role**: developer

**Priority**: high

**Description**: 创建设计令牌 CSS 变量模板

**Acceptance Criteria**:
- [ ] 包含颜色令牌变量
- [ ] 包含间距令牌变量
- [ ] 包含排版令牌变量
- [ ] 包含阴影令牌变量
- [ ] 包含暗色模式变量

**Deliverables**:
- `.opencode/plugins/frontend-design-system/templates/design-tokens.css`

**Dependencies**: T-004

---

### T-006: Create micro-interactions skill

**Role**: developer

**Priority**: high

**Description**: 创建微交互 skill，指导动画和交互设计

**Acceptance Criteria**:
- [ ] SKILL.md 包含必需章节
- [ ] 包含语义化动画曲线定义
- [ ] 包含交互预设 (cardHover, buttonPress, fadeInUp)
- [ ] 包含 Hover/Focus/Loading 状态实现
- [ ] 包含 prefers-reduced-motion 支持

**Deliverables**:
- `.opencode/plugins/frontend-design-system/skills/micro-interactions/SKILL.md`

**Dependencies**: T-001

---

### T-007: Create animation-presets.ts template

**Role**: developer

**Priority**: high

**Description**: 创建动画预设 TypeScript 文件

**Acceptance Criteria**:
- [ ] 包含语义化动画曲线常量
- [ ] 包含时长常量
- [ ] 包含 Spring 预设 (Framer Motion)
- [ ] 包含交互预设对象

**Deliverables**:
- `.opencode/plugins/frontend-design-system/templates/animation-presets.ts`

**Dependencies**: T-006

---

### T-008: Create design-state-coverage skill

**Role**: developer

**Priority**: high

**Description**: 创建状态覆盖 skill，确保组件覆盖所有必要状态

**Acceptance Criteria**:
- [ ] SKILL.md 包含必需章节
- [ ] 定义状态矩阵 (Default/Hover/Focus/Loading/Error/Empty)
- [ ] 包含骨架屏设计指导
- [ ] 包含空状态设计指导
- [ ] 包含错误状态设计指导

**Deliverables**:
- `.opencode/plugins/frontend-design-system/skills/design-state-coverage/SKILL.md`

**Dependencies**: T-001

---

## Phase 3: Auxiliary Skills

### T-009: Create shadcn-integration skill

**Role**: developer

**Priority**: high

**Description**: 创建 shadcn/ui 集成 skill

**Acceptance Criteria**:
- [ ] SKILL.md 包含必需章节
- [ ] 包含初始化指导（支持 2026 Base UI 原语）
- [ ] 包含组件定制指导（非默认样式）
- [ ] 包含设计令牌集成指导

**Deliverables**:
- `.opencode/plugins/frontend-design-system/skills/shadcn-integration/SKILL.md`

**Dependencies**: T-001, T-004

---

### T-010: Create typography-system skill

**Role**: developer

**Priority**: medium

**Description**: 创建排版系统 skill

**Acceptance Criteria**:
- [ ] SKILL.md 包含必需章节
- [ ] 包含字体配对指导（非 Inter 单一）
- [ ] 包含层级化字号指导
- [ ] 包含层级化行高指导
- [ ] 包含字距指导

**Deliverables**:
- `.opencode/plugins/frontend-design-system/skills/typography-system/SKILL.md`

**Dependencies**: T-001, T-004

---

### T-011: Create spacing-grid-system skill

**Role**: developer

**Priority**: medium

**Description**: 创建间距网格系统 skill

**Acceptance Criteria**:
- [ ] SKILL.md 包含必需章节
- [ ] 包含 8pt 网格实现指导
- [ ] 包含语义化间距映射
- [ ] 包含有意偏离规则

**Deliverables**:
- `.opencode/plugins/frontend-design-system/skills/spacing-grid-system/SKILL.md`

**Dependencies**: T-001, T-004

---

## Phase 4: Summary Skill

### T-012: Create design-review-checklist skill

**Role**: developer

**Priority**: high

**Description**: 创建设计审查清单 skill

**Acceptance Criteria**:
- [ ] SKILL.md 包含必需章节
- [ ] 包含颜色审查项
- [ ] 包含排版审查项
- [ ] 包含间距审查项
- [ ] 包含动画审查项
- [ ] 包含状态审查项
- [ ] 包含可访问性审查项

**Deliverables**:
- `.opencode/plugins/frontend-design-system/skills/design-review-checklist/SKILL.md`

**Dependencies**: T-004, T-006, T-008

---

### T-013: Create accessibility-checklist.md template

**Role**: developer

**Priority**: medium

**Description**: 创建可访问性检查清单模板

**Acceptance Criteria**:
- [ ] 包含 WCAG AA 对比度要求
- [ ] 包含触摸目标大小要求
- [ ] 包含键盘可访问要求
- [ ] 包含 prefers-reduced-motion 支持

**Deliverables**:
- `.opencode/plugins/frontend-design-system/templates/accessibility-checklist.md`

**Dependencies**: T-012

---

## Phase 5: Validation

### T-014: Validate plugin structure

**Role**: tester

**Priority**: high

**Description**: 验证 Plugin 目录结构和文件完整性

**Acceptance Criteria**:
- [ ] 所有必需目录存在
- [ ] plugin.json 格式有效
- [ ] 所有 SKILL.md 文件存在
- [ ] 所有模板文件存在

**Deliverables**:
- 验证报告

**Dependencies**: T-001 ~ T-013

---

### T-015: Verify skill completeness

**Role**: reviewer

**Priority**: high

**Description**: 验证每个 Skill 的内容完整性

**Acceptance Criteria**:
- [ ] 每个 SKILL.md 包含 Purpose 章节
- [ ] 每个 SKILL.md 包含 Implementation Process 章节
- [ ] 每个 SKILL.md 包含 Checklists 章节
- [ ] 每个 SKILL.md 包含 Common Failure Modes 章节

**Deliverables**:
- 审查报告

**Dependencies**: T-014

---

## Dependency Graph

```
T-001 ─┬─→ T-002 ─→ T-003
       │
       ├─→ T-004 ─→ T-005
       │      │
       │      └─→ T-009, T-010, T-011
       │
       ├─→ T-006 ─→ T-007
       │      │
       │      └─→ T-012
       │
       └─→ T-008 ─→ T-012
                    │
                    └─→ T-013

T-001~T-013 ─→ T-014 ─→ T-015
```

## Parallel Execution

以下任务可并行执行：

**Batch 1**: T-001 (目录结构)

**Batch 2**: T-002, T-003, T-004, T-006, T-008 (并行)

**Batch 3**: T-005, T-007, T-009, T-010, T-011 (并行)

**Batch 4**: T-012, T-013 (并行)

**Batch 5**: T-014

**Batch 6**: T-015
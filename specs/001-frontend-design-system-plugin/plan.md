# Implementation Plan: frontend-design-system Plugin

## Metadata
```yaml
feature_id: 001-frontend-design-system-plugin
status: completed
created: 2026-04-04
completed: 2026-04-04
based_on: spec.md
```

## Architecture Summary

```
.opencode/plugins/frontend-design-system/
├── plugin.json                 # Plugin 元数据
├── README.md                   # 使用文档
│
├── skills/                     # 7 个 Plugin Skills
│   ├── design-tokens-setup/
│   ├── shadcn-integration/
│   ├── typography-system/
│   ├── spacing-grid-system/
│   ├── micro-interactions/
│   ├── design-state-coverage/
│   └── design-review-checklist/
│
└── templates/                  # 模板文件
    ├── design-tokens.css
    ├── animation-presets.ts
    └── accessibility-checklist.md
```

## Inputs from Spec

| Spec Section | Input | Plan Reference |
|--------------|-------|----------------|
| Goal: 7 Skills | 设计令牌/排版/间距/动画/状态/审查 | Module Decomposition |
| Scope: Plugin 结构 | 目录结构定义 | Architecture Summary |
| BR-001~004 | 业务规则 | Implementation Guidelines |
| AC-001~003 | 验收标准 | Validation Strategy |

## Technical Constraints

### TC-001: 专家包 Plugin 规范兼容

必须遵循 `amazing-specialists/plugins/PLUGIN-SPEC.md` 定义的规范：

```json
// plugin.json 必需字段
{
  "id": "string",           // Plugin 唯一标识
  "name": "string",         // 显示名称
  "version": "string",      // semver
  "description": "string",  // 功能描述
  "skills": ["string"],     // Skill ID 列表
  "platform_mapping": {}    // 平台角色映射
}
```

### TC-002: Skill 格式规范

每个 SKILL.md 必须包含：

```markdown
# Skill: {skill-name}

## Metadata
## Purpose
## When to Use
## When Not to Use
## Implementation Process
## Output Requirements
## Checklists
## Common Failure Modes
```

### TC-003: 项目技术栈

- React 19 + TypeScript
- Vite 构建工具
- Tailwind CSS 样式方案
- (可能) Framer Motion 动画

## Module Decomposition

### Module 1: Plugin 基础设施

**交付物**: `plugin.json`, `README.md`

**职责**:
- 定义 Plugin 元数据
- 配置 platform_mapping
- 提供使用文档

**依赖**: 无

### Module 2: 设计令牌 Skill

**交付物**: `skills/design-tokens-setup/SKILL.md`, `templates/design-tokens.css`

**职责**:
- 指导创建颜色令牌（非 Blue-500 默认）
- 指导创建间距令牌（8pt 网格）
- 指导创建排版令牌
- 提供设计令牌 CSS 模板

**依赖**: Module 1

### Module 3: shadcn 集成 Skill

**交付物**: `skills/shadcn-integration/SKILL.md`

**职责**:
- 指导 shadcn/ui 初始化（支持 2026 Base UI 原语）
- 指导组件定制（非默认样式）
- 指导设计令牌集成

**依赖**: Module 1, Module 2

### Module 4: 排版系统 Skill

**交付物**: `skills/typography-system/SKILL.md`

**职责**:
- 指导字体配对（非 Inter 单一）
- 指导层级化字号
- 指导层级化行高

**依赖**: Module 2

### Module 5: 间距网格 Skill

**交付物**: `skills/spacing-grid-system/SKILL.md`

**职责**:
- 指导 8pt 网格实现
- 指导语义化间距映射
- 指导有意偏离规则

**依赖**: Module 2

### Module 6: 微交互 Skill

**交付物**: `skills/micro-interactions/SKILL.md`, `templates/animation-presets.ts`

**职责**:
- 提供语义化动画曲线
- 指导 Hover/Focus/Loading 状态
- 支持 prefers-reduced-motion

**依赖**: Module 1

### Module 7: 状态覆盖 Skill

**交付物**: `skills/design-state-coverage/SKILL.md`

**职责**:
- 定义状态矩阵（Default/Hover/Focus/Loading/Error/Empty）
- 指导骨架屏设计
- 指导空状态设计

**依赖**: Module 1

### Module 8: 设计审查 Skill

**交付物**: `skills/design-review-checklist/SKILL.md`, `templates/accessibility-checklist.md`

**职责**:
- 提供系统化审查框架
- 检查颜色/排版/间距/动画/状态
- 提供可访问性检查

**依赖**: Module 1-7 (汇总检查)

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    developer 调用 Skill                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Skill 读取项目上下文                                         │
│  - 技术栈 (React/Vue/TS)                                     │
│  - 样式方案 (Tailwind/CSS-in-JS)                             │
│  - 现有配置 (tailwind.config, tsconfig)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Skill 生成/更新文件                                          │
│  - CSS 变量文件                                               │
│  - 配置文件更新                                               │
│  - 组件代码建议                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Skill 输出验证报告                                           │
│  - 完成项清单                                                 │
│  - 警告/建议                                                  │
│  - 下一步操作                                                 │
└─────────────────────────────────────────────────────────────┘
```

## Failure Handling

### FH-001: 项目结构不兼容

**场景**: 项目没有标准 `src/` 目录结构

**处理**:
1. Skill 检测项目根目录
2. 询问用户确认输出路径
3. 在 Skill 输出中记录实际路径

### FH-002: Tailwind 未安装

**场景**: 项目未使用 Tailwind CSS

**处理**:
1. Skill 检测到 Tailwind 未配置
2. 提供两个选项：
   - 安装 Tailwind 并继续
   - 生成纯 CSS 变量文件（无 Tailwind 集成）

### FH-003: shadcn 已安装不同配置

**场景**: 项目已有 shadcn/ui 但配置不同

**处理**:
1. Skill 读取现有 `components.json`
2. 提供增量更新建议
3. 不覆盖现有定制

## Validation Strategy

### Phase 1: 结构验证

```bash
# 检查所有必需文件存在
[ -f .opencode/plugins/frontend-design-system/plugin.json ]
[ -f .opencode/plugins/frontend-design-system/README.md ]
[ -d .opencode/plugins/frontend-design-system/skills/ ]
[ -d .opencode/plugins/frontend-design-system/templates/ ]
```

### Phase 2: 格式验证

```bash
# 验证 plugin.json 格式
node -e "JSON.parse(require('fs').readFileSync('.opencode/plugins/frontend-design-system/plugin.json'))"

# 验证每个 SKILL.md 包含必需章节
for skill in skills/*/SKILL.md; do
  grep -q "## Purpose" $skill
  grep -q "## Implementation Process" $skill
  grep -q "## Checklists" $skill
done
```

### Phase 3: 功能验证

每个 Skill 调用测试：
- design-tokens-setup: 生成 design-tokens.css
- micro-interactions: 提供 animation-presets.ts
- design-review-checklist: 生成检查报告

## Risks / Tradeoffs

### Risk 1: 与专家包更新冲突

**风险**: 专家包更新 Plugin 规范后不兼容

**缓解**:
- 遵循 PLUGIN-SPEC.md 最新版本
- 在 plugin.json 中声明 `core_compatibility`

### Risk 2: 用户定制覆盖

**风险**: 用户修改 Plugin 文件后难以更新

**缓解**:
- 在 README.md 中说明定制建议
- 建议用户复制 templates/ 到项目其他位置后修改

### Tradeoff 1: 框架限定

**取舍**: 仅支持 React + Tailwind

**理由**:
- 项目技术栈已确定
- 避免 Skill 过于复杂
- 后续可扩展 Vue/Svelte 版本

### Tradeoff 2: 无运行时验证

**取舍**: Skills 只提供指导，无自动验证工具

**理由**:
- 减少 Skill 复杂度
- 保持与专家包架构一致
- 验证工具可作为后续增强

## Requirement Traceability

| Spec ID | Requirement | Plan Module |
|---------|-------------|-------------|
| AC-001 | Plugin 目录结构 | Module 1 |
| AC-002 | plugin.json 配置 | Module 1 |
| AC-003 | Skills 可用 | Module 2-8 |
| BR-001 | 设计令牌强制使用 | Module 2 |
| BR-002 | 状态覆盖强制 | Module 7 |
| BR-003 | 动画语义化 | Module 6 |
| BR-004 | 可访问性默认 | Module 8 |
| NFR-001 | Skill 独立性 | Module 2-8 设计 |
| NFR-002 | Platform Compatibility | Module 1 platform_mapping |
| NFR-003 | Template 可定制 | templates/ 目录设计 |

## Implementation Phases

### Phase 1: 基础设施 (Day 1)
- Module 1: Plugin 基础设施

### Phase 2: 核心 Skills (Day 1-2)
- Module 2: 设计令牌
- Module 6: 微交互
- Module 7: 状态覆盖

### Phase 3: 辅助 Skills (Day 2)
- Module 3: shadcn 集成
- Module 4: 排版系统
- Module 5: 间距网格

### Phase 4: 汇总 Skill (Day 2)
- Module 8: 设计审查

### Phase 5: 验证 (Day 3)
- 功能验证
- 文档完善
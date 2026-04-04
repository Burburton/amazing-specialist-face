# UI/UX Designer Plugin

UI/UX 设计专家 Skill，在设计前先输出设计方案，然后根据设计稿实现。

## 设计流程

```
需求 → design-consultant → wireframe-design → component-design → 开发实现
        (设计咨询)          (线框图设计)        (组件设计)
```

## Skills

### 1. design-consultant (设计咨询)

**用途**: 分析产品需求，输出设计方案

**输出**:
- 用户画像分析
- 信息架构图
- 设计方向（风格、基调、参考）
- 设计规范（颜色、字体、间距）

**调用方式**:
```
用户: 我需要设计一个技能展示页面

调用 design-consultant skill
→ 输出设计咨询报告
→ 包含信息架构、设计方向、设计规范
```

### 2. wireframe-design (线框图设计)

**用途**: 输出页面布局和组件位置

**输出**:
- ASCII 线框图
- 组件网格配置
- 响应式布局
- 交互流程

**调用方式**:
```
用户: 根据设计咨询报告，输出首页线框图

调用 wireframe-design skill
→ 输出 ASCII 线框图
→ 输出组件布局定义
```

### 3. component-design (组件设计)

**用途**: 输出具体组件的设计规范

**输出**:
- 组件解剖结构
- 变体设计
- 状态定义
- 样式规范
- 可访问性要求
- 实现注释

**调用方式**:
```
用户: 设计 SkillCard 组件

调用 component-design skill
→ 输出完整的组件设计规范
→ 包含所有状态、变体、可访问性
```

## 使用示例

### 完整设计流程

```yaml
# Step 1: 设计咨询
输入: "设计一个专家包展示界面"
输出: design-consultation-report.yaml

# Step 2: 线框图设计  
输入: design-consultation-report.yaml
输出: wireframe-design.yaml
       - 首页线框图
       - 列表页线框图
       - 详情页线框图

# Step 3: 组件设计
输入: wireframe-design.yaml
输出: component-design.yaml
       - SkillCard 组件规范
       - RoleCard 组件规范
       - Header 组件规范

# Step 4: 开发实现
输入: component-design.yaml
输出: React 组件代码
```

## 与 frontend-design-system 的关系

| Plugin | 职责 | 时机 |
|--------|------|------|
| **ui-ux-designer** | 设计输出（设计稿、规范） | 设计阶段 |
| **frontend-design-system** | 设计实现（令牌、样式） | 实现阶段 |

```
ui-ux-designer          frontend-design-system
      │                        │
      ▼                        ▼
 设计方案 ────────────────→ 设计令牌
 线框图   ────────────────→ 样式规范
 组件规范 ────────────────→ 组件实现
```

## Output Artifacts

| Skill | 输出文件 | 格式 |
|-------|----------|------|
| design-consultant | design-spec.md | Markdown + YAML |
| wireframe-design | wireframe.md | ASCII Art + YAML |
| component-design | component-spec.md | YAML |

## Quick Start

```bash
# 1. 设计咨询
design-consultant "设计一个技能展示页面"

# 2. 线框图
wireframe-design --page=home

# 3. 组件设计
component-design --component=SkillCard
```
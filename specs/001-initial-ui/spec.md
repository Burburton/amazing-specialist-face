# Feature: Initial UI - 文档展示型界面

## Feature ID
`001-initial-ui`

## Status
`draft`

## Version
`1.0.0`

## Created
2026-03-29

## Overview

### Goal
为 OpenCode 专家包 (amazing_agent_specialist) 创建一个 Web UI 展示界面，展示专家包的核心内容：README、Skills、Roles、Contracts、Commands、Workflow。

### Background
专家包目前是纯文档形式，用户需要阅读 markdown 文件才能理解其能力。一个可视化界面可以：
- 降低理解门槛
- 提供更好的导航体验
- 作为专家包的"门面"

### Scope
**In Scope:**
- 静态站点，展示专家包的文档内容
- Skills 目录树可视化（按角色分组）
- Roles 卡片展示（6 个角色的定义）
- Contracts 浏览（17 个 artifact contracts）
- Commands 列表（5 个核心命令）
- Workflow 图（角色协作流程）

**Out of Scope:**
- 实时执行监控（Phase B）
- 交互式操作（Phase C）
- 后端 API
- 用户认证

---

## Requirements

### Functional Requirements

#### FR-001: Home Page
- 展示专家包概述（从 README.md 提取）
- 展示核心统计（Skills 数量、Roles 数量、Contracts 数量）
- 展示工作流程图

#### FR-002: Skills Page
- 展示 37 个 Skills，按角色分组
- 每个 Skill 显示：名称、描述、所属角色、MVP/M4 分类
- 支持按角色筛选
- 支持搜索

#### FR-003: Roles Page
- 展示 6 个角色的定义
- 每个角色显示：名称、Mission、In Scope、Out of Scope、Trigger Conditions
- 展示角色协作关系图

#### FR-004: Contracts Page
- 展示 17 个 Artifact Contracts
- 每个 Contract 显示：ID、名称、Producer、Consumers、描述
- 支持按 Producer Role 筛选

#### FR-005: Commands Page
- 展示 5 个核心命令
- 每个命令显示：名称、用途、输入输出

#### FR-006: Navigation
- 顶部导航栏：Home | Skills | Roles | Contracts | Commands
- 响应式设计，支持移动端

### Non-Functional Requirements

#### NFR-001: Performance
- 首屏加载时间 < 2s
- 页面切换 < 500ms

#### NFR-002: Accessibility
- 符合 WCAG 2.1 AA 级别
- 支持键盘导航

#### NFR-003: SEO
- 语义化 HTML
- 适当的 meta 标签

---

## Acceptance Criteria

### AC-001: Home Page 完整
- [ ] 展示专家包概述
- [ ] 展示核心统计
- [ ] 展示工作流程图

### AC-002: Skills Page 完整
- [ ] 展示所有 37 个 Skills
- [ ] 按角色正确分组
- [ ] MVP/M4 分类正确
- [ ] 筛选和搜索功能正常

### AC-003: Roles Page 完整
- [ ] 展示所有 6 个角色
- [ ] 角色协作关系图正确

### AC-004: Contracts Page 完整
- [ ] 展示所有 17 个 Contracts
- [ ] 按 Producer Role 分组正确

### AC-005: Commands Page 完整
- [ ] 展示所有 5 个命令

### AC-006: 导航正常
- [ ] 所有页面可访问
- [ ] 移动端适配

### AC-007: 构建成功
- [ ] `npm run build` 无错误
- [ ] `npm run dev` 本地运行正常

---

## Technical Constraints

### TC-001: 技术栈
- Vite + React + TypeScript
- CSS Modules 或 Tailwind CSS
- React Router 用于路由

### TC-002: 数据源
- 数据文件放在 `data/` 目录
- JSON 格式，手动维护
- 未来可扩展为从专家包 repo 自动同步

### TC-003: 部署
- 静态站点，可部署到 GitHub Pages / Vercel / Netlify
- 无需后端服务

---

## Dependencies

### External Dependencies
- React 18+
- React Router 6+
- （可选）Tailwind CSS

### Internal Dependencies
- 专家包的数据文件（需从专家包 repo 提取）

---

## Risks

### Risk-001: 数据同步
- **描述**: UI 数据与专家包实际内容可能不同步
- **影响**: 展示信息过时
- **缓解**: 建立数据同步机制（手动或自动）

### Risk-002: Scope Creep
- **描述**: 可能倾向于添加交互功能
- **影响**: 延迟交付
- **缓解**: 严格遵守 Phase A 范围，B/C 功能单独规划

---

## Milestones

### M1: 项目骨架
- Vite + React 项目初始化
- 目录结构建立
- 数据文件准备

### M2: 核心页面
- Home Page
- Skills Page
- Roles Page

### M3: 完整功能
- Contracts Page
- Commands Page
- 导航完善

### M4: 优化与部署
- 性能优化
- 响应式适配
- 部署配置

---

## References

- 专家包 README: `amazing_agent_specialist/README.md`
- 专家包 Role Definition: `amazing_agent_specialist/role-definition.md`
- 专家包 Contract Registry: `amazing_agent_specialist/contracts/pack/registry.json`
- 专家包 Skills 目录: `amazing_agent_specialist/.opencode/skills/`
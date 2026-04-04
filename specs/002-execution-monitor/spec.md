# Feature: Phase B - Execution Monitor

## Feature ID
002-execution-monitor

## Status
`planned`

## Version
1.0.0

## Created
2026-04-04

## Overview

### Goal
为 amazing-specialist-face 添加实时执行监控功能，展示通过 GitHub Issue Adapter 驱动的任务执行状态、进度和日志。

### Background
Phase A 已完成静态文档展示界面。Phase B 将实现执行监控功能，让用户能够：
- 查看当前正在执行的任务
- 追踪任务执行进度
- 查看执行日志和结果
- 通过 GitHub Issue 触发新任务

### Scope

**In Scope:**
- Execution Dashboard 页面
- Task Status 组件（展示单个任务状态）
- Execution Timeline 组件（展示执行流程）
- Log Viewer 组件（展示执行日志）
- GitHub Issue Integration（从 GitHub 获取任务状态）
- Dispatch Payload 可视化

**Out of Scope:**
- Webhook 服务器部署（Phase C）
- 实时 WebSocket 推送（Phase C）
- 用户认证系统
- 多项目管理

---

## Requirements

### Functional Requirements

#### FR-001: Execution Dashboard
- 展示所有任务概览（进行中、已完成、阻塞）
- 显示关键统计：成功率、平均执行时间、活跃任务数
- 支持按状态、角色、里程碑筛选

#### FR-002: Task Status Card
- 展示单个任务状态：pending, in-progress, success, failed, blocked
- 显示任务元数据：task_id, role, command, risk_level
- 显示执行时间、重试次数
- 支持 GitHub Issue 关联跳转

#### FR-003: Execution Timeline
- 可视化 6-role 执行流程
- 显示当前执行阶段
- 显示各阶段耗时
- 支持点击查看阶段详情

#### FR-004: Log Viewer
- 实时展示执行日志
- 支持日志级别过滤：info, warning, error
- 支持关键词搜索
- 支持日志导出

#### FR-005: GitHub Issue Integration
- 从 GitHub Issues 获取任务列表
- 解析 Issue labels 获取任务元数据
- 展示 Issue 关联的 execution result
- 支持手动刷新任务状态

#### FR-006: Dispatch Payload Visualization
- 展示 Dispatch Payload 结构
- 显示 goal, constraints, inputs, expected_outputs
- 支持 JSON 视图和结构化视图切换

### Non-Functional Requirements

#### NFR-001: Performance
- 初始加载 < 2s
- 任务列表渲染 < 500ms
- 日志加载支持分页

#### NFR-002: Usability
- 响应式设计，支持移动端
- 支持深色模式
- 无障碍访问（WCAG 2.1 AA）

#### NFR-003: Compatibility
- 支持主流浏览器（Chrome, Firefox, Safari, Edge）
- 最低支持屏幕宽度 320px

---

## Acceptance Criteria

### AC-001: Execution Dashboard 完成
- [ ] 展示任务概览统计
- [ ] 支持筛选和搜索
- [ ] 任务卡片可点击进入详情

### AC-002: Task Status Card 完成
- [ ] 正确显示所有状态类型
- [ ] 显示任务元数据
- [ ] GitHub Issue 链接可用

### AC-003: Execution Timeline 完成
- [ ] 正确显示 6-role 流程
- [ ] 当前阶段高亮
- [ ] 点击可查看详情

### AC-004: Log Viewer 完成
- [ ] 支持日志展示
- [ ] 支持级别过滤
- [ ] 支持搜索

### AC-005: GitHub Issue Integration 完成
- [ ] 可获取任务列表
- [ ] 正确解析 labels
- [ ] 状态同步正确

### AC-006: 构建验证
- [ ] `npm run build` 无错误
- [ ] `npm run lint` 无错误
- [ ] 所有页面可访问

---

## Technical Constraints

### TC-001: 技术栈
- React 18+ with TypeScript
- Vite 构建
- CSS Modules 或 Tailwind CSS
- React Router 用于路由

### TC-002: 数据源
- GitHub API 获取 Issues
- 本地 JSON 缓存任务状态
- 未来可扩展为 WebSocket 实时推送

### TC-003: 认证
- 使用 GITHUB_TOKEN 环境变量
- 支持 PAT 和 GitHub App 两种方式

---

## Dependencies

### External Dependencies
- React 18+
- React Router 6+
- GitHub API (REST)

### Internal Dependencies
- Phase A 完成的 Layout 组件
- Phase A 完成的 Header 组件
- 现有的 types 定义

---

## Risks

### Risk-001: GitHub API Rate Limit
- **描述**: GitHub API 速率限制可能影响频繁刷新
- **影响**: 用户无法获取最新任务状态
- **缓解**: 实现本地缓存，限制刷新频率

### Risk-002: 数据结构变化
- **描述**: 专家包 I/O 契约变化可能导致解析失败
- **影响**: 任务状态显示错误
- **缓解**: 版本化数据结构，实现向后兼容

---

## Milestones

### M1: 基础架构
- 路由配置
- 数据类型定义
- API 客户端

### M2: 核心组件
- Execution Dashboard
- Task Status Card
- Execution Timeline

### M3: 完整功能
- Log Viewer
- GitHub Issue Integration
- Dispatch Payload 可视化

### M4: 优化与部署
- 性能优化
- 响应式适配
- 构建验证

---

## References

- `io-contract.md` - Dispatch Payload 定义
- `adapters/github-issue/README.md` - GitHub Issue Adapter 使用指南
- `specs/037-github-issue-workflow-enhancement/spec.md` - GitHub Issue Workflow 规范
- `role-definition.md` - 6-role 模型定义
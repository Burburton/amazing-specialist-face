# amazing-specialist-face

OpenCode 专家包可视化展示界面 - React + TypeScript + Vite 前端项目。

## 项目概述

本项目是 [amazing-specialists](../amazing-specialists) 专家包的可视化展示层，展示专家包的角色、技能、契约和命令。

### 技术栈

- **React 19** + **TypeScript**
- **Vite** 构建工具
- **Tailwind CSS** 样式方案
- **React Router** 路由
- **Vitest** 测试框架

## 项目结构

```
amazing-specialist-face/
├── src/
│   ├── components/          # React 组件
│   ├── pages/               # 页面组件
│   ├── data/                # 同步的数据文件
│   └── App.tsx              # 应用入口
│
├── .opencode/
│   ├── skills/              # 专家包核心 Skills
│   └── plugins/             # 项目级 Plugins
│       └── frontend-design-system/  # 前端设计系统 Plugin
│
├── specs/                   # Feature 开发记录
│   └── 001-frontend-design-system-plugin/
│
└── scripts/
    └── sync-from-expert-pack.cjs  # 数据同步脚本
```

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 测试
npm test

# 同步专家包数据
npm run sync-data
```

## Plugin 系统

### frontend-design-system Plugin

解决 AI 生成界面的"AI 风格"问题，提供专业设计指导。

**Skills (7个)**:

| Skill | 用途 |
|-------|------|
| `design-tokens-setup` | 设计令牌系统（颜色、间距、排版） |
| `shadcn-integration` | shadcn/ui 集成（2026 Base UI） |
| `typography-system` | 排版层次系统 |
| `spacing-grid-system` | 8pt 间距网格 |
| `micro-interactions` | 微交互与动画 |
| `design-state-coverage` | 状态覆盖设计 |
| `design-review-checklist` | 设计审查清单 |

**Templates (3个)**:
- `design-tokens.css` - CSS 变量模板
- `animation-presets.ts` - 动画预设
- `accessibility-checklist.md` - 可访问性检查清单

## 与专家包的关系

```
amazing-specialists (专家包核心)          amazing-specialist-face (展示界面)
├── .opencode/skills/      ─────────→    src/data/skills.json
├── role-definition.md     ─────────→    src/data/roles.json
├── contracts/pack/        ─────────→    src/data/contracts.json
└── commands/              ─────────→    src/data/commands.json
```

数据通过 `scripts/sync-from-expert-pack.cjs` 从专家包同步。

## 治理模型

本项目遵循 `amazing-specialists` 专家包的治理规范：

- **6-role 执行层模型**: architect, developer, tester, reviewer, docs, security
- **Spec-driven 开发流程**: `/spec-start` → `/spec-plan` → `/spec-tasks` → `/spec-implement` → `/spec-audit`
- **Plugin 扩展机制**: 技术栈特定能力通过 Plugin 扩展

详见 [AGENTS.md](./AGENTS.md) 和 [专家包文档](../amazing-specialists/README.md)。

## Scripts

| 脚本 | 用途 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建 |
| `npm run preview` | 预览构建结果 |
| `npm run lint` | ESLint 检查 |
| `npm test` | 运行测试 |
| `npm run sync-data` | 同步专家包数据 |

## License

MIT
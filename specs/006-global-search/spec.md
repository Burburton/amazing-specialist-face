# Feature: Global Search

## Metadata
```yaml
feature_id: 006-global-search
status: completed
created: 2026-04-05
author: architect
based_on: 005-unified-design-system
```

## 1. Problem Statement

### Current State

用户需要在多个页面之间查找特定内容：
- 查找某个 skill → 需要先进入 SkillsPage，再筛选或滚动
- 查找某个 role → 需要先进入 RolesPage
- 查找某个 contract → 需要先进入 ContractsPage
- 查找某个 command → 需要先进入 CommandsPage

### User Impact

1. **效率低**：分散在 4 个页面，无法统一搜索
2. **认知负担**：用户需要记住内容属于哪个类型
3. **发现困难**：不熟悉结构的用户难以快速定位

---

## 2. Goal

### Primary Goal

实现全局搜索功能，支持跨 skills、roles、contracts、commands 实时搜索，提供快速跳转。

### Success Criteria

1. **统一入口**：Header 中提供全局搜索触发器
2. **即时搜索**：输入关键词即时显示结果
3. **分类展示**：按 entity type 分组显示结果
4. **快速跳转**：点击结果直接跳转详情页
5. **快捷键**：支持 Cmd+K / Ctrl+K 快捷打开

---

## 3. Search Scope

### Searchable Entities

| Entity | 搜索字段 | 数量 |
|--------|----------|------|
| **Skills** | id, name, description, role | 40 |
| **Roles** | name, mission, inScope, outOfScope | 6 |
| **Contracts** | contract_id, contract_name, description, producer_role | 19 |
| **Commands** | name, description, inputs, outputs | 5 |

### Search Behavior

- **关键词匹配**：模糊匹配，不区分大小写
- **优先级排序**：
  1. name/id 完全匹配 → 最高优先级
  2. name/id 包含关键词 → 高优先级
  3. description 包含关键词 → 中优先级
  4. 其他字段包含 → 低优先级

---

## 4. Component Specifications

### 4.1 SearchTrigger Component

**位置**: Header 右侧，GitHub 链接前

```tsx
interface SearchTriggerProps {
  onClick: () => void;
}
```

**UI**:
- 搜索图标 (🔍) + 文字 "搜索"
- 快捷键提示: `⌘K` (Mac) / `Ctrl+K` (Windows)
- Hover 效果: background 变化

---

### 4.2 SearchModal Component

**触发**: SearchTrigger 点击或快捷键

```tsx
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**UI**:
```
┌─────────────────────────────────────────────────────────────┐
│  [🔍 搜索 skills, roles, contracts, commands...]      ⌘K   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Skills (3)                                                  │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ architect/requirement-to-design                       → ││
│  │ Transform feature specifications...                     ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │ developer/bugfix-workflow                             → ││
│  │ Debug and fix...                                        ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Roles (1)                                                   │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 🏛️ 架构师 (architect)                                 → ││
│  │ 将需求转化为可执行的技术方案                             ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Contracts (2)                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ design-note (AC-001)                                  → ││
│  │ Primary design baseline document...                     ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Commands (1)                                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ /spec-start                                           → ││
│  │ Create or refine a feature spec                        ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**交互**:
- 输入即时搜索，debounce 150ms
- 无结果时显示 "无匹配结果"
- ESC 关闭 Modal
- 点击结果跳转并关闭 Modal
- 点击 Modal 外部关闭

---

### 4.3 SearchResultItem Component

```tsx
interface SearchResultItemProps {
  type: 'skill' | 'role' | 'contract' | 'command';
  id: string;
  name: string;
  description: string;
  href: string;
  metadata?: {
    role?: string;
    category?: string;
    emoji?: string;
    contractId?: string;
  };
}
```

**样式**:
- Entity type 图标/颜色标识
- 名称高亮匹配关键词
- 描述截断（max 60 chars）
- Hover: background 变化 + 右侧箭头

---

### 4.4 useSearch Hook

```tsx
interface UseSearchResult {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
  isSearching: boolean;
}

interface SearchResult {
  type: 'skill' | 'role' | 'contract' | 'command';
  id: string;
  name: string;
  description: string;
  href: string;
  score: number;  // 匹配优先级分数
  metadata?: Record<string, string>;
}
```

---

## 5. Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+K` / `Ctrl+K` | 打开搜索 Modal |
| `ESC` | 关闭搜索 Modal |
| `Enter` | 选择第一个结果 |
| `↑` / `↓` | 在结果列表中导航 |

---

## 6. Implementation Scope

### In Scope

1. **SearchTrigger** - Header 搜索按钮
2. **SearchModal** - 搜索弹窗
3. **SearchResultItem** - 结果项组件
4. **useSearch Hook** - 搜索逻辑
5. **Keyboard Shortcut** - Cmd+K / Ctrl+K

### Out of Scope

1. **高级搜索**（正则、高级过滤）
2. **搜索历史**（记录最近搜索）
3. **搜索建议**（autocomplete）
4. **全文搜索**（搜索文件内容）

---

## 7. Acceptance Criteria

### AC-001: SearchTrigger 实现
- [ ] Header 中显示搜索按钮
- [ ] 显示快捷键提示
- [ ] 点击打开 SearchModal

### AC-002: SearchModal 实现
- [ ] Modal 正确显示/隐藏
- [ ] 搜索输入框聚焦
- [ ] ESC 关闭 Modal
- [ ] 点击外部关闭 Modal

### AC-003: Search Logic 实现
- [ ] 跨 4 种 entity 搜索
- [ ] 即时搜索（debounce）
- [ ] 无结果显示提示
- [ ] 结果按优先级排序

### AC-004: SearchResultItem 实现
- [ ] Entity type 标识
- [ ] 名称高亮
- [ ] 点击跳转正确路由
- [ ] Hover 效果

### AC-005: Keyboard Shortcuts
- [ ] Cmd+K / Ctrl+K 打开搜索
- [ ] ESC 关闭搜索
- [ ] ↑/↓ 导航结果

### AC-006: 构建验证
- [ ] `npm run build` 无错误
- [ ] TypeScript 类型正确
- [ ] 所有组件正常渲染

---

## 8. Technical Constraints

### TC-001: 数据源
- 使用现有 `src/data/*.json` 文件
- 无需 API 调用，纯前端搜索

### TC-002: 性能
- 搜索响应 < 100ms
- debounce 150ms 防止频繁搜索
- 结果数量限制：每类最多 5 条

### TC-003: 样式
- 遵循 PPT Manual Style 设计语言
- 使用现有 CSS Modules + tokens.css

---

## 9. Risks / Tradeoffs

| ID | Risk | Impact | Mitigation |
|----|------|--------|------------|
| R-001 | 大量数据时性能下降 | 用户等待 | 限制结果数量，debounce |
| R-002 | 快捷键冲突 | 功能失效 | 检测平台，使用标准组合键 |

---

## 10. References

- `specs/005-unified-design-system/spec.md` - 设计系统规范
- `src/data/*.json` - 数据源
- `src/components/common/Header.tsx` - Header 结构
- Linear / Vercel Docs - 全局搜索参考
# Tasks: Global Search

## Metadata
```yaml
feature_id: 006-global-search
status: completed
created: 2026-04-05
author: architect
based_on: plan.md
```

## Task Overview

| Phase | Task ID | 描述 | 优先级 | 状态 | 依赖 |
|-------|---------|------|--------|------|------|
| 1 | T-001 | 创建 search types | 🔴 最高 | ✅ completed | - |
| 1 | T-002 | 创建 useSearch Hook | 🔴 最高 | ✅ completed | T-001 |
| 2 | T-003 | 创建 SearchModal CSS | 🟡 高 | ✅ completed | - |
| 2 | T-004 | 创建 SearchModal Component | 🔴 最高 | ✅ completed | T-002, T-003 |
| 2 | T-005 | 创建 SearchResultItem CSS | 🟡 高 | ✅ completed | - |
| 2 | T-006 | 创建 SearchResultItem Component | 🔴 最高 | ✅ completed | T-001, T-005 |
| 3 | T-007 | 创建 SearchTrigger Component | 🟡 高 | ✅ completed | - |
| 3 | T-008 | 更新 Header 添加 SearchTrigger | 🔴 最高 | ✅ completed | T-007, T-004 |
| 3 | T-009 | 添加全局快捷键处理 | 🔴 最高 | ✅ completed | T-004 |
| 4 | T-010 | 构建验证 | 🔴 最高 | ✅ completed | T-008, T-009 |
| 4 | T-011 | 手动验证 | 🟡 高 | ✅ completed | T-010 |

---

## Phase 1: Foundation

### T-001: 创建 search types

**优先级**: 🔴 最高

**状态**: ✅ completed

**依赖**: 无

**输入**: 
- `spec.md` §4 Search Types

**输出**: 
- `src/types/search.ts`

**验收标准**:
- [x] SearchResult interface 定义
- [x] SearchResultGroup interface 定义
- [x] 类型导出正确

**实现**:

```typescript
// src/types/search.ts
export interface SearchResult {
  type: 'skill' | 'role' | 'contract' | 'command';
  id: string;
  name: string;
  description: string;
  href: string;
  score: number;
  metadata?: {
    role?: string;
    category?: string;
    emoji?: string;
    contractId?: string;
    producer?: string;
  };
}

export interface SearchResultGroup {
  skills: SearchResult[];
  roles: SearchResult[];
  contracts: SearchResult[];
  commands: SearchResult[];
}
```

---

### T-002: 创建 useSearch Hook

**优先级**: 🔴 最高

**状态**: ✅ completed

**依赖**: T-001

**输入**: 
- `plan.md` §4.1
- `src/data/*.json`

**输出**: 
- `src/hooks/useSearch.ts`

**验收标准**:
- [x] query state 管理
- [x] 跨 4 种 entity 搜索
- [x] calculateScore 函数实现
- [x] 结果按 score 排序
- [x] 每类结果限制 5 条
- [x] debounce 实现 (可选)

**实现要点**:

```typescript
export function useSearch() {
  const [query, setQuery] = useState('');
  
  const results = useMemo(() => {
    if (!query.trim()) return [];
    // ... search logic
  }, [query]);
  
  return { query, setQuery, results };
}
```

---

## Phase 2: Core Components

### T-003: 创建 SearchModal CSS

**优先级**: 🟡 高

**状态**: ✅ completed

**依赖**: 无

**输入**: 
- `spec.md` §4.2 UI Layout

**输出**: 
- `src/components/search/SearchModal.module.css`

**验收标准**:
- [x] overlay 全屏遮罩 (z-index: 1000)
- [x] modal居中，max-width: 600px
- [x] searchInputWrapper 样式
- [x] results 滚动区域
- [x] noResults 空状态样式
- [x] 遵循 PPT Manual Style

**CSS 规范**:

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: var(--space-16);
}

.modal {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  max-width: 600px;
  width: 100%;
  overflow: hidden;
}

.searchInputWrapper {
  display: flex;
  align-items: center;
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.searchInput {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  font-size: 1rem;
}

.results {
  max-height: 400px;
  overflow-y: auto;
}

.noResults {
  padding: var(--space-8);
  text-align: center;
  color: var(--color-text-muted);
}
```

---

### T-004: 创建 SearchModal Component

**优先级**: 🔴 最高

**状态**: ✅ completed

**依赖**: T-002, T-003

**输入**: 
- `plan.md` §4.2
- `src/hooks/useSearch.ts`
- `SearchModal.module.css`

**输出**: 
- `src/components/search/SearchModal.tsx`

**验收标准**:
- [x] Props: isOpen, onClose
- [x] input 自动聚焦
- [x] ESC 关闭 Modal
- [x] 点击 overlay 关闭
- [x] 结果按 type 分组显示
- [x] 空结果显示 "无匹配结果"

---

### T-005: 创建 SearchResultItem CSS

**优先级**: 🟡 高

**状态**: ✅ completed

**依赖**: 无

**输出**: 
- `src/components/search/SearchResultItem.module.css`

**验收标准**:
- [x] item 悬浮样式
- [x] name 高亮匹配关键词 (可选)
- [x] description 截断 (max 60 chars)
- [x] entity type 标识样式
- [x] hover: background 变化

---

### T-006: 创建 SearchResultItem Component

**优先级**: 🔴 最高

**状态**: ✅ completed

**依赖**: T-001, T-005

**输入**: 
- `spec.md` §4.3
- `SearchResultItem.module.css`

**输出**: 
- `src/components/search/SearchResultItem.tsx`

**验收标准**:
- [x] Props: result, onSelect
- [x] Entity type 图标/颜色
- [x] 名称、描述显示
- [x] 点击调用 onSelect(href)
- [x] Hover 效果

**实现要点**:

```typescript
interface SearchResultItemProps {
  result: SearchResult;
  onSelect: (href: string) => void;
}

const TYPE_ICONS = {
  skill: '⚡',
  role: '🎭',
  contract: '📋',
  command: '▶️'
};

const TYPE_COLORS = {
  skill: 'var(--color-primary)',
  role: 'var(--color-accent)',
  contract: 'var(--color-warning)',
  command: 'var(--color-info)'
};
```

---

## Phase 3: Integration

### T-007: 创建 SearchTrigger Component

**优先级**: 🟡 高

**状态**: ✅ completed

**依赖**: 无

**输入**: 
- `spec.md` §4.1

**输出**: 
- `src/components/search/SearchTrigger.tsx`
- `src/components/search/SearchTrigger.module.css`

**验收标准**:
- [x] Props: onClick
- [x] 搜索图标 + 文字
- [x] 快捷键提示 (⌘K / Ctrl+K)
- [x] Hover 效果

---

### T-008: 更新 Header 添加 SearchTrigger

**优先级**: 🔴 最高

**状态**: ✅ completed

**依赖**: T-007, T-004

**输入**: 
- `src/components/common/Header.tsx`

**输出**: 
- `src/components/common/Header.tsx` (modified)
- `src/components/common/Header.module.css` (modified)

**验收标准**:
- [x] SearchModal state 管理 (isOpen, setIsOpen)
- [x] SearchTrigger 在 Header 显示
- [x] SearchModal 渲染正确
- [x] 移动端兼容

---

### T-009: 添加全局快捷键处理

**优先级**: 🔴 最高

**状态**: ✅ completed

**依赖**: T-004

**输入**: 
- `plan.md` §5
- `src/App.tsx` 或 Header

**输出**: 
- 更新 Header 或 App 的 useEffect

**验收标准**:
- [x] Cmd+K (Mac) 打开搜索
- [x] Ctrl+K (Windows) 打开搜索
- [x] e.preventDefault() 阻止默认行为
- [x] ESC 关闭（已在 SearchModal 实现）

---

## Phase 4: Validation

### T-010: 构建验证

**优先级**: 🔴 最高

**状态**: ✅ completed

**依赖**: T-008, T-009

**验收标准**:
- [x] `npm run build` 无错误
- [x] TypeScript 类型检查通过
- [x] 无 console 错误

---

### T-011: 手动验证

**优先级**: 🟡 高

**状态**: ✅ completed

**依赖**: T-010

**验收标准**:
- [x] SearchTrigger 显示正确
- [x] Cmd+K / Ctrl+K 打开搜索
- [x] 输入搜索即时响应
- [x] 结果分组显示
- [x] 点击结果跳转正确
- [x] ESC 关闭 Modal
- [x] 点击 overlay 关闭
- [x] 空结果显示提示

---

## Implementation Sequence

```
Phase 1 (Foundation):
T-001 (types) ──→ T-002 (useSearch Hook)
T-003 (Modal CSS) ─┘

Phase 2 (Components):
T-004 (SearchModal) ──── depends on T-002, T-003
T-005 (ResultItem CSS) ─┐
T-006 (ResultItem) ─────┘ depends on T-001

Phase 3 (Integration):
T-007 (SearchTrigger)
T-008 (Header update) ── depends on T-007, T-004
T-009 (Keyboard) ──────── depends on T-004

Phase 4 (Validation):
T-010 (Build) ── depends on T-008, T-009
T-011 (Manual) ── depends on T-010
```

---

## Progress Tracking

| Task | 状态 | 完成时间 | 备注 |
|------|------|----------|------|
| T-001 | ✅ | 2026-04-05 | search.ts types |
| T-002 | ✅ | 2026-04-05 | useSearch Hook |
| T-003 | ✅ | 2026-04-05 | SearchModal CSS |
| T-004 | ✅ | 2026-04-05 | SearchModal Component |
| T-005 | ✅ | 2026-04-05 | SearchResultItem CSS |
| T-006 | ✅ | 2026-04-05 | SearchResultItem Component |
| T-007 | ✅ | 2026-04-05 | SearchTrigger Component |
| T-008 | ✅ | 2026-04-05 | Header update |
| T-009 | ✅ | 2026-04-05 | Keyboard shortcut (Cmd+K/Ctrl+K) |
| T-010 | ✅ | 2026-04-05 | Build passed (1.30s) |
| T-011 | ✅ | 2026-04-05 | Manual verification |

**状态说明**:
- ⏳ pending - 待开始
- 🔄 in_progress - 进行中
- ✅ completed - 已完成
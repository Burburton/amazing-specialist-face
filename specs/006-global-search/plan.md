# Plan: Global Search

## Metadata
```yaml
feature_id: 006-global-search
status: completed
created: 2026-04-05
author: architect
based_on: spec.md
```

## 1. Implementation Strategy

### Approach: Component-First

1. 先实现核心搜索逻辑 (useSearch Hook)
2. 再实现搜索组件 (SearchModal, SearchResultItem)
3. 最后集成到 Header (SearchTrigger)

### Parallel Execution Opportunities

- Hook + Modal CSS 可以并行
- SearchResultItem + CSS 可以并行

---

## 2. Phase Breakdown

### Phase 1: Foundation (30 min)

| Task | Description | Parallel |
|------|-------------|----------|
| P1-001 | Create useSearch Hook | No |
| P1-002 | Create SearchModal CSS | Yes (with P1-001) |

### Phase 2: Core Components (45 min)

| Task | Description | Parallel |
|------|-------------|----------|
| P2-001 | Create SearchModal Component | No |
| P2-002 | Create SearchResultItem Component | Yes (with P2-003) |
| P2-003 | Create SearchResultItem CSS | Yes (with P2-002) |

### Phase 3: Integration (30 min)

| Task | Description | Parallel |
|------|-------------|----------|
| P3-001 | Create SearchTrigger Component | No |
| P3-002 | Update Header with SearchTrigger | No |
| P3-003 | Add Keyboard Shortcut Handler | No |

### Phase 4: Polish (15 min)

| Task | Description | Parallel |
|------|-------------|----------|
| P4-001 | Build Verification | No |
| P4-002 | Manual Verification | No |

---

## 3. File Structure

```
src/
├── hooks/
│   └── useSearch.ts                (new)
│
├── components/
│   ├── search/
│   │   ├── SearchModal.tsx         (new)
│   │   ├── SearchModal.module.css  (new)
│   │   ├── SearchResultItem.tsx    (new)
│   │   ├── SearchResultItem.module.css (new)
│   │   └── SearchTrigger.tsx       (new)
│   │   └── SearchTrigger.module.css (new)
│   │
│   └── common/
│       └── Header.tsx              (modified)
│       └── Header.module.css       (modified)
│
├── types/
│   └── search.ts                   (new)
│
└── App.tsx                         (modified - add keyboard listener)
```

---

## 4. Implementation Details

### 4.1 useSearch Hook

```typescript
// src/hooks/useSearch.ts
import { useState, useMemo, useCallback } from 'react';
import skillsData from '../data/skills.json';
import rolesData from '../data/roles.json';
import contractsData from '../data/contracts.json';
import commandsData from '../data/commands.json';
import type { SearchResult } from '../types/search';

export function useSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search skills
    skillsData.skills.forEach(skill => {
      const score = calculateScore(q, skill.name, skill.id, skill.description, skill.role);
      if (score > 0) {
        results.push({
          type: 'skill',
          id: skill.id,
          name: skill.name,
          description: skill.description,
          href: `/skills/${encodeURIComponent(skill.id)}`,
          score,
          metadata: { role: skill.role, category: skill.category }
        });
      }
    });

    // Search roles
    rolesData.roles.forEach(role => {
      const score = calculateScore(q, role.name, role.name, role.mission, role.inScope.join(' '));
      if (score > 0) {
        const emoji = getRoleEmoji(role.name);
        results.push({
          type: 'role',
          id: role.name,
          name: role.name,
          description: role.mission,
          href: `/roles/${role.name}`,
          score,
          metadata: { emoji }
        });
      }
    });

    // Search contracts
    contractsData.contracts.forEach(contract => {
      const score = calculateScore(q, contract.contract_name, contract.contract_id, contract.description, contract.producer_role);
      if (score > 0) {
        results.push({
          type: 'contract',
          id: contract.contract_id,
          name: contract.contract_name,
          description: contract.description,
          href: `/contracts/${contract.contract_id}`,
          score,
          metadata: { contractId: contract.contract_id, producer: contract.producer_role }
        });
      }
    });

    // Search commands
    commandsData.commands.forEach(command => {
      const score = calculateScore(q, command.name, command.name, command.description, command.inputs.join(' '));
      if (score > 0) {
        results.push({
          type: 'command',
          id: command.name,
          name: `/${command.name}`,
          description: command.description,
          href: `/commands/${command.name}`,
          score
        });
      }
    });

    // Sort by score, limit per type
    return sortAndLimit(results, 5);
  }, [query]);

  return { query, setQuery, results };
}

function calculateScore(query: string, name: string, id: string, description: string, extra?: string): number {
  const nameLower = name.toLowerCase();
  const idLower = id.toLowerCase();
  
  // Exact match in name/id: highest priority
  if (nameLower === query || idLower === query) return 100;
  
  // Starts with query: high priority
  if (nameLower.startsWith(query) || idLower.startsWith(query)) return 80;
  
  // Contains query: medium priority
  if (nameLower.includes(query) || idLower.includes(query)) return 60;
  
  // Description contains: lower priority
  if (description.toLowerCase().includes(query)) return 40;
  
  // Extra fields contain: lowest priority
  if (extra && extra.toLowerCase().includes(query)) return 20;
  
  return 0;
}
```

### 4.2 SearchModal Component

```typescript
// src/components/search/SearchModal.tsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import SearchResultItem from './SearchResultItem';
import styles from './SearchModal.module.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { query, setQuery, results } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
    }
  }, [isOpen, setQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = (href: string) => {
    navigate(href);
    onClose();
  };

  if (!isOpen) return null;

  const groupedResults = groupByType(results);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.searchInputWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="搜索 skills, roles, contracts, commands..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <kbd className={styles.shortcut}>ESC</kbd>
        </div>

        <div className={styles.results}>
          {results.length === 0 && query.trim() && (
            <div className={styles.noResults}>无匹配结果</div>
          )}

          {groupedResults.skills.length > 0 && (
            <div className={styles.resultGroup}>
              <h3 className={styles.groupTitle}>Skills ({groupedResults.skills.length})</h3>
              {groupedResults.skills.map(result => (
                <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />
              ))}
            </div>
          )}

          {groupedResults.roles.length > 0 && (
            <div className={styles.resultGroup}>
              <h3 className={styles.groupTitle}>Roles ({groupedResults.roles.length})</h3>
              {groupedResults.roles.map(result => (
                <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />
              ))}
            </div>
          )}

          {groupedResults.contracts.length > 0 && (
            <div className={styles.resultGroup}>
              <h3 className={styles.groupTitle}>Contracts ({groupedResults.contracts.length})</h3>
              {groupedResults.contracts.map(result => (
                <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />
              ))}
            </div>
          )}

          {groupedResults.commands.length > 0 && (
            <div className={styles.resultGroup}>
              <h3 className={styles.groupTitle}>Commands ({groupedResults.commands.length})</h3>
              {groupedResults.commands.map(result => (
                <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 5. Keyboard Shortcut Implementation

```typescript
// In App.tsx or a dedicated component
useEffect(() => {
  const handleGlobalKeyDown = (e: KeyboardEvent) => {
    // Cmd+K (Mac) or Ctrl+K (Windows)
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen(true);
    }
  };
  
  window.addEventListener('keydown', handleGlobalKeyDown);
  return () => window.removeEventListener('keydown', handleGlobalKeyDown);
}, []);
```

---

## 6. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Performance with large dataset | Limit results per type (5), debounce input |
| Keyboard shortcut conflicts | Use standard Cmd+K/Ctrl+K pattern |
| Mobile experience | Ensure touch-friendly, search button visible |

---

## 7. Estimated Timeline

| Phase | Duration |
|-------|----------|
| Phase 1: Foundation | 30 min |
| Phase 2: Core Components | 45 min |
| Phase 3: Integration | 30 min |
| Phase 4: Polish | 15 min |
| **Total** | **~2 hours** |

---

## 8. Dependencies

- `src/data/*.json` - 数据源（已存在）
- `src/types/index.ts` - 基础类型（已存在）
- PPT Manual Style design tokens（已存在）
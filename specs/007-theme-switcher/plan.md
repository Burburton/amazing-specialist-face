# Plan: Theme Switcher

## Metadata
```yaml
feature_id: 007-theme-switcher
status: completed
created: 2026-04-05
author: architect
based_on: spec.md
```

## 1. Implementation Strategy

### Approach: CSS Variables + data-theme Attribute

1. 扩展 `tokens.css` 添加 `[data-theme="light"]` 规则
2. 创建 `useTheme` Hook 管理主题状态
3. 创建 `ThemeToggle` 组件
4. 集成到 Header
5. 添加无闪烁初始化脚本

---

## 2. Phase Breakdown

### Phase 1: Foundation (15 min)

| Task | Description |
|------|-------------|
| P1-001 | Update tokens.css with data-theme selectors |
| P1-002 | Create useTheme Hook |

### Phase 2: Components (20 min)

| Task | Description |
|------|-------------|
| P2-001 | Create ThemeToggle Component + CSS |
| P2-002 | Update Header with ThemeToggle |

### Phase 3: Integration (10 min)

| Task | Description |
|------|-------------|
| P3-001 | Add anti-flash script to index.html |
| P3-002 | Build verification |

---

## 3. File Structure

```
src/
├── hooks/
│   └── useTheme.ts               (new)
│
├── components/
│   └── common/
│       ├── ThemeToggle.tsx       (new)
│       ├── ThemeToggle.module.css (new)
│       └── Header.tsx            (modified)
│
├── styles/
│   └── tokens.css                (modified)
│
└── index.html                    (modified - anti-flash script)
```

---

## 4. Implementation Details

### 4.1 tokens.css Updates

```css
/* Light mode (显式设置时) */
[data-theme="light"] {
  --color-background: #fafafa;
  --color-surface: #ffffff;
  --color-surface-elevated: #f4f4f5;
  --color-surface-muted: #e4e4e7;
  
  --color-text-primary: #18181b;
  --color-text-secondary: #52525b;
  --color-text-muted: #a1a1aa;
  --color-text-inverse: #fafafa;
  
  --color-border: #e4e4e7;
  --color-border-subtle: #d4d4d8;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* Dark mode (显式设置时，覆盖 media query) */
[data-theme="dark"] {
  --color-background: #09090b;
  --color-surface: #18181b;
  --color-surface-elevated: #27272a;
  --color-surface-muted: #3f3f46;
  
  --color-text-primary: #fafafa;
  --color-text-secondary: #a1a1aa;
  --color-text-muted: #71717a;
  --color-text-inverse: #09090b;
  
  --color-border: #27272a;
  --color-border-subtle: #3f3f46;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
}
```

### 4.2 useTheme Hook

```typescript
import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem(STORAGE_KEY) as Theme) || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      root.removeAttribute('data-theme');
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      setResolvedTheme(mq.matches ? 'dark' : 'light');
      
      const handler = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } else {
      root.setAttribute('data-theme', theme);
      setResolvedTheme(theme);
    }
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  return { theme, setTheme, resolvedTheme };
}
```

### 4.3 ThemeToggle Component

```typescript
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const icon = resolvedTheme === 'dark' ? '🌙' : '☀️';

  return (
    <div className={styles.container} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Toggle theme"
      >
        {icon}
      </button>
      
      {isOpen && (
        <div className={styles.menu}>
          <button
            className={`${styles.option} ${theme === 'light' ? styles.active : ''}`}
            onClick={() => { setTheme('light'); setIsOpen(false); }}
            type="button"
          >
            ☀️ Light
          </button>
          <button
            className={`${styles.option} ${theme === 'dark' ? styles.active : ''}`}
            onClick={() => { setTheme('dark'); setIsOpen(false); }}
            type="button"
          >
            🌙 Dark
          </button>
          <button
            className={`${styles.option} ${theme === 'system' ? styles.active : ''}`}
            onClick={() => { setTheme('system'); setIsOpen(false); }}
            type="button"
          >
            💻 System
          </button>
        </div>
      )}
    </div>
  );
}
```

---

## 5. Estimated Timeline

| Phase | Duration |
|-------|----------|
| Phase 1: Foundation | 15 min |
| Phase 2: Components | 20 min |
| Phase 3: Integration | 10 min |
| **Total** | **~45 min** |

---

## 6. Dependencies

- `src/styles/tokens.css` - 现有设计令牌
- `src/components/common/Header.tsx` - Header 结构
- `index.html` - 无闪烁脚本注入点
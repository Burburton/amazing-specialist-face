# Plan: 010-performance-optimization

## Technical Design

### Current State Analysis

```
dist/assets/index-CnEI7dGi.js    225.60 KB (72.01 KB gzipped)
dist/assets/router-C4_jtw_C.js    49.71 KB (17.51 KB gzipped)
dist/assets/HomePage-*.js         11.69 KB (3.63 KB gzipped)
dist/assets/ExecutionPage-*.js    16.34 KB (4.70 KB gzipped)
```

### Target Architecture

```
Initial Load:
- index.js (core: React, Router) ~70KB
- router.js (route definitions) ~20KB

Lazy Loaded on Demand:
- HomePage.js ~15KB
- SkillsPage.js ~10KB
- RolesPage.js ~10KB
- ExecutionPage.js ~15KB
- etc.
```

### Implementation Strategy

#### 1. Route-Based Code Splitting

Update `src/App.tsx`:

```tsx
import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const RolesPage = lazy(() => import('./pages/RolesPage'));
// ... other pages

function LoadingFallback() {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-header" />
      <div className="skeleton-content" />
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            {/* ... */}
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
```

#### 2. Preload on Hover

Create a preload utility:

```tsx
const pageLoaders = {
  home: () => import('./pages/HomePage'),
  skills: () => import('./pages/SkillsPage'),
  // ...
};

function usePreload() {
  const preload = (page: keyof typeof pageLoaders) => {
    pageLoaders[page]();
  };
  return preload;
}

// In navigation links:
<Link 
  to="/skills" 
  onMouseEnter={() => preload('skills')}
>
  Skills
</Link>
```

#### 3. Component-Level Lazy Loading

For heavy diagrams:

```tsx
const WorkflowDiagram = lazy(() => import('./components/diagrams/WorkflowDiagram'));
const RoleCollaborationDiagram = lazy(() => import('./components/diagrams/RoleCollaborationDiagram'));
```

#### 4. Loading Skeleton Styles

Add to App.css:

```css
.loading-skeleton {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6);
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-header {
  height: 64px;
  background: var(--color-surface-elevated);
  border-radius: var(--radius-md);
}

.skeleton-content {
  height: 300px;
  background: var(--color-surface-elevated);
  border-radius: var(--radius-md);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

## Implementation Tasks

### Phase 1: Core Lazy Loading (Day 1)
- [ ] Update App.tsx to use React.lazy for all pages
- [ ] Create LoadingFallback component
- [ ] Add loading skeleton styles
- [ ] Test lazy loading works

### Phase 2: Preload Strategy (Day 1)
- [ ] Create preload utility
- [ ] Add onMouseEnter handlers to navigation
- [ ] Test preload improves perceived performance

### Phase 3: Error Handling (Day 1)
- [ ] Create ErrorBoundary component
- [ ] Wrap Suspense in ErrorBoundary
- [ ] Add retry mechanism

### Phase 4: Verification (Day 2)
- [ ] Run Lighthouse audit
- [ ] Verify bundle sizes
- [ ] Test all pages load correctly
- [ ] Document performance improvements

## Files to Modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Add lazy imports, Suspense |
| `src/App.css` | Add loading skeleton styles |
| `src/components/common/Layout.tsx` | Add preload on hover |

## Success Metrics

- Initial bundle: < 150KB gzipped (from 225KB)
- Lighthouse Performance: ≥ 90
- LCP: < 2.5s
- All pages load successfully
# Plan: Execution Page PPT Manual Style

## Metadata
```yaml
feature_id: 008-execution-ppt-style
status: completed
created: 2026-04-05
author: architect
based_on: spec.md
```

## 1. Implementation Strategy

### Approach: Section-by-Section Refactor

1. 先改造 ExecutionPage 主布局
2. 再改造 StatsOverview 组件
3. 最后改造 TaskCard 和其他组件

---

## 2. Phase Breakdown

### Phase 1: Layout Refactor (30 min)

| Task | Description |
|------|-------------|
| P1-001 | Refactor ExecutionPage to section layout |
| P1-002 | Add scroll-snap behavior |
| P1-003 | Update page CSS for PPT Manual Style |

### Phase 2: Component Updates (45 min)

| Task | Description |
|------|-------------|
| P2-001 | Update StatsOverview for PPT Manual Style |
| P2-002 | Update TaskCard styles |
| P2-003 | Update filter bar styles |
| P2-004 | Update detail section styles |

### Phase 3: Polish (15 min)

| Task | Description |
|------|-------------|
| P3-001 | Responsive adjustments |
| P3-002 | Build verification |

---

## 3. File Structure

```
src/
├── pages/
│   ├── ExecutionPage.tsx           (modified)
│   └── ExecutionPage.module.css    (modified)
│
├── components/
│   └── execution/
│       ├── StatsOverview.tsx       (modified)
│       ├── StatsOverview.module.css (modified)
│       ├── TaskCard.tsx            (modified)
│       └── TaskCard.module.css     (modified)
```

---

## 4. Implementation Details

### 4.1 ExecutionPage Layout

```typescript
// ExecutionPage.tsx
return (
  <div className={styles.container} data-execution-container>
    <section className={styles.overviewSection}>
      <h1 className={styles.pageTitle}>Execution</h1>
      <p className={styles.subtitle}>Real-time Task Monitor</p>
      <StatsOverview stats={stats} />
    </section>

    <section className={styles.tasksSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Tasks</h2>
        <FilterBar filter={filter} setFilter={setFilter} />
      </div>
      <div className={styles.taskGrid}>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
          />
        ))}
      </div>
    </section>

    {selectedTask && (
      <section className={styles.detailSection}>
        <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
      </section>
    )}
  </div>
);
```

### 4.2 ExecutionPage CSS

```css
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.overviewSection {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  scroll-snap-align: start;
}

.tasksSection {
  min-height: 100vh;
  padding: var(--space-8);
  scroll-snap-align: start;
}

.detailSection {
  min-height: 100vh;
  padding: var(--space-8);
  scroll-snap-align: start;
}

.pageTitle {
  font-family: var(--font-display);
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.subtitle {
  font-family: var(--font-mono);
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: var(--color-text-muted);
  margin-bottom: var(--space-8);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

---

## 5. Estimated Timeline

| Phase | Duration |
|-------|----------|
| Phase 1: Layout | 30 min |
| Phase 2: Components | 45 min |
| Phase 3: Polish | 15 min |
| **Total** | **~1.5 hours** |

---

## 6. Dependencies

- `src/pages/ExecutionPage.tsx` - 现有页面
- `src/components/execution/*` - 现有组件
- `src/styles/tokens.css` - 设计令牌
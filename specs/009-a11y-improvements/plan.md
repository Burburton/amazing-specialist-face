# Plan: 009-a11y-improvements

## Technical Design

### Module Changes

#### 1. Layout.tsx - Skip Navigation
Add skip-to-content link at the top of the page.

```tsx
// Add before header
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

// Update main element
<main id="main-content" className={styles.main}>
```

#### 2. Header.module.css - Skip Link Styles
```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 9999;
  padding: 1rem;
  background: var(--color-primary);
  color: white;
  text-decoration: none;
}

.skip-link:focus {
  top: 0;
}
```

#### 3. SearchModal.tsx - Focus Management
- Add `aria-modal="true"`
- Add `aria-labelledby` referencing modal title
- Implement focus trap
- Auto-focus search input on open
- Restore focus on close

#### 4. ThemeToggle.tsx - ARIA
- Add `aria-label` to toggle button
- Announce current theme state
- Add `aria-pressed` for toggle state

#### 5. Global Focus Styles
Add visible focus indicators in App.css:
```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Remove default outline when not using keyboard */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Semantic HTML Updates

#### Layout Structure
```html
<body>
  <a href="#main-content">Skip to main content</a>
  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">
      ...
    </nav>
  </header>
  <main id="main-content" role="main">
    ...
  </main>
</body>
```

#### Card Components
- Ensure heading hierarchy (h3 for card titles)
- Add aria-labels to icon-only buttons
- Make card links descriptive

### Color Contrast Verification

Variables to check:
- `--color-text-primary` on `--color-background`
- `--color-text-secondary` on `--color-background`
- `--color-text-muted` on `--color-background`
- Focus ring color on all backgrounds

### Animation Preferences

Update existing animations:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Implementation Tasks

### Phase 1: Core Structure (Day 1)
- [ ] Add skip navigation link
- [ ] Update semantic HTML landmarks
- [ ] Add global focus styles
- [ ] Verify heading hierarchy

### Phase 2: Interactive Components (Day 1-2)
- [ ] SearchModal focus trap and ARIA
- [ ] ThemeToggle ARIA attributes
- [ ] Mobile menu keyboard navigation
- [ ] Modal close on Escape

### Phase 3: Content Components (Day 2)
- [ ] Card components alt text and labels
- [ ] Navigation links accessible names
- [ ] Icon buttons aria-labels

### Phase 4: Testing & Verification (Day 2-3)
- [ ] Keyboard-only navigation test
- [ ] Screen reader test (NVDA/VoiceOver)
- [ ] Color contrast audit
- [ ] Lighthouse accessibility audit

## Testing Strategy

### Manual Testing
1. **Keyboard Navigation Test**
   - Navigate entire site using Tab/Shift+Tab
   - Verify all interactive elements reachable
   - Check focus order matches visual order

2. **Screen Reader Test**
   - Test with NVDA (Windows) or VoiceOver (macOS)
   - Verify page structure announced correctly
   - Check dynamic content updates announced

3. **Color Contrast Test**
   - Use browser DevTools contrast checker
   - Verify all text meets ratio requirements

### Automated Testing
- Lighthouse accessibility audit (target: 95+ score)
- axe-core browser extension scan
- WAVE accessibility evaluation

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/common/Layout.tsx` | Add skip link, semantic landmarks |
| `src/components/common/Layout.module.css` | Skip link styles |
| `src/components/common/Header.tsx` | Nav aria-label, focus management |
| `src/components/search/SearchModal.tsx` | Focus trap, ARIA attributes |
| `src/components/common/ThemeToggle.tsx` | ARIA labels, pressed state |
| `src/App.css` | Focus visible styles, reduced motion |
| `src/components/cards/*.tsx` | Heading hierarchy, alt text |

## Success Metrics

- Lighthouse accessibility score ≥ 95
- All acceptance criteria met
- No axe-core violations
- Successful keyboard-only navigation
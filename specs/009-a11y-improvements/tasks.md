# Tasks: 009-a11y-improvements

## Task List

### T-001: Add Skip Navigation Link
**Priority:** High
**Status:** [ ] Not Started
**Assignee:** developer
**Dependencies:** None

**Description:**
Add a "Skip to main content" link that appears when focused, allowing keyboard users to bypass navigation.

**Files:**
- `src/components/common/Layout.tsx`
- `src/components/common/Layout.module.css`

**Acceptance:**
- Link is first focusable element
- Link appears on focus
- Activating link moves focus to main content
- Works on all pages

---

### T-002: Update Semantic HTML Landmarks
**Priority:** High
**Status:** [ ] Not Started
**Assignee:** developer
**Dependencies:** None

**Description:**
Ensure proper use of semantic HTML elements and ARIA landmarks.

**Files:**
- `src/components/common/Layout.tsx`
- `src/components/common/Header.tsx`

**Acceptance:**
- `<header>` has `role="banner"`
- `<nav>` has `aria-label`
- `<main>` has `id="main-content"` and `role="main"`
- Heading hierarchy starts with single `<h1>`

---

### T-003: Add Global Focus Styles
**Priority:** High
**Status:** [ ] Not Started
**Assignee:** developer
**Dependencies:** None

**Description:**
Implement visible focus indicators for all interactive elements.

**Files:**
- `src/App.css`

**Acceptance:**
- Focus visible on all interactive elements
- Focus indicator has 3:1 contrast minimum
- Focus not shown on mouse click (only keyboard)
- Outline offset provides visual separation

---

### T-004: SearchModal Accessibility
**Priority:** High
**Status:** [ ] Not Started
**Assignee:** developer
**Dependencies:** None

**Description:**
Make search modal fully accessible with focus management.

**Files:**
- `src/components/search/SearchModal.tsx`
- `src/components/search/SearchModal.module.css` (if exists)

**Acceptance:**
- Modal has `role="dialog"` and `aria-modal="true"`
- Modal has `aria-labelledby`
- Focus trapped within modal
- Escape key closes modal
- Focus returns to trigger on close
- Search input auto-focused

---

### T-005: ThemeToggle ARIA Attributes
**Priority:** Medium
**Status:** [ ] Not Started
**Assignee:** developer
**Dependencies:** None

**Description:**
Add proper ARIA attributes to theme toggle button.

**Files:**
- `src/components/common/ThemeToggle.tsx`

**Acceptance:**
- Button has descriptive `aria-label`
- Current theme announced
- `aria-pressed` reflects theme state

---

### T-006: Mobile Menu Keyboard Navigation
**Priority:** Medium
**Status:** [ ] Not Started
**Assignee:** developer
**Dependencies:** None

**Description:**
Ensure mobile menu is fully keyboard accessible.

**Files:**
- `src/components/common/Header.tsx`

**Acceptance:**
- Menu opens with Enter/Space
- Menu items navigable with Tab
- Escape closes menu
- Focus returns to menu button on close

---

### T-007: Card Component Accessibility
**Priority:** Medium
**Status:** [ ] Not Started
**Assignee:** developer
**Dependencies:** None

**Description:**
Ensure all card components have proper accessibility attributes.

**Files:**
- `src/components/cards/SkillCard.tsx`
- `src/components/cards/RoleCard.tsx`
- `src/components/cards/ContractCard.tsx`
- `src/components/cards/CommandCard.tsx`

**Acceptance:**
- Links have descriptive text
- Headings use correct hierarchy
- Icons have aria-hidden or aria-label

---

### T-008: Reduced Motion Support
**Priority:** Medium
**Status:** [ ] Not Started
**Assignee:** developer
**Dependencies:** None

**Description:**
Add CSS media query to respect user's motion preferences.

**Files:**
- `src/App.css`

**Acceptance:**
- Animations disabled when prefers-reduced-motion: reduce
- No essential information lost

---

### T-009: Accessibility Testing
**Priority:** High
**Status:** [ ] Not Started
**Assignee:** tester
**Dependencies:** T-001 through T-008

**Description:**
Perform comprehensive accessibility testing.

**Test Cases:**
1. Keyboard-only navigation test
2. Screen reader test (NVDA/VoiceOver)
3. Color contrast audit
4. Lighthouse accessibility audit
5. axe-core scan

**Acceptance:**
- All AC criteria met
- Lighthouse a11y score ≥ 95
- No critical axe violations

---

### T-010: Documentation
**Priority:** Low
**Status:** [ ] Not Started
**Assignee:** docs
**Dependencies:** T-009

**Description:**
Document accessibility features and known limitations.

**Files:**
- `README.md` accessibility section
- `specs/009-a11y-improvements/completion-report.md`

**Acceptance:**
- Keyboard shortcuts documented
- Screen reader support noted
- Known limitations listed
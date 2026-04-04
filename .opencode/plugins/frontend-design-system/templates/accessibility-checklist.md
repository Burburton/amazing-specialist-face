# Accessibility Checklist

WCAG 2.1 AA Compliance Checklist for UI Design Review.

## Color & Contrast

### Contrast Ratios

| Text Type | Minimum Ratio | Check |
|-----------|---------------|-------|
| Normal text (< 18px) | 4.5:1 | ☐ |
| Large text (≥ 18px or 14px bold) | 3:1 | ☐ |
| UI components & graphics | 3:1 | ☐ |

### Color Usage

- [ ] Color is not the only means of conveying information
- [ ] Focus states are visible (not just color change)
- [ ] Links are distinguishable from surrounding text
- [ ] Error states have text/icon in addition to color

## Touch Targets

### Minimum Size

| Element | Minimum Size | Check |
|---------|--------------|-------|
| Touch targets | 44×44 px | ☐ |
| Inline links | 44×44 px hit area | ☐ |
| Form inputs | 44 px height minimum | ☐ |

### Spacing

- [ ] Adjacent touch targets have adequate spacing
- [ ] Touch targets don't overlap

## Keyboard Accessibility

### Focus Management

- [ ] All interactive elements are focusable via keyboard
- [ ] Focus order follows visual/logical order
- [ ] Focus is trapped in modals/dialogs
- [ ] Focus returns to trigger element when modal closes

### Focus Visibility

- [ ] Focus indicator is clearly visible
- [ ] Focus indicator has 3:1 contrast ratio
- [ ] Custom focus styles override browser defaults consistently

### Keyboard Navigation

| Key | Action | Check |
|-----|--------|-------|
| Tab | Move forward | ☐ |
| Shift+Tab | Move backward | ☐ |
| Enter/Space | Activate buttons, links | ☐ |
| Arrow keys | Navigate menus, lists, tabs | ☐ |
| Escape | Close modals, dropdowns | ☐ |

## Motion & Animation

### Reduced Motion

- [ ] Respects `prefers-reduced-motion: reduce`
- [ ] No auto-playing animations that can't be paused
- [ ] No flashing content (> 3 times per second)

### Implementation

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Forms

### Labels

- [ ] All form fields have visible labels
- [ ] Labels are associated with inputs (`for` attribute)
- [ ] Required fields are indicated (not just by color)

### Error Handling

- [ ] Error messages are associated with inputs
- [ ] Error messages are announced to screen readers
- [ ] Form validation errors are clear and actionable

### Instructions

- [ ] Input format requirements are stated upfront
- [ ] Helper text is available for complex inputs

## Images & Media

### Images

| Image Type | Requirement | Check |
|------------|-------------|-------|
| Informative | Alt text describes content/purpose | ☐ |
| Decorative | Empty `alt=""` or CSS background | ☐ |
| Complex | Extended description available | ☐ |

### Media

- [ ] Videos have captions
- [ ] Audio has transcripts
- [ ] Media can be paused/stopped

## Screen Reader Support

### Semantic HTML

- [ ] Proper heading hierarchy (h1→h2→h3)
- [ ] Landmarks used correctly (main, nav, aside)
- [ ] Lists use proper markup (ul, ol, li)
- [ ] Tables have headers

### ARIA

- [ ] ARIA used only when native HTML insufficient
- [ ] ARIA roles match element purpose
- [ ] ARIA labels don't duplicate visible text
- [ ] Live regions for dynamic content updates

## Responsive Design

### Zoom & Scaling

- [ ] Works at 200% browser zoom
- [ ] Works at 400% page zoom
- [ ] No horizontal scrolling at 320px viewport
- [ ] Text remains readable when zoomed

### Orientation

- [ ] Works in both portrait and landscape
- [ ] No orientation lock required

## Testing Tools

### Automated Testing

- [ ] axe DevTools
- [ ] Lighthouse Accessibility Audit
- [ ] WAVE Web Accessibility Evaluator

### Manual Testing

- [ ] Keyboard-only navigation
- [ ] Screen reader testing (VoiceOver, NVDA, JAWS)
- [ ] Color contrast checker
- [ ] Zoom testing at 200%, 400%

## Quick Validation Commands

```bash
# Check contrast ratio (requires node)
npx axe-cli --tags wcag2a,wcag2aa <url>

# Lighthouse audit
npx lighthouse <url> --only-categories=accessibility
```

## Severity Levels

| Level | Description | Action |
|-------|-------------|--------|
| **Blocker** | Prevents users from completing tasks | Must fix before release |
| **Major** | Significant barrier to accessibility | Should fix in current sprint |
| **Minor** | Minor inconvenience | Fix when possible |

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
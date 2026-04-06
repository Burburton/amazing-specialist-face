# Skill: icon-design

## Purpose

Design consistent, accessible, and visually coherent icons that match the project's UI design system. This skill ensures all icons follow established design patterns, color schemes, and accessibility guidelines.

Core problems solved:
- Inconsistent icon styles across the application
- Icons that don't match the design system's visual language
- Accessibility issues with icons (color contrast, meaningful alt text)
- Performance issues from unoptimized icon assets

## When to Use

Required when:
- Adding new icons to the application
- Creating icon sets for new features
- Redesigning existing icons to match updated design system
- Creating role/feature-specific icons (architect, developer, tester, etc.)

Recommended when:
- Documenting icon usage guidelines
- Creating icon libraries for reuse
- Optimizing existing icon assets

## When Not to Use

Not applicable when:
- Using existing, well-established icon libraries (Lucide, Heroicons, etc.)
- Simple decorative icons with no semantic meaning
- Third-party integrations with their own icon requirements

## Required Inputs

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `icon_purpose` | string | Yes | What the icon represents and where it will be used |
| `context` | string | Yes | Component or page where icon will appear |
| `size_requirements` | string[] | Yes | Required sizes (e.g., 16px, 20px, 24px, 32px) |

## Optional Inputs

| Field | Type | Description |
|-------|------|-------------|
| `color_variant` | string | Specific color requirements (primary, secondary, role-specific) |
| `accessibility_label` | string | ARIA label if icon is standalone |
| `animation_needs` | boolean | Whether icon needs animation states |
| `existing_references` | string[] | Similar icons for style reference |

## Design Principles

### 1. Visual Consistency

Icons must follow these design tokens:

```css
/* Icon Design Tokens */
--icon-stroke-width: 2px;          /* Consistent stroke width */
--icon-corner-radius: 2px;         /* Rounded corners for friendly feel */
--icon-optical-size: 24px;         /* Default optical size */
--icon-color: var(--color-text-secondary);  /* Default icon color */
--icon-color-hover: var(--color-text-primary);

/* Role-Specific Icon Colors */
--icon-color-architect: #8b5cf6;   /* Purple - strategic thinking */
--icon-color-developer: #3b82f6;   /* Blue - technical execution */
--icon-color-tester: #22c55e;      /* Green - quality assurance */
--icon-color-reviewer: #f59e0b;    /* Amber - critical review */
--icon-color-docs: #06b6d4;        /* Cyan - documentation */
--icon-color-security: #ef4444;    /* Red - security focus */
--icon-color-common: #64748b;      /* Gray - shared utilities */
```

### 2. Geometric Style

```
Style Guidelines:
├── Stroke-based (not filled) for clarity at small sizes
├── 2px stroke width for consistency
├── Rounded line caps and joins
├── Minimal detail for 16px+ sizes
├── Consistent 2px corner radius
└── Optical alignment over mathematical alignment
```

### 3. Accessibility Requirements

- Color contrast ratio ≥ 3:1 against background
- Never rely solely on color to convey meaning
- Provide text labels or ARIA labels
- Ensure icons are distinguishable at 16px minimum

### 4. File Format Standards

| Format | Use Case | Optimization |
|--------|----------|--------------|
| SVG | Primary format | SVGO optimized, minified |
| PNG fallback | Legacy support | @2x, @3x variants |
| Icon font | Large sets | Only if performance-critical |

## Steps

### Step 1: Analyze Requirements

1. Define the icon's semantic meaning
2. Identify the context (navigation, action, status, etc.)
3. Determine size requirements
4. Check for existing similar icons

### Step 2: Research & Reference

1. Search established icon libraries:
   - Lucide Icons (https://lucide.dev)
   - Heroicons (https://heroicons.com)
   - Phosphor Icons (https://phosphoricons.com)
2. Document 3-5 reference icons
3. Note common visual patterns

### Step 3: Design the Icon

1. Start with the optical size grid (24x24 default)
2. Use 2px stroke width
3. Apply corner radius (2px)
4. Ensure 2px padding inside the grid
5. Use geometric primitives (circles, rectangles, paths)

### Step 4: Validate Against Design System

1. Check color contrast
2. Verify consistency with existing icons
3. Test at all required sizes
4. Validate accessibility

### Step 5: Export & Optimize

1. Export as SVG with viewBox="0 0 24 24"
2. Run SVGO optimization
3. Add to `public/icons.svg` sprite or individual file
4. Update icon documentation

### Step 6: Document Usage

1. Add to icon registry
2. Document semantic meaning
3. Provide usage examples
4. Note accessibility requirements

## Icon Categories

### Navigation Icons
```
home, skills, roles, contracts, commands, execution
```
Style: Outlined, medium weight, clear silhouette

### Action Icons
```
search, add, edit, delete, save, cancel, refresh
```
Style: Dynamic, directional where applicable

### Status Icons
```
success, warning, error, info, loading
```
Style: Filled or outlined based on prominence

### Role Icons
```
architect, developer, tester, reviewer, docs, security
```
Style: Distinctive, using role color palette

### Feature Icons
```
MVP, M4, core, extension
```
Style: Simple, badge-like

## Checklists

### Pre-Conditions
- [ ] Icon purpose clearly defined
- [ ] Context and placement identified
- [ ] Size requirements documented

### Design Checks
- [ ] Stroke width is 2px
- [ ] Corner radius is 2px
- [ ] Fits within 20x20 safe area (for 24x24 grid)
- [ ] Color contrast ≥ 3:1
- [ ] Readable at 16px minimum
- [ ] Consistent with existing icons

### Accessibility Checks
- [ ] Not relying solely on color
- [ ] Has appropriate ARIA label
- [ ] Visible in both light and dark themes
- [ ] Keyboard focusable (if interactive)

### Export Checks
- [ ] SVG viewBox is "0 0 24 24"
- [ ] SVGO optimized
- [ ] No unnecessary metadata
- [ ] Color uses currentColor or defined variables

### Post-Conditions
- [ ] Icon added to sprite or component
- [ ] Usage documented
- [ ] TypeScript type updated (if applicable)

## Common Failure Modes

| Failure Mode | Symptoms | Handling |
|--------------|----------|----------|
| Inconsistent style | Icons look like different families | Use design tokens, create template |
| Poor scalability | Icon unclear at small sizes | Simplify, reduce detail |
| Color dependency | Meaning lost without color | Add shape/text differentiation |
| Wrong format | Blurry or pixelated icons | Use SVG, optimize properly |
| Missing labels | Screen readers skip icon | Add aria-label or text |

## Anti-Examples

### Anti-Example 1: Inconsistent Stroke Width

```svg
<!-- WRONG: Mixed stroke widths -->
<svg viewBox="0 0 24 24">
  <path stroke-width="1.5" d="..." />  <!-- Inconsistent -->
  <path stroke-width="3" d="..." />    <!-- Inconsistent -->
</svg>

<!-- CORRECT: Consistent 2px stroke -->
<svg viewBox="0 0 24 24">
  <path stroke-width="2" d="..." />
  <path stroke-width="2" d="..." />
</svg>
```

### Anti-Example 2: Color-Only Differentiation

```svg
<!-- WRONG: Status indicated only by color -->
<svg viewBox="0 0 24 24">
  <circle fill="#22c55e" />  <!-- Success - color only -->
</svg>

<!-- CORRECT: Status indicated by shape AND color -->
<svg viewBox="0 0 24 24">
  <circle stroke="#22c55e" fill="none" />
  <path d="M8 12l3 3 5-5" stroke="#22c55e" />  <!-- Checkmark shape -->
</svg>
```

### Anti-Example 3: Excessive Detail

```svg
<!-- WRONG: Too much detail for small sizes -->
<svg viewBox="0 0 24 24">
  <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
</svg>

<!-- CORRECT: Simplified for clarity -->
<svg viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" stroke-width="2"/>
  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
</svg>
```

## Output Requirements

### SVG Structure Template

```svg
<svg 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  stroke-width="2" 
  stroke-linecap="round" 
  stroke-linejoin="round"
  aria-hidden="true"
>
  <!-- Icon paths here -->
</svg>
```

### Icon Registry Entry

```typescript
interface IconData {
  name: string;              // e.g., "architect"
  category: "role" | "action" | "status" | "navigation" | "feature";
  description: string;       // Semantic meaning
  keywords: string[];        // Search keywords
  sizes: (16 | 20 | 24 | 32)[];
  colorVariants?: string[];  // Role colors if applicable
  accessibilityLabel?: string;
}
```

## Examples

### Example 1: Role Icon - Architect

```yaml
icon_design:
  name: architect
  category: role
  purpose: "Represent architect role in navigation and cards"
  context: "Role cards, navigation, role filter badges"
  
  design_decisions:
    - decision: "Use building/column motif"
      rationale: "Symbolizes structural thinking and foundation-building"
    - decision: "Purple color (#8b5cf6)"
      rationale: "Role color for architect - suggests wisdom and strategy"
    - decision: "Outlined style, not filled"
      rationale: "Consistent with other role icons in the system"
  
  sizes: [16, 20, 24, 32]
  color_variants:
    - default: "currentColor"
    - role: "var(--icon-color-architect)"
  
  svg_output: |
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4"/>
    </svg>
```

### Example 2: Action Icon - Search

```yaml
icon_design:
  name: search
  category: action
  purpose: "Trigger global search functionality"
  context: "Header, search trigger button"
  
  design_decisions:
    - decision: "Classic magnifying glass shape"
      rationale: "Universally recognized search symbol"
    - - decision: "2px stroke, rounded caps"
      rationale: "Matches design system icon style"
  
  sizes: [20, 24]
  accessibility_label: "Open search"
  
  svg_output: |
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="7"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
```

## Integration with Face Project

### Adding Icons to the Project

1. **Create SVG file** in `public/icons/` or add to `public/icons.svg` sprite
2. **Update TypeScript types** in `src/types/icons.ts` (if using type-safe icon names)
3. **Use in components**:
   ```tsx
   import iconsSvg from '/icons.svg';
   
   <svg className="icon" aria-hidden="true">
     <use href={`${iconsSvg}#icon-architect`} />
   </svg>
   ```

### Icon Component Pattern

```tsx
interface IconProps {
  name: string;
  size?: 16 | 20 | 24 | 32;
  color?: string;
  label?: string;
}

export function Icon({ name, size = 24, color, label }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      aria-hidden={!label}
      aria-label={label}
      className={`icon icon-${name}`}
      style={{ color }}
    >
      <use href={`/icons.svg#icon-${name}`} />
    </svg>
  );
}
```

## Related Skills

- `common/artifact-reading` - Read design specs for icon requirements
- `developer/feature-implementation` - Implement icon in components
- `tester/edge-case-matrix` - Test icon accessibility and rendering
- `reviewer/code-review-checklist` - Review icon implementation

## References

- Lucide Icons: https://lucide.dev/icons/
- Heroicons: https://heroicons.com/
- Phosphor Icons: https://phosphoricons.com/
- SVG Optimization: https://jakearchibald.github.io/svgomg/
- WCAG Icon Accessibility: https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
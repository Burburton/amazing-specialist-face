# Plan: Interactive Skill Demo

## Metadata
```yaml
feature_id: 011-interactive-skill-demo
status: planning
created: 2026-04-07
based_on: spec.md
```

## Implementation Phases

### Phase 1: Foundation (Day 1)

#### Task 1.1: Type Definitions
- Create `src/types/skill-demo.ts`
- Define `SkillDemo`, `DemoInput`, `DemoOutput` interfaces
- Export types for use across components

#### Task 1.2: Demo Data Structure
- Create `src/data/skill-demos/` directory
- Create `skill-demos-index.json`
- Create 5 MVP skill demo files:
  - `architect/requirement-to-design.json`
  - `developer/bugfix-workflow.json`
  - `tester/unit-test-design.json`
  - `reviewer/code-review-checklist.json`
  - `common/artifact-reading.json`

#### Task 1.3: Data Loading Hook
- Create `src/hooks/useSkillDemo.ts`
- Load demo data dynamically
- Handle missing demo gracefully

---

### Phase 2: UI Components (Day 1-2)

#### Task 2.1: DemoInputField Component
- Text input support
- Textarea support
- Select dropdown support
- JSON editor support

#### Task 2.2: DemoOutputPreview Component
- Text output display
- JSON formatted display
- Markdown rendering
- Copy button

#### Task 2.3: SkillDemoPanel Component
- Layout structure
- Input section
- Output section
- Context section
- Reset button

#### Task 2.4: Integration
- Add SkillDemoPanel to SkillDetailPage
- Conditional rendering (show if demo exists)
- Position before "Related Skills" section

---

### Phase 3: Styling (Day 2)

#### Task 3.1: CSS Modules
- Create `SkillDemoPanel.module.css`
- Style input fields
- Style output previews
- Style context badges

#### Task 3.2: Responsive Design
- Mobile layout adjustments
- Tablet layout adjustments

---

### Phase 4: Testing & Documentation

#### Task 4.1: Build Verification
- Run `npm run build`
- Fix TypeScript errors
- Verify all demos load

#### Task 4.2: Manual Testing
- Test each demo on SkillDetailPage
- Verify input editing works
- Verify output displays correctly

---

## File Structure

```
src/
├── types/
│   └── skill-demo.ts              # NEW
├── data/
│   └── skill-demos/               # NEW
│       ├── architect/
│       │   └── requirement-to-design.json
│       ├── developer/
│       │   └── bugfix-workflow.json
│       ├── tester/
│       │   └── unit-test-design.json
│       ├── reviewer/
│       │   └── code-review-checklist.json
│       ├── common/
│       │   └── artifact-reading.json
│       └── index.json
├── hooks/
│   └── useSkillDemo.ts            # NEW
├── components/
│   └── skills/
│       ├── SkillDemoPanel.tsx     # NEW
│       ├── SkillDemoPanel.module.css
│       ├── DemoInputField.tsx     # NEW
│       └── DemoOutputPreview.tsx  # NEW
└── pages/
    └── SkillDetailPage.tsx        # MODIFY
```

---

## Dependencies

- No new npm dependencies
- Uses existing React, TypeScript, CSS Modules

---

## Risks

| Risk | Mitigation |
|------|------------|
| Demo data creation is time-consuming | Start with 5 MVP skills, expand later |
| Output format varies by skill | Use flexible output types |
| JSON editing UX is complex | Start with textarea, add editor later |

---

## Success Metrics

1. ✅ All 5 MVP skill demos display correctly
2. ✅ Users can edit input parameters
3. ✅ Output preview shows formatted content
4. ✅ Build passes with no errors
5. ✅ Page load time unaffected (< 100ms overhead)
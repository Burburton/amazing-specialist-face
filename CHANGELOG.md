# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-04-04

### Added

#### frontend-design-system Plugin

- **Plugin Infrastructure**: Created `.opencode/plugins/frontend-design-system/` directory structure with `plugin.json` and `README.md`
- **7 Plugin Skills**:
  - `design-tokens-setup` - Design tokens system (colors, spacing, typography, shadows)
  - `shadcn-integration` - shadcn/ui integration with 2026 Base UI primitives support
  - `typography-system` - Typography hierarchy system with font pairing guidance
  - `spacing-grid-system` - 8pt grid spacing system
  - `micro-interactions` - Micro-interactions and animation presets
  - `design-state-coverage` - State coverage design (Default/Hover/Focus/Loading/Error/Empty)
  - `design-review-checklist` - Design review framework for reviewers
- **3 Template Files**:
  - `design-tokens.css` - CSS variables template
  - `animation-presets.ts` - Animation presets with semantic curves
  - `accessibility-checklist.md` - WCAG AA accessibility checklist
- **Platform Mapping**: Configured for developer/reviewer/docs roles in OpenCode platform

### Purpose

Solves the "AI-style" problem in AI-generated interfaces:
- Colors: Blue-500 default → Semantic tokens
- Typography: Inter-only → Font pairing, hierarchical line-heights
- Spacing: Random values → 8pt grid system
- Animation: transition-all abuse → Semantic curves
- States: Happy path only → Complete state coverage

### Documentation

- Updated `README.md` with project governance and plugin documentation
- Created spec-driven development artifacts under `specs/001-frontend-design-system-plugin/`

[Unreleased]: https://github.com/Burburton/amazing-specialists/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Burburton/amazing-specialists/releases/tag/v0.1.0
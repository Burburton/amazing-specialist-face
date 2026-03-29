# Plan: 002-data-file-preparation

## Overview

This plan outlines the approach for extracting data from the expert pack repo and creating JSON data files for the UI, plus testing expert pack availability and stability.

## Phases

### Phase 1: Data Extraction (Core)

**Goal**: Extract structured data from expert pack repo

**Steps**:
1. Parse 37 SKILL.md files → skills.json
2. Parse role-definition.md → roles.json
3. Parse contracts/pack/registry.json → contracts.json
4. Parse 5 command files → commands.json
5. Compute statistics → stats.json

**Parallel Opportunities**: 
- Skills extraction (independent of roles/contracts)
- Commands extraction (independent of other files)

### Phase 2: Expert Pack Testing

**Goal**: Validate expert pack availability and stability

**Steps**:
1. T-EXP-001: Skills Availability Test
   - Check all 37 SKILL.md files exist
   - Check all skills have required metadata fields
   
2. T-EXP-002: Contracts Stability Test
   - Validate all 17 JSON Schemas are valid
   - Check registry.json matches contract count
   
3. T-EXP-003: Performance Test
   - Measure skill loading time (target: <500ms per skill)
   
4. T-EXP-004: Integration Test
   - Verify adapter registry.json has all adapters
   - Check adapter files exist
   
5. T-EXP-005: Error Handling Test
   - Check BACKLOG.md exists for deferred items
   - Check README.md reflects correct status

### Phase 3: Validation

**Goal**: Ensure all outputs match type definitions

**Steps**:
1. Validate skills.json against SkillData type
2. Validate roles.json against RoleData type
3. Validate contracts.json against ContractData type
4. Validate commands.json against CommandData type
5. Validate stats.json against StatsData type

## Data Extraction Strategy

### Skills Extraction

Each SKILL.md contains:
- Skill name (from directory or file)
- Role (from parent directory)
- Category (MVP/M4 from README.md classification)
- Description (from SKILL.md content)

**Extraction method**: 
1. Parse SKILL.md for name and description
2. Infer role from directory path (common/architect/developer/tester/reviewer/docs/security)
3. Infer category from README.md skill table

### Roles Extraction

role-definition.md contains 6 role sections:
- architect, developer, tester, reviewer, docs, security

**Extraction method**:
1. Parse each role section for mission, inScope, outOfScope, triggerConditions
2. Map skills from README.md skill table to each role

### Contracts Extraction

contracts/pack/registry.json already has structured data.

**Transformation method**:
1. Read registry.json
2. Transform to ContractsCollection format
3. Drop schema_path and markdown_path (internal)

### Commands Extraction

.opencode/commands/*.md files contain command definitions.

**Extraction method**:
1. Parse each command file for name, description
2. Extract inputs/outputs from command specification

### Stats Computation

Compute from extracted data:
- totalSkills = 37 (21 MVP + 16 M4)
- mvpSkills = 21
- m4Skills = 16
- totalRoles = 6
- totalContracts = 17
- totalCommands = 5
- totalFeatures = 27 (from README.md)

## Output Paths

| Output | Path | Type |
|--------|------|------|
| skills.json | src/data/skills.json | SkillsCollection |
| roles.json | src/data/roles.json | RolesCollection |
| contracts.json | src/data/contracts.json | ContractsCollection |
| commands.json | src/data/commands.json | CommandsCollection |
| stats.json | src/data/stats.json | StatsData |
| test-results.json | src/data/test-results.json | TestResults (custom) |

## Risks

| Risk | Mitigation |
|------|------------|
| SKILL.md format inconsistency | Standardize parsing, use fallback defaults |
| Expert pack repo path changes | Use relative path from type definitions |
| JSON schema validation failure | Provide detailed error messages |

## Assumptions

1. Expert pack repo at `G:\Workspace\amazing_agent_specialist` is stable
2. SKILL.md files follow consistent format
3. Type definitions from T-001 are accurate
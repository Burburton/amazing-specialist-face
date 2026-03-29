# Feature: 002-data-file-preparation

## Metadata
- **Feature ID**: 002-data-file-preparation
- **Source Issue**: T-002 (GitHub Issue #1)
- **Milestone**: M001 - Initial UI
- **Phase**: Phase 1
- **Priority**: High
- **Role**: Developer
- **Created**: 2026-03-29
- **enhanced**: false

## Context

Creating the initial UI for the OpenCode Expert Pack. Phase A (documentation display). This task depends on T-001 (directory structure) which is complete.

Data will be extracted from the expert pack repo at `G:\Workspace\amazing_agent_specialist` and stored as JSON files in this UI repo.

## Goal

Extract data from the expert pack repo and create JSON data files for the UI. Additionally, test the expert pack's availability and stability.

## Constraints

- Data must be accurate and consistent with expert pack content
- JSON format must match type definitions from T-001
- Manual extraction (no automated sync in Phase A)
- Include expert pack availability and stability testing

## Inputs

### Expert Pack Repo Data Sources
- `contracts/pack/registry.json` - 17 contracts metadata
- `role-definition.md` - 6 roles definitions
- `.opencode/skills/**/SKILL.md` - 37 skills definitions
- `.opencode/commands/*.md` - 5 commands definitions

### Type Definitions (from T-001)
- `src/types/skill.ts` - SkillData, SkillsCollection
- `src/types/role.ts` - RoleData, RolesCollection
- `src/types/contract.ts` - ContractData, ContractsCollection
- `src/types/command.ts` - CommandData, CommandsCollection
- `src/types/stats.ts` - StatsData

## Expected Outputs

### Data Files
- `src/data/skills.json` - 37 skills metadata (matches SkillsCollection)
- `src/data/roles.json` - 6 roles summary (matches RolesCollection)
- `src/data/contracts.json` - 17 contracts metadata (matches ContractsCollection)
- `src/data/commands.json` - 5 commands definitions (matches CommandsCollection)
- `src/data/stats.json` - Statistics summary (matches StatsData)

### Expert Pack Testing
- `src/data/test-results.json` - Expert pack availability and stability test results

## Acceptance Criteria

- [ ] All data files created
- [ ] Data matches expert pack content
- [ ] JSON format valid and matches type definitions
- [ ] Expert pack test results documented
- [ ] Test results show expert pack is functional and stable

## Expert Pack Testing Tasks

Per user request, include tests for expert pack availability and stability:

### Test Items
1. **Availability Test**: Verify all 37 skills are accessible and loadable
2. **Stability Test**: Verify all 17 contracts are valid JSON Schema
3. **Performance Test**: Measure skill loading time
4. **Integration Test**: Verify adapter chain works (cli-local → github-issue → github-pr)
5. **Error Handling Test**: Verify graceful failure modes

### Test Results Format
```json
{
  "test_timestamp": "ISO timestamp",
  "tests": [
    {
      "test_id": "T-EXP-001",
      "test_name": "skills_availability",
      "status": "PASS|FAIL|WARN",
      "details": "..."
    }
  ],
  "overall_status": "PASS|FAIL|WARN",
  "summary": {
    "total_tests": 5,
    "passed": 3,
    "failed": 0,
    "warnings": 2
  }
}
```

## Dependencies

- T-001 (Complete): Directory structure and type definitions exist

## Notes

- This is Phase A (documentation display), so data extraction is manual
- Future Phase B may include automated sync from expert pack
- Expert pack testing validates the source repo is functional for downstream use
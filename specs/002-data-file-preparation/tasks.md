# Tasks: 002-data-file-preparation

## Task List

| Task ID | Task Name | Role | Status | Parallel |
|---------|-----------|------|--------|----------|
| T-002-001 | Extract skills.json | developer | ✅ completed | Yes (with T-002-002, T-002-003) |
| T-002-002 | Extract roles.json | developer | ✅ completed | Yes (with T-002-001, T-002-003) |
| T-002-003 | Extract contracts.json | developer | ✅ completed | Yes (with T-002-001, T-002-002) |
| T-002-004 | Extract commands.json | developer | ✅ completed | Yes (with T-002-005) |
| T-002-005 | Generate stats.json | developer | ✅ completed | Yes (with T-002-004) |
| T-002-006 | T-EXP-001: Skills Availability Test | tester | ✅ completed | No |
| T-002-007 | T-EXP-002: Contracts Stability Test | tester | ✅ completed | No |
| T-002-008 | T-EXP-003: Performance Test | tester | ✅ completed | No |
| T-002-009 | T-EXP-004: Integration Test | tester | ✅ completed | No |
| T-002-010 | T-EXP-005: Error Handling Test | tester | ✅ completed | No |
| T-002-011 | Generate test-results.json | tester | ✅ completed | No |
| T-002-012 | Validate JSON against types | reviewer | ✅ completed | No |

---

## T-002-001: Extract skills.json

**Goal**: Create `src/data/skills.json` with 37 skills metadata

**Inputs**:
- 37 SKILL.md files from `.opencode/skills/**/SKILL.md`
- README.md skill classification (MVP/M4)

**Outputs**:
- `src/data/skills.json` matching SkillsCollection type

**Acceptance Criteria**:
- [ ] 37 skills extracted
- [ ] Each skill has id, name, role, category, description, path
- [ ] MVP/M4 classification correct (21 MVP + 16 M4)

---

## T-002-002: Extract roles.json

**Goal**: Create `src/data/roles.json` with 6 roles summary

**Inputs**:
- `role-definition.md`
- README.md skill-to-role mapping

**Outputs**:
- `src/data/roles.json` matching RolesCollection type

**Acceptance Criteria**:
- [ ] 6 roles extracted (architect, developer, tester, reviewer, docs, security)
- [ ] Each role has name, mission, inScope, outOfScope, triggerConditions, skills

---

## T-002-003: Extract contracts.json

**Goal**: Create `src/data/contracts.json` with 17 contracts metadata

**Inputs**:
- `contracts/pack/registry.json`

**Outputs**:
- `src/data/contracts.json` matching ContractsCollection type

**Acceptance Criteria**:
- [ ] 17 contracts extracted
- [ ] Each contract has contract_id, contract_name, producer_role, consumer_roles, description
- [ ] Internal paths (schema_path, markdown_path) dropped

---

## T-002-004: Extract commands.json

**Goal**: Create `src/data/commands.json` with 5 commands definitions

**Inputs**:
- `.opencode/commands/*.md` (5 files)

**Outputs**:
- `src/data/commands.json` matching CommandsCollection type

**Acceptance Criteria**:
- [ ] 5 commands extracted (spec-start, spec-plan, spec-tasks, spec-implement, spec-audit)
- [ ] Each command has name, description, inputs, outputs

---

## T-002-005: Generate stats.json

**Goal**: Create `src/data/stats.json` with statistics summary

**Inputs**:
- Skills count (37)
- Roles count (6)
- Contracts count (17)
- Commands count (5)
- Features count (27) from README.md

**Outputs**:
- `src/data/stats.json` matching StatsData type

**Acceptance Criteria**:
- [ ] totalSkills = 37
- [ ] mvpSkills = 21
- [ ] m4Skills = 16
- [ ] totalRoles = 6
- [ ] totalContracts = 17
- [ ] totalCommands = 5
- [ ] totalFeatures = 27

---

## T-002-006: T-EXP-001 Skills Availability Test

**Goal**: Verify all 37 skills are accessible and loadable

**Test Steps**:
1. List all SKILL.md files (expect 37)
2. Check each file has required fields (name, description)
3. Verify role assignment correct

**Expected Results**:
- All 37 SKILL.md files exist
- All have valid content
- Role assignment matches directory structure

---

## T-002-007: T-EXP-002 Contracts Stability Test

**Goal**: Verify all 17 contracts are valid JSON Schema

**Test Steps**:
1. Read registry.json (expect 17 contracts)
2. Validate each JSON Schema file exists
3. Check schema structure valid

**Expected Results**:
- registry.json has 17 contracts
- All schema files exist
- All schemas are valid JSON Schema Draft 2020-12

---

## T-002-008: T-EXP-003 Performance Test

**Goal**: Measure expert pack loading performance

**Test Steps**:
1. Measure skill metadata extraction time
2. Measure contract loading time
3. Measure full pack initialization time

**Expected Results**:
- Skill extraction < 500ms per skill (aggregate < 20s)
- Contract loading < 100ms per contract
- Full pack initialization < 30s

---

## T-002-009: T-EXP-004 Integration Test

**Goal**: Verify adapter chain works

**Test Steps**:
1. Check adapters/registry.json has 5 adapters
2. Verify each adapter directory exists
3. Check adapter index files exist

**Expected Results**:
- 5 adapters registered (cli-local, local-repo, github-issue, github-pr, openclaw)
- All adapter directories exist
- All adapter entry points exist

---

## T-002-010: T-EXP-005 Error Handling Test

**Goal**: Verify graceful failure modes

**Test Steps**:
1. Check BACKLOG.md exists for deferred items
2. Verify README.md reflects correct feature status
3. Check no orphaned files or broken references

**Expected Results**:
- BACKLOG.md exists with BL-001
- README.md has 27 features listed
- No broken file references

---

## T-002-011: Generate test-results.json

**Goal**: Create `src/data/test-results.json` with expert pack test results

**Inputs**:
- Results from T-002-006 to T-002-010

**Outputs**:
- `src/data/test-results.json` with structured test results

**Acceptance Criteria**:
- [ ] 5 test results documented
- [ ] Overall status computed (PASS/FAIL/WARN)
- [ ] Summary statistics included

---

## T-002-012: Validate JSON against types

**Goal**: Ensure all JSON files match type definitions

**Test Steps**:
1. Validate skills.json structure
2. Validate roles.json structure
3. Validate contracts.json structure
4. Validate commands.json structure
5. Validate stats.json structure

**Acceptance Criteria**:
- [ ] All JSON files pass type validation
- [ ] No missing required fields
- [ ] No extra unexpected fields
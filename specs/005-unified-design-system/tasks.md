# Tasks: Unified Design System

## Metadata
```yaml
feature_id: 005-unified-design-system
status: complete
created: 2026-04-05
author: architect
based_on: plan.md
```

## Task Overview

| Phase | Task ID | 描述 | 优先级 | 状态 | 依赖 |
|-------|---------|------|--------|------|------|
| 1 | T-001 | 创建 PageHeader 组件 | 🔴 最高 | ⏳ pending | - |
| 1 | T-002 | 创建 BackButton 组件 | 🔴 最高 | ⏳ pending | - |
| 2 | T-003 | 增强 SkillCard (href) | 🟡 高 | ⏳ pending | - |
| 2 | T-004 | 增强 RoleCard (href) | 🟡 高 | ⏳ pending | - |
| 2 | T-005 | 增强 ContractCard (href) | 🟡 高 | ⏳ pending | - |
| 2 | T-006 | 增强 CommandCard (href) | 🟡 高 | ⏳ pending | - |
| 3 | T-007 | SkillsPage 重构 | 🟡 高 | ⏳ pending | T-001, T-003 |
| 3 | T-008 | RolesPage 重构 | 🟡 高 | ⏳ pending | T-001, T-004 |
| 3 | T-009 | ContractsPage 重构 | 🟡 高 | ⏳ pending | T-001, T-005 |
| 3 | T-010 | CommandsPage 重构 | 🟡 高 | ⏳ pending | T-001, T-006 |
| 4 | T-011 | SkillDetailPage 新增 | 🟡 高 | ⏳ pending | T-002 |
| 4 | T-012 | RoleDetailPage 新增 | 🟡 高 | ⏳ pending | T-002 |
| 4 | T-013 | ContractDetailPage 新增 | 🟡 高 | ⏳ pending | T-002 |
| 4 | T-014 | CommandDetailPage 新增 | 🟡 高 | ⏳ pending | T-002 |
| 5 | T-015 | 路由更新 | 🔴 最高 | ⏳ pending | T-011~T-014 |
| - | V-001 | 构建验证 | 🔴 最高 | ⏳ pending | T-015 |
| - | V-002 | 部署验证 | 🟡 高 | ⏳ pending | V-001 |
| - | V-003 | 手动验证 | 🟡 高 | ⏳ pending | V-002 |

---

## Phase 1: Shared Components

### T-001: 创建 PageHeader 组件

**优先级**: 🔴 最高

**状态**: ⏳ pending

**依赖**: 无

**输入**: 
- `spec.md` §6.1 PageHeader Component

**输出**: 
- `src/components/shared/PageHeader.tsx`
- `src/components/shared/PageHeader.module.css`

**验收标准**:
- [ ] Props: title, subtitle, icon (optional)
- [ ] 标题居中，Space Grotesk 字体
- [ ] 副标题使用 JetBrains Mono
- [ ] 背景渐变 (background → surface)
- [ ] padding: var(--space-12) var(--space-6)

**实现**:

```tsx
interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon?: string;
}

export default function PageHeader({ title, subtitle, icon }: PageHeaderProps) {
  return (
    <header className={styles.pageHeader}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
  );
}
```

```css
.pageHeader {
  text-align: center;
  padding: var(--space-12) var(--space-6);
  background: linear-gradient(180deg, var(--color-background) 0%, var(--color-surface) 100%);
}

.title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.subtitle {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}
```

---

### T-002: 创建 BackButton 组件

**优先级**: 🔴 最高

**状态**: ⏳ pending

**依赖**: 无

**输入**: 
- `spec.md` §6.6 BackButton Component

**输出**: 
- `src/components/shared/BackButton.tsx`
- `src/components/shared/BackButton.module.css`

**验收标准**:
- [ ] Props: to, label (optional)
- [ ] 使用 React Router Link
- [ ] 左侧箭头图标 (←)
- [ ] JetBrains Mono 字体
- [ ] Hover 效果: color + background 变化

**实现**:

```tsx
import { Link } from 'react-router-dom';
import styles from './BackButton.module.css';

interface BackButtonProps {
  to: string;
  label?: string;
}

export default function BackButton({ to, label = '返回' }: BackButtonProps) {
  return (
    <Link to={to} className={styles.backButton}>
      <span className={styles.arrow}>←</span>
      <span className={styles.label}>{label}</span>
    </Link>
  );
}
```

```css
.backButton {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: color var(--duration-fast), background var(--duration-fast);
}

.backButton:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-elevated);
}
```

---

## Phase 2: Card Enhancement

### T-003: 增强 SkillCard (href prop)

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: 无

**输入**: 
- `spec.md` §6.2 SkillCard Enhanced
- 现有 `src/components/cards/SkillCard.tsx`

**输出**: 
- `src/components/cards/SkillCard.tsx` 更新

**验收标准**:
- [ ] 新增 href prop (可选)
- [ ] href 提供时渲染为 Link，否则渲染为 article
- [ ] Link 使用 React Router Link 组件
- [ ] Hover 效果: translateY(-4px) + border-color
- [ ] Focus ring
- [ ] 保持现有 onClick 支持

**实现要点**:

```tsx
interface SkillCardProps {
  skill: Skill;
  roleColor?: string;
  onClick?: (skill: Skill) => void;
  href?: string;  // 📝 新增
}

export default function SkillCard({ skill, roleColor, onClick, href }: SkillCardProps) {
  const isMvp = skill.category === 'MVP';
  const roleColorValue = roleColor || ROLE_COLORS_400[skill.role];
  
  const content = (
    <>
      <div className={styles.skillHeader}>
        <h3 className={styles.skillName}>{skill.name}</h3>
        <span className={`${styles.skillCategory} ${isMvp ? styles.mvp : styles.m4}`}>
          {skill.category}
        </span>
      </div>
      <p className={styles.skillDescription}>{skill.description}</p>
      <div className={styles.skillMeta}>
        <span className={styles.skillRole} style={{ backgroundColor: roleColorValue }}>
          {skill.role}
        </span>
        <span className={styles.skillId}>{skill.id}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <Link to={href} className={cardClassName}>
        {content}
      </Link>
    );
  }

  return (
    <article className={cardClassName} onClick={() => onClick?.(skill)} tabIndex={0}>
      {content}
    </article>
  );
}
```

---

### T-004: 增强 RoleCard (href prop)

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: 无

**输入**: 
- `spec.md` §6.3 RoleCard Enhanced
- 现有 `src/components/cards/RoleCard.tsx`

**输出**: 
- `src/components/cards/RoleCard.tsx` 更新

**验收标准**:
- [ ] 新增 href prop
- [ ] href 提供时渲染为 Link
- [ ] Hover 效果: scale(1.02) + shadow
- [ ] Focus ring

---

### T-005: 增强 ContractCard (href prop)

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: 无

**输入**: 
- `spec.md` §6.4 ContractCard Enhanced
- 现有 `src/components/cards/ContractCard.tsx`

**输出**: 
- `src/components/cards/ContractCard.tsx` 更新

**验收标准**:
- [ ] 新增 href prop
- [ ] href 提供时渲染为 Link
- [ ] Hover 效果: translateY(-2px) + border-color

---

### T-006: 增强 CommandCard (href prop)

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: 无

**输入**: 
- `spec.md` §6.5 CommandCard Enhanced
- 现有 `src/components/cards/CommandCard.tsx`

**输出**: 
- `src/components/cards/CommandCard.tsx` 更新

**验收标准**:
- [ ] 新增 href prop
- [ ] href 提供时渲染为 Link
- [ ] Hover 效果: translateY(-2px) + border-color

---

## Phase 3: List Pages Redesign

### T-007: SkillsPage 重构

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: T-001, T-003

**输入**: 
- `spec.md` §4.1 SkillsPage Redesign
- 现有 `src/pages/SkillsPage.tsx`

**输出**: 
- `src/pages/SkillsPage.tsx` 重构
- `src/pages/SkillsPage.module.css` 重构

**验收标准**:
- [ ] 使用 PageHeader 替换旧 header
- [ ] Section-based 布局
- [ ] 卡片添加 href="/skills/:id"
- [ ] 保持现有筛选功能
- [ ] 保持 SkillDependencyDiagram
- [ ] Hover/Focus 效果统一

**Section 结构**:

```tsx
<div className={styles.page}>
  <PageHeader title="技能库" subtitle="38 个技能 · MVP 核心 · M4 扩展" />
  
  <section className={styles.filterSection}>
    {/* Tab Bar + Search + Category */}
  </section>
  
  <section className={styles.statsSection}>
    {/* 统计数字 */}
  </section>
  
  <section className={styles.diagramSection}>
    <SkillDependencyDiagram skills={skillsData.skills} />
  </section>
  
  <section className={styles.gridSection}>
    {/* 按角色分组的技能卡片 */}
  </section>
</div>
```

---

### T-008: RolesPage 重构

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: T-001, T-004

**输入**: 
- `spec.md` §4.2 RolesPage Redesign
- 现有 `src/pages/RolesPage.tsx`

**输出**: 
- `src/pages/RolesPage.tsx` 重构
- `src/pages/RolesPage.module.css` 重构

**验收标准**:
- [ ] 使用 PageHeader
- [ ] Section-based 布局
- [ ] 卡片添加 href="/roles/:name"
- [ ] Collaboration Diagram Section (可选)

---

### T-009: ContractsPage 重构

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: T-001, T-005

**输入**: 
- `spec.md` §4.3 ContractsPage Redesign
- 现有 `src/pages/ContractsPage.tsx`

**输出**: 
- `src/pages/ContractsPage.tsx` 重构
- `src/pages/ContractsPage.module.css` 重构

**验收标准**:
- [ ] 使用 PageHeader
- [ ] Section-based 布局
- [ ] 卡片添加 href="/contracts/:id"

---

### T-010: CommandsPage 重构

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: T-001, T-006

**输入**: 
- `spec.md` §4.4 CommandsPage Redesign
- 现有 `src/pages/CommandsPage.tsx`

**输出**: 
- `src/pages/CommandsPage.tsx` 重构
- `src/pages/CommandsPage.module.css` 重构

**验收标准**:
- [ ] 使用 PageHeader
- [ ] Workflow Timeline Section
- [ ] Section-based 布局
- [ ] 卡片添加 href="/commands/:name"

**Workflow Timeline**:

```
┌─────────────────────────────────────────────────────────┐
│  1 → 2 → 3 → 4 → 5                                     │
│  Spec  Plan  Tasks  Implement  Audit                    │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 4: Detail Pages

### T-011: SkillDetailPage 新增

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: T-002

**输入**: 
- `spec.md` §5.1 SkillDetailPage
- `src/data/skills.json`

**输出**: 
- `src/pages/SkillDetailPage.tsx`
- `src/pages/SkillDetailPage.module.css`

**验收标准**:
- [ ] 路由参数: useParams().id
- [ ] 数据匹配: skills.find(s => s.id === id)
- [ ] BackButton 返回 /skills
- [ ] 详情展示: name, description, role, category, path
- [ ] Related Skills Section (同角色技能)
- [ ] NotFound 处理 (技能不存在)

**实现要点**:

```tsx
import { useParams, Navigate } from 'react-router-dom';
import BackButton from '../components/shared/BackButton';
import skillsData from '../data/skills.json';

export default function SkillDetailPage() {
  const { id } = useParams();
  const skill = skillsData.skills.find(s => s.id === id);
  
  if (!skill) {
    return <Navigate to="/skills" replace />;
  }
  
  const relatedSkills = skillsData.skills.filter(s => s.role === skill.role && s.id !== skill.id);
  
  return (
    <div className={styles.detailPage}>
      <BackButton to="/skills" label="返回技能库" />
      
      <section className={styles.headerSection}>
        <span className={styles.skillId}>{skill.id}</span>
        <h1 className={styles.title}>{skill.name}</h1>
        <p className={styles.subtitle}>
          {skill.role} · {skill.category}
        </p>
        <p className={styles.description}>{skill.description}</p>
      </section>
      
      <section className={styles.pathSection}>
        <h2>文件路径</h2>
        <code className={styles.path}>{skill.path}</code>
      </section>
      
      <section className={styles.relatedSection}>
        <h2>相关技能</h2>
        <div className={styles.relatedGrid}>
          {relatedSkills.map(s => (
            <SkillCard key={s.id} skill={s} href={`/skills/${s.id}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

### T-012: RoleDetailPage 新增

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: T-002

**输入**: 
- `spec.md` §5.2 RoleDetailPage
- `src/data/roles.json`
- `src/data/skills.json`

**输出**: 
- `src/pages/RoleDetailPage.tsx`
- `src/pages/RoleDetailPage.module.css`

**验收标准**:
- [ ] 路由参数: useParams().name
- [ ] 数据匹配: roles.find(r => r.name === name)
- [ ] BackButton 返回 /roles
- [ ] 详情展示: name, emoji, mission, scope
- [ ] Skills List (该角色所有技能)
- [ ] NotFound 处理

---

### T-013: ContractDetailPage 新增

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: T-002

**输入**: 
- `spec.md` §5.3 ContractDetailPage
- `src/data/contracts.json`

**输出**: 
- `src/pages/ContractDetailPage.tsx`
- `src/pages/ContractDetailPage.module.css`

**验收标准**:
- [ ] 路由参数: useParams().id
- [ ] 数据匹配: contracts.find(c => c.id === id)
- [ ] BackButton 返回 /contracts
- [ ] 详情展示: name, producer, consumers, description
- [ ] NotFound 处理

---

### T-014: CommandDetailPage 新增

**优先级**: 🟡 高

**状态**: ⏳ pending

**依赖**: T-002

**输入**: 
- `spec.md` §5.4 CommandDetailPage
- `src/data/commands.json`

**输出**: 
- `src/pages/CommandDetailPage.tsx`
- `src/pages/CommandDetailPage.module.css`

**验收标准**:
- [ ] 路由参数: useParams().name
- [ ] 数据匹配: commands.find(c => c.name === name)
- [ ] BackButton 返回 /commands
- [ ] 详情展示: name, description, usage, inputs, outputs
- [ ] NotFound 处理

---

## Phase 5: Routing + Integration

### T-015: 路由更新

**优先级**: 🔴 最高

**状态**: ⏳ pending

**依赖**: T-011, T-012, T-013, T-014

**输入**: 
- `spec.md` §7 Routing Updates

**输出**: 
- `src/App.tsx` 更新
- `src/pages/index.ts` 更新

**验收标准**:
- [ ] 新增路由: /skills/:id
- [ ] 新增路由: /roles/:name
- [ ] 新增路由: /contracts/:id
- [ ] 新增路由: /commands/:name
- [ ] Lazy loading 配置
- [ ] 所有路由正常工作

**实现**:

```tsx
// src/pages/index.ts
export { default as SkillDetailPage } from './SkillDetailPage';
export { default as RoleDetailPage } from './RoleDetailPage';
export { default as ContractDetailPage } from './ContractDetailPage';
export { default as CommandDetailPage } from './CommandDetailPage';

// src/App.tsx
const SkillDetailPage = lazy(() => import('./pages/SkillDetailPage'));
const RoleDetailPage = lazy(() => import('./pages/RoleDetailPage'));
const ContractDetailPage = lazy(() => import('./pages/ContractDetailPage'));
const CommandDetailPage = lazy(() => import('./pages/CommandDetailPage'));

// 新增路由
<Route path="/skills/:id" element={<SkillDetailPage />} />
<Route path="/roles/:name" element={<RoleDetailPage />} />
<Route path="/contracts/:id" element={<ContractDetailPage />} />
<Route path="/commands/:name" element={<CommandDetailPage />} />
```

---

## Validation Tasks

### V-001: 构建验证

**优先级**: 🔴 最高

**执行时机**: T-015 完成后

**验收标准**:
- [ ] `npm run build` 无错误
- [ ] TypeScript 类型检查通过
- [ ] 无 console 错误

---

### V-002: 部署验证

**优先级**: 🟡 高

**执行时机**: V-001 通过后

**验收标准**:
- [ ] GitHub Actions 部署成功
- [ ] GitHub Pages 可访问
- [ ] 所有页面正常显示

---

### V-003: 手动验证

**优先级**: 🟡 高

**执行时机**: V-002 通过后

**验收标准**:
- [ ] SkillsPage 视觉正确
- [ ] RolesPage 视觉正确
- [ ] ContractsPage 视觉正确
- [ ] CommandsPage 视觉正确
- [ ] 所有卡片可点击跳转
- [ ] 详情页正确显示数据
- [ ] BackButton 返回正常
- [ ] NotFound 处理正常

---

## Implementation Sequence

```
Phase 1 (Shared):
T-001 (PageHeader) ─┬─→ Phase 3
T-002 (BackButton) ─┘      │
                           │
Phase 2 (Cards):           │
T-003 (SkillCard)  ────────┼─→ T-007 (SkillsPage)
T-004 (RoleCard)   ────────┼─→ T-008 (RolesPage)
T-005 (ContractCard) ──────┼─→ T-009 (ContractsPage)
T-006 (CommandCard) ───────┼─→ T-010 (CommandsPage)
                           │
                           │
Phase 4 (Details):         │
T-011 (SkillDetail)   ─────┼─→ T-015 (Routes)
T-012 (RoleDetail)    ─────┤      │
T-013 (ContractDetail) ────┤      │
T-014 (CommandDetail) ─────┘      │
                                  │
                                  ▼
                               V-001 ──→ V-002 ──→ V-003
```

---

## Progress Tracking

| Task | 状态 | 完成时间 | 备注 |
|------|------|----------|------|
| T-001 | ✅ | 2026-04-05 | PageHeader 组件 |
| T-002 | ✅ | 2026-04-05 | BackButton 组件 |
| T-003 | ✅ | 2026-04-05 | SkillCard href |
| T-004 | ✅ | 2026-04-05 | RoleCard href |
| T-005 | ✅ | 2026-04-05 | ContractCard href |
| T-006 | ✅ | 2026-04-05 | CommandCard href |
| T-007 | ✅ | 2026-04-05 | SkillsPage 重构 |
| T-008 | ✅ | 2026-04-05 | RolesPage 重构 |
| T-009 | ✅ | 2026-04-05 | ContractsPage 重构 |
| T-010 | ✅ | 2026-04-05 | CommandsPage 重构 |
| T-011 | ✅ | 2026-04-05 | SkillDetailPage |
| T-012 | ✅ | 2026-04-05 | RoleDetailPage |
| T-013 | ✅ | 2026-04-05 | ContractDetailPage |
| T-014 | ✅ | 2026-04-05 | CommandDetailPage |
| T-015 | ✅ | 2026-04-05 | 路由更新 |
| V-001 | ✅ | 2026-04-05 | 构建验证通过 (1.30s) |
| V-002 | ✅ | 2026-04-05 | 构建通过 1.28s，等待推送触发自动部署 |
| V-003 | ✅ | 2026-04-05 | 手动验证通过 |

**状态说明**:
- ⏳ pending - 待开始
- 🔄 in_progress - 进行中
- ✅ completed - 已完成
- ⏭️ skipped - 已跳过
- ❌ blocked - 被阻塞
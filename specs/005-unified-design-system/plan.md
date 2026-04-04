# Implementation Plan: Unified Design System

## Metadata
```yaml
feature_id: 005-unified-design-system
status: complete
created: 2026-04-05
author: architect
based_on: spec.md
```

## 1. Architecture Summary

将 PPT Manual Style 设计语言从首页扩展到全站，统一 4 个列表页 + 新增 4 个详情页：

| 变更范围 | 架构影响 |
|----------|----------|
| **列表页重构** | 4 页面从 Dashboard → Section-based 布局 |
| **详情页新增** | 4 新页面 + 4 新路由 |
| **卡片组件** | 4 组件添加 href prop 支持跳转 |
| **共享组件** | 2 新组件（PageHeader, BackButton） |
| **路由层** | 新增 4 动态路由 |

**核心原则**: 视觉层 + 路由层扩展，数据层保持不变。

---

## 2. Inputs from Spec

### 必须实现

| ID | 需求 | 来源 |
|----|------|------|
| R-001 | SkillsPage Section-based 布局 | spec.md §4.1 |
| R-002 | RolesPage Section-based 布局 | spec.md §4.2 |
| R-003 | ContractsPage Section-based 布局 | spec.md §4.3 |
| R-004 | CommandsPage Section-based 布局 | spec.md §4.4 |
| R-005 | SkillDetailPage 新增 | spec.md §5.1 |
| R-006 | RoleDetailPage 新增 | spec.md §5.2 |
| R-007 | ContractDetailPage 新增 | spec.md §5.3 |
| R-008 | CommandDetailPage 新增 | spec.md §5.4 |
| R-009 | SkillCard href prop | spec.md §6.2 |
| R-010 | RoleCard href prop | spec.md §6.3 |
| R-011 | ContractCard href prop | spec.md §6.4 |
| R-012 | CommandCard href prop | spec.md §6.5 |
| R-013 | PageHeader 组件 | spec.md §6.1 |
| R-014 | BackButton 组件 | spec.md §6.6 |
| R-015 | 4 个新路由 | spec.md §7 |

---

## 3. Technical Constraints

### 设计令牌约束
- 所有颜色、间距、字体使用 `tokens.css` CSS 变量
- 禁止硬编码颜色值
- 禁止固定 px 值

### CSS 约束
- 使用 CSS Modules
- Section-based 布局：`padding: var(--space-12) 0`
- 支持 `prefers-reduced-motion`

### 组件约束
- 语义化 HTML (`section`, `article`, `h1-h3`)
- ARIA 属性支持
- 键盘导航
- 卡片支持两种模式：onClick 回调 / href 跳转

### 路由约束
- 使用 React Router `useParams` 获取动态参数
- 详情页参数：`:id` (skills/contracts) 或 `:name` (roles/commands)

---

## 4. Module Decomposition

### 4.1 Shared Components (New)

**文件结构**:
```
src/components/shared/
├── PageHeader.tsx           📝 新建
├── PageHeader.module.css    📝 新建
├── BackButton.tsx           📝 新建
└── BackButton.module.css    📝 新建
```

**PageHeader Props**:
```tsx
interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon?: string;
}
```

**BackButton Props**:
```tsx
interface BackButtonProps {
  to: string;
  label?: string;
}
```

---

### 4.2 Card Components (Enhanced)

**文件变更**:
```
src/components/cards/
├── SkillCard.tsx            🔧 增强 (add href)
├── RoleCard.tsx             🔧 增强 (add href)
├── ContractCard.tsx         🔧 增强 (add href)
├── CommandCard.tsx          🔧 增强 (add href)
```

**增强模式**:
```tsx
interface SkillCardProps {
  skill: Skill;
  roleColor?: string;
  onClick?: (skill: Skill) => void;  // 已有
  href?: string;  // 📝 新增：如果提供，渲染为 Link
}

// 渲染逻辑
{href ? (
  <Link to={href} className={cardClassName}>
    {...}
  </Link>
) : (
  <article className={cardClassName} onClick={onClick}>
    {...}
  </article>
)}
```

---

### 4.3 List Pages (Redesign)

**文件变更**:
```
src/pages/
├── SkillsPage.tsx           🔧 重构
├── SkillsPage.module.css    🔧 重构
├── RolesPage.tsx            🔧 重构
├── RolesPage.module.css     🔧 重构
├── ContractsPage.tsx        🔧 重构
├── ContractsPage.module.css 🔧 重构
├── CommandsPage.tsx         🔧 重构
├── CommandsPage.module.css  🔧 重构
```

**Section-based 结构**:
```tsx
<div className={styles.page}>
  <PageHeader title="技能库" subtitle="38 个技能 · MVP 核心 · M4 扩展" />
  
  <section className={styles.filterSection}>
    {/* 筛选器 */}
  </section>
  
  <section className={styles.gridSection}>
    {/* 卡片网格 */}
  </section>
</div>
```

---

### 4.4 Detail Pages (New)

**文件新建**:
```
src/pages/
├── SkillDetailPage.tsx      📝 新建
├── SkillDetailPage.module.css 📝 新建
├── RoleDetailPage.tsx       📝 新建
├── RoleDetailPage.module.css 📝 新建
├── ContractDetailPage.tsx   📝 新建
├── ContractDetailPage.module.css 📝 新建
├── CommandDetailPage.tsx    📝 新建
├── CommandDetailPage.module.css 📝 新建
```

**详情页结构**:
```tsx
<div className={styles.detailPage}>
  <BackButton to="/skills" label="返回技能库" />
  
  <section className={styles.headerSection}>
    {/* 详情头部 */}
  </section>
  
  <section className={styles.contentSection}>
    {/* 详细内容 */}
  </section>
  
  <section className={styles.relatedSection}>
    {/* 相关项目 */}
  </section>
</div>
```

---

### 4.5 Routing Updates

**文件变更**:
```
src/App.tsx                  🔧 新增路由
src/pages/index.ts           🔧 新增导出
```

**新路由**:
```tsx
<Route path="/skills/:id" element={<SkillDetailPage />} />
<Route path="/roles/:name" element={<RoleDetailPage />} />
<Route path="/contracts/:id" element={<ContractDetailPage />} />
<Route path="/commands/:name" element={<CommandDetailPage />} />
```

---

## 5. Implementation Sequence

### Phase 1: Shared Components (基础)
```
T-001: 创建 PageHeader 组件
  ├── PageHeader.tsx + CSS
  └── 验收：title/subtitle 正确显示

T-002: 创建 BackButton 组件
  ├── BackButton.tsx + CSS
  └── 验收：返回导航功能正常
```

### Phase 2: Card Enhancement (卡片)
```
T-003: 增强 SkillCard
  ├── 添加 href prop
  ├── 条件渲染 Link 或 article
  └── 验收：href 提供时跳转正常

T-004: 增强 RoleCard
  ├── 添加 href prop
  └── 验收：跳转正常

T-005: 增强 ContractCard
  ├── 添加 href prop
  └── 验收：跳转正常

T-006: 增强 CommandCard
  ├── 添加 href prop
  └── 验收：跳转正常
```

### Phase 3: List Pages Redesign (列表页)
```
T-007: SkillsPage 重构
  ├── PageHeader 替换旧 header
  ├── Section-based 布局
  ├── 卡片添加 href
  └── 验收：视觉 + 交互正常

T-008: RolesPage 重构
  ├── PageHeader
  ├── Section-based 布局
  ├── 卡片添加 href
  └── 验收：视觉 + 交互正常

T-009: ContractsPage 重构
  ├── PageHeader
  ├── Section-based 布局
  ├── 卡片添加 href
  └── 验收：视觉 + 交互正常

T-010: CommandsPage 重构
  ├── PageHeader
  ├── Workflow Timeline Section
  ├── 卡片添加 href
  └── 验收：视觉 + 交互正常
```

### Phase 4: Detail Pages (详情页)
```
T-011: SkillDetailPage
  ├── 路由参数 :id 获取
  ├── 数据匹配
  ├── 详情展示
  └── 验收：正确显示技能详情

T-012: RoleDetailPage
  ├── 路由参数 :name 获取
  ├── 该角色技能列表
  └── 验收：正确显示角色详情

T-013: ContractDetailPage
  ├── 路由参数 :id 获取
  ├── 契约详情
  └── 验收：正确显示契约详情

T-014: CommandDetailPage
  ├── 路由参数 :name 获取
  ├── 命令详情
  └── 验收：正确显示命令详情
```

### Phase 5: Routing + Integration (集成)
```
T-015: 路由更新
  ├── App.tsx 新增 4 路由
  ├── pages/index.ts 新增导出
  └── 验收：路由正常工作

V-001: 构建验证
V-002: 部署验证
V-003: 手动验证（所有页面）
```

---

## 6. Risks / Tradeoffs

### Risks

| ID | 风险 | 影响 | 缓解措施 |
|----|------|------|----------|
| R-001 | 详情页内容单薄 | 用户体验差 | 使用现有数据扩展展示格式 |
| R-002 | 参数匹配失败 | 详情页空白 | 添加 NotFound 处理 |
| R-003 | 工作量大 | 时间延长 | 分阶段实施，并行开发 |
| R-004 | 卡片两种模式兼容 | 代码复杂 | 清晰的条件渲染逻辑 |

### Tradeoffs

| 决策 | 收益 | 代价 |
|------|------|------|
| **ExecutionPage 不重构** | 范围可控 | 风格不完全统一 |
| **详情页无新增数据** | 快速实现 | 内容不够丰富 |
| **使用 HashRouter** | 部署简单 | URL 不美观 |

---

## 7. Validation Strategy

### 视觉验证

| 检查项 | 方法 | 验收标准 |
|--------|------|----------|
| Section-based 布局 | 视觉检查 | 垂直分节，间距一致 |
| PageHeader | 视觉检查 | 标题居中，字体正确 |
| 卡片 Hover | 交互测试 | translateY + border-color |

### 交互验证

| 检查项 | 方法 | 验收标准 |
|--------|------|----------|
| 卡片跳转 | 点击测试 | 导航到正确详情页 |
| BackButton | 点击测试 | 返回列表页 |
| 参数匹配 | 多项测试 | 正确显示对应内容 |

### 技术验证

| 检查项 | 工具 | 验收标准 |
|--------|------|----------|
| Build | npm run build | 无错误 |
| Deploy | GitHub Pages | 正常访问 |
| Lint | npm run lint | 无错误 |

---

## 8. Requirement Traceability

| Spec Requirement | Plan Section | Task ID |
|-------------------|--------------|---------|
| R-001 SkillsPage 重构 | §4.3 | T-007 |
| R-002 RolesPage 重构 | §4.3 | T-008 |
| R-003 ContractsPage 重构 | §4.3 | T-009 |
| R-004 CommandsPage 重构 | §4.3 | T-010 |
| R-005 SkillDetailPage | §4.4 | T-011 |
| R-006 RoleDetailPage | §4.4 | T-012 |
| R-007 ContractDetailPage | §4.4 | T-013 |
| R-008 CommandDetailPage | §4.4 | T-014 |
| R-009~R-012 Card href | §4.2 | T-003~T-006 |
| R-013 PageHeader | §4.1 | T-001 |
| R-014 BackButton | §4.1 | T-002 |
| R-015 路由 | §4.5 | T-015 |

---

## 9. Next Steps

1. **Phase 1**: 创建 PageHeader + BackButton 共享组件
2. **Phase 2**: 增强 4 个卡片组件
3. **Phase 3**: 重构 4 个列表页
4. **Phase 4**: 创建 4 个详情页
5. **Phase 5**: 路由更新 + 验证